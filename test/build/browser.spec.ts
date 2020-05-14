/**
 * @jest-environment jsdom
 */

import { resolve } from "path";
import { build, readGlob, expectToBeMyBoi } from "./helpers";
import { distPath as dist } from "./entities";

declare global {
	const xrange: typeof import("../../src");
}

beforeAll(build, 20000);

it("should create all the necessary files", () => {
	expect(readGlob(dist, "xrange.bundle.js")).toEqual([
		resolve(dist, "xrange.bundle.js"),
	]);
});

it("should export fully functional entity", () => {
	expectToBeMyBoi(xrange);
});
