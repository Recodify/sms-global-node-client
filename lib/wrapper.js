/*  SMSGlobalAPIWrapper
  @author: Sam Shiles <huy.dinh@smsglobal.com>
*/
module.exports.wrapper = function Wrapper(key, secret, protocol, host, port, apiVersion, extraData, debug, type)
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
    self.host = typeof host !== 'undefined' ? host.trim() : 'api.smsglobal.com';
    self.port = typeof port !== 'undefined' ? port : 80;
    self.apiVersion = typeof apiVersion !== 'undefined' ? apiVersion.trim() :'v1';
    self.extraData = typeof extraData !== 'undefined' ? extraData.trim() : '';
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

    self.connect = function(method, action, id, callback){
        action = stringy.format('/{0}/{1}/', self.apiVersion, action);
     
		//if (typeof id !== 'undefined' && id !== '')
          //action = stringy.format("{0}/id/{1}/", action, id);
	    
	    method = method.toUpperCase();
        // Set up request metadata
        if (method !== "GET" && method !== "POST" && method !== "DELETE" && method !== "OPTIONS" && method !== "PATCH");
            method = "GET"

        var headers = { "Authorization" : get_authorisation_http_header(method, action), "User-Agent" : "SMS Node Client", "Accept": self.type };
		var options = { url: "http://" + self.host + action, headers: headers, method: method, proxy: "http://127.0.0.1:8888"};
        
		console.log(options.url);
        request(options, function(error, response, body){
	        console.log(response.statusCode);
			if (error){
				console.log(error);
			}
			else if (response.statusCode == 200){
	            callback(body);
			}
	        else {
				//console.log("status:" + response.status);
	            throw "There's problem accessing API" + body;
			}
        });
	}


    function get_authorisation_http_header(method, action){
		var crypto = require('crypto');
		var hash, hmac;
        var timestamp = parseInt(new Date().getTime() / 1000);
        
		var nonce = stringy.random();
		var raw = timestamp + "\n" + nonce + "\n" + method + "\n" + action + "\n" + self.host + "\n" + self.port +"\n" + self.extraData + "\n";
        // Encryptions
		hash = crypto.createHmac('sha256', self.secret).update(raw).digest('base64');
        mac = stringy.format('MAC id="{0}",ts="{1}",nonce="{2}",mac="{3}"', key, timestamp, nonce, hash);
		console.log(mac);
        return mac
	}
}