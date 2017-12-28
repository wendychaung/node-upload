var express = require('express');
var proxy = require('http-proxy-middleware');

var context =['/upload'];
var options = {
	target: 'http://localhost:8888',
	changeOrigin: true
};

var apiProxy =  proxy(context, options);
var app = express();
app.use(apiProxy);

app.listen(8000);
app.use(express.static(__dirname));
