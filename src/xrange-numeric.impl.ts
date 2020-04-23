import type XRange from "./typings/xrange";

/** @internal */
export default function* xrangeNumeric(start: number, stop: number, step: number): XRange {
	const _stop = +stop;
	const _step = +step;
	const isUp = _step > 0;

	for (
		let curr = +start;
		isUp ? curr < _stop : curr > _stop;
		curr += _step
	)
		yield curr;
}
