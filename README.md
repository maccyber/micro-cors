[![Build Status](https://travis-ci.org/maccyber/micro-cors.svg?branch=master)](https://travis-ci.org/maccyber/micro-cors)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)


# CORS middleware for Micro

### Summary

Simple [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) middleware for Zeit's [Micro](https://github.com/zeit/micro)

### Install

```
npm i --save micro-cors
```

### Usage

Basic

```js
const cors = require('micro-cors')()
const handler = (req, res) => send(res, 200, 'ok!')

module.exports = cors(handler)
```

With options

```js
const microCors = require('micro-cors')
const cors = microCors({ allowMethods: ['PUT', 'POST'] })
const handler = (req, res) => send(res, 200, 'ok!')

module.exports = cors(handler)
```


With multiple wrappers

```js
const microCors = require('micro-cors')
const cors = require('micro-cors')()
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))

const handle = async(req, res) => {
  return `Hello world`
}

module.exports = compose(
    cors,
    anotherWrapper,
    analitycsWrapper,
    redirectWrapper,
    yetAnotherWrapper
)(handle)
```

#### Options

##### `allowMethods`

default: `['POST','GET','PUT','DELETE','OPTIONS']`

##### `allowHeaders`

default: `['X-Requested-With','Access-Control-Allow-Origin','X-HTTP-Method-Override','Content-Type','Authorization','Accept']`

##### `exposeHeaders`

default: `[]`

##### `maxAge`

default: `86400`

##### `origin`

default: `*`
