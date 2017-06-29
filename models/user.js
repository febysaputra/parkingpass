var conn = require('../connection.js');
var crypto = require('crypto');
var modtoken = require('../token.js');

function User(){
	this.login = function(data, res){
		let email = data.email;
		let pass = crypto.createHash('sha256').update(data.password).digest('hex');

		if(email == '' || pass == ''){
			res.json({"status": false, "message":"there is empty field"});
		}else{
			conn.acquire(function(err, con){
				console.log(err);
				if(!err){
					var query = 'SELECT * FROM user WHERE email = ? and master_pass = ?';
					var query_data = [email, pass]; 
					con.query(query, query_data, function(err, result){
						con.release();
						if(err == null){
							if(!result.length){
								res.json({"status":false, "message":"Wrong email or password"});
							}else{
								var signInTime = Math.floor(Date.now()/1000); // iat
								var expired = signInTime + (2*60*60) // exp after 2 hours
								var data = {'id': result[0].id_user, 'email': result[0].email, 'iat': signInTime, 'exp': expired};
								var token = modtoken.createToken(data, res);
								res.json({"status":true, "message":"Login success", "token": token});
							}
						}else{
							res.json({"status":false, "message":"Error retrieving data"});
						}
					});
				}else{
					res.json({"status":false, "message":"connection failed"});
				}
			});
		}
	}
	
	this.register = function(data, res){
		let email = data.email;
		let pass = data.password;
		let pass2 = data.confirm_password;

		if(email == '' || pass == '' || pass2 == ''){
			res.json({"status": false, "message":"there is empty field"});
		}else if(pass != pass2){
			res.json({"status": false, "message":"password doesn't match"});
		}else{
			pass = crypto.createHash('sha256').update(pass).digest('hex');
			conn.acquire(function(err, con){
				if(!err){
					var query = 'INSERT INTO user SET ?';
					var query_data = {email: email, master_pass: pass}; 
					con.query(query, query_data, function(err, result){
						con.release();
						if(err == null){
							res.json({"status":true, "message":"Register success"});
						}else{
							res.json({"status":false, "message":"Error inserting data"});
						}
					});
				}else{
					res.json({"status":false, "message":"connection failed"});
				}
			});
		}
	}

	/*this.getKey = function(req, res){
		let email = data.email;
		let pass = crypto.createHash('sha256').update(data.password).digest('hex');

		if(email == '' || pass == ''){
			res.json({"status": false, "message":"there is empty field"});
		}else{
			conn.acquire(function(err, con){
				if(!err){
					var query = 'SELECT * FROM user WHERE email = ? and master_pass = ?';
					var query_data = [email, pass]; 
					con.query(query, query_data, function(err, result){
						con.release();
						if(err == null){
							if(!result.length){
								res.json({"status":false, "message":"Wrong email or password"});
							}else{
								var signInTime = Math.floor(Date.now()/1000); // iat
								var expired = signInTime + (2*60*60) // exp after 2 hours
								var data = {'id': result[0].id_user, 'email': result[0].email, 'iat': signInTime, 'exp': expired};
								var token = modtoken.createToken(data, res);
								res.json({"status":true, "message":"Login success", "token": token});
							}
						}else{
							res.json({"status":false, "message":"Error retrieving data"});
						}
					});
				}else{
					res.json({"status":false, "message":"connection failed"});
				}
			});
		}

	}*/

	this.setKey = function(data, res){
		let token_decoded = modtoken.decodeToken(data.token, res);		
		let key = crypto.createHash('md5').update(data.key).digest('hex');

		if(key == ''){
			res.json({"status": false, "message":"there is empty field"});
		}else if(!token_decoded){
			res.json({"status": false, "message":"token verified failed"});
		}else{
			conn.acquire(function(err, con){
				if(!err){
					var query = 'UPDATE user SET tokenkey = ? WHERE id_user = ?';
					var query_data = [key, token_decoded.id]; 
					con.query(query, query_data, function(err, result){
						con.release();
						if(err == null){
							res.json({"status":true, "message":"Update key success"});
						}else{
							res.json({"status":false, "message":"Error updating data"});
						}
					});
				}else{
					res.json({"status":false, "message":"connection failed"});
				}
			});
		}
	}

	this.checkKey = function(data,res){
		let token_decoded = modtoken.decodeToken(data, res);	
		conn.acquire(function(err,con){
			if(!err){
				var query = 'SELECT tokenkey FROM user WHERE id_user = ?';
				var query_data = [token_decoded.id];
				con.query(query, query_data, function(err, result){
					con.release();
					if(err == null){
						if(!result[0].tokenkey){
							res.json({"status":false, "message":"Anda belum punya kunci"});
						}else{
							res.json({"status":true, "message":"Anda sudah punya kunci"});
						}					
					}else{
						res.json({"status":false, "message":"Error retrieving data"});
					}
				});
			} else{
				res.json({"status":false, "message":"connection failed"});
			}
		});
	}

}

module.exports = new User();