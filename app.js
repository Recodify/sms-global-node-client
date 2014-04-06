var sms = require('./lib/wrapper');

var wrapper = new sms.wrapper('null', 'null');
wrapper.get('contact', null,  function(body){
	console.log(body);
});
