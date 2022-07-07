export default function expectToBeMyBoi(xrange: typeof import("../../src")): void {
	expect(typeof xrange).toBe("function");

	expect([ ...xrange(5) ]).toStrictEqual([ 0, 1, 2, 3, 4 ]);
	expect([ ...xrange(-5) ]).toStrictEqual([ 0, -1, -2, -3, -4 ]);

	expect([ ...xrange(2, 6) ]).toStrictEqual([ 2, 3, 4, 5 ]);
	expect([ ...xrange(6, 2) ]).toStrictEqual([ 6, 5, 4, 3 ]);

	expect([ ...xrange(17, 42, 5) ]).toStrictEqual([ 17, 22, 27, 32, 37 ]);
	expect([ ...xrange(42, 17, 5) ]).toStrictEqual([ 17, 22, 27, 32, 37 ]);

	expect([
		...xrange(0, (next) => next < 5, ([ last ]) => last + 1),
	]).toStrictEqual([
		0, 1, 2, 3, 4,
	]);

	expect(() => xrange(Infinity, Infinity, Infinity)).toThrow();
}
