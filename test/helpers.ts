import type XRange from "../src/typings/xrange";

export function expectToBeCloseTo(range: XRange, expected: readonly number[]): void {
	let count = 0;

	for (const number of range)
		expect(number).toBeCloseTo(expected[count++]);

	expect(count).toEqual(expected.length);
}

export function expectCalls<Fn extends (...args: any[]) => any>(fn: Fn, calls: Parameters<Fn>[]): void {
	expect(fn).toHaveBeenCalledTimes(calls.length);

	for (const [ count, args ] of calls.entries())
		expect(fn).toHaveBeenNthCalledWith(count + 1, ...args);
}
