import xrange from "../src";
import errors from "../src/errors";
import { nans, REASONABLY_LARGE_NUMBER } from "./entities";

describe("xrange(start, stop)", () => {
	it("should iterate upwards if `start` is less than `stop`", () => {
		expect(Array.from(xrange(-2, 7))).toEqual([ -2, -1, 0, 1, 2, 3, 4, 5, 6 ]);
	});

	it("should iterate downwards if `start` is greater than `stop`", () => {
		expect(Array.from(xrange(7, -2))).toEqual([ 7, 6, 5, 4, 3, 2, 1, 0, -1 ]);
	});

	it("should iterate upwards from `start` to positive non-integer `stop`", () => {
		expect(Array.from(xrange(1.2, 3.4))).toEqual([ 1.2, 2.2, 3.2 ]);
	});

	it("should iterate downwards from `start` to negative non-integer `stop`", () => {
		expect(Array.from(xrange(4.3, 2.1))).toEqual([ 4.3, 3.3, 2.3 ]);
	});

	it("should iterate upwards from `start` indefinitely if `stop` is positive infinity", () => {
		const range = xrange(3, Infinity);
		let last = range.next();

		expect(last.value).toBe(3);

		while ((last = range.next()).value < REASONABLY_LARGE_NUMBER); // do nothing

		expect(last.value).toEqual(REASONABLY_LARGE_NUMBER);
		expect(last.done).toEqual(false);
	});

	it("should iterate downwards from `start` indefinitely if `stop` is negative infinity", () => {
		const range = xrange(3, -Infinity);
		let last = range.next();

		expect(last.value).toBe(3);

		while ((last = range.next()).value > -REASONABLY_LARGE_NUMBER); // do nothing

		expect(last.value).toEqual(-REASONABLY_LARGE_NUMBER);
		expect(last.done).toEqual(false);
	});

	it("should not iterate if `start` equals to `stop`", () => {
		let value = 0;

		for (const _ of xrange(5, 5))
			++value;

		for (const _ of xrange(+0, -0))
			++value;

		expect(value).toBe(0);
	});

	it("should fail if `start` is infinite", () => {
		for (const inf of [ Infinity, -Infinity ])
			expect(() => xrange(inf, 5)).toThrowError(errors["XRANGE:2:STRINF"]);
	});

	it("should fail is `start` is `null`, `NaN`, or a non-numeric value", () => {
		for (const nan of nans)
			expect(() => xrange(
				// @ts-ignore
				nan,
				5,
			)).toThrowError(errors["XRANGE:2:STRNAN"]);
	});

	it("should fail is `stop` is `null`, `NaN`, or a non-numeric value", () => {
		for (const nan of nans)
			expect(() => xrange(
				0,
				// @ts-ignore
				nan,
			)).toThrowError(errors["XRANGE:2:STPNAN"]);
	});
});
