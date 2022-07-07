/** @public `NaN`, `null`, and non-numeric values (except for functions) */
const nanofs: unknown[] = [ null, NaN, "text", "42", true, false, Symbol("non-numeric"), {} ];

export default nanofs;
