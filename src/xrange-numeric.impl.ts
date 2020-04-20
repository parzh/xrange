import type XRange from "./typings/xrange";

/** @internal */
export default function* xrangeNumeric(start: number, stop: number, step: number): XRange {
	const isUp = step > 0;

	for (
		let curr = start;
		isUp ? curr < stop : curr > stop;
		curr += step
	)
		yield curr;
}
