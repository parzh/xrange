import nanofs from "./nanofs";

/** @public `NaN`, `null`, and non-numeric values (including functions) */
const nans: unknown[] = [ ...nanofs, (() => {}) ];

export default nans;
