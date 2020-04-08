import xrange from "../src";
import { REASONABLY_LARGE_NUMBER } from "./entities";

describe("xrange(start, predicate, next)", () => {
	it("should fail if `next` is not a function", () => {
		expect(() => {
			// @ts-ignore
			xrange(0, () => true, 1);
		}).toThrowError("argument `next` is not a function"); // FIXME: extract to src/errors.ts
	});

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

		const range = xrange(0, (next) => next < 5, () => (obj as number));

		expect(Array.from(range)).toEqual([ 0, 1, 2, 3, 4 ]);
	});

	it("should pass array of the previous numbers in `next` function", () => {
		const prevs = [
			[0],
			[1, 0],
			[2, 1, 0],
			[3, 2, 1, 0],
			[4, 3, 2, 1, 0],
		];

		let iterations = 0;

		const range = xrange(0, (next) => next < 5, (prev) => {
			expect(prev).toEqual(prevs[iterations])

			return prev[0] + 1;
		});

		for (const number of range)
			expect(number).toEqual(iterations++); // 0, 1, 2, 3, 4
	});

	it("should pass the next number and array of the previous numbers to `predicate` before emitting it", () => {
		const prevs = [
			[],
			[0],
			[1, 0],
			[2, 1, 0],
			[3, 2, 1, 0],
			[4, 3, 2, 1, 0],
		];

		let iterations = 0;

		const range = xrange(0, (next, prev) => {
			expect(prev).toEqual(prevs[iterations]);
			expect(next).toEqual(iterations);

			return next < 5;
		}, ([ last ]) => last + 1);

		for (const number of range)
			expect(number).toEqual(iterations++); // 0, 1, 2, 3, 4
	});

	it("should iterate indefinitely if `predicate` always returns `true`", () => {
		const range = xrange(0, () => true, () => 1);
		let last: IteratorResult<number, void>;

		for (let iterations = 0; iterations < REASONABLY_LARGE_NUMBER; iterations++)
			last = range.next();

		expect(last!.done).toBe(false);
	});

	it("should not iterate if `predicate` always returns `false`", () => {
		let value = 0;

		for (const _ of xrange(0, () => false, () => 1))
			++value;

		expect(value).toBe(0);
	});
});
