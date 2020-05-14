import type XRange from "../../dist/typings/xrange";
import type * as NextFactory from "../../dist/typings/next-factory";
import type * as Predicate from "../../dist/typings/predicate";
// import type Memo from "../../dist/typings/memo"; // TODO:
// import type Prev from "../../dist/typings/prev"; // TODO:

import { assert, t } from "./helpers";

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
	it("should be a number generator", t((range: XRange) => {
		assert.type<Generator<number>>(range[Symbol.iterator]());
		assert.type<IteratorResult<number, number>>(range.next());
		assert.type<IteratorResult<number, number>>(range.return(NaN));
		assert.type<IteratorResult<number, number>>(range.throw(null));
	}));
});

describe("[ts] NextFactory type", () => {
	it("should take `memo` as parameter", t((next: NextFactory.default) => {
		assert.params<[NextFactory.Memo]>(next);
	}));

	it("should produce number", t((next: NextFactory.default) => {
		assert.returns<number>(next);
	}));
});

describe("[ts] Predicate type", () => {
	it("should take `next` and `memo` as parameters", t((predicate: Predicate.default) => {
		assert.params<[number, Predicate.Memo]>(predicate);
	}));

	it("should produce boolean", t((predicate: Predicate.default) => {
		assert.returns<boolean>(predicate);
	}));
});
