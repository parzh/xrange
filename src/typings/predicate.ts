/** @internal */
export type Prev = (number | undefined)[];

export default interface Predicate {
	(next: number, prev: Readonly<Prev>): boolean;
}
