/** @deprecated */
export type Memo = [ number, ...(number | undefined)[] ];

/**
 * @deprecated Unused anywhere, left for backwards compatibility. Use `NextFactory` from `@xrange/func` instead
 * @example
 * import type { NextFactory } from "@xrange/func";
 */
export default interface NextFactory {
	(memo: Readonly<Memo>): number;
}
