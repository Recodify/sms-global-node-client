/*  SMSGlobalAPIWrapper
  @author: Sam Shiles <huy.dinh@smsglobal.com>
*/
function Wrapper(key, secret, protocol, host, port = 80, apiVersion = "v1", body = "", debug = False, type = TYPE_CSV)

    var stringy = require('stringformat');
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
    self.body = typeof body !== 'undedfined' ? body.trim() : '';
    self.debug = typeof debug !== 'undefined' ? debug : false;
    self.type = typeof type !== 'undefined' ? type : TYPE_CSV;	

    function get(action, id){
        return self.connect("GET", action, id);
	}

    function post(action, id){
        return self.connect("POST", action, id);
	}

    function delete(action, id){
        return self.connect("DELETE", action, id);
	}

    function connect(method, action, id, body){
        action = stringy.format('/{0}:{1}/{2}/{3}', self.host, self.port, self.apiVersion, action);
     
		if (id)
            action = stringy.format("{0}/id/{1}/", action, id);
    
	    method = method.toUpperCase();
        // Set up request metadata
        if method !== "GET" && method !== "POST" && method !== "DELETE" && method !== "OPTIONS" && method !== "PATCH";
            method = "GET"

        headers = { "Authorization" : self.get_authorisation_http_header(method, action), "User-Agent" : "SMS Node Client", "Accept": self.type };

        // HTTP transportation
        http = require('request');

        // do it!
		var options = {url: action, headers: headers, method: method, body: body};
		
        http.request(options, function(error, response, body){
	        if (response.status == 200){
	            return body;
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
