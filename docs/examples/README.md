Note: there might be a difference in behavior between `xrange` and `range` class in Python 3.x. In this case, it is mentioned below the example.

```ts
/** `NaN` and anything other than a number */
declare const nan: unknown;

/** `NaN` and anything other than a number or a function */
declare const nanof: unknown;
```

```ts
xrange();
// Error: [XRANGE:ARGREQ] argument is required
```

```ts
xrange(0);
//
// (no iterations)
```

```ts
xrange(1);
// 0
```

```ts
xrange(5);
// 0, 1, 2, 3, 4
```

```ts
xrange(-5);
// 0, -1, -2, -3, -4
// in Python 3: no iterations
```

```ts
xrange(Infinity);
// 0, 1, 2, 3, 4 …
// (never ends)
// in Python 3: error
```

```ts
xrange(-Infinity);
// 0, -1, -2, -3 …
// (never ends)
// in Python 3: error
```

```ts
xrange(null);
xrange(nan);
// Error: [XRANGE:ARGNAN] argument is not a number
```

```ts
xrange(null, 5);
xrange(nan, 5);
xrange(null, null);
xrange(nan, nan);
xrange(nan, null);
xrange(null, nan);
// Error: [XRANGE:STRNAN] argument `start` is not a number
```

```ts
xrange(0, null);
xrange(0, nan);
// Error: [XRANGE:STPNAN] argument `stop` is not a number
```

```ts
xrange(0, 1);
// 0
```

```ts
xrange(0, 0);
//
// (no iterations)
```

```ts
xrange(3, 5);
// 3, 4
```

```ts
xrange(3, Infinity);
// 3, 4, 5, 6, 7, …
// (never ends)
// in Python 3: error
```

```ts
xrange(5, 3);
// 5, 4
// in Python 3: no iterations
```

```ts
xrange(5, -3);
// 5, 4, 3, 2, 1, 0, -1, -2
// in Python 3: no iterations
```

```ts
xrange(-3, -Infinity);
// -3, -4, -5, -6, …
// (never ends)
// in Python 3: error
```

```ts
xrange(Infinity, 5);
xrange(-Infinity, Infinity);
xrange(Infinity, Infinity);
xrange(-Infinity, -Infinity);
// RangeError: [XRANGE:STRINF] argument `start` must be finite
```

```ts
xrange(null, 5, 1);
xrange(nan, 5, 1);
// Error: [XRANGE:BD1NAN] argument `bound1` is not a number
```

```ts
xrange(0, null, 1);
xrange(0, nanof, 1);
// Error: [XRANGE:BD2NNF] argument `bound2` is neither a number, nor a function
```

```ts
xrange(0, 5, null);
xrange(0, 5, nan);
// Error: [XRANGE:STENAN] argument `step` is not a number
```

```ts
xrange(0, 5, 1);
xrange(5, 0, 1);
// 0, 1, 2, 3, 4
// in Python 3: range(0, 5, 1): <same>
// in Python 3: range(5, 0, 1): <no iterations>
```

```ts
xrange(0, 5, -1);
xrange(5, 0, -1);
// 5, 4, 3, 2, 1
// in Python 3: range(0, 5, -1): <no iterations>
// in Python 3: range(5, 0, -1): <same>
```

```ts
xrange(Infinity, 0, -1);
// RangeError: [XRANGE:BD1INF] range start (first argument) must be finite
```

```ts
xrange(0, Infinity, -1);
// RangeError: [XRANGE:BD2INF] range start (second argument) must be finite
```

```ts
xrange(0, Infinity, 1);
xrange(Infinity, 0, 1);
// 0, 1, 2, 3, 4, …
// (never ends)
// in Python 3: <all>: Error
```

```ts
xrange(0, 5, 0);
xrange(0, 0, 0);
xrange(0, Infinity, 0);
xrange(0, -Infinity, 0);
// RangeError: [XRANGE:STEZER] argument `step` cannot be zero
```

```ts
xrange(0, 5, Infinity);
xrange(0, 5, -Infinity);
// RangeError: [XRANGE:STEINF] argument `step` must be finite
```

```ts
xrange(1, () => true, ([ last, prelast = 0 ]) => last + prelast);
// 1, 1, 2, 3, 5, 8, 13, …
// (fibonacci numbers)
```

```ts
xrange(1, () => true, ([ last ]) => last ? 0 : 1);
// 1, 0, 1, 0, 1, 0, …
```

```ts
xrange(0, () => true, ([ last ]) => last ? 0 : 1);
// 0, 1, 0, 1, 0, 1, …
```

```ts
xrange(0, (next) => next < 5, ([ last ]) => last + 1);
xrange(0, (next) => next <= 4, ([ last ]) => last + 1);
// 0, 1, 2, 3, 4
// compare to: `for (let i = 0; i < 5; i++)`
```

```ts
xrange(0, (next) => next < 5, ([ last ]) => last - 1);
// 0, -1, -2, -3, …
// (never ends)
```

```ts
xrange(0, (next) => next > -5, ([ last ]) => last - 1);
// 0, -1, -2, -3, -4
```

```ts
xrange(0, () => true, 1);
// Error: [XRANGE:NXTNAF] argument `next` is not a function
```

```ts
xrange(0, () => true, () => 1);
// 0, 1, 1, 1, 1, …
```

```ts
xrange(0, () => false, () => 1);
//
// (no iterations)
```

```ts
const sum = (numbers) => numbers.reduce((sum, num) => sum + num, 0);

xrange(1, () => true, sum, 2);
// 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, …
// (fibonacci numbers)

xrange(1, () => true, sum, 5);
// 1, 1, 2, 4, 8, 16, 31, 61, 120, 236, …
// ("pentanacci" numbers)

xrange(1, () => true, sum, 0);
// 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, …
```

```ts
xrange(0, (next) => next < 5, () => Infinity);
// 0
```

```ts
xrange(0, (next) => next > 5, () => Infinity);
// 0, Infinity, Infinity, …
```

```ts
xrange(0, () => true, (memo) => memo);
// 0, 0, NaN, NaN, NaN, …
```

```ts
const obj = {
	value: 0,
	valueOf() {
		return ++this.value;
	},
};

xrange(0, () => true, () => obj);
// 0, 1, 2, 3, 4, …
```
