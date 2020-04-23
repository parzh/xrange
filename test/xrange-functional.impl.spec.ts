import type Predicate from "../src/typings/predicate";
import type NextFactory from "../src/typings/next-factory";

import xrange from "../src/xrange-functional.impl";
import { REASONABLY_LARGE_NUMBER } from "./entities";

it("should yield the value specified by the `next` function", () => {
	const range1 = xrange(0, (next) => next < 5, ([ last ]) => last + 1);
	const range2 = xrange(0, (next) => next > -5, ([ last ]) => last - 1);

	expect(Array.from(range1)).toEqual([ 0, 1, 2, 3, 4 ]);
	expect(Array.from(range2)).toEqual([ 0, -1, -2, -3, -4 ]);
});

it("should yield the same value if the `next` function returns a constant", () => {
	const limit = REASONABLY_LARGE_NUMBER / 4;
	const value = 42;
	const range = xrange(value, () => true, () => value);

	for (let iterations = 0; iterations < limit; iterations++)
		expect(range.next().value).toEqual(value);
});

it("should cast result of `next` to a number", () => {
	let value = 0;

	const obj = {
		valueOf() {
			return ++value;
		},
	};

	const range = xrange(value, (next) => next < 5, () => (obj as number));

	expect(Array.from(range)).toEqual([ 0, 1, 2, 3, 4 ]);
});

it("should iterate indefinitely if `predicate` always returns `true`", () => {
	const range = xrange(0, () => true, () => 1);
	let last = range.next();

	for (let iterations = 0; iterations < REASONABLY_LARGE_NUMBER; iterations++)
		last = range.next();

	expect(last.done).toBe(false);
});

it("should not iterate if `predicate` always returns `false`", () => {
	let value = 0;

	for (const _ of xrange(0, () => false, () => 1))
		++value;

	expect(value).toBe(0);
});

it("should fill `prev` if it is used in the `predicate`", () => {
	const start = 6;
	const stop = 9;

	const expectedPrevs = [
		[],
		[6],
		[7, 6],
		[8, 7, 6],
	] as const;

	let callCount = 0;

	const shouldGo: Predicate = (next, prev) => {
		expect(prev).toEqual(expectedPrevs[callCount++]);

		return next < stop;
	};

	// iterate through the range, and start assertions
	for (const _ of xrange(start, shouldGo, ([ last ]) => last + 1));
});

it.todo("should fill `prev` if it is used in the `next` function");

it("should allow optimizing length of `prev`", () => {
	const start = 6;
	const stop = 9;
	const maxPrevLength = 2;

	const expectedCalls = {
		shouldGo: [
			[ 6, [] ],
			[ 7, [ 6 ] ],
			[ 8, [ 7, 6 ] ],
			[ 9, [ 8, 7 ] ],
		],
		getNext: [
			[ [ 6 ] ],
			[ [ 7, 6 ] ],
			[ [ 8, 7 ] ],
		],
	} as const;

	let callCount = 0;

	const shouldGo: Predicate = (next, prev) => {
		const [ nextExpected, prevExpected ] = expectedCalls.shouldGo[callCount];

		expect(next).toEqual(nextExpected);
		expect(prev).toEqual(prevExpected);

		return next < stop;
	};

	const getNext: NextFactory = (prev) => {
		const [ prevExpected ] = expectedCalls.getNext[callCount];

		expect(prev).toEqual(prevExpected);

		callCount++;

		return prev[0] + 1;
	};

	// iterate through the range, and start assertions
	for (const _ of xrange(start, shouldGo, getNext, maxPrevLength));
});

it.todo("should not fill `prev` if it is unused");
