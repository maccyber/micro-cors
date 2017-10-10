import test from 'ava'
import listen from 'test-listen'

import microCors from '../src/index'
import micro from 'micro'
import axios from 'axios'

const methods = [
  'POST',
  'GET',
  'PUT',
  'PATCH',
  'DELETE',
  'OPTIONS'
]

test('adds default max age header', async t => {
  const cors = microCors()
  const router = micro(cors(() => ({})))
  const url = await listen(router)

  for (let method of methods) {
    const response = await axios.get(url, { method })

    const maxAgeHeader = response.headers['access-control-max-age']
    t.deepEqual(maxAgeHeader, '86400')
  }
})

test('adds configured max age header', async t => {
  const cors = microCors({ maxAge: 'foo' })
  const router = micro(cors(() => ({})))
  const url = await listen(router)

  for (let method of methods) {
    const response = await axios.get(url, { method })

    const maxAgeHeader = response.headers['access-control-max-age']
    t.deepEqual(maxAgeHeader, 'foo')
  }
})

test('adds default allow origin header', async t => {
  const cors = microCors()
  const router = micro(cors(() => ({})))
  const url = await listen(router)

  for (let method of methods) {
    const response = await axios.get(url, { method })

    const allowOriginHeader =
      response.headers['access-control-allow-origin']
    t.deepEqual(allowOriginHeader, '*')
  }
})

test('adds configured allow origin header', async t => {
  const cors = microCors({ origin: 'BAZ' })
  const router = micro(cors(() => ({})))
  const url = await listen(router)

  for (let method of methods) {
    const response = await axios.get(url, { method })
    const allowOriginHeader =
      response.headers['access-control-allow-origin']
    t.deepEqual(allowOriginHeader, 'BAZ')
  }
})

test('adds default allow methods header', async t => {
  const cors = microCors()
  const router = micro(cors(() => ({})))
  const url = await listen(router)

  for (let method of methods) {
    const response = await axios.get(url, { method })
    const allowMethodsHeader = response.headers['access-control-allow-methods']
    t.deepEqual(allowMethodsHeader, 'POST,GET,PUT,PATCH,DELETE,OPTIONS')
  }
})

test('adds configured allow methods header', async t => {
  const cors = microCors({ allowMethods: ['FOO'] })
  const router = micro(cors(() => ({})))
  const url = await listen(router)

  for (let method of methods) {
    const response = await axios.get(url, { method })
    const allowMethodsHeader = response.headers['access-control-allow-methods']
    t.deepEqual(allowMethodsHeader, 'FOO')
  }
})

test('adds default allow headers header', async t => {
  const cors = microCors()
  const router = micro(cors(() => ({})))
  const url = await listen(router)

  for (let method of methods) {
    const response = await axios.get(url, { method })
    const allowMethodsHeader = response.headers['access-control-allow-headers']
    t.deepEqual(
      allowMethodsHeader,
      'X-Requested-With,Access-Control-Allow-Origin,X-HTTP-Method-Override,Content-Type,Authorization,Accept'
    )
  }
})

test('adds configured allow headers header', async t => {
  const cors = microCors({ allowHeaders: ['BAR'] })
  const router = micro(cors(() => ({})))
  const url = await listen(router)

  for (let method of methods) {
    const response = await axios.get(url, { method })
    const allowMethodsHeader = response.headers['access-control-allow-headers']
    t.deepEqual(
      allowMethodsHeader,
      'BAR'
    )
  }
})

test('allows configured expose headers header', async t => {
  const cors = microCors({ exposeHeaders: ['BAR'] })
  const router = micro(cors(() => ({})))
  const url = await listen(router)

  for (let method of methods) {
    const response = await axios.get(url, { method })
    const exposeMethodsHeader = response.headers['access-control-expose-headers']
    t.deepEqual(
      exposeMethodsHeader,
      'BAR'
    )
  }
})

test('adds allow credentials header', async t => {
  const cors = microCors()
  const router = micro(cors(() => ({})))
  const url = await listen(router)

  for (let method of methods) {
    const response = await axios.get(url, { method })
    const allowCredentialsHeader =
      response.headers['access-control-allow-credentials']
    t.deepEqual(allowCredentialsHeader, 'true')
  }
})

test('responds to OPTIONS requests', async t => {
  const cors = microCors()
  const router = micro(cors(() => ({})))
  const url = await listen(router)
  const method = 'OPTIONS'
  const response = await axios.get(url, { method })
  t.deepEqual(200, response.status)
  t.deepEqual({}, response.data)
})
