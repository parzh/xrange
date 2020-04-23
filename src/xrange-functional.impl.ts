import type XRange from "./typings/xrange";
import type Predicate from "./typings/predicate";
import type NextFactory from "./typings/next-factory";
import type { Prev } from "./typings/next-factory";

/** @internal */
export default function* xrangeFunctional(start: number, predicate: Predicate, next: NextFactory, maxPrevLength = Infinity): XRange {
	const prevNeeded = maxPrevLength > 0 && (predicate.length >= 2 || next.length >= 1);

	const prev: number[] = [];

	let curr = +start;

	while (predicate(curr, prev)) {
		yield curr;

		if (prevNeeded) {
			prev.unshift(curr);

			if (prev.length > maxPrevLength)
				prev.pop();
		}

		curr = +next(prev as Prev);
	}
}
