import { createError } from "./errors";

/** @private */
type XRange = Generator<number, void>;

/** @private */
interface Predicate {
	(next: number, prev: number[]): boolean;
}

/** @private */
interface Prev extends Partial<number[]> {
	0: number;
}

/** @private */
interface NextFactory {
	(prev: Prev): number;
}

/** @private */
declare function _xrangeNumeric(bound1: number, bound2: number, step: number): XRange;

/** @private */
declare function _xrangeLooplike(start: number, predicate: Predicate, next: NextFactory): XRange;

export default function xrange(stop: number): XRange;
export default function xrange(start: number, stop: number): XRange;
export default function xrange(bound1: number, bound2: number, step: number): XRange;
export default function xrange(start: number, predicate: Predicate, next: NextFactory): XRange;

export default function xrange(first: number, second?: number | Predicate, third?: number | NextFactory): XRange {
	if (arguments.length === 0)
		throw createError("XRANGE:0:ARGREQ");

	return _xrangeNumeric(0, 2, 1); // FIXME: virtual entity
}
