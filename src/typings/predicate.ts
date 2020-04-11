/** @internal */
export default interface Predicate {
	(next: number, prev: number[]): boolean;
}
