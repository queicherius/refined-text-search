<!-- Title -->
<h1 align="center">
  refined-text-search
</h1>

<!-- Description -->
<h4 align="center">
  Tokenize a search query with refined options (like Google's) and match against a target.
</h4>

<!-- Badges -->
<p align="center">
  <a href="https://www.npmjs.com/package/refined-text-search">
    <img
      src="https://img.shields.io/npm/v/refined-text-search?style=flat-square"
      alt="Package Version"
    />
  </a>

  <a href="https://github.com/queicherius/refined-text-search/actions?query=branch%3Amaster+workflow%3A%22Continuous+Integration%22">
    <img
      src="https://img.shields.io/github/workflow/status/queicherius/refined-text-search/Continuous%20Integration?style=flat-square"
      alt="Build Status"
    />
  </a>

  <a href="https://codecov.io/github/queicherius/refined-text-search">
    <img
      src="https://img.shields.io/codecov/c/github/queicherius/refined-text-search/master?style=flat-square"
      alt="Code Coverage"
    />
  </a>
</p>

<!-- Quicklinks -->
<p align="center">
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#contributors">Contributors</a> •
  <a href="#license">License</a>
</p>

<br>

## Installation

```bash
yarn add refined-text-search
```

## Usage

```ts
import { tokenize, match } from 'refined-text-search'

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

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.david-reess.de"><img src="https://avatars3.githubusercontent.com/u/4615516?v=4?s=75" width="75px;" alt=""/><br /><sub><b>David Reeß</b></sub></a><br /><a href="https://github.com/queicherius/refined-text-search/commits?author=queicherius" title="Code">💻</a> <a href="https://github.com/queicherius/refined-text-search/commits?author=queicherius" title="Documentation">📖</a> <a href="https://github.com/queicherius/refined-text-search/commits?author=queicherius" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!

## License

MIT
