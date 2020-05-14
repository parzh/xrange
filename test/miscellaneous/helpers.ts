export declare namespace assert {
	function type<Value = never>(arg: Value): void;
	function returns<Value = never>(arg: (...args: any[]) => Value): void;
	function params<Values extends any[] = []>(arg: (...args: Values) => void): void;
}
