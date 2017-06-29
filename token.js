var jwt = require('jsonwebtoken');

function Token(){
	this.createToken = function(data, res){
		var token = jwt.sign(data, 'seenaknyaaja');

		return token;
	}

	this.checkToken = function(data, res){
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.setHeader('Access-Control-Allow-Credentials', true);

        if(data.token){
        	var token = data.token;
        	jwt.verify(token, 'seenaknyaaja', function(err, decode){
        		if(err){
        			res.json({status: false, message: 'Token verification failed', err: err});
        		}else{
                    console.log(decode);
        			res.json({status: true, message: 'Verified'});
        		}
        	});
        }else{
        	res.json({status: false, message: 'No token provided'});
        }
	}

    this.decodeToken = function(data, res){
        try{
            var decoded = jwt.verify(data, 'seenaknyaaja');

            return decoded;
        }catch(err){
            return false;
        }
    }
}

module.exports = new Token();