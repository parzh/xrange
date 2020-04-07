import xrange from "../src";
import { REASONABLY_LARGE_NUMBER, nans, nanofs } from "./entities";

describe("xrange(start, stop, step)", () => {
	it("should iterate upwards if `step` is positive", () => {
		const expected = [ 2, 3, 4, 5, 6 ] as const;

		expect(Array.from(xrange(2, 7, 1))).toEqual(expected);
		expect(Array.from(xrange(7, 2, 1))).toEqual(expected);
	});

	it("should iterate downwards if `step` is negative", () => {
		const expected = [ 7, 6, 5, 4, 3 ] as const;

		expect(Array.from(xrange(2, 7, -1))).toEqual(expected);
		expect(Array.from(xrange(7, 2, -1))).toEqual(expected);
	});

	it("should iterate in positive non-integer steps", () => {
		const expected = [ 0, .1, .2, .3, .4, .5, .6, .7, .8, .9 ] as const;

		expect(Array.from(xrange(0, 1, .1))).toEqual(expected);
		expect(Array.from(xrange(1, 0, .1))).toEqual(expected);
	});

	it("should iterate in negative non-integer steps", () => {
		const expected = [ 1, .9, .8, .7, .6, .5, .4, .3, .2, .1 ] as const;

		expect(Array.from(xrange(0, 1, -.1))).toEqual(expected);
		expect(Array.from(xrange(1, 0, -.1))).toEqual(expected);
	});

	it("should fail if `step` is zero", () => {
		expect(() => xrange(2, 7, 0)).toThrowError(new RangeError("argument `step` cannot be zero"));
	});

	it("should fail if `step` is infinite", () => {
		const error = new RangeError("argument `step` must be finite");

		expect(() => xrange(2, 7, Infinity)).toThrowError(error);
		expect(() => xrange(2, 7, -Infinity)).toThrowError(error);
	});

	const errorFirstArg = new RangeError("range start (first argument) must be finite");
	const errorSecondArg = new RangeError("range start (second argument) must be finite");

	it("should fail if order is acsending and lower bound is positive infinity", () => {
		expect(() => xrange(-Infinity, 2, 1)).toThrowError(errorFirstArg);
		expect(() => xrange(2, -Infinity, 1)).toThrowError(errorSecondArg);
	});

	it("should fail if order is descending and upper bound is negative infinity", () => {
		expect(() => xrange(Infinity, 2, -1)).toThrowError(errorFirstArg);
		expect(() => xrange(2, Infinity, -1)).toThrowError(errorSecondArg);
	});

	it("should iterate upwards indefinitely if order is acsending and upper bound is positive infinity", () => {
		const ranges = [
			xrange(2, Infinity, 1),
			xrange(Infinity, 2, 1),
		] as const;

		for (const range of ranges) {
			let last = range.next();

			expect(last.value).toBe(2);

			while ((last = range.next()).value < REASONABLY_LARGE_NUMBER); // do nothing

			expect(last.value).toBe(REASONABLY_LARGE_NUMBER);
			expect(last.done).toBe(false);
		}
	});

	it("should iterate downwards indefinitely if order is descending and lower bound is negative infinity", () => {
		const ranges = [
			xrange(2, -Infinity, -1),
			xrange(-Infinity, 2, -1),
		] as const;

		for (const range of ranges) {
			let last = range.next();

			expect(last.value).toBe(2);

			while ((last = range.next()).value > -REASONABLY_LARGE_NUMBER); // do nothing

			expect(last.value).toBe(-REASONABLY_LARGE_NUMBER);
			expect(last.done).toBe(false);
		}
	});

	it("should fail if `bound1` is `null`, `NaN`, or a non-numeric value", () => {
		for (const nan of nans)
			expect(() => xrange(
				// @ts-ignore
				nan,
				7,
				1,
			)).toThrowError("argument `bound1` is not a number");
	});

	it("should fail if `bound2` is `null`, `NaN`, or a non-numeric value (except for a function)", () => {
		for (const nanof of nanofs)
			expect(() => xrange(
				2,
				// @ts-ignore
				nanof,
				1,
			)).toThrowError("argument `bound2` is neither a number, nor a function");
	});

	it("should fail if `step` is `null`, `NaN`, or a non-numeric value", () => {
		for (const nan of nans)
			expect(() => xrange(
				2,
				7,
				// @ts-ignore
				nan,
			)).toThrowError("argument `step` is not a number");
	});
});
