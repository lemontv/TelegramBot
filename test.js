#!/usr/bin/env node

var request = require('request')
var method = require('./method')

request({
  url: method.getUpdates,
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  }
}, function(error, response, body) {
  console.log(body)
})
