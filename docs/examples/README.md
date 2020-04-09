```ts
/** `NaN` and anything other than a number */
declare const nan: unknown;

/** `NaN` and anything other than a number or a function */
declare const nanof: unknown;
```

```ts
xrange();
// Error: [XRANGE:0:ARGREQ] argument is required
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
```

```ts
xrange(4.2);
// 0, 1, 2, 3, 4
```

```ts
xrange(-4.2);
// 0, -1, -2, -3, -4
```

```ts
xrange(Infinity);
// 0, 1, 2, 3, 4 …
// (never ends)
```

```ts
xrange(-Infinity);
// 0, -1, -2, -3 …
// (never ends)
```

```ts
xrange(null);
xrange(nan);
// Error: [XRANGE:1:ARGNAN] argument is not a number
```

```ts
xrange(null, 5);
xrange(nan, 5);
xrange(null, null);
xrange(nan, nan);
xrange(nan, null);
xrange(null, nan);
// Error: [XRANGE:2:STRNAN] argument `start` is not a number
```

```ts
xrange(0, null);
xrange(0, nan);
// Error: [XRANGE:2:STPNAN] argument `stop` is not a number
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
```

```ts
xrange(5, 3);
// 5, 4
```

```ts
xrange(5, -3);
// 5, 4, 3, 2, 1, 0, -1, -2
```

```ts
xrange(-3, -Infinity);
// -3, -4, -5, -6, …
// (never ends)
```

```ts
xrange(Infinity, 5);
xrange(-Infinity, Infinity);
xrange(Infinity, Infinity);
xrange(-Infinity, -Infinity);
// RangeError: [XRANGE:2:STRINF] argument `start` must be finite
```

```ts
xrange(null, 5, 1);
xrange(nan, 5, 1);
// Error: [XRANGE:3:BD1NAN] argument `bound1` is not a number
```

```ts
xrange(0, null, 1);
xrange(0, nanof, 1);
// Error: [XRANGE:3:BD2NNF] argument `bound2` is neither a number, nor a function
```

```ts
xrange(0, 5, null);
xrange(0, 5, nan);
// Error: [XRANGE:3:STENAN] argument `step` is not a number
```

```ts
xrange(0, 5, 1);
xrange(5, 0, 1);
// 0, 1, 2, 3, 4
```

```ts
xrange(0, 5, -1);
xrange(5, 0, -1);
// 5, 4, 3, 2, 1
```

```ts
xrange(0, 1, .1);
xrange(1, 0, .1);
xrange(0, .95, .1);
xrange(0, .91, .1);
// 0, .1, .2, .3, .4, .5, .6, .7, .8, .9
```

```ts
xrange(0, 1, -.1);
xrange(1, 0, -.1);
xrange(0, 1.05, -.1);
xrange(0, 1.01, -.1);
// 1, .9, .8, .7, .6, .5, .4, .3, .2, .1
```

```ts
xrange(Infinity, 0, -1);
// RangeError: [XRANGE:3:BD1INF] range start (first argument) must be finite
// ...

xrange(0, Infinity, -1);
// RangeError: [XRANGE:3:BD2INF] range start (second argument) must be finite
```

```ts
xrange(0, Infinity, 1);
xrange(Infinity, 0, 1);
// 0, 1, 2, 3, 4, …
// (never ends)
```

```ts
xrange(0, 5, 0);
xrange(0, 0, 0);
xrange(0, Infinity, 0);
xrange(0, -Infinity, 0);
// RangeError: [XRANGE:3:STEZER] argument `step` cannot be zero
```

```ts
xrange(0, 5, Infinity);
xrange(0, 5, -Infinity);
// RangeError: [XRANGE:3:STEINF] argument `step` must be finite
```

```ts
xrange(0, () => true, 1);
// Error: [XRANGE:3:NXTNAF] argument `next` is not a function
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
xrange(0, (next) => next < 5, () => Infinity);
// 0
```

```ts
xrange(0, (next) => next > 5, () => Infinity);
// 0, Infinity, Infinity, …
```

```ts
xrange(0, () => true, (prev) => prev);
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
