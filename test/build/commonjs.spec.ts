import xrange from "../../dist";
import expectFilesInDist from "./expect-files-in-dist";
import expectToBeMyBoi from "./expect-to-be-my-boi";

it("should create all the necessary files", () => {
	expectFilesInDist("**/*.js", [
		"index.js",
		"xrange.js",
	]);
});

it("should export fully functional entity", () => {
	expectToBeMyBoi(xrange);
});
