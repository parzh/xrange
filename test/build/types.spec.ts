import type XRange from "../../dist/typings/xrange";
import type * as NextFactory from "../../dist/typings/next-factory";
// import type Predicate from "../../dist/typings/predicate"; // TODO:
// import type Memo from "../../dist/typings/memo"; // TODO:
// import type Prev from "../../dist/typings/prev"; // TODO:

import { assert } from "./helpers";

// If there's an error somewhere in types,
// this file shouldn't compile at all, and
// even break compilation of all the test
// scripts, which is fine and intended 👍

// Also, note double functions in test cases

afterEach(() => {
	// Since this file is a TypeScript-only test,
	// implementation assertions are not expected
	expect.assertions(0);
});

describe("[ts] XRange type", () => {
	it("should be a number generator", () => (range: XRange) => {
		assert.type<Generator<number>>(range[Symbol.iterator]());
		assert.type<IteratorResult<number, number>>(range.next());
		assert.type<IteratorResult<number, number>>(range.return(NaN));
		assert.type<IteratorResult<number, number>>(range.throw(null));
	});
});

describe("[ts] NextFactory type", () => {
	it("should take `memo` as parameter", () => (next: NextFactory.default) => {
		assert.params<[NextFactory.Memo]>(next);
	});

	it("should produce number", () => (next: NextFactory.default) => {
		assert.returns<number>(next);
	});
});
