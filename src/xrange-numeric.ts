import type XRange from "./typings/xrange";

/** @internal */
export default function* xrangeNumeric(start: number, stop: number, step: number): XRange {
	for (
		let curr = start;
		stop > 0 ? curr < stop : curr > stop;
		curr += step
	)
		yield curr;
}
