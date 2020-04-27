/**
 * @jest-environment jsdom
 */

import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import { execSync } from "child_process";

/** @private */
const testBundlePath = resolve(__dirname, "xrange.bundle.js");

declare global {
	const xrange: typeof import("../../src");
}

export async function loadBundle(done: jest.DoneCallback): Promise<void> {
	if (!existsSync(testBundlePath))
		execSync("npm run build:web:test", { timeout: 10000, stdio: "ignore" });

	const script = document.createElement("script");

	script.onload = () => {
		script.onload = null;
		done();
	};

	script.innerHTML = readFileSync(testBundlePath, "utf-8");

	document.head.append(script);
}
