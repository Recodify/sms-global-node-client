# SMSGlobal REST Client
node.js client for SMSGlobal REST Api

A node.js client for the SMSGlobal restAPI.

**GET EXAMPLE**
```
var wrapper = new sms.wrapper('null', 'null');
wrapper.get('contact', null,  function(body){
	console.log(body);
});
```

**POST EXAMPLE**
```
var wrapper = new sms.wrapper('YOUR KEY', 'YOUR PASSWORD');
var message = {
	origin: "test",
	destination: "447000000000",
	message: "another message"
}

wrapper.post('sms', null, message, function(statusCode, body){
	console.log("http status: " + statusCode);
	if (body)
		console.log("body: " + body);
});
```
