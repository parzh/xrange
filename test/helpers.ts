import type XRange from "../src/typings/xrange";

export function expectToBeCloseTo(range: XRange, expected: readonly number[]): void {
	let count = 0;

	for (const number of range)
		expect(number).toBeCloseTo(expected[count++]);

	expect(count).toEqual(expected.length);
}

export function takeProbe(probeLength: number, range: XRange): readonly IteratorResult<number, number>[] {
	const probe: IteratorResult<number, number>[] = [];

	for (let i = 0; i < probeLength; i++)
		probe.push(range.next());

	return probe;
}
