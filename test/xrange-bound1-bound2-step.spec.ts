import xrange from "../src";
import errors from "../src/errors";
import { REASONABLY_LARGE_NUMBER, nans, nanofs } from "./entities";

describe("xrange(bound1, bound2, step)", () => {
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
		expect(() => xrange(2, 7, +0)).toThrowError(errors["XRANGE:3:STEZER"]);
		expect(() => xrange(2, 7, -0)).toThrowError(errors["XRANGE:3:STEZER"]);
	});

	it("should fail if `step` is infinite", () => {
		expect(() => xrange(2, 7, Infinity)).toThrowError(errors["XRANGE:3:STEINF"]);
		expect(() => xrange(2, 7, -Infinity)).toThrowError(errors["XRANGE:3:STEINF"]);
	});

	it("should fail if order is acsending and lower bound is positive infinity", () => {
		expect(() => xrange(-Infinity, 2, 1)).toThrowError(errors["XRANGE:3:BD1INF"]);
		expect(() => xrange(2, -Infinity, 1)).toThrowError(errors["XRANGE:3:BD2INF"]);
	});

	it("should fail if order is descending and upper bound is negative infinity", () => {
		expect(() => xrange(Infinity, 2, -1)).toThrowError(errors["XRANGE:3:BD1INF"]);
		expect(() => xrange(2, Infinity, -1)).toThrowError(errors["XRANGE:3:BD2INF"]);
	});

	it("should iterate upwards indefinitely if order is acsending and upper bound is positive infinity", () => {
		const ranges = [
			xrange(2, Infinity, 1),
			xrange(Infinity, 2, 1),
		] as const;

		for (const range of ranges) {
			let last = range.next();

			expect(last.value).toBe(2);

			while (last.value < REASONABLY_LARGE_NUMBER)
				last = range.next();

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

			while (last.value > -REASONABLY_LARGE_NUMBER)
				last = range.next();

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
			)).toThrowError(errors["XRANGE:3:BD1NAN"]);
	});

	it("should fail if `bound2` is `null`, `NaN`, or a non-numeric value (except for a function)", () => {
		for (const nanof of nanofs)
			expect(() => xrange(
				2,
				// @ts-ignore
				nanof,
				1,
			)).toThrowError(errors["XRANGE:3:BD2NNF"]);
	});

	it("should fail if `step` is `null`, `NaN`, or a non-numeric value", () => {
		for (const nan of nans)
			expect(() => {
				// @ts-ignore
				xrange(2, 7, nan);
			}).toThrowError(errors["XRANGE:3:STENAN"]);
	});
});
