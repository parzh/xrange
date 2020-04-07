export const REASONABLY_LARGE_NUMBER = 5245;

export const nanofs: unknown[] = [ null, NaN, "text", "42", {} ];
export const nans: unknown[] = [ ...nanofs, (() => {}) ];
