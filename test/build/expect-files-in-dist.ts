import { resolve, join } from "path";
import { sync as find } from "glob";

export const distPath = resolve(__dirname, "../../dist");

export default function expectFilesInDist(glob: string, paths: string[]): void {
	const pathsResolved = paths.map((path) => resolve(distPath, path));
	const pathsExpected = expect.arrayContaining(pathsResolved);
	const pattern = join(distPath, glob);
	const pathsFound = find(pattern).map((path) => resolve(path));

	expect(pathsFound).toEqual(pathsExpected);
}
