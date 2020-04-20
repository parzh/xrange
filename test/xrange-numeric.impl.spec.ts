import xrange from "../src/xrange-numeric.impl";
import { REASONABLY_LARGE_NUMBER } from "./entities";
import { expectToBeCloseTo } from "./helpers";

it("should iterate from `start` up to `stop` given positive `step`", () => {
	expectToBeCloseTo(xrange(0, 5, 1), [ 0, 1, 2, 3, 4 ]);
	expectToBeCloseTo(xrange(0, 6, 2), [ 0, 2, 4 ]);
	expectToBeCloseTo(xrange(2, 7, 3), [ 2, 5 ]);
});

it("should iterate from `start` down to `stop` given negative `step`", () => {
	expectToBeCloseTo(xrange(5, 0, -1), [ 5, 4, 3, 2, 1 ]);
	expectToBeCloseTo(xrange(6, 0, -2), [ 6, 4, 2 ]);
	expectToBeCloseTo(xrange(7, 2, -3), [ 7, 4 ]);
});

// TODO: #16
test.skip("should iterate up given non-integer values", () => {
	expectToBeCloseTo(xrange(-5, -1.7, 3), [ -5, -2 ]);
	expectToBeCloseTo(xrange(0, 1, .1), [ 0, .1, .2, .3, .4, .5, .6, .7, .8, .9 ]);
});

// TODO: #16
test.skip("should iterate down given non-integer values", () => {
	expectToBeCloseTo(xrange(-1.7, -5, -3), [ -1.7, -4.7 ]);
	expectToBeCloseTo(xrange(1, 0, -.1), [ 1, .9, .8, .7, .6, .5, .4, .3, .2, .1 ]);
});

it("should iterate indefinitely from `start` up to positive infinity", () => {
	const range = xrange(42, Infinity, 1);
	let last = range.next();

	while (last.value < REASONABLY_LARGE_NUMBER)
		last = range.next();

	expect(last.value).toEqual(REASONABLY_LARGE_NUMBER);
	expect(last.done).toBe(false);
});

it("should iterate indefinitely from `start` down to negative infinity", () => {
	const range = xrange(-17, -Infinity, -1);
	let last = range.next();

	while (last.value > -REASONABLY_LARGE_NUMBER)
		last = range.next();

	expect(last.value).toEqual(-REASONABLY_LARGE_NUMBER);
	expect(last.done).toBe(false);
});

it("should not iterate `start` and `stop` are reversed, relative to `step`", () => {
	const list: number[] = [
		...xrange(2, 7, -1),
		...xrange(7, 2, 1),
	];

	expect(list).toHaveLength(0);
});

it("should not iterate when `start` and `stop` are equal", () => {
	const numbers = [ 5, -3, 1.7 ] as const;
	const zeroes = [ +0, -0 ] as const;
	const steps = [ +1, -1 ] as const;

	const list: number[] = [];

	for (const step of steps) {
		for (const number of numbers)
			list.push(...xrange(number, number, step));

		for (const start of zeroes)
			for (const stop of zeroes)
				list.push(...xrange(start, stop, step)); // computational complexity O(n^4), yay!
	}

	expect(list).toHaveLength(0);
});
