import type XRange from "./typings/xrange";
import type Predicate from "./typings/predicate";
import type NextFactory from "./typings/next-factory";

import { createError } from "./errors";
import isNumeric from "./is-numeric";
import xrangeNumeric from "./xrange-numeric";

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

	throw new Error("Not yet implemented"); // TODO: implement
}
