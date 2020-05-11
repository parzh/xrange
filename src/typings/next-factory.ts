import type Memo from "./memo";

export default interface NextFactory {
	(memo: Memo): number;
}
