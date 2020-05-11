export default interface Predicate {
	(next: number, memo: number[]): boolean;
}
