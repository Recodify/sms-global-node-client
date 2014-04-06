/*  SMSGlobalAPIWrapper
  @author: Sam Shiles <huy.dinh@smsglobal.com>
*/
module.exports.wrapper = function Wrapper(key, secret, protocol, host, port, apiVersion, body, debug, type)
{
	var request = require('request');
    var stringy = require('./stringformat.js');
    var TYPE_JSON = "application/json"
    var TYPE_XML = "application/xml"
    var TYPE_YAML = "application/x-yaml"
    var TYPE_CSV = "text/csv"
    var TYPE_MSGPACK = "application/x-msgpack"
    var ALGORITHM = "sha256"
	var self = this;
	
	self.key = key.trim()
    self.secret = secret.trim()
    self.protocol = typeof protocol !== 'undefined' ? protocol.trim() : 'http';
    self.host = typeof host !== 'undefined' ? host.trim() : 'http://api.smsglobal.com';
    self.port = typeof port !== 'undefined' ? port : 80;
    self.apiVersion = typeof apiVersion !== 'undefined' ? apiVersion.trim() :'v1';
    self.body = typeof body !== 'undefined' ? body.trim() : '';
    self.debug = typeof debug !== 'undefined' ? debug : false;
    self.type = typeof type !== 'undefined' ? type : TYPE_JSON;	

    self.get = function(action, id, callback){
        return self.connect("GET", action, id, callback);
	}

    self.post = function(action, id, callback){
        return self.connect("POST", action, id, callback);
	}

    self.delete = function(action, id, callback){
        return self.connect("DELETE", action, id, callback);
	}

    self.connect = function(method, action, id, body, callback){
        action = stringy.format('/{0}:{1}/{2}/{3}', self.host, self.port, self.apiVersion, action);
     
		if (id)
            action = stringy.format("{0}/id/{1}/", action, id);
			console.log(action);
	    method = method.toUpperCase();
        // Set up request metadata
        if (method !== "GET" && method !== "POST" && method !== "DELETE" && method !== "OPTIONS" && method !== "PATCH");
            method = "GET"

        var headers = { "Authorization" : get_authorisation_http_header(method, action), "User-Agent" : "SMS Node Client", "Accept": self.type };
		var options = {url: action, headers: headers, method: method, body: body};
        
		
        request(options, function(error, response, body){
	        
			if (error){
				console.log(error);
			}
			else if (response.status == 200){
	            callback(body);
			}
	        else {
	            throw "There's problem accessing API" + error;
			}
        });
	}


    function get_authorisation_http_header(method, action){
		var crypto = require('crypto');
		var hash, hmac;
		
        timestamp = new Date();
        nonce = stringy.random();
        raw = stringy.format("{0}\n{1}\n{2}\n{3}\n{4}\n{5\n{6}\n{7}", timestamp, nonce, method, action, self.host, self.port, self.extraData);

        // Encryptions
		hmac = crypto.createHmac(ALGORITHM, self.secret);
		hmac.setEncoding('hex');
		hmac.write(raw);
		hmac.end();
		hash = hmac.read(); 
		
        mac = stringy.format('MAC id="{0}",ts="{1}",nonce="{2}",mac={3}', key, timestamp, nonce, hash);
        return mac
	}
}