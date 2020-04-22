import type Prev from "./prev";

export default interface Predicate {
	(next: number, prev: Partial<Prev>): boolean;
}
