var user = require('./models/user');
var brankas = require('./models/brankas');
var token = require('./token.js');
// var aes = require('./aes.js');

module.exports = {
	configure: function(app){
		/* user */
		app.post('/login', function(req, res){
			user.login(req.body, res);
		});

		app.post('/register', function(req, res){
			user.register(req.body, res);
		});

		app.post('/setkey', function(req, res){
			user.setKey(req.body, res);
		});

		app.get('/checkkey/:id', function(req, res){
			user.checkKey(req.params.id, res);
		});

		// app.get('/getkey', function(req, res){
		// 	user.getKey(req.body, res);
		// });

		/* brankas */
		app.post('/setitem', function(req, res){
			brankas.setItem(req.body, res);
		});

		app.post('/getitem', function(req, res){
			brankas.getItem(req.body, res);
		});

		app.get('/getallitem/:id', function(req, res){
			brankas.getAllItem(req.params.id, res);
		});

		app.get('/deleteitem/:id/:id_manpass', function(req, res){
			brankas.deleteitem(req.params.id,req.params.id_manpass, res);
		});		

		/* */
		app.post('/checktoken', function(req, res){
			token.checkToken(req.body, res);
		});

		// app.get('/cacad', function(req, res){
		// 	var buset = aes.decrypt('cdc12e240ca538ef379dcec61537c68e','e75a6cd43a16c2f31d1a3c17700af64d3658a380c49d65b20cc75b1f7c0e001b');
		// 	res.send(buset);
		// });

	}
}