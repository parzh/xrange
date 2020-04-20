import type { ErrorCode } from "../src/errors";
import errors, { createError, removeLastStackEntry } from "../src/errors";

/** @private */
const codes = Object.keys(errors) as ErrorCode[];

/** @private */
const codePattern = /^XRANGE:[_0-3]:[_0-9A-Z]{6}$/;

it("should export collection of errors", () => {
	expect(codes).toHaveLength(15);
});

it("should have error codes with the correct syntax", () => {
	for (const code of codes)
		expect(code).toMatch(codePattern);
});

/** @private */
function getStackLines(error: Error): string[] {
	return error.stack!.split("\n").slice(1);
}

describe("removeLastStackEntry(error)", () => {
	function inner() {
		return new Error();
	}

	function outer() {
		return inner();
	}

	it("should remove last stack entry, if `error.stack` exists", () => {
		const error = outer();

		expect(error.stack).toBeDefined();

		removeLastStackEntry(error);

		const [ last ] = getStackLines(error);

		expect(last).toMatch(/outer/);
	});

	it("should do nothing is `error.stack` doesn't exist", () => {
		const error = outer();

		delete error.stack;

		removeLastStackEntry(error);

		expect(error).not.toHaveProperty("stack");
	});
});

describe("createError(code, preserveStack?)", () => {
	it("should create errors by given error code", () => {
		expect(createError("XRANGE:_:UNKUSG").message).toMatch(/unknown usage encountered$/);
		expect(createError("XRANGE:_:NOIMPL").message).toMatch(/feature is not implemented$/);
		expect(createError("XRANGE:0:ARGREQ").message).toMatch(/argument is required$/);
		expect(createError("XRANGE:1:ARGNAN").message).toMatch(/argument is not a number$/);
		expect(createError("XRANGE:2:STPNAN").message).toMatch(/argument `stop` is not a number$/);
		expect(createError("XRANGE:2:STRINF").message).toMatch(/argument `start` must be finite$/);
		expect(createError("XRANGE:2:STRNAN").message).toMatch(/argument `start` is not a number$/);
		expect(createError("XRANGE:3:BD1INF").message).toMatch(/range start \(first argument\) must be finite$/);
		expect(createError("XRANGE:3:BD1NAN").message).toMatch(/argument `bound1` is not a number$/);
		expect(createError("XRANGE:3:BD2INF").message).toMatch(/range start \(second argument\) must be finite$/);
		expect(createError("XRANGE:3:BD2NNF").message).toMatch(/argument `bound2` is neither a number, nor a function$/);
		expect(createError("XRANGE:3:STEINF").message).toMatch(/argument `step` must be finite$/);
		expect(createError("XRANGE:3:STENAN").message).toMatch(/argument `step` is not a number$/);
		expect(createError("XRANGE:3:STEZER").message).toMatch(/argument `step` cannot be zero$/);
		expect(createError("XRANGE:3:NXTNAF").message).toMatch(/argument `next` is not a function$/);
	});

	it("should remove last stack entry by default", () => {
		function inner() {
			return createError("XRANGE:0:ARGREQ");
		}

		function outer() {
			return inner();
		}

		const [ last, prelast ] = getStackLines(outer());

		expect(last).toMatch(/inner/);
		expect(prelast).toMatch(/outer/);
	});

	it("should not remove last stack entry, if said explicitly", () => {
		function inner() {
			return createError("XRANGE:0:ARGREQ", "preserve-stack");
		}

		function outer() {
			return inner();
		}

		const [ last, prelast, thirdToLast ] = getStackLines(outer());

		expect(last).not.toMatch(/inner/);
		expect(prelast).toMatch(/inner/);
		expect(thirdToLast).toMatch(/outer/);
	});
});
