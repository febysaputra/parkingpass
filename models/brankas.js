var conn = require('../connection.js');
var crypto = require('crypto');
var modtoken = require('../token.js');
var aes = require('../aes.js');

function Brankas(){
	this.getItem = function(data, res){ //untuk get real password
		let konci = data.master_pass;
		let token_decoded = modtoken.decodeToken(data.tokenkey, res);
		let id_manpass = data.id_manpass;

		if(konci == ''){
			res.json({"status": false, "message":"there is empty field"});
		}else if(!token_decoded){
			res.json({"status": false, "message":"token verified failed"});
		}else{
			conn.acquire(function(err, con){
				if(!err){
					var query = 'SELECT password_acc FROM manpass WHERE id_user_fk = ? AND id_manpass = ?';
					var query_data = [token_decoded.id, id_manpass]; 
					con.query(query, query_data, function(err, result){
						con.release();
						if(err == null){
							if(!result.length){
								res.json({"status":false, "message":"unfortunately"});
							}else{
								console.log(result);
								let res_dec = aes.decrypt(result[0].password_acc,konci);
								res.json({"status":true, "message":"retrieving real password success", "result": {"origin": res_dec, "id_manpass":id_manpass}});
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

	this.getAllItem = function(data, res){
		let id = modtoken.decodeToken(data, res).id;
		console.log('ini idnya doi', id)

		if(!id){
			res.json({"status": false, "message":"id not found"});
		}else{
			conn.acquire(function(err, con){
				if(!err){
					var query = 'SELECT * FROM manpass WHERE id_user_fk = ?';
					var query_data = [id]; 
					con.query(query, query_data, function(err, result){
						con.release();
						console.log('ini balikian query', result);
						if(err == null){
							if(!result.length){
								res.json({"status":false, "message":"unfortunately"});
							}else{
								res.json({"status":true, "message":"retrieving manpass success", "result": result});
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
	
	this.deleteItem = function(data, res){ //delete password

		let token_decoded = modtoken.decodeToken(data.token, res);
		let id_manpass = data.id_manpass;

		console.log(token_decoded);

		if(!token_decoded){
			res.json({"status": false, "message":"token verified failed"});
		}else{
			conn.acquire(function(err, con){
				if(!err){
					var query = 'DELETE FROM manpass WHERE id_user_fk = ? AND id_manpass = ?';
					var query_data = [token_decoded.id, id_manpass]; 
					con.query(query, query_data, function(err, result){
						con.release();
						if(err == null){
							res.json({"status":true, "message":"delete item success"});
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

	this.setItem = function(data, res){
		var token_decoded = modtoken.decodeToken(data.token, res);
		var acc = data.account;
		var pass_acc = data.password_acc;
		var ket = data.keterangan;

		if(acc == '' || pass_acc == ''){
			res.json({"status": false, "message":"there is empty field"});
		}else if(!token_decoded){
			res.json({"status": false, "message":"token verified failed"});
		}else{
			conn.acquire(function(err, con){
				if(!err){
					var query = 'SELECT tokenkey FROM user WHERE id_user = ?';
					var query_data = [token_decoded.id];
					con.query(query, query_data, function(err, result){
						// con.release();
						if(err == null){
							if(!result.length){
								res.json({"status":false, "message":"unfortunately"});
							}else{
								console.log(result);
								let konci = aes.decrypt(result[0].tokenkey, 'PassMantab');
								
								pass_acc = aes.encrypt(pass_acc,konci);
								console.log(pass_acc);
								var query = 'INSERT INTO manpass SET ?';
								var query_data = {id_user_fk: token_decoded.id, account: acc, password_acc: pass_acc, keterangan:ket}; 
								con.query(query, query_data, function(err, result){
									con.release();
									if(err == null){
										res.json({"status":true, "message":"store password success"});
									}else{
										res.json({"status":false, "message":"Error insert data"});
									}
								});
							}
						}
					});
				}else{
					res.json({"status":false, "message":"connection failed"});
				}
			});
		}
	}

}

module.exports = new Brankas();