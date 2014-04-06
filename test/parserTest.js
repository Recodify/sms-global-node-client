var assert = require('assert')
var request = require('request');
var fakeweb = require('node-fakeweb');
var testUrl = 'http://www.testing.com:80/';

beforeEach(function(){
	var output = function(err, resp, body) { console.log(body); }

	fakeweb.allowNetConnect = false;
	fakeweb.registerUri({uri: testUrl, body: '<span id="greeting">hello</span>'});
	request.get({uri: testUrl}, output);
});

describe('scapper', function(){
	describe('get', function(){
    	it('should return jquery object with expected content', function(done){
        	assert.equal(1, 1);
      		done();
    	})
  	})
});