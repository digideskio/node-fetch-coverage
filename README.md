# fetch-coverage

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

[npm-url]:https://npmjs.org/package/fetch-coverage
[downloads-image]:http://img.shields.io/npm/dm/fetch-coverage.svg
[npm-image]:http://img.shields.io/npm/v/fetch-coverage.svg
[travis-url]:https://travis-ci.org/IndigoUnited/node-fetch-coverage
[travis-image]:http://img.shields.io/travis/IndigoUnited/node-fetch-coverage/master.svg
[coveralls-url]:https://coveralls.io/r/IndigoUnited/node-fetch-coverage
[coveralls-image]:https://img.shields.io/coveralls/IndigoUnited/node-fetch-coverage/master.svg
[david-dm-url]:https://david-dm.org/IndigoUnited/node-fetch-coverage
[david-dm-image]:https://img.shields.io/david/IndigoUnited/node-fetch-coverage.svg
[david-dm-dev-url]:https://david-dm.org/IndigoUnited/node-fetch-coverage#info=devDependencies
[david-dm-dev-image]:https://img.shields.io/david/dev/IndigoUnited/node-fetch-coverage.svg

Fetch the coverage % from an open-source node repository, using a variety of common coverage services.

Currently supports GitHub, Bitbucket and Gitlab repositories and checks against [Coveralls](https://coveralls.io/), [Code Climate](https://codeclimate.com/), [Scrutinizer](https://scrutinizer-ci.com/) and [Codecov](https://codecov.io/).


## Installation

`$ npm install fetch-coverage`


## Usage

`fetchCoverage(repositoryUrl, options) -> Promise`

```js
const fetchCoverage = require('fetch-coverage');

fetchCoverage('git@github.com:IndigoUnited/node-planify')
.then((coverage) => console.log('Coverage', coverage));  // Coverage between 0 and 1
```

The `repositoryUrl` is any valid cloneable URL.

Available options:

- `branch`: The target branch (only supported in some services)
- `services`: The services to fetch from, defaults to all services
- `got`: Custom options to be passed to [got](https://github.com/sindresorhus/got), defaults to `{ timeout: 15000 }`
- `badges`: The badges information gathered by [detect-readme-badges](https://github.com/IndigoUnited/node-detect-readme-badges) which might speed up the coverage fetching


## Tests

`$ npm test`   
`$ npm test-cov` to get coverage report


## License

Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
