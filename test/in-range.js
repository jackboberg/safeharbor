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

var available = Sinon.stub().yields()

const InRange = Proxyquire('../lib/in-range', {
  './available': available
})

describe('in-range', function () {
  afterEach(function (done) {
    available.reset()
    done()
  })

  describe('when the first port is available', function () {
    beforeEach(function (done) {
      available.yields(null, true)
      done()
    })

    it('yields the port', function (done) {
      InRange(9001, 9003, function (err, port) {
        expect(err).to.not.exist()
        expect(port).to.equal(9001)
        done()
      })
    })
  })

  describe('when some ports are not available', function () {
    beforeEach(function (done) {
      available.yields(null, false)
      available.onCall(1).yields(null, true)
      done()
    })

    it('tries incrementing the port', function (done) {
      InRange(9001, 9003, function (err, port) {
        expect(err).to.not.exist()
        expect(port).to.equal(9002)
        expect(available.callCount).to.equal(2)
        expect(available.calledWith(9003)).to.be.false()
        available.onCall(1).yields(null, false)
        done()
      })
    })
  })

  describe('when no ports are available', function () {
    beforeEach(function (done) {
      available.yields(null, false)
      done()
    })

    it('yields nothing', function (done) {
      InRange(9001, 9003, function (err, port) {
        expect(err).to.not.exist()
        expect(port).to.not.exist()
        done()
      })
    })
  })
})
