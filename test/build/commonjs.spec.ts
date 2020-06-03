import xrange from "../../dist";

import { expectFilesInDist, expectToBeMyBoi } from "./helpers";

it("should create all the necessary files", () => {
	expectFilesInDist("**/*.js", [
		"index.js",
		"xrange.js",
	]);
});

it("should export fully functional entity", () => {
	expectToBeMyBoi(xrange);
});
