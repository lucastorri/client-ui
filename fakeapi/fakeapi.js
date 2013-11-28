var https = require('https');
var fs = require('fs');

var port = 8443;

var mimeTypes = {
  html: 'text/html',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  js: 'text/javascript',
  css: 'text/css'
};

var options = {
  key: fs.readFileSync('fakeapi/key.pem'),
  cert: fs.readFileSync('fakeapi/cert.pem')
};

https.createServer(options, function(req, res) {
  console.log(req.method, req.url);

  var routes = {
    '.*/user/self': function() {
      code(403);
    },
    '.*/login/noe': function() {
      code(200, 'noe');
    },
    '.*/login/external': function() {
      code(200, 'ext')
    }
  };

  var dfault = function() {
    code(404);
  };

  var matched = false;
  for (var r in routes) {
    if (req.url.match(r)) {
      matched = true;
      routes[r]();
      break;
    }
  }
  if (!matched) {
    dfault();
  }
  
  function code(c, body) {
    res.writeHead(c, { 'Access-Control-Allow-Origin': '*' });
    res.end(body);
  }
  
}).listen(port);

console.log('https://localhost:' + port + '/');
