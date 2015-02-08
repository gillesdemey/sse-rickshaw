var app = require('express')();

var os = require('os');

var port = process.env.PORT || 3000;

app.use(require('morgan')('dev'));
app.use(require('express').static('public'));

app.get('/', function(req, res) {
  res.sendfile('public/index.html');
});

app.get('/stream', function(req, res) {
  res.type('text/event-stream');

  setInterval(function() {

    var data = {
      'memory': ((os.totalmem() - os.freemem()) / os.totalmem()) * 100,
      'cpuload': (os.loadavg()[0] / os.cpus().length) * 100,
    };

    res.status(200)
      .write('data: ' + JSON.stringify(data) + '\n\n');

  }, 25);

});

var server = app.listen(port, function() {
  var host = server.address().address;
  console.log('started SSE server on http://%s:%s', host, port);
});

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
