import type XRange from "./typings/xrange";
import type Predicate from "./typings/predicate";
import type NextFactory from "./typings/next-factory";

import { createError } from "./errors";

/** @private */
declare function _xrangeNumeric(bound1: number, bound2: number, step: number): XRange;

export default function xrange(stop: number): XRange;
export default function xrange(start: number, stop: number): XRange;
export default function xrange(bound1: number, bound2: number, step: number): XRange;
export default function xrange(start: number, predicate: Predicate, next: NextFactory): XRange;

export default function xrange(first: number, second?: number | Predicate, third?: number | NextFactory): XRange {
	if (arguments.length === 0)
		throw createError("XRANGE:0:ARGREQ");

	throw new Error("Not yet implemented"); // TODO: implement
}
