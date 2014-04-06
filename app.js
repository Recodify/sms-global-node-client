var sms = require('./lib/wrapper');

var wrapper = new sms.wrapper('null', 'null');
wrapper.get('contact', null,  function(body){
	console.log(body);
});*/

var message = {
	origin: "test",
	destination: "447850229403",
	message: "anther bloody message"
}

wrapper.post('sms', null, message, function(body){
	console.log(body);
});