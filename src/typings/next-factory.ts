/** @internal */
export type Prev = [ number, ...(number | undefined)[] ];

export default interface NextFactory {
	(prev: Readonly<Prev>): number;
}
