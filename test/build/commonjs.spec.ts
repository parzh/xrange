import { resolve } from "path";
import { build, readGlob, expectToBeMyBoi } from "./helpers";
import { distPath as dist } from "./entities";

beforeAll(build, 20000);

it("should create all the necessary files", () => {
	expect(readGlob(dist, "**/*.js")).toEqual(expect.arrayContaining([
		resolve(dist, "index.js"),
		resolve(dist, "xrange.js"),
	]));
});

it("should export fully functional entity", () => {
	const xrange: typeof import("../../src") = require("../../dist");

	expectToBeMyBoi(xrange);
});
