import { existsSync } from "fs";
import { resolve } from "path";
import { pathToFileURL } from "url";
import { execSync } from "child_process";

import puppeteer from "puppeteer";

/** @private */
const rootPath = resolve(__dirname, "..");

/** @private */
const testMarkupPath = resolve(__dirname, "index.html");

/** @private */
const testBundlePath = resolve(__dirname, "xrange.bundle.js");

/** @private */
const testBundleConfigPath = resolve(rootPath, "webpack.config.test.ts");

/** @private */
const testMarkupUrl = pathToFileURL(testMarkupPath).toString();

declare global {
	namespace NodeJS {
		interface Global {
			browser?: puppeteer.Browser;
			page?: puppeteer.Page;
		}
	}
}

export async function setupGlobals(): Promise<void> {
	if (global.browser != null)
		await teardownGlobals();

	if (global.page != null)
		throw new Error("Anomalous condition: browser page exists without browser");

	global.browser = await puppeteer.launch();

	const pages = await global.browser.pages();

	global.page = pages[0] ?? await global.browser.newPage();

	if (!existsSync(testBundlePath))
		execSync(`webpack --config ${ testBundleConfigPath }`, { timeout: 10000, stdio: "ignore" });

	await global.page.goto(testMarkupUrl);
}

/** @private */
async function closeAllPages(browser: puppeteer.Browser): Promise<void> {
	const closed: Promise<void>[] = [];

	for (const page of await browser.pages())
		if (!page.isClosed())
			closed.push(page.close());

	await Promise.all(closed);
}

export async function teardownGlobals(): Promise<void> {
	const { browser } = global;

	if (!browser)
		return;

	await closeAllPages(browser);

	if (browser.isConnected())
		browser.disconnect();

	await browser.close();

	delete global.browser;
	delete global.page;
}
