#!/usr/bin/env python3
"""
Generate personalized LinkedIn connection request messages using OpenRouter Fusion.

Fusion runs a panel of models with web search, then synthesizes the best message —
giving each prospect genuinely researched, specific outreach rather than a template.

Usage:
    OPENROUTER_API_KEY=sk-or-... python3 scripts/linkedin_outreach.py scripts/linkedin_prospects.csv

Input CSV columns: name, title, company, headline (optional), notes (optional)
Output CSV: same columns + message
"""

import csv
import os
import sys
import time

try:
    from openai import OpenAI
except ImportError:
    print("Missing dependency. Run: pip install openai")
    sys.exit(1)

EVENT = {
    "name": "AI for Executives: What Matters Now",
    "date": "Wednesday, July 9, 2026, 3:30–7 PM AST",
    "venue": "Aloft San Juan, Convention Center District",
    "early_bird": "$200 through July 2",
    "regular": "$250 after July 2",
    "includes": "AI leadership briefing, live demos, paella dinner, wine & cocktails, valet parking",
    "url": "https://code.pr/events/ai-for-executives",
}

SYSTEM = f"""You are helping Adam Beguelin, PhD (Co-Founder, Code Puerto Rico / Holberton School \
Puerto Rico) write LinkedIn connection request messages to invite San Juan area executives to a \
private AI seminar.

Event: "{EVENT['name']}"
Date: {EVENT['date']}
Venue: {EVENT['venue']}
Price: {EVENT['early_bird']}, {EVENT['regular']}
Includes: {EVENT['includes']}
Details: {EVENT['url']}

You have access to web search. Use it to find one specific, real fact about the prospect's \
company or their industry that makes this invitation genuinely relevant to them.

Output rules (strict):
- Return ONLY the message text, nothing else
- Maximum 270 characters (hard LinkedIn limit — count carefully)
- Written in first person as Adam, no greeting line
- No emojis
- Reference one specific thing about their company or role
- End naturally — do not paste the URL (Adam will add it in LinkedIn)
- Sound like a personal note, not a marketing blast"""


def build_prompt(row: dict) -> str:
    name = row.get("name", "").strip()
    title = row.get("title", "").strip()
    company = row.get("company", "").strip()
    headline = row.get("headline", "").strip()
    notes = row.get("notes", "").strip()

    parts = [f"Write a LinkedIn connection request to {name}, {title} at {company}."]
    if headline:
        parts.append(f"Their LinkedIn headline: \"{headline}\"")
    if notes:
        parts.append(f"Additional context: {notes}")
    parts.append(
        f"Research {company} and find one specific relevant fact to personalize this message."
    )
    return " ".join(parts)


def generate_message(client: OpenAI, row: dict) -> str:
    prompt = build_prompt(row)
    response = client.chat.completions.create(
        model="openrouter/fusion",
        messages=[
            {"role": "system", "content": SYSTEM},
            {"role": "user", "content": prompt},
        ],
    )
    raw = response.choices[0].message.content.strip()

    # Fusion includes reasoning preamble before the actual message — extract last paragraph
    paragraphs = [p.strip() for p in raw.split("\n\n") if p.strip()]
    message = paragraphs[-1] if paragraphs else raw

    # If still over limit, trim with a follow-up call
    if len(message) > 270:
        trim_response = client.chat.completions.create(
            model="openrouter/fusion",
            messages=[
                {"role": "system", "content": SYSTEM},
                {"role": "user", "content": prompt},
                {"role": "assistant", "content": message},
                {"role": "user", "content": f"That is {len(message)} characters. Shorten to under 270 characters. Keep the specific personalized detail and the July 9 invitation. Return only the final message text, no commentary."},
            ],
        )
        raw2 = trim_response.choices[0].message.content.strip()
        paragraphs2 = [p.strip() for p in raw2.split("\n\n") if p.strip()]
        message = paragraphs2[-1] if paragraphs2 else raw2

    return message


def main():
    if len(sys.argv) < 2:
        print(f"Usage: {sys.argv[0]} prospects.csv")
        sys.exit(1)

    input_path = sys.argv[1]
    output_path = input_path.replace(".csv", "_output.csv")

    api_key = os.environ.get("OPENROUTER_API_KEY")
    if not api_key:
        print("Error: OPENROUTER_API_KEY environment variable not set")
        sys.exit(1)

    client = OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=api_key,
    )

    with open(input_path, encoding="utf-8") as f:
        rows = list(csv.DictReader(f))

    if not rows:
        print("No rows found in input CSV")
        sys.exit(1)

    fieldnames = list(rows[0].keys()) + ["message", "char_count"]
    results = []

    print(f"Processing {len(rows)} prospects via OpenRouter Fusion...\n")

    for i, row in enumerate(rows, 1):
        name = row.get("name", "?")
        company = row.get("company", "?")
        print(f"[{i}/{len(rows)}] {name} @ {company}...", end=" ", flush=True)

        try:
            message = generate_message(client, row)
            char_count = len(message)
            status = "OK" if char_count <= 270 else f"OVER ({char_count} chars)"
            print(status)
            if char_count > 270:
                print(f"         WARNING: {char_count} chars — trim before sending")
        except Exception as e:
            message = f"ERROR: {e}"
            char_count = 0
            print(f"FAILED: {e}")

        results.append({**row, "message": message, "char_count": char_count})

        # Brief pause to avoid rate limiting
        if i < len(rows):
            time.sleep(1)

    with open(output_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(results)

    over_limit = sum(1 for r in results if isinstance(r["char_count"], int) and r["char_count"] > 270)
    print(f"\nDone. Output: {output_path}")
    print(f"  {len(results)} messages generated")
    if over_limit:
        print(f"  {over_limit} over 270 chars — review before sending")


if __name__ == "__main__":
    main()
