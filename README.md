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

