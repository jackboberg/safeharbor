# safeharbor

[![version](https://img.shields.io/npm/v/safeharbor.svg?style=flat-square)][version]
[![build](https://img.shields.io/travis/jackboberg/safeharbor.svg?style=flat-square)][build]
[![coverage](https://img.shields.io/codeclimate/coverage/github/jackboberg/safeharbor.svg?style=flat-square)][coverage]
[![code climate](https://img.shields.io/codeclimate/github/jackboberg/safeharbor.svg?style=flat-square)][climate]
[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)][license]

Find available port on host machine

## Install

```
npm install safeharbor
```

## Usage

Check if port is available

```
const Safeharbor = require('safeharbor')

Safeharbor(8080, function (err, port) {
  // port is `8080` if the port is available
})

```

Find first available port in range

```
const Safeharbor = require('safeharbor')

Safeharbor(8080, 8089, function (err, port) {
  // port is `8081` if the port is available
  // `undefined` if no ports available
})

```

[version]: https://www.npmjs.com/package/safeharbor
[build]: https://travis-ci.org/jackboberg/safeharbor
[coverage]: https://codeclimate.com/github/jackboberg/safeharbor/coverage
[climate]: https://codeclimate.com/github/jackboberg/safeharbor/code
[license]: https://raw.githubusercontent.com/jackboberg/safeharbor/master/LICENSE

