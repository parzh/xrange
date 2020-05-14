import { resolve } from "path";
import { build, readGlob } from "./helpers";
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

	expect([ ...xrange(5) ]).toStrictEqual([ 0, 1, 2, 3, 4 ]);
	expect([ ...xrange(-5) ]).toStrictEqual([ 0, -1, -2, -3, -4 ]);

	expect([ ...xrange(2, 6) ]).toStrictEqual([ 2, 3, 4, 5 ]);
	expect([ ...xrange(6, 2) ]).toStrictEqual([ 6, 5, 4, 3 ]);

	expect([ ...xrange(17, 42, 5) ]).toStrictEqual([ 17, 22, 27, 32, 37 ]);
	expect([ ...xrange(42, 17, 5) ]).toStrictEqual([ 17, 22, 27, 32, 37 ]);

	expect([
		...xrange(0, (next) => next < 5, ([ last ]) => last + 1),
	]).toStrictEqual([
		0, 1, 2, 3, 4,
	]);

	expect(() => xrange(Infinity, Infinity, Infinity)).toThrow();
});
