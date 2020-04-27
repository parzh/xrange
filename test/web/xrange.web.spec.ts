/** 
 * @jest-environment jsdom
 */

it("should create global `xrange` object", async () => {
	expect(typeof xrange).toBe("function");
});
