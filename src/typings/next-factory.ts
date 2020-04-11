import Prev from "./prev";

/** @internal */
export default interface NextFactory {
	(prev: Prev): number;
}
