var crypto = require('crypto');

function Aes(){
	var algorithm = "aes256";
	var encoding = "base64";

    this.encrypt = function(text, key) {
			var cipher = crypto.createCipher(algorithm,key);
			var result = cipher.update(text, "utf8", encoding);
			result += cipher.final(encoding);

	        return result;
    }

    this.decrypt = function(text, key) {
			var decipher = crypto.createDecipher(algorithm, key);
	        var result = decipher.update(text, encoding);
	        result += decipher.final();

	        return result;
    }
}

module.exports = new Aes();