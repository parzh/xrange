/** @deprecated */
export default interface Prev extends Partial<number[]> {
	0: number; // FIXME: looks weird, I know, but type [ number, ...number[] ] didn't work
}
