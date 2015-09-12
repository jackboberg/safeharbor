const Net = require('net')

module.exports = function available (port, done) {
  var server = Net.createServer()

  server.once('error', function (err) {
    if (err.code !== 'EADDRINUSE') done(err, false)
    else done(null, false)
  })
  server.once('listening', function () {
    server.once('close', function () {
      done(null, true)
    })
    server.close()
  })
  server.listen(port)
}
