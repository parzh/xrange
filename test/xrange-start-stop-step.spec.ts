import xrange from "../src";

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

	it.todo("should fail if order is acsending and lower bound is positive infinity");
	// xrange(-Infinity, 0, 1);
	// xrange(0, -Infinity, 1);

	it.todo("should fail if order is descending and upper bound is negative infinity");
	// xrange(Infinity, 0, -1);
	// xrange(0, Infinity, -1);

	it.todo("should iterate upwards indefinitely if order is acsending and upper bound is positive infinity");
	// xrange(Infinity, 0, 1);
	// xrange(0, Infinity, 1);

	it.todo("should iterate downwards indefinitely if order is descending and lower bound is negative infinity");
	// xrange(-Infinity, 0, -1);
	// xrange(0, -Infinity, -1);

	it.todo("should fail if `bound1` is `null`, `NaN`, or a non-numeric value");

	it.todo("should fail if `bound2` is `null`, `NaN`, or a non-numeric value (except for a function)");

	it.todo("should fail if `step` is `null`, `NaN`, or a non-numeric value");
});
