const Available = require('./lib/available')

module.exports = function (port, done) {
  Available(port, function (err, available) {
    if (err || !available) done(err)
    else done(null, port)
  })
}
