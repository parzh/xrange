import { build, expectFilesInDist, expectToBeMyBoi } from "./helpers";
import { entryPath } from "./entities";

beforeAll(build, 20000);

it("should create all the necessary files", () => {
	expectFilesInDist("**/*.js", [
		"index.js",
		"xrange.js",
	]);
});

it("should export fully functional entity", () => {
	expectToBeMyBoi(require(entryPath));
});
