var crypto = require('crypto');

function Aes(){
	let algorithm = "aes256";
	let tempiv = "hahahahahahahaha";
	let iv  = (tempiv instanceof Buffer) ? tempiv : new Buffer(tempiv) ;
	let encoding = "base64" || "binary";

    function encrypt (text, key) {
    		var keyBuffer  = (key instanceof Buffer) ? key : new Buffer(key) ;
	        var cipher = crypto.createCipheriv(algorithm, keyBuffer, iv);

	        

	        var result = cipher.update(text, "utf8", encoding);
	        result += cipher.final(encoding);

	        var decipher = crypto.createDecipheriv(algorithm, keyBuffer, iv);

	        var result1 = decipher.update(result, encoding);
	        result1 += decipher.final();

	        console.log(result1);

	        return result;
    }

    function decrypt (text, key) {
    		console.log(text);
    		var keyBuffer  = (key instanceof Buffer) ? key : new Buffer(key) ;
	        var decipher = crypto.createDecipheriv(algorithm, keyBuffer, iv);


	        var result = decipher.update(text, encoding);
	        result += decipher.final();

	        return result;
    }

    return {
    	encrypt: encrypt,
    	decrypt: decrypt
    };
}

module.exports = new Aes();