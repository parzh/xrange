<p align="center">
  <a href="https://github.com/parzh/xrange/actions?query=workflow%3A%22Test+changes%22">
    <img alt="Test changes" src="https://github.com/parzh/xrange/workflows/Test%20changes/badge.svg" />
  </a>

  <a href="https://www.npmjs.com/package/xrange">
    <img alt="npm version" src="https://badge.fury.io/js/xrange.svg" />
  </a>

  <a href="https://www.npmjs.com/package/xrange">
    <img alt="npm size" src="https://img.shields.io/bundlephobia/min/xrange" />
  </a>

  <img alt="licence MIT" src="https://img.shields.io/npm/l/xrange" />
</p>

<p align="center">
  <a href="https://github.com/parzh/xrange">
    <img alt="github" src="https://img.shields.io/badge/GitHub-repository-444D56" />
  </a>

  <a href="https://www.npmjs.com/package/xrange">
    <img alt="npm" src="https://img.shields.io/badge/npm-package-cb3837" />
  </a>
</p>

<h1 align="center"><code>xrange</code></h1>
<h3 align="center">Python-esque iterator for number ranges</h3>

`xrange` is a function based on Python 3's [`range`](https://docs.python.org/3/library/stdtypes.html?highlight=range#ranges) class (or Python 2's [`xrange`](https://docs.python.org/2.7/library/functions.html#xrange) class). Like the one in Python, `xrange` creates virtual arrays (see [Iterators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)) which allows getting values lazily. This prevents over-the-top memory consumption when using large numbers, and opens the possibility to create never-ending, infinite lists.

<p align="center">
  <sub>
    Created with <a href="https://npmjs.org/package/create-package-typescript"><code>create-package-typescript</code></a>
  </sub>
</p>

### Examples:

> See more in [/docs/examples](https://github.com/parzh/xrange/tree/master/docs/examples)
