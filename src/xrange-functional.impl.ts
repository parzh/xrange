import type XRange from "./typings/xrange";
import type Predicate from "./typings/predicate";
import type NextFactory from "./typings/next-factory";

import { createError } from "./errors";

/** @internal */
export default function xrangeFunctional(start: number, predicate: Predicate, next: NextFactory, maxPrevLength = Infinity): XRange {
	throw createError("XRANGE:_:NOIMPL");
}
