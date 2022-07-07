import tyte from "tyte";
import type XRange from "../../dist/typings/xrange";
import type * as NextFactory from "../../dist/typings/next-factory";
import type * as Predicate from "../../dist/typings/predicate";
import type Memo from "../../dist/typings/memo";
import type Prev from "../../dist/typings/prev";
import expectFilesInDist from "./expect-files-in-dist";

it("should create all the necessary files", () => {
	expectFilesInDist("**/*.d.ts", [
		"typings/memo.d.ts",
		"typings/next-factory.d.ts",
		"typings/predicate.d.ts",
		"typings/prev.d.ts",
		"typings/xrange.d.ts",
		"errors.d.ts",
		"index.d.ts",
		"xrange.d.ts",
	]);
});

describe("XRange type", () => {
	it("[ts] should be a number generator", tyte((range: XRange) => {
		tyte.expectType<Generator<number>>(range[Symbol.iterator]());
		tyte.expectType<IteratorResult<number, number>>(range.next());
		tyte.expectType<IteratorResult<number, number>>(range.return(NaN));
		tyte.expectType<IteratorResult<number, number>>(range.throw(null));
	}));
});

describe("NextFactory type", () => {
	it("[ts] should take `memo` as parameter", tyte((next: NextFactory.default) => {
		tyte.fn.expectParams<[NextFactory.Memo]>(next);
	}));

	it("[ts] should produce number", tyte((next: NextFactory.default) => {
		tyte.fn.expectReturns<number>(next);
	}));
});

describe("Predicate type", () => {
	it("[ts] should take `next` and `memo` as parameters", tyte((predicate: Predicate.default) => {
		tyte.fn.expectParams<[number, Predicate.Memo]>(predicate);
	}));

	it("[ts] should produce boolean", tyte((predicate: Predicate.default) => {
		tyte.fn.expectReturns<boolean>(predicate);
	}));
});

describe.each([
	[ "Memo", tyte.subject as Memo ],
	[ "Prev", tyte.subject as Prev ],
])("%s type (deprecated)", (name, memo) => {
	it("[ts] should be an array of numbers", tyte(() => {
		tyte.expectType<number[]>(memo);
	}));

	it("[ts] should have the first element strictly a number", tyte(() => {
		tyte.expectType<number>(memo[0]);
	}));

	it.todo("is deprecated");
});
