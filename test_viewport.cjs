const { chromium } = require('playwright');

(async () => {
	const browser = await chromium.launch();
	const context = await browser.newContext({ viewport: { width: 375, height: 667 } });
	const page = await context.newPage();
	await page.goto('https://codepr.pages.dev/', { waitUntil: 'networkidle' });
	const innerWidth = await page.evaluate(() => window.innerWidth);
	const supportsRange = await page.evaluate(() => window.matchMedia('(width <= 900px)').matches);
	const supportsLegacy = await page.evaluate(() => window.matchMedia('(max-width: 900px)').matches);
	const primaryDisplay = await page.evaluate(() => {
		const el = document.querySelector('.primary');
		return el ? getComputedStyle(el).display : 'not found';
	});
	console.log('innerWidth:', innerWidth);
	console.log('supports width<=900px:', supportsRange);
	console.log('supports max-width:900px:', supportsLegacy);
	console.log('primary display:', primaryDisplay);
	await browser.close();
})();
