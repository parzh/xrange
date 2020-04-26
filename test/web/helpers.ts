import { existsSync } from "fs";
import { resolve } from "path";
import { pathToFileURL } from "url";
import { execSync } from "child_process";

/** @private */
const testMarkupPath = resolve(__dirname, "index.html");

/** @private */
const testBundlePath = resolve(__dirname, "xrange.bundle.js");

/** @private */
const testMarkupUrl = pathToFileURL(testMarkupPath).toString();

declare global {
	const xrange: typeof import("../../src");
}

export async function loadMarkup(): Promise<void> {
	if (!existsSync(testBundlePath))
		execSync("npm run build:web:test", { timeout: 10000, stdio: "ignore" });

	await page.goto(testMarkupUrl);
}
