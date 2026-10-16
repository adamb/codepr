<script lang="ts">
	import SEO from '$lib/SEO.svelte';
</script>

<SEO
	title="How to Install n8n Self-Hosted (2026): One-Line Script, Docker Compose, and Agentic AI Wiring"
	description="Yes — self-host n8n free (Community edition): one-line script or Docker Compose (Oct 2026); wire Grok and Hermes in via its AI Agent node and MCP server."
	canonical="https://code.pr/blog/5/install-self-hosted-n8n-agentic-ai"
	type="article"
	publishedTime="2026-10-16"
	modifiedTime="2026-10-16"
/>

<div class="post-container container">
<article class="post">
	<header>
		<p class="kicker">Engineering Guide</p>
		<h1>How to Install n8n Self-Hosted (2026): One-Line Script, Docker Compose, and Agentic AI Wiring</h1>
		<p class="subtitle">Self-host n8n free on your own server: the one-line script, Docker Compose, and how to wire AI agents in — Grok on the AI Agent node, outside agents through n8n's MCP server.</p>
		<div class="meta">
			<img src="/team/adam.jpeg" alt="Adam Beguelin" class="avatar" width="56" height="56" />
			<div>
				<p class="author">By Adam Beguelin</p>
				<p class="date">Friday, October 16, 2026 • Code Puerto Rico, San Juan</p>
			</div>
		</div>
	</header>

	<section class="content">
		<p>Short answer, up top: yes — you can self-host n8n for free on your own server, and yes, you can wire real AI agents into it, either inside n8n (chat models on its AI Agent node) or from outside (agents that drive your instance through n8n's MCP server).</p>

		<p>Second thing to know up front: the install methods changed. If you're here to learn how to install n8n on your own hardware, be suspicious of older tutorials — npm installs are deprecated from n8n 3.0 (launching October 2026), and most guides in the wild predate that change.</p>

		<p>A word on who's writing: we're a small engineering shop in Puerto Rico; we build AI-agent automation for clients, we run our own agents (our <a href="/blog/4/beach-gate-vision-classifier">AI-lab prototypes</a> live on this blog), and we've written before about <a href="/blog/1/what-does-a-developer-actually-need-to-succeed-in-the-age-of-ai-1">what a developer actually needs to succeed in the age of AI</a>. This guide is the install half of that story, written for a teammate who owns a VPS: current methods first, limits stated plainly.</p>

		<h2>Before you start: server requirements (or a laptop)</h2>
		<p>Start at 4 GB of RAM and 2 vCPUs, with Docker installed — that's the whole hardware bar, whether the target is a laptop or a rented VPS.</p>

		<p>Where that number comes from: <a href="https://docs.n8n.io/deploy/host-n8n/install-options/install-using-docker-compose/" target="_blank" rel="noopener">the Docker Compose page</a> carries the only quantified minimum in n8n's current docs — "at least 4 GB of RAM and 2 vCPUs" — and there is no dedicated system-requirements page anymore. The figure isn't padding, either: the sandbox that runs AI-generated code (sandbox-runner-1) uses Docker-in-Docker, and n8n's docs note it needs more headroom than a typical container.</p>

		<p>Docker is what n8n recommends for most self-hosting. Linux and macOS are first-class; the one-line script below is POSIX-only, so Windows users go through WSL2 — Git Bash hasn't been verified end-to-end by n8n.</p>

		<p>Also bring an API key to install day so the agentic section isn't theoretical: an xAI key for Grok (created on the xAI Console's API Keys page), and/or an Anthropic, OpenAI, or OpenRouter key for the built-in AI Assistant. And a dry line from n8n's own docs: "If you aren't experienced at managing servers, n8n recommends n8n Cloud." Self-hosting buys you control and bills you sysadmin time — budget for both.</p>

		<h2>Method 1 — how to install n8n in one line (fastest)</h2>
		<p>If you're asking "how do I get started with n8n", this is the fastest documented path — one shell command on Linux or macOS (Windows goes through WSL2, below):</p>

		<pre><code>curl -fsSL https://get.n8n.io | sh</code></pre>

		<p>Per <a href="https://docs.n8n.io/deploy/host-n8n/install-options/one-line-setup/" target="_blank" rel="noopener">n8n's one-line setup docs</a>, that command writes a compose.yml and a .env file, runs the stack on a SQLite database, and starts n8n alongside the sandbox services the AI Assistant depends on. You end up with a running instance and an ordinary directory of Compose files you can read — nothing magical, which is the main thing we like about it.</p>

		<p>Three details worth flagging:</p>
		<ul>
			<li>It replaces <code>npm install n8n</code> and <code>npx n8n</code>, which per the docs no longer work from n8n 3.0 onwards (3.0 launches October 2026).</li>
			<li>The one-line page documents an upgrade path for later version moves, so updating doesn't mean hand-patching a running install.</li>
			<li>It's POSIX-only; on native Windows, n8n itself notes the script hasn't been verified under Git Bash — this path assumes WSL2.</li>
		</ul>

		<p>One piece of shop honesty: this is still <code>curl | sh</code> — a remote script piped into a shell. It's the documented official command and the fastest route to a working instance, but reading a script before running it on a server you own is a habit worth keeping, and the Compose method below exists for people who want to see every container definition before anything executes. When the script finishes, n8n is listening on port 5678.</p>

		<h2>Method 2 — Docker Compose (what a real server run uses)</h2>
		<p>Docker Compose is the install method <a href="https://docs.n8n.io/deploy/host-n8n/install-options/install-using-docker-compose/" target="_blank" rel="noopener">n8n's docs recommend</a> for a serious self-hosted deployment — the recommended manual production install, "manual" meaning you own the Compose files. If your hunt for an n8n docker install lands on old <code>docker run</code> one-liners, n8n's own <a href="https://docs.n8n.io/deploy/host-n8n/install-options/install-with-docker/" target="_blank" rel="noopener">Docker page</a> now carries an explicit "this content is outdated" banner and points to Docker Compose instead.</p>

		<p>The official configurations live in <a href="https://github.com/n8n-io/n8n-hosting" target="_blank" rel="noopener">n8n's n8n-hosting repository</a> — Docker Compose setups for various architectures, including a hardened example wired for Postgres. Start from the repo rather than assembling services by hand; those files encode decisions (ports, volumes, sandbox wiring) that are easy to get subtly wrong from scratch.</p>

		<p>What the recommended stack contains, per the Compose docs: the n8n service running on SQLite by default, plus a sandbox stack for the AI Assistant — sandbox certificates, a sandbox API, and a privileged Docker-in-Docker runner (sandbox-runner-1) that executes AI-generated code — alongside a bundled SearXNG instance for web search. The Assistant's optional web search uses that bundled SearXNG or a Brave Search key.</p>

		<p>Two things the page states plainly. Sizing: "at least 4 GB of RAM and 2 vCPUs," again because of the Docker-in-Docker sandbox. Security: the page's security checklist tells you to treat that privileged sandbox runner as equivalent to root — fair, since it's a container built to run other containers.</p>

		<p>For data that has to survive reboots: SQLite is the default, and the docs direct production installs to Postgres (18), using that hardened withPostgres example — and to follow the PGDATA note in the compose file rather than improvising paths. Database volume paths are exactly the thing you don't want to re-debug at 2 a.m.</p>

		<h2>What's deprecated — npm, and every pre-2026 tutorial</h2>
		<p>npm installs are deprecated from n8n 3.0 (launching October 2026) — stated twice by n8n itself: the <a href="https://docs.n8n.io/deploy/host-n8n/install-options/one-line-setup/" target="_blank" rel="noopener">one-line page</a> notes that <code>npm install n8n</code> and <code>npx n8n</code> no longer work from 3.0 onwards, and the <a href="https://docs.n8n.io/deploy/host-n8n/install-options/install-with-npm/" target="_blank" rel="noopener">npm install page</a> leads with "npm-based installs are deprecated from n8n 3.0."</p>

		<p>If you have to stay pinned on the 2.x line for a while, the npm page still documents that path: Node.js between 20.19 and 24.x inclusive, an install method flagged "not safe for production," the n8n AI Assistant unavailable on npm installs entirely — and even the old <code>npx n8n</code> trial command sits under the same deprecation.</p>

		<p>Why a whole section on this: the top forum result ranking for install searches today is a self-hosting guide dated 2021, and most independent tutorials predate the v3.0 change. Follow one, and you hit a wall exactly where the docs have moved. Freshness isn't decoration on this topic — it's the difference between a working install and a broken afternoon.</p>

		<h2>First boot and set-up checklist</h2>
		<p>First boot is short: the editor comes up on port 5678 (n8n's documented default), you set the timezone variables n8n's run examples use, and the first-use flow walks you through creating your owner account. We're keeping the UI detail pointer-level: the exact first-run screens aren't consolidated in the pages we cited.</p>

		<p>License status: with no license key, n8n runs as the <a href="https://docs.n8n.io/deploy/host-n8n/" target="_blank" rel="noopener">free Community edition</a> — "free with almost the complete feature set," per n8n's own comparison — governed by the Sustainable Use License: free for internal business and non-commercial use under three limitations, with commercial redistribution and Enterprise features moving to the Enterprise License instead.</p>

		<p>One pointer we won't improvise: if this instance will receive real production webhooks, it has to be reachable over TLS — a reverse proxy, in practice. The install pages don't consolidate that guidance (it lives elsewhere in the docs), and the old public-tunnel approach is documented as development-only. Plan the proxy into the install.</p>

		<h2>Wiring agentic AI into your self-hosted n8n</h2>
		<p>"Agentic," defined for this article: <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/" target="_blank" rel="noopener">n8n's AI Agent node</a> takes a chat model plus one or more tools, "and the agent decides which tools to call to complete a task." Every agent now runs as the Tools Agent type (selector retired in n8n 1.82.0): model, tools, connect. Background: Anthropic's <a href="https://www.anthropic.com/engineering/building-effective-agents" target="_blank" rel="noopener">"building effective agents"</a> (December 2024, so background not spec) is the standard read on agents-direct versus workflows-on-fixed-rails. Three kinds of documented wiring follow.</p>

		<h3>Grok as the chat model</h3>
		<p>Add the <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatxaigrok/" target="_blank" rel="noopener">xAI Grok Chat Model sub-node</a>. It talks straight to the Grok API — <a href="https://docs.x.ai/overview" target="_blank" rel="noopener">api.x.ai/v1</a>, documented as compatible with both the OpenAI and Anthropic SDKs — and the model list loads dynamically from that API. Auth is an API key from the <a href="https://docs.n8n.io/integrations/builtin/credentials/xai/" target="_blank" rel="noopener">xAI Console's API Keys page</a>. xAI's <a href="https://docs.x.ai/developers/models" target="_blank" rel="noopener">models page</a> lists grok-4.7 as flagship. Claude comes in through the <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatanthropic/" target="_blank" rel="noopener">Anthropic Chat Model sub-node</a>, which adds prompt caching (Disabled / 5 min / 1 hr).</p>

		<h3>The limitation to state honestly</h3>
		<p>The built-in AI Assistant is a different surface, and it stays closed to Grok: its provider must be <a href="https://docs.n8n.io/deploy/host-n8n/configure-n8n/set-up-ai-assistant/" target="_blank" rel="noopener">Anthropic, OpenAI, or OpenRouter</a> — no xAI entry — defaulting to anthropic/claude-opus-4-8, sandbox required. Grok does not run your Assistant; Grok runs your AI Agent node. Two different product surfaces, and half the confusion starts with mixing them.</p>

		<h3>Let outside agents drive your n8n (MCP)</h3>
		<p>The reverse direction is n8n's built-in <a href="https://docs.n8n.io/connect/connect-to-n8n-mcp-server/" target="_blank" rel="noopener">MCP server</a>, enabled per workflow: connected clients can search, trigger, build, and edit workflows (build-and-edit from n8n 2.13.0, connect-a-client dialog from 2.33.0). The endpoint is <code>https://&lt;your-n8n-domain&gt;/mcp-server/http</code>, OAuth recommended over API-key auth. Official client recipes exist for Claude Desktop, Claude Code, Codex, Gemini CLI, ChatGPT, Cursor, VS Code, Windsurf, and Lovable; the Claude Code one reads:</p>

		<pre><code>claude mcp add --transport http n8n https://&lt;your-n8n-domain&gt;/mcp-server/http</code></pre>

		<p>MCP is Anthropic's standard, <a href="https://www.anthropic.com/news/model-context-protocol" target="_blank" rel="noopener">announced November 25, 2024</a>; <a href="https://docs.claude.com/en/docs/agents-and-tools/mcp-connector" target="_blank" rel="noopener">Claude's API MCP connector</a> can bind the same server directly.</p>

		<h3>Hermes as the driver agent</h3>
		<p><a href="https://hermes-agent.nousresearch.com/docs" target="_blank" rel="noopener">Hermes Agent</a>, by Nous Research, is a self-hosted agent — CLI plus desktop — that "lives wherever you put it — a $5 VPS, a GPU cluster, or serverless infrastructure." Install is one line on Linux, macOS, or WSL2:</p>

		<pre><code>curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash</code></pre>

		<p>Windows gets <a href="https://hermes-agent.nousresearch.com/docs/getting-started/installation" target="_blank" rel="noopener">install.ps1</a> instead; the installer pins Python, Node.js, npm, ripgrep, FFmpeg; then <code>hermes model</code>, <code>hermes gateway setup</code>. The xAI bridge is first-party: the <a href="https://hermes-agent.nousresearch.com/docs/getting-started/quickstart" target="_blank" rel="noopener">provider table</a> lists "xAI — Grok models via direct API — set XAI_API_KEY" and "xAI Grok OAuth — SuperGrok/Premium+ subscription, no API key needed." Point it at your n8n MCP server and an outside agent can operate your instance. Stated honestly: no first-party Hermes⇄n8n recipe exists (n8n's client list omits Hermes; Hermes' docs have no n8n guide) — the MCP bridge is the documented path, not a blessed integration. <a href="https://hermes-agent.nousresearch.com/docs/user-guide/bot-mode" target="_blank" rel="noopener">Bot Mode</a> turns profiles into named bots with their own model, memory, and skills; Tier-1 per its docs: macOS, Windows 10/11, Linux/WSL2, Docker — no <code>hermes update</code> inside Docker (update = run a new image).</p>

		<h3>Grok Bot vs the Grok API</h3>
		<p>Two products get flattened into "grokbot": the <strong>Grok API</strong> is the developer API at api.x.ai/v1 — what n8n's Grok node and Hermes' provider connect to. <strong>Grok Bot</strong> is xAI's agent application — named AI teammates on a persistent cloud computer with a browser, filesystem, and terminal; desktop apps at <a href="https://docs.x.ai/grok-bot/get-started" target="_blank" rel="noopener">x.ai/bot</a>; launched August 2026 per <a href="https://docs.x.ai/developers/release-notes" target="_blank" rel="noopener">xAI's release notes</a> (those doc pages publish under "SpaceX Super Intelligence" branding). Access runs through paid Cursor plans (or Cursor Teams) or a linked SuperGrok subscription — billing detail routes to Cursor's docs, a separate company, so we cite xAI and stop there. Its terminal could execute the documented commands above — xAI's function-calling model is "the model requests the call, you execute it locally" — but no first-party Grok-Bot⇄n8n doc exists and Grok Bot is absent from n8n's MCP client list. That's your own experiment, not a supported integration. Official spelling: "Grok Bot," two words; "Grokbot" isn't an official name.</p>

		<h3>When to just use n8n's own AI starter kit</h3>
		<p>The official shortcut deserves its citations: the <a href="https://docs.n8n.io/deploy/host-n8n/deploy-with-the-ai-starter-kit/" target="_blank" rel="noopener">Self-hosted AI Starter Kit</a> — one Compose template bundling n8n, Ollama, Qdrant, and Postgres — appears at the top of the pages AI answers cite for install prompts, together with its <a href="https://github.com/n8n-io/self-hosted-ai-starter-kit" target="_blank" rel="noopener">GitHub repo</a>. n8n's own label: "for testing only," "not fully optimized for production environments." Evaluate local-model workflows there in an afternoon; deploy what you have to keep alive from the Compose docs and this guide.</p>

		<h2>FAQ</h2>
		<h3>Can I run n8n for free?</h3>
		<p>Yes. Self-hosting runs the free Community edition without a license key, and n8n's own comparison describes it as "free with almost the complete feature set."</p>

		<h3>Can I self-host n8n?</h3>
		<p>Yes. The docs pitch it as a first-class deployment path — "You can self-host n8n on your own infrastructure, on-premises, or in a private cloud." You get full deployment control, and n8n's decision guide is upfront that it requires technical expertise.</p>

		<h3>How can I run n8n locally?</h3>
		<p>Two documented routes: the one-line setup script (Linux, macOS, or WSL2 on Windows) or Docker Compose. Docker is n8n's recommended engine for most self-hosting — and be careful, because most "n8n docker install" search hits describe the deprecated <code>docker run</code> pattern.</p>

		<h3>Which AI models can a self-hosted n8n use?</h3>
		<p>On the AI Agent node: Grok models through the xAI Grok Chat Model sub-node (the model list loads dynamically from the xAI API), and Claude models through the Anthropic Chat Model sub-node. The built-in AI Assistant is a separate surface limited to Anthropic, OpenAI, or OpenRouter keys — no Grok.</p>

		<h3>Can I install n8n on Windows?</h3>
		<p>n8n itself installs through WSL2 — the one-line script is POSIX-only, and n8n hasn't verified Git Bash end-to-end. The agentic tools are friendlier to native Windows: Grok Bot ships x64/Arm64 Windows installers, and Hermes ships install.ps1.</p>

		<h3>Is self-hosted n8n free for business use?</h3>
		<p>Internal business use is free under n8n's Sustainable Use License (fair-code, 2022) — with three limitations. Commercial redistribution requires a commercial agreement, and the <code>.ee</code> files live under the Enterprise License instead.</p>

		<h3>Can I install n8n on Ubuntu or a VPS?</h3>
		<p>Yes — the same two methods work on any Linux server, with the same minimum of 4 GB RAM and 2 vCPUs, and the docs' production guidance (Postgres, hardened examples) carries over unchanged. If the Linux server itself is the new part, we keep notes from our community <a href="https://code.pr/workshops/linux-workshop">Linux workshop</a>.</p>

		<h2>After install: first workflow and agents (Preview)</h2>
		<p>Build something small first — one working workflow under your fingers before anything agentic matters. Worth knowing as of this writing: self-hosted n8n carries a first-class <a href="https://docs.n8n.io/build/build-and-manage-agents/" target="_blank" rel="noopener">agents module in Preview</a>, available from n8n 2.32.3 — "an autonomous assistant you build in n8n," with a model, instructions, tools (including MCP servers), skills, channels like Slack and Telegram, schedules, and sub-agents. It isn't yet available on self-hosted Enterprise, so read that as an area still moving.</p>

		<p>That's the install half. The wiring — models, MCP, Hermes, Grok Bot — is documented above. And if you'd rather have someone else run and maintain the whole stack, that's what our <a href="https://code.pr/development">development practice</a> does: AI-agent automation and self-hosted n8n setups for clients.</p>

		<h2>Sources</h2>
		<p>First-party sources (id — publisher — URL — date), per the source-pack rows on card t_0ff1f1af. Date method: <code>B</code> = last commit date of the page's source file in the vendor's docs repo; <code>A</code> = date printed on the page; <code>C</code> = date not stated, retrieved 2026-10-15. Human-facing URLs are shown; the pack's raw-fetch <code>.md</code> paths resolve to the same pages.</p>

		<ul class="sources">
			<li>n8n-host — n8n — <a href="https://docs.n8n.io/deploy/host-n8n/" target="_blank" rel="noopener">https://docs.n8n.io/deploy/host-n8n/</a> — C (retrieved 2026-10-15)</li>
			<li>n8n-choose — n8n — <a href="https://docs.n8n.io/choose-how-to-use-n8n/" target="_blank" rel="noopener">https://docs.n8n.io/choose-how-to-use-n8n/</a> — C (retrieved 2026-10-15)</li>
			<li>n8n-1line — n8n — <a href="https://docs.n8n.io/deploy/host-n8n/install-options/one-line-setup/" target="_blank" rel="noopener">https://docs.n8n.io/deploy/host-n8n/install-options/one-line-setup/</a> — B 2026-10-12</li>
			<li>n8n-docker — n8n — <a href="https://docs.n8n.io/deploy/host-n8n/install-options/install-with-docker/" target="_blank" rel="noopener">https://docs.n8n.io/deploy/host-n8n/install-options/install-with-docker/</a> — B 2026-10-12</li>
			<li>n8n-compose — n8n — <a href="https://docs.n8n.io/deploy/host-n8n/install-options/install-using-docker-compose/" target="_blank" rel="noopener">https://docs.n8n.io/deploy/host-n8n/install-options/install-using-docker-compose/</a> — B 2026-10-12</li>
			<li>n8n-npm — n8n — <a href="https://docs.n8n.io/deploy/host-n8n/install-options/install-with-npm/" target="_blank" rel="noopener">https://docs.n8n.io/deploy/host-n8n/install-options/install-with-npm/</a> — B 2026-10-12</li>
			<li>n8n-hosting-repo — n8n — <a href="https://github.com/n8n-io/n8n-hosting" target="_blank" rel="noopener">https://github.com/n8n-io/n8n-hosting</a> — C (retrieved 2026-10-15)</li>
			<li>n8n-agent — n8n — <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/" target="_blank" rel="noopener">https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/</a> — B 2024-09-23 (page long-stable; noted in text)</li>
			<li>n8n-xai-node — n8n — <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatxaigrok/" target="_blank" rel="noopener">https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatxaigrok/</a> — B 2026-10-12</li>
			<li>n8n-xai-creds — n8n — <a href="https://docs.n8n.io/integrations/builtin/credentials/xai/" target="_blank" rel="noopener">https://docs.n8n.io/integrations/builtin/credentials/xai/</a> — B 2026-10-12</li>
			<li>n8n-anthropic — n8n — <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatanthropic/" target="_blank" rel="noopener">https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatanthropic/</a> — B 2026-10-12</li>
			<li>n8n-mcp — n8n — <a href="https://docs.n8n.io/connect/connect-to-n8n-mcp-server/" target="_blank" rel="noopener">https://docs.n8n.io/connect/connect-to-n8n-mcp-server/</a> — B 2026-10-12</li>
			<li>n8n-mcp-examples — n8n — <a href="https://docs.n8n.io/connect/connect-to-n8n-mcp-server/mcp-client-examples/" target="_blank" rel="noopener">https://docs.n8n.io/connect/connect-to-n8n-mcp-server/mcp-client-examples/</a> — B 2026-10-12</li>
			<li>n8n-license — n8n — <a href="https://docs.n8n.io/n8n-community-license/community-license/" target="_blank" rel="noopener">https://docs.n8n.io/n8n-community-license/community-license/</a> — C (retrieved 2026-10-15)</li>
			<li>n8n-ai-assistant — n8n — <a href="https://docs.n8n.io/deploy/host-n8n/configure-n8n/set-up-ai-assistant/" target="_blank" rel="noopener">https://docs.n8n.io/deploy/host-n8n/configure-n8n/set-up-ai-assistant/</a> — B 2026-09-08</li>
			<li>n8n-starter-kit — n8n — <a href="https://docs.n8n.io/deploy/host-n8n/deploy-with-the-ai-starter-kit/" target="_blank" rel="noopener">https://docs.n8n.io/deploy/host-n8n/deploy-with-the-ai-starter-kit/</a> (repo: <a href="https://github.com/n8n-io/self-hosted-ai-starter-kit" target="_blank" rel="noopener">https://github.com/n8n-io/self-hosted-ai-starter-kit</a>) — B 2026-10-12</li>
			<li>n8n-agents — n8n — <a href="https://docs.n8n.io/build/build-and-manage-agents/" target="_blank" rel="noopener">https://docs.n8n.io/build/build-and-manage-agents/</a> — B 2026-10-12</li>
			<li>xai-grokbot — xAI (docs branded "SpaceX Super Intelligence"/SpaceXSI) — <a href="https://docs.x.ai/grok-bot" target="_blank" rel="noopener">https://docs.x.ai/grok-bot</a> — A: last updated October 7, 2026</li>
			<li>xai-grokbot-start — xAI (SpaceXSI) — <a href="https://docs.x.ai/grok-bot/get-started" target="_blank" rel="noopener">https://docs.x.ai/grok-bot/get-started</a> — A: last updated October 12, 2026; downloads at <a href="https://x.ai/bot" target="_blank" rel="noopener">https://x.ai/bot</a></li>
			<li>xai-api — xAI (SpaceXSI) — <a href="https://docs.x.ai/overview" target="_blank" rel="noopener">https://docs.x.ai/overview</a> — C (retrieved 2026-10-15)</li>
			<li>xai-models — xAI (SpaceXSI) — <a href="https://docs.x.ai/developers/models" target="_blank" rel="noopener">https://docs.x.ai/developers/models</a> — A: last updated September 21, 2026</li>
			<li>xai-relnotes — xAI (SpaceXSI) — <a href="https://docs.x.ai/developers/release-notes" target="_blank" rel="noopener">https://docs.x.ai/developers/release-notes</a> — rolling changelog; cited entry: "Grok Bot is now available," August 2026</li>
			<li>xai-tools — xAI (SpaceXSI) — <a href="https://docs.x.ai/developers/tools/function-calling" target="_blank" rel="noopener">https://docs.x.ai/developers/tools/function-calling</a> — C (retrieved 2026-10-15)</li>
			<li>anthropic-agents — Anthropic — <a href="https://www.anthropic.com/engineering/building-effective-agents" target="_blank" rel="noopener">https://www.anthropic.com/engineering/building-effective-agents</a> — A: published December 19, 2024 (page carries an update note re: current approach; staleness caveat stated in text)</li>
			<li>anthropic-mcp — Anthropic — <a href="https://www.anthropic.com/news/model-context-protocol" target="_blank" rel="noopener">https://www.anthropic.com/news/model-context-protocol</a> — A: November 25, 2024</li>
			<li>anthropic-mcp-connector — Anthropic — <a href="https://docs.claude.com/en/docs/agents-and-tools/mcp-connector" target="_blank" rel="noopener">https://docs.claude.com/en/docs/agents-and-tools/mcp-connector</a> — C (retrieved 2026-10-15)</li>
			<li>hermes-index — Nous Research — <a href="https://hermes-agent.nousresearch.com/docs" target="_blank" rel="noopener">https://hermes-agent.nousresearch.com/docs</a> — C (retrieved 2026-10-15)</li>
			<li>hermes-install — Nous Research — <a href="https://hermes-agent.nousresearch.com/docs/getting-started/installation" target="_blank" rel="noopener">https://hermes-agent.nousresearch.com/docs/getting-started/installation</a> — B 2026-10-07</li>
			<li>hermes-quickstart — Nous Research — <a href="https://hermes-agent.nousresearch.com/docs/getting-started/quickstart" target="_blank" rel="noopener">https://hermes-agent.nousresearch.com/docs/getting-started/quickstart</a> — B 2026-10-03</li>
			<li>hermes-platform — Nous Research — <a href="https://hermes-agent.nousresearch.com/docs/getting-started/platform-support" target="_blank" rel="noopener">https://hermes-agent.nousresearch.com/docs/getting-started/platform-support</a> — B 2026-10-14</li>
			<li>hermes-botmode — Nous Research — <a href="https://hermes-agent.nousresearch.com/docs/user-guide/bot-mode" target="_blank" rel="noopener">https://hermes-agent.nousresearch.com/docs/user-guide/bot-mode</a> — B 2026-10-06</li>
		</ul>

		<p>Internal research (not a public URL): live SERP analysis "how to install n8n," task 10150437-2768-0139-0000-a067cfcad2b3 (2026-10-15) — basis for the 2021-dated forum-result observation; AI-citation pull per t_fca190c2 (tasks 10150438-…-f2c526c12c81 / …-89f75ca0ebe9) — basis for "AI answers already cite the starter-kit pages." Not printed as article claims.</p>
	</section>
</article>
</div>

<style>
	.post-container {
		padding-top: 3.5rem;
		padding-bottom: 5rem;
	}

	.post {
		max-width: 800px;
	}

	.kicker {
		color: var(--color-accent);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-size: 0.85rem;
		margin: 0 0 0.5rem;
	}

	.post h1 {
		font-size: 2.5rem;
		margin-bottom: 1rem;
	}

	.subtitle {
		font-size: 1.25rem;
		color: #666;
		margin-bottom: 1.5rem;
	}

	.meta {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 2rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid #eaeaea;
	}

	.avatar {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		object-fit: cover;
	}

	.author {
		font-weight: 700;
		margin: 0;
	}

	.date {
		color: #666;
		font-size: 0.875rem;
		margin: 0.25rem 0 0;
	}

	.content h2 {
		margin-top: 2.5rem;
		font-size: 1.75rem;
	}

	.content h3 {
		margin-top: 1.75rem;
		font-size: 1.25rem;
	}

	.content h2 + h3 {
		margin-top: 1.25rem;
	}

	.content ul {
		margin-bottom: 1.5rem;
		padding-left: 1.5rem;
	}

	.content li {
		margin-bottom: 0.5rem;
	}

	.content pre {
		background: #1e1e2e;
		color: #e6e6f0;
		padding: 1rem 1.25rem;
		border-radius: var(--radius, 8px);
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
		margin: 0 0 1.5rem;
		font-size: 0.9rem;
		line-height: 1.5;
	}

	.content pre code {
		font-family: var(--font-mono, monospace);
		white-space: pre;
	}

	.content code {
		font-family: var(--font-mono, monospace);
		font-size: 0.875em;
		background: #f5f2ee;
		padding: 0.1em 0.35em;
		border-radius: 4px;
	}

	.content pre code {
		background: none;
		padding: 0;
	}

	.content .sources li {
		font-size: 0.9rem;
		color: #555;
		word-break: break-all;
	}

	@media (max-width: 600px) {
		.post h1 {
			font-size: 1.75rem;
		}
	}
</style>