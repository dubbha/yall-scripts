# yall-scripts

[![npm](https://img.shields.io/npm/v/yall-scripts.svg)](https://npmjs.com/package/yall-scripts)

Run several npm scripts in parallel or in sequence forwarding the options in a [yarn](https://yarnpkg.com/)-friendly manner, using the `yall` CLI tool.

## Installation

```
$ yarn add yall-scripts --dev
```

## Usage

```js
$ yall [options] [tasks] [forward-options]

[tasks] - npm script names and matching patterns

Options:
  -s, --serial, --sequential, --sequence  // run tasks in sequence
  -p, --parallel                          // run tasks in parallel
  -v, --version                           // print version
  -h, --help                              // print help
```

Run tasks in sequence (default):
```js
$ yall clean lint test build
$ yall -s clean lint test build
$ yall --serial clean lint test build
$ yall --sequential clean lint test build
```

Run tasks in parallel:
```js
$ yall -p clean lint test build
$ yall --parallel clean lint test build
```

Run tasks using matching patterns:
```js
$ yall lint:*    // run lint:js, lint:css, lint:js:bin, lint:js:lib
$ yall lint:*:*  // run lint:js:bin, lin:js:lib
```

Forward options to each task:
```js
$ yall -p start:mockBackend start:devServer --watch
$ yall -p start:* --watch
$ yall --parallel lint:* --fix
```

Run the `yall`-based npm script forwarding the option in a yarn-friendly manner:
```js
// package.json
"scripts": {
  "lint:js": "eslint ./src",
  "lint:css": "stylelint ./src",
  "lint": "yall --parallel lint:*"
}

// console
$ yarn lint --fix
```

Note that we are using no extra `--` sequence here to forward the `--fix` option to each of the matching scripts. As a result we will see no annoying yarn warning you [could get used to](https://github.com/mysticatea/npm-run-all/issues/130) when using other tools:
```
warning From Yarn 1.0 onwards, scripts don't require "--" for options to be forwarded. In a future version, any explicit "--" will be forwarded as-is to the scripts.
```

You're also safe to use script names that collide with [yarn CLI commands](https://classic.yarnpkg.com/en/docs/cli/):
```js
// package.json
"scripts": {
  "audit": "yarn-audit-ci",
  "check": "eslint ./src",
  "test": "jest ./src",
  "all": "yall audit check test"
}

// console
$ yarn all
```
