var assert = require('assert')
var request = require('request');
var fakeweb = require('node-fakeweb');
var testUrl = 'http://www.testing.com:80/';
var sms = require('../lib/wrapper');

beforeEach(function(){
	var output = function(err, resp, body) { console.log(body); }

	fakeweb.allowNetConnect = false;
	fakeweb.registerUri({uri: testUrl, body: '<span id="greeting">hello</span>'});
	request.get({uri: testUrl}, output);
});

describe('scapper', function(){
	describe('get', function(){
    	it('should return jquery object with expected content', function(done){
        	var wrapper = new sms.wrapper('8054c0ec196e62be6e85faf406032967', '0db8cc05b02d2a6bda3fd32ea8789a53');
      		wrapper.get('groups', function(body){
      			done();
      		});
    	})
  	})
});