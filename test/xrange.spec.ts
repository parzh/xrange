import xrange from "../src";
import errors from "../src/errors";

describe("xrange()", () => {
	it("should fail without arguments", () => {
		expect(() => {
			// @ts-ignore
			xrange();
		}).toThrowError(errors["XRANGE:0:ARGREQ"]);
	});
});
