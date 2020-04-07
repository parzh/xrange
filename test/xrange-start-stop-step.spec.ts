import xrange from "../src";

describe("xrange(start, stop, step)", () => {
	it.todo("should iterate upwards if `step` is positive");

	it.todo("should iterate downwards if `step` is negative");

	it.todo("should iterate in positive non-integer steps");

	it.todo("should iterate in negative non-integer steps");

	it.todo("should fail if `step` is zero");

	it.todo("should fail if `step` is infinite");

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
