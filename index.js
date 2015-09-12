const Available = require('./lib/available')
const InRange = require('./lib/in-range')

module.exports = function (port, maxPort, done) {
  if (typeof maxPort === 'function') {
    done = maxPort
    maxPort = false
  }

  if (maxPort) return InRange(port, maxPort, done)

  Available(port, function (err, available) {
    if (err || !available) done(err)
    else done(null, port)
  })
}
