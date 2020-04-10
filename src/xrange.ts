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

export default function xrange(stop: number): XRange;
export default function xrange(start: number, stop: number): XRange;
export default function xrange(bound1: number, bound2: number, step: number): XRange;
export default function xrange(start: number, predicate: Predicate, next: NextFactory): XRange;

export default function* xrange(first: number, second?: number | Predicate, third?: number | NextFactory): XRange {
	throw new Error("Not yet implemented"); // TODO: implement
}
