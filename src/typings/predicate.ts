/** @private */
type Prev = (number | undefined)[];

export default interface Predicate {
	(next: number, prev: Prev): boolean;
}
