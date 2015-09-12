const Events = require('events')
const Net = require('net')

const Code = require('code')
const Lab = require('lab')
const Sinon = require('sinon')

const Available = require('../lib/available')

var lab = exports.lab = Lab.script()

var describe = lab.describe
var it = lab.it
var beforeEach = lab.beforeEach
var afterEach = lab.afterEach
var expect = Code.expect

var server

beforeEach(function (done) {
  server = new Events.EventEmitter()
  server.close = function () {
    server.emit('close')
  }
  Sinon.stub(Net, 'createServer').returns(server)
  done()
})

afterEach(function (done) {
  Net.createServer.restore()
  done()
})

describe('available', function () {
  describe('when port is available', function () {
    beforeEach(function (done) {
      server.listen = function () {
        server.emit('listening')
      }
      done()
    })

    it('returns true', function (done) {
      Available('ignored', function (err, available) {
        expect(err).to.not.exist()
        expect(available).to.be.true()
        done()
      })
    })
  })

  describe('when port is not available', function () {
    beforeEach(function (done) {
      server.listen = function () {
        server.emit('error', { code: 'EADDRINUSE' })
      }
      done()
    })

    it('returns false', function (done) {
      Available('ignored', function (err, available) {
        expect(err).to.not.exist()
        expect(available).to.be.false()
        done()
      })
    })
  })

  describe('when server errors attempting to listen', function () {
    beforeEach(function (done) {
      server.listen = function () {
        server.emit('error', new Error('test'))
      }
      done()
    })

    it('returns the error and false', function (done) {
      Available('ignored', function (err, available) {
        expect(err).to.exist()
        expect(err.message).to.equal('test')
        expect(available).to.be.false()
        done()
      })
    })
  })
})
