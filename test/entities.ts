export const REASONABLY_LARGE_NUMBER = 5245;

/** `NaN`, `null`, and non-numeric values (except for functions) */
export const nanofs: unknown[] = [ null, NaN, "text", "42", {} ];

/** `NaN`, `null`, and non-numeric values (including functions) */
export const nans: unknown[] = [ ...nanofs, (() => {}) ];
