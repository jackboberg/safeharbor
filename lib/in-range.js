const Available = require('./available')

module.exports = function inRange (min, max, done) {
  void (function next (port) {
    if (port > max) return done()

    Available(port, function (err, available) {
      if (err) return done(err)
      if (available) return done(null, port)

      next(port + 1)
    })
  })(min)
}
