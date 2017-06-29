var express = require('express');
var bodyparser = require('body-parser');
var conn = require('./connection');
var routes = require('./routes');
var cors = require('cors');

var app = express();

app.use(cors());

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.get('/', function(req, res){
	res.send('Welcome to the jungle!');
});

conn.init();
routes.configure(app);

var server = app.listen(2370, function(){
	console.log("Server listening on port "+server.address().port);
});