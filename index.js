// index.js
// xml-p
// initial test

const http = require('http');
const path = require('path');
const express = require('express');
const app = express();

const Parser = require('rss-parser');
const parser = new Parser();


// serve settings
http.createServer(app).listen(8080);
app.listen(8000, function () {
	console.log('listening port: 8080');
});


// static & views
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// callbacks
app.get('/', function(req, res){
	console.log('GET \'/\'');
	parser.parseURL('http://aljazeera.com/xml/rss/all.xml', function(err, feed){
		if(err) throw err;
		console.log('Success: ', feed.title);
		console.log(feed.items[0]);
		res.render('index', {
			title: feed.title,
			link: feed.link,
			articles: feed.items
		});
	});
});
