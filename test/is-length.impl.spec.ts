import isLength from "../src/is-length.impl";
import nans from "./nans";

/** @private */
const valid: number[] = [ 17, 42, 0, 5, 2 ** 32 - 1 ];

/** @private */
const invalid: number[] = [ -1, Infinity, -Infinity, 2 ** 32 ];

it("should return `true` if the argument can be used as array length", () => {
	for (const value of valid)
		expect(isLength(value)).toBe(true);
});

it("should return `false` if the argument is not a valid array length", () => {
	for (const value of [ ...invalid, ...nans ])
		expect(isLength(value)).toBe(false);
});
