/** @private */
type Prev = [ number, ...(number | undefined)[] ];

export default interface NextFactory {
	(prev: Prev): number;
}
