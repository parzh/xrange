import type XRange from "./typings/xrange";
import type Predicate from "./typings/predicate";
import type NextFactory from "./typings/next-factory";

/** @internal */
declare function xrangeLooplike(start: number, predicate: Predicate, next: NextFactory): XRange; // TODO: export default
