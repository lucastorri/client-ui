var https = require('https');
var httpProxy = require('http-proxy');
var fs = require('fs');

var staticFilesFolder = '/Users/lucastorri/Vagrant/curator/code/curator-server/src/main/webapp/static/';

var mimeTypes = {
  "html": "text/html",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "png": "image/png",
  "js": "text/javascript",
  "css": "text/css"
};


var proxy = new httpProxy.HttpProxy({
  target: {
    host: 'stg.curator.places.lbs.maps.nokia.com',
    port: 443,
    https: true,
    rejectUnauthorized: false
  }
});

var place = {
  "name": {
    "name": "Tst place : " + new Date(),
    "language": "en"
  },
  "categories": [
    {
      "id": "400-4300-0201",
      "name": "Parking Only",
      "system": "navteq-lcms",
      "isPrimary": true
    }
  ],
  "additionalContacts": [],
  "alternativeNames": [],
  "position": {
    "latitude": parseFloat('52.' + (function() { var r = Math.random().toString(); return r.substring(r.length - 6) })()),
    "longitude": parseFloat('13.' + (function() { var r = Math.random().toString(); return r.substring(r.length - 6) })())
  },
  "address": {
    "house": "120",
    "street": "Invalidenstrasse",
    "city": "Berlin",
    "district": "Mitte",
    "state": "Berlin",
    "postalCode": "10115",
    "countryCode": "DEU"
  }
};

var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

https.createServer(options, function(req, res) {
  console.log(req.method, req.url);

  res.writeHead(403);
  res.end();
  
  // var staticFile = req.url.match(/^\/pcur\/static\/([^?]+)(\?.*)?/);
  // if (staticFile) {
  //   fs.readFile(staticFilesFolder + staticFile[1], 'utf-8', function(err, data) {
  //     res.writeHead(200, {'Content-Type': mimeTypes[staticFile[2]]});
  //     res.end(data);
  //   });
  // } else if (req.url.match('/pcur/places/276u33kj-4f9b16c64e3544888d780dbe40d9e1b9')) {
  //   res.writeHead(200);
  //   res.end(JSON.stringify(place));
  // } else if (req.url.match('/pcur/places') && req.method == "GET") {
  //   res.writeHead(200);
  //   res.end('{"q":"test","places":[{"id":"276u33dc-5c031cf7f1b14940b52ea8fb30dafb0b","defaultName":"Das Beste Platy","icon":"http://download.vcdn.nokia.com/p/d/places2/icons/categories/03_02.icon","position":{"latitude":52.5226,"longitude":13.41545},"distance":"1852"},{"id":"276u33dc-7a157afc7abf489f801003203638f4e9","defaultName":"Best of Brazil Tours","icon":"http://download.vcdn.nokia.com/p/d/places2/icons/categories/02.icon","position":{"latitude":52.5533,"longitude":13.4238},"distance":"4729"},{"id":"276u33dc-3ef919b6e9044b71bad49bafbbdd49fa","defaultName":"Est","icon":"http://download.vcdn.nokia.com/p/d/places2/icons/categories/03.icon","position":{"latitude":52.5253,"longitude":13.4067},"distance":"1515"},{"id":"276u336x-bd6d8e8fdc5e4504b5b2840ce8ed3c82","defaultName":"Grill - Picnic, Testing","icon":"http://download.vcdn.nokia.com/p/d/places2/icons/categories/03.icon","position":{"latitude":52.511038,"longitude":13.357129},"distance":"2325"},{"id":"276u33df-064841e90ede459cb2a906e7af70c8b3","defaultName":"Best Western Hotel City Ost","icon":"http://download.vcdn.nokia.com/p/d/places2/icons/categories/06.icon","position":{"latitude":52.51473,"longitude":13.4658},"distance":"5121"},{"id":"276u33db-9b5e0a44b1274f0398a8772e6a43b762","defaultName":"Rest","icon":"http://download.vcdn.nokia.com/p/d/places2/icons/categories/22.icon","position":{"latitude":52.525778,"longitude":13.378687},"distance":"1348"},{"id":"276u33dc-8a1683f17be94621bcd90e8143e60484","defaultName":"Best Shop","icon":"http://download.vcdn.nokia.com/p/d/places2/icons/categories/09.icon","position":{"latitude":52.527543,"longitude":13.408345},"distance":"1770"},{"id":"276u336x-86156ab199cf42c296448acdd6cd7d80","defaultName":"Test Berlin GmbH","icon":"http://download.vcdn.nokia.com/p/d/places2/icons/categories/02.icon","position":{"latitude":52.50077,"longitude":13.32166},"distance":"4965"},{"id":"276u336q-394c93378e56423c83414827943bc37f","defaultName":"Lichterfelde West","icon":"http://download.vcdn.nokia.com/p/d/places2/icons/categories/11.icon","position":{"latitude":52.44417,"longitude":13.29466},"distance":"10305"},{"id":"276u33db-7af315e7309e47b6956b7cc0e0fb1c44","defaultName":"Best Western Hotel Berlin Mitte","icon":"http://download.vcdn.nokia.com/p/d/places2/icons/categories/01.icon","position":{"latitude":52.52362,"longitude":13.38366},"distance":"963"},{"id":"276u33d8-62c1febfdd6943d594d661122f39ab18","defaultName":"Answers Teststudio Berlin GmbH","icon":"http://download.vcdn.nokia.com/p/d/places2/icons/categories/02.icon","position":{"latitude":52.512118,"longitude":13.39353},"distance":"481"},{"id":"276u33d9-a440c6d592d24ef0893ca22e0961a1ea","defaultName":"Testing Technologies Ist GmbH","icon":"http://download.vcdn.nokia.com/p/d/places2/icons/categories/02.icon","position":{"latitude":52.510791,"longitude":13.42193},"distance":"2218"},{"id":"276u33dc-b4cc15ccb5464cb1b9b0b8aed425f296","defaultName":"Lts Language & Testing Service GmbH","icon":"http://download.vcdn.nokia.com/p/d/places2/icons/categories/02.icon","position":{"latitude":52.52262,"longitude":13.41578},"distance":"1874"},{"id":"276u33d9-b9c7bc62137640e7895b1e7cf4e9c3f5","defaultName":"West Germany","icon":"http://download.vcdn.nokia.com/p/d/places2/icons/categories/33.icon","position":{"latitude":52.49919,"longitude":13.419635},"distance":"2727"},{"id":"276u33dc-3aee7bc6e6b748149fcbc9a7cac8fb6e","defaultName":"Text International GmbH","icon":"http://download.vcdn.nokia.com/p/d/places2/icons/categories/02.icon","position":{"latitude":52.525768,"longitude":13.39066},"distance":"1087"},{"id":"276u33dc-7abc618e1c9f4f0aab90a42d04eaa4fa","defaultName":"Best Burger","icon":"http://download.vcdn.nokia.com/p/d/places2/icons/categories/03.icon","position":{"latitude":52.53775,"longitude":13.40863},"distance":"2718"},{"id":"276u336x-e1f8e7f14ef142e58fe8b74bdaad2aa8","defaultName":"Dr. Haspel & Partner Teststudio GmbH","icon":"http://download.vcdn.nokia.com/p/d/places2/icons/categories/02.icon","position":{"latitude":52.503109,"longitude":13.33893},"distance":"3778"}],"position":{"latitude":52.516,"longitude":13.3904}}');
  //   //res.end('{"q":"test","places":[],"position":{"latitude":52.516,"longitude":13.3904}}');
  // } else {
  //   proxy.proxyRequest(req, res);
  // }
  
}).listen(8443);

console.log('https://localhost:8443/pcur');