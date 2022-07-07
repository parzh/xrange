import { resolve, join } from "path";
import { sync } from "glob";

export const distPath = resolve(__dirname, "../../dist");

export default function expectFilesInDist(glob: string, paths: string[]): void {
	const actual = sync(join(distPath, glob)).map((path) => resolve(path));
	const expected = paths.map((path) => resolve(distPath, path));

	expect(actual).toEqual(expect.arrayContaining(expected));
}
