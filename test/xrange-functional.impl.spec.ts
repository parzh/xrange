import type Predicate from "../src/typings/predicate";
import type NextFactory from "../src/typings/next-factory";

import xrange from "../src/xrange-functional.impl";
import { REASONABLY_LARGE_NUMBER } from "./entities";
import { expectCalls } from "./helpers";

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

it.todo("should generate `prev` if it is used in the `predicate`");

it.todo("should generate `prev` if it is used in the `next` function");

it("should allow optimizing length of `prev`", () => {
	const shouldGo: Predicate = jest.fn((next, _prev) => next < 9);
	const getNext: NextFactory = jest.fn((prev) => prev[0] + 1);

	for (const _ of xrange(6, shouldGo, getNext, 2)); // iterate through the range

	expectCalls(shouldGo, [
		[ 6, [] ],
		[ 7, [ 6 ] ],
		[ 8, [ 7, 6 ] ],
		[ 9, [ 8, 7 ] ],
	]);

	expectCalls(getNext, [
		[ [ 6 ] ],
		[ [ 7, 6 ] ],
		[ [ 8, 7 ] ],
	]);
});

it.todo("should not generate `prev` if it is unused");
