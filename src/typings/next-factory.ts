import type Prev from "./prev";

export default interface NextFactory {
	(prev?: Prev): number;
}
