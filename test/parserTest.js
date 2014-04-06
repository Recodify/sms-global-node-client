var assert = require('assert')
var request = require('request');
var testUrl = 'http://www.testing.com:80/';
var sms = require('../lib/wrapper');

describe('scapper', function(){
	describe('get', function(){
    	it('should return jquery object with expected content', function(done){
        	var wrapper = new sms.wrapper('2237275ba354517bdbd2477b7266e3c1', 'ccbb84e115a66eb2fc83834b8c0f31a3');
      		wrapper.get('group',  function(body){
      			done();
      		});
    	})
  	})
});