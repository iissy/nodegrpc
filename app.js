var express = require('express');
var app = express();
var client = require('./grpcconnect'),
    callback = require('./callback'),
    fs = require("fs");

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

app.use(express.static('public'));
app.engine('html', function(filePath, options, callback) {
    fs.readFile(filePath, function(err, content) {
        if (err) return callback(new Error(err));
        var rendered = content.toString();
        return callback(null, rendered);
    })
});

app.set('views', './views');
app.set('view engine', 'html');

app.get('/', function(req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!' });
});

app.get('/SayHello', function(req, res) {
    var params = { name: "jimmy" };
    client.SayHello(res, params, callback.SayHello);
});