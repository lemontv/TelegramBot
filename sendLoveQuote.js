#!/usr/bin/env node

var request = require('request')
var method = require('./method')
var _ = require('lodash');
var low = require('lowdb');

/* start initial database */
var db = low('quotes.json');
db._.mixin(require('underscore-db'));
db.defaults({ quotes: [], chat: [] })
  .write();
/* end initial database */

var qnums = db.get('quotes').size().value();
var qid = Math.ceil((Math.random() * qnums));
var quote = db.get(`quotes[${qid}].text`).value();

var options = {
  'chat_id': 306102857,
  'parse_mode': 'HTML',
  'text': `${quote}`
};

request({
  url: method.sendMessage,
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  },
  body: JSON.stringify(options)
}, function(error, response, body) {
  console.log(body)
})
