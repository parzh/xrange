import { resolve } from "path";
import { existsSync } from "fs";
import { execSync } from "child_process";

/** @private */
const entryPath = resolve(__dirname, "../../dist/index.js");

export function build(done: jest.DoneCallback): void {
	if (!existsSync(entryPath))
		execSync("npm run build", { timeout: 20000, stdio: "ignore" });

	done();
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
