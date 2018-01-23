# refined-text-search

[![Build Status](https://img.shields.io/travis/queicherius/refined-text-search.svg?style=flat-square)](https://travis-ci.org/queicherius/refined-text-search)
[![Coverage Status](https://img.shields.io/codecov/c/github/queicherius/refined-text-search/master.svg?style=flat-square)](https://codecov.io/github/queicherius/refined-text-search)

> Tokenize a search query with refined options (like Google's) and match against a target

## Install

```
npm install refined-text-search
```

This module can be used for Node.js as well as browsers using [Browserify](https://github.com/substack/browserify-handbook#how-node_modules-works).

## Usage

```js
import {tokenize, match} from 'refined-text-search'

// Tokenize a search query
const tokens = tokenize('"Hello World" my dear -"how are you" -horrible oh')
// -> [
//   {term: 'how are you', exclude: true},
//   {term: 'horrible', exclude: true},
//   {term: 'hello world'},
//   {term: 'my'},
//   {term: 'dear'},
//   {term: 'oh'}
// ]

// See if a tokenized query matches a string
const b = match(tokens, 'HeLLo World. My dear oh dear...')
// -> true

const b = match(tokens, 'HeLLo World.')
// -> false

const c = match(tokens, 'HeLLo World. My dear oh dear... What a horrible night.')
// -> false
```

## Tests

```
npm test
```

## Licence

MIT
