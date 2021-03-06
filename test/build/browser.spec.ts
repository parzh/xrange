/**
 * @jest-environment jsdom
 */

import { expectFilesInDist, expectToBeMyBoi } from "./helpers";
import { bundlePath } from "./entities";

declare global {
	const xrange: typeof import("../../src");
}

it("should create all the necessary files", () => {
	expectFilesInDist("xrange.bundle.js", [
		"xrange.bundle.js",
	]);
});

it("should export fully functional entity", () => {
	require(bundlePath);
	expectToBeMyBoi(xrange);
});
