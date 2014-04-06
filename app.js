var sms = require('./lib/wrapper');

var wrapper = new sms.wrapper('8054c0ec196e62be6e85faf406032967', '0db8cc05b02d2a6bda3fd32ea8789a53');
/*wrapper.get('contact', null,  function(body){
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