/** 
 * @jest-environment jsdom
 */

import { loadBundle } from "./helpers";

jest.setTimeout(20000);

beforeAll(loadBundle);

it("should create global `xrange` object", async () => {
	expect(typeof xrange).toBe("function");
});
