/**
 * @jest-environment jsdom
 */

import { resolve } from "path";
import expectFilesInDist, { distPath } from "./expect-files-in-dist";
import expectToBeMyBoi from "./expect-to-be-my-boi";

declare global {
	const xrange: typeof import("../../src");
}

/** @private */
const bundlePath = resolve(distPath, "xrange.bundle.js");

it("should create all the necessary files", () => {
	expectFilesInDist("xrange.bundle.js", [
		"xrange.bundle.js",
	]);
});

it("should export fully functional entity", () => {
	require(bundlePath);
	expectToBeMyBoi(xrange);
});
