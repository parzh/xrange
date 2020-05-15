import xrangeNumeric = require("@xrange/core");

import type XRange from "./typings/xrange";
import type Predicate from "./typings/predicate";
import type NextFactory from "./typings/next-factory";

import { createError } from "./errors";
import isLength from "./is-length.impl";
import isNumeric from "./is-numeric.impl";
import xrangeFunctional from "./xrange-functional.impl";

export default function xrange(stop: number): XRange;
export default function xrange(start: number, stop: number): XRange;
export default function xrange(bound1: number, bound2: number, step: number): XRange;
export default function xrange(start: number, predicate: Predicate, next: NextFactory, maxMemo?: number): XRange;

export default function xrange(first: number, second?: number | Predicate, third?: number | NextFactory, fourth?: number): XRange {
	if (arguments.length === 0)
		throw createError("XRANGE:ARGREQ");

	// ***

	if (arguments.length === 1)
		if (!isNumeric(first))
			throw createError("XRANGE:ARGNAN");

		else
			return xrangeNumeric(0, first, Math.sign(first) || 1);

	// ***

	if (arguments.length === 2)
		if (!isNumeric(first))
			throw createError("XRANGE:STRNAN");

		else if (!isNumeric(second))
			throw createError("XRANGE:STPNAN");

		else if (!isFinite(first))
			throw createError("XRANGE:STRINF");

		else
			return xrangeNumeric(first, second, first <= second ? 1 : -1);

	// ***

	if (!isNumeric(first))
		throw createError("XRANGE:BD1NAN");

	else if (!isNumeric(second))
		if (typeof second !== "function")
			throw createError("XRANGE:BD2NNF");

		else if (typeof third !== "function")
			throw createError("XRANGE:NXTNAF");

		else if (arguments.length >= 4 && !isLength(fourth))
			throw createError("XRANGE:MMMINV");

		else
			return xrangeFunctional(first, second, third, fourth);

	else if (!isNumeric(third))
		throw createError("XRANGE:STENAN");

	else if (!isFinite(third))
		throw createError("XRANGE:STEINF");

	else if (third === 0)
		throw createError("XRANGE:STEZER");

	else {
		const isUp = third > 0;
		const isSorted = first <= second;
		const isDirect = isUp === isSorted;

		const [ start, stop ] = isDirect ? [ first, second ] : [ second, first ];

		if (!isFinite(start))
			throw createError(isDirect ? "XRANGE:BD1INF" : "XRANGE:BD2INF");

		return xrangeNumeric(start, stop, third);
	}
}
