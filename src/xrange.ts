import type XRange from "./typings/xrange";
import type Predicate from "./typings/predicate";
import type NextFactory from "./typings/next-factory";

import { createError } from "./errors";
import isNumeric from "./is-numeric.impl";
import xrangeNumeric from "./xrange-numeric.impl";

export default function xrange(stop: number): XRange;
export default function xrange(start: number, stop: number): XRange;
export default function xrange(bound1: number, bound2: number, step: number): XRange;
export default function xrange(start: number, predicate: Predicate, next: NextFactory): XRange;

export default function xrange(first: number, second?: number | Predicate, third?: number | NextFactory): XRange {
	if (arguments.length === 0)
		throw createError("XRANGE:0:ARGREQ");

	if (arguments.length === 1)
		if (!isNumeric(first))
			throw createError("XRANGE:1:ARGNAN");

		else
			return xrangeNumeric(0, first, Math.sign(first) || 1);

	if (arguments.length === 2)
		if (!isNumeric(first))
			throw createError("XRANGE:2:STRNAN");

		else if (!isNumeric(second))
			throw createError("XRANGE:2:STPNAN");

		else if (!isFinite(first))
			throw createError("XRANGE:2:STRINF");

		else
			return xrangeNumeric(first, second, first <= second ? 1 : -1);

	if (arguments.length === 3)
		if (!isNumeric(first))
			throw createError("XRANGE:3:BD1NAN");

		else if (!isNumeric(second))
			if (typeof second !== "function")
				throw createError("XRANGE:3:BD2NNF");

			else
				throw createError("XRANGE:_:NOIMPL"); // TODO: looplike implementation

		else if (!isNumeric(third))
			throw createError("XRANGE:3:STENAN");

		else if (!isFinite(third))
			throw createError("XRANGE:3:STEINF");

		else if (third === 0)
			throw createError("XRANGE:3:STEZER");

		else {
			const isUp = third > 0;
			const isSorted = first <= second;
			const isDirect = isUp === isSorted;

			const [ start, stop ] = isDirect ? [ first, second ] : [ second, first ];

			if (!isFinite(start))
				throw createError(isDirect ? "XRANGE:3:BD1INF" : "XRANGE:3:BD2INF");

			return xrangeNumeric(start, stop, third);
		}

	throw createError("XRANGE:_:UNKUSG");
}
