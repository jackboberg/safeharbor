const Code = require('code')
const Lab = require('lab')
const Sinon = require('sinon')
const Proxyquire = require('proxyquire')

var lab = exports.lab = Lab.script()

var describe = lab.describe
var it = lab.it
var beforeEach = lab.beforeEach
var afterEach = lab.afterEach
var expect = Code.expect

var available = Sinon.stub()
var inRange = Sinon.stub()

const Safeharbor = Proxyquire('../', {
  './lib/available': available,
  './lib/in-range': inRange
})

describe('usage', function () {
  afterEach(function (done) {
    available.reset()
    inRange.reset()
    done()
  })

  describe('when passed an available port', function () {
    beforeEach(function (done) {
      available.yields(null, true)
      done()
    })

    it('returns the port', function (done) {
      Safeharbor(8080, function (err, port) {
        expect(err).to.not.exist()
        expect(port).to.equal(8080)
        done()
      })
    })
  })

  describe('when passed an unavailable port', function () {
    beforeEach(function (done) {
      available.yields(null, false)
      done()
    })

    it('returns nothing', function (done) {
      Safeharbor(8080, function (err, port) {
        expect(err).to.not.exist()
        expect(port).to.not.exist()
        done()
      })
    })
  })

  describe('when passed a min and max port', function () {
    describe('when a port is available in range', function () {
      beforeEach(function (done) {
        inRange.withArgs(8080, 8089).yields(null, 8081)
        done()
      })

      afterEach(function (done) {
        inRange.withArgs(8080, 8089).yields(null, null)
        done()
      })

      it('returns the first available port', function (done) {
        Safeharbor(8080, 8089, function (err, port) {
          expect(err).to.not.exist()
          expect(port).to.equal(8081)
          done()
        })
      })
    })

    describe('when no ports available in range', function () {
      beforeEach(function (done) {
        inRange.yields()
        done()
      })

      it('yields nothing', function (done) {
        Safeharbor(8080, 8089, function (err, port) {
          expect(err).to.not.exist()
          expect(port).to.not.exist()
          done()
        })
      })
    })
  })
})
