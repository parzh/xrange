export namespace assert {
	export const ee: unknown = null;

	export declare function type<Value = never>(arg: Value): void;
	export declare function returns<Value = never>(arg: (...args: any[]) => Value): void;
	export declare function params<Values extends any[] = []>(arg: (...args: Values) => void): void;
}

// Provides a fix for Jest runtime, which requires
// callback to return either Promise, or undefined
export const t = <Assertees extends any[]>(test: (...assertees: Assertees) => void): jest.ProvidesCallback => () => {};
