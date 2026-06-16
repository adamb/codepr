const { chromium } = require('playwright');
const fs = require('fs');

const views = [
	{ name: 'desktop', width: 1280, height: 800 },
	{ name: 'mobile', width: 375, height: 667 },
];

async function capture(url, prefix) {
	const browser = await chromium.launch();
	for (const view of views) {
		const context = await browser.newContext({ viewport: { width: view.width, height: view.height } });
		const page = await context.newPage();
		await page.goto(url, { waitUntil: 'networkidle' });
		await page.screenshot({ path: `/tmp/${prefix}_${view.name}.png`, fullPage: true });
		await context.close();
	}
	await browser.close();
}

(async () => {
	console.log('Capturing production...');
	await capture('https://code.pr/', 'prod');
	console.log('Capturing deployed...');
	await capture('https://codepr.pages.dev/', 'deployed');
	console.log('Done.');
	for (const view of views) {
		console.log(`/tmp/prod_${view.name}.png /tmp/deployed_${view.name}.png`);
	}
})();
