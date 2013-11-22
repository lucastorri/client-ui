var https = require('https');
var fs = require('fs');

var mimeTypes = {
  "html": "text/html",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "png": "image/png",
  "js": "text/javascript",
  "css": "text/css",
  "config.json": "application/json"
};

var options = {
  key: fs.readFileSync('fakeapi/key.pem'),
  cert: fs.readFileSync('fakeapi/cert.pem')
};

https.createServer(options, function(req, res) {
  console.log(req.method, req.url);
  
  var resource = req.url.match(/\/(js|css|favicon.ico|template|config.json)/);
  if (resource) {
    console.log('build' + req.url);
    fs.readFile('build' + req.url, 'utf-8', function(err, data) {
      res.writeHead(200, {'Content-Type': mimeTypes[resource[1]]});
      res.end(data);
    });
  } else {
    fs.readFile('build/index.html', 'utf-8', function(err, data) {
      res.writeHead(200, {'Content-Type': mimeTypes.html });
      res.end(data);
    });
  }
  
}).listen(8080);

console.log('https://localhost:8080/');