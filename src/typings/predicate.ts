/** @deprecated */
export type Memo = (number | undefined)[];

/** @deprecated Use `Predicate` from `@xrange/func` */
export default interface Predicate {
	(next: number, memo: Readonly<Memo>): boolean;
}
