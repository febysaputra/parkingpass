var user = require('./models/user');
var brankas = require('./models/brankas');
var token = require('./token.js');
var aes = require('./aes.js');

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

		app.post('/deleteitem', function(req, res){
			brankas.deleteItem(req.body, res);
		});		

		/* */
		app.post('/checktoken', function(req, res){
			token.checkToken(req.body, res);
		});

		app.get('/aes', function(req, res){
			var mode = req.query.mode;
			var text = req.query.text;
			var key = req.query.key || "PassMantab";
			var result;

			if(mode == "enc"){
				try{
					result = aes.encrypt(text,key);
					res.send(result);
				}catch(err){
					res.send(err);
				}
			}else if(mode == "dec"){
				try{
					result = aes.decrypt(text,key);
					res.send(result);
				}catch(err){
					res.send(err)
				}
			}
		})
	}
}