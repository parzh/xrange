import xrange from "../src";

describe("xrange()", () => {
	it("should fail without arguments", () => {
		expect(() => {
			// @ts-ignore
			xrange();
		}).toThrowError("argument is required");
	});
});
