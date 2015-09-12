# safeharbor

find available port on host machine

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
  // `undefined` if no ports availble
})

```

