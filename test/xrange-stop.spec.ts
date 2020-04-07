import xrange from "../src";
import { nans, REASONABLY_LARGE_NUMBER } from "./entities";

describe("xrange(stop)", () => {
	it("should iterate upwards from 0 to positive integer", () => {
		expect(Array.from(xrange(5))).toEqual([ 0, 1, 2, 3, 4 ]);
	});

	it("should iterate upwards from 0 to positive non-integer value", () => {
		expect(Array.from(xrange(4.2))).toEqual([ 0, 1, 2, 3, 4 ]);
	});

	it("should iterate downwards from 0 to negative integer", () => {
		expect(Array.from(xrange(-5))).toEqual([ 0, -1, -2, -3, -4 ]);
	});

	it("should iterate downwards from 0 to negative non-integer value", () => {
		expect(Array.from(xrange(-4.2))).toEqual([ 0, -1, -2, -3, -4 ]);
	});

	it("should not iterate when `stop` is zero", () => {
		let value = 0;

		for (const _ of xrange(+0))
			++value;

		for (const _ of xrange(-0))
			++value;

		expect(value).toBe(0);
	});

	it("should iterate upwards indefinitely from 0 to positive infinity", () => {
		const range = xrange(Infinity);
		let last: IteratorResult<number, void>;

		while ((last = range.next()).value < REASONABLY_LARGE_NUMBER); // do nothing

		expect(last.value).toEqual(REASONABLY_LARGE_NUMBER);
		expect(last.done).toBe(false);
	});

	it("should iterate downwards indefinitely from 0 to negative infinity", () => {
		const range = xrange(-Infinity);
		let last: IteratorResult<number, void>;

		while ((last = range.next()).value > -REASONABLY_LARGE_NUMBER); // do nothing

		expect(last.value).toEqual(-REASONABLY_LARGE_NUMBER);
		expect(last.done).toBe(false);
	});

	it("should fail when providing `null`, `NaN`, or a non-numeric value", () => {
		for (const nan of nans)
			expect(() => xrange(
				// @ts-ignore
				nan
			)).toThrowError("argument is not a number");
	});
});
