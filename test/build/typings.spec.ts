// @ts-ignore
import type XRange from "../../dist/typings/xrange";
// @ts-ignore
import type * as NextFactory from "../../dist/typings/next-factory";
// @ts-ignore
import type * as Predicate from "../../dist/typings/predicate";
// @ts-ignore
import type Memo from "../../dist/typings/memo";
// @ts-ignore
import type Prev from "../../dist/typings/prev";

import { assert, t } from "./helpers";

afterEach(() => {
	// Since this file is a TypeScript-only test,
	// implementation assertions are not expected
	expect.assertions(0);
});

describe("XRange type", () => {
	it("[ts] should be a number generator", t((range: XRange) => {
		assert.type<Generator<number>>(range[Symbol.iterator]());
		assert.type<IteratorResult<number, number>>(range.next());
		assert.type<IteratorResult<number, number>>(range.return(NaN));
		assert.type<IteratorResult<number, number>>(range.throw(null));
	}));
});

describe("NextFactory type", () => {
	it("[ts] should take `memo` as parameter", t((next: NextFactory.default) => {
		assert.params<[NextFactory.Memo]>(next);
	}));

	it("[ts] should produce number", t((next: NextFactory.default) => {
		assert.returns<number>(next);
	}));
});

describe("Predicate type", () => {
	it("[ts] should take `next` and `memo` as parameters", t((predicate: Predicate.default) => {
		assert.params<[number, Predicate.Memo]>(predicate);
	}));

	it("[ts] should produce boolean", t((predicate: Predicate.default) => {
		assert.returns<boolean>(predicate);
	}));
});

describe.each([
	[ "Memo", assert.ee as Memo ],
	[ "Prev", assert.ee as Prev ],
])("%s type (deprecated)", (name, memo) => {
	it("[ts] should be an array of numbers", t(() => {
		assert.type<number[]>(memo);
	}));

	it("[ts] should have the first element strictly a number", t(() => {
		assert.type<number>(memo[0]);
	}));

	it.todo("is deprecated");
});
