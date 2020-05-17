import isNumeric from "./is-numeric.impl.ts";

/** @private */
const MAX_VALID_LENGTH = 2 ** 32 - 1;

export default function isLength(value: unknown): value is number {
	return isNumeric(value) && Number.isInteger(value) && value >= 0 && value <= MAX_VALID_LENGTH;
}
