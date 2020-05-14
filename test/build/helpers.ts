import { resolve, join } from "path";
import { existsSync } from "fs";
import { execSync } from "child_process";
import { sync } from "glob";
import { entryPath } from "./entities";

export function build(done: jest.DoneCallback): void {
	if (!existsSync(entryPath))
		execSync("npm run build", { timeout: 20000, stdio: "ignore" });

	done();
}

export function readGlob(...pathSegments: string[]): string[] {
	return sync(join(...pathSegments)).map((path) => resolve(path));
}

export function expectToBeMyBoi(xrange: typeof import("../../src")): void {
	expect(typeof xrange).toBe("function");

	expect([ ...xrange(5) ]).toStrictEqual([ 0, 1, 2, 3, 4 ]);
	expect([ ...xrange(-5) ]).toStrictEqual([ 0, -1, -2, -3, -4 ]);

	expect([ ...xrange(2, 6) ]).toStrictEqual([ 2, 3, 4, 5 ]);
	expect([ ...xrange(6, 2) ]).toStrictEqual([ 6, 5, 4, 3 ]);

	expect([ ...xrange(17, 42, 5) ]).toStrictEqual([ 17, 22, 27, 32, 37 ]);
	expect([ ...xrange(42, 17, 5) ]).toStrictEqual([ 17, 22, 27, 32, 37 ]);

	expect([
		...xrange(0, (next) => next < 5, ([ last ]) => last + 1),
	]).toStrictEqual([
		0, 1, 2, 3, 4,
	]);

	expect(() => xrange(Infinity, Infinity, Infinity)).toThrow();
}

export namespace assert {
	export const ee: unknown = null;

	export declare function type<Value = never>(arg: Value): void;
	export declare function returns<Value = never>(arg: (...args: any[]) => Value): void;
	export declare function params<Values extends any[] = []>(arg: (...args: Values) => void): void;
}

// Provides a fix for Jest runtime, which requires
// callback to return either Promise, or undefined
export const t = <Assertee, Rest extends any[]>(test: (assertee: Assertee, ...rest: Rest) => void): jest.ProvidesCallback => () => {};
