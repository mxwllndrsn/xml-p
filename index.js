const http = require('http');
const express = require('express');
const app = express();

// serve settings

http.createServer(app).listen(8080);
app.listen(8000, function () {
	console.log('listening port: 8080');
});

let Parser = require('rss-parser');
let parser = new Parser();

app.get('/', function(req, res){
	console.log('GET \'/\'');
	parser.parseURL('http://aljazeera.com/xml/rss/all.xml', function(err, feed){
		if(err) throw err;
		console.log('Success: ', feed.title);
	});
});
