// Sanitizers for the ManyChat DM link params on /start (pure functions, unit-testable with plain node).

// Instagram handles are 1-30 chars of letters, digits, '.' and '_' and are case-insensitive.
// ManyChat's "Instagram Username" field may arrive with a leading '@'. Anything else
// (e.g. an unfilled ManyChat placeholder like "{{instagram_username}}") is dropped.
export const cleanIgHandle = (v: string | null | undefined): string => {
	const h = String(v ?? '').trim().replace(/^@+/, '').toLowerCase();
	return /^[a-z0-9._]{1,30}$/.test(h) ? h : '';
};

// ManyChat Contact Id: digits in practice; allow a conservative id charset, drop placeholders.
export const cleanSubscriberId = (v: string | null | undefined): string => {
	const s = String(v ?? '').trim();
	return /^[A-Za-z0-9_-]{1,80}$/.test(s) ? s : '';
};

// First non-empty value among several query param aliases.
export const firstParam = (url: URL, keys: string[], n = 120): string => {
	for (const k of keys) {
		const v = (url.searchParams.get(k) ?? '').trim();
		if (v) return v.slice(0, n);
	}
	return '';
};

// Accepted aliases for the Instagram handle in the DM link.
export const IG_PARAMS = ['ig', 'username', 'ig_username', 'instagram_username'];
