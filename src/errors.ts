/** @private */
const _errors = {
	"XRANGE:_:NOIMPL": new Error("feature is not implemented"),
	"XRANGE:0:ARGREQ": new Error("argument is required"),
	"XRANGE:1:ARGNAN": new Error("argument is not a number"),
	"XRANGE:2:STPNAN": new Error("argument `stop` is not a number"),
	"XRANGE:2:STRINF": new RangeError("argument `start` must be finite"),
	"XRANGE:2:STRNAN": new Error("argument `start` is not a number"),
	"XRANGE:3:BD1INF": new RangeError("range start (first argument) must be finite"),
	"XRANGE:3:BD1NAN": new Error("argument `bound1` is not a number"),
	"XRANGE:3:BD2INF": new RangeError("range start (second argument) must be finite"),
	"XRANGE:3:BD2NNF": new Error("argument `bound2` is neither a number, nor a function"),
	"XRANGE:3:STEINF": new RangeError("argument `step` must be finite"),
	"XRANGE:3:STENAN": new Error("argument `step` is not a number"),
	"XRANGE:3:STEZER": new RangeError("argument `step` cannot be zero"),
	"XRANGE:3:NXTNAF": new Error("argument `next` is not a function"),
	"XRANGE:4:MPLNAN": new Error("argument `maxPrevLength` is not a number"),
} as const;

export type Errors = typeof _errors;

export type ErrorCode = keyof Errors;

/** @internal */
export function removeLastStackEntry(error: Error): void {
	if (error.stack == null)
		return;

	const lines = error.stack.split("\n");

	lines.splice(1, 1);
	error.stack = lines.join("\n");
}

/** @internal */
export function createError<Code extends ErrorCode>(code: Code, preserveStack?: "preserve-stack"): Errors[Code] {
	const { message, constructor } = _errors[code];
	const error: Errors[Code] = constructor(`[${ code }] ${ message }`);

	if (preserveStack !== "preserve-stack")
		removeLastStackEntry(error);

	return error;
}

/** @internal */
const errors = Object.create(null);

for (const code in _errors)
	errors[code] = createError(code as ErrorCode);

/** @internal */
export default errors as Errors;
