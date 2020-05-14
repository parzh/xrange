export type Memo = (number | undefined)[];

export default interface Predicate {
	(next: number, memo: Readonly<Memo>): boolean;
}
