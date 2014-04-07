var sms = require('./lib/wrapper');

/* GET EXAMPLE
var wrapper = new sms.wrapper('null', 'null');
wrapper.get('contact', null,  function(body){
	console.log(body);
});*/

// POST EXAMPLE
var wrapper = new sms.wrapper('YOUR KEY', 'YOUR PASSWORD');
var message = {
	origin: "test",
	destination: "447850229333",
	message: "anther message"
}

wrapper.post('sms', null, message, function(statusCode, body){
	console.log("http status: " + statusCode);
	if (body)
		console.log("body: " + body);
});