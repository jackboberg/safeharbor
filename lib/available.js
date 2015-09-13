const Net = require('net')

module.exports = function available (port, done) {
  var server = Net.createServer()

  function onError (err) {
    if (err.code !== 'EADDRINUSE') done(err, false)
    else done(null, false)
  }

  function onListening () {
    server.once('close', function () {
      done(null, true)
    })
    server.close()
  }

  server.once('error', onError)
  server.once('listening', onListening)
  server.listen(port)
}
