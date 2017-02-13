var _ = require('lodash');
var low = require('lowdb');
var async = require('async');
var cheerio = require('cheerio');

var request = require('request');

var BASE = 'http://www.goodreads.com/quotes/tag/love-quotes';

var limit = 5;
var db = low('quotes.json');
db._.mixin(require('underscore-db'));
db.defaults({ quotes: [], chat: [] })
  .write();

/* start initial pages */
var maxPage = 100;
var pages = _.range(1, maxPage);
/* end initial pages */

var getPage = function (page, callback) {
  var url = `${BASE}?page=${page}`;
  request(url, function(error, response, body) {
    var $ = cheerio.load(body);
    $('.quote.mediumText .quoteText').each(function(index, elem) {
      $(elem).find('script').remove();
      db.get('quotes')
        .insert({ text: $(elem).text() })
        .write();
    });
    callback();
  });
}

async.eachLimit(pages, limit, getPage, function (error) {
  if (error) {
    /*
     * TODO
     * handle error
     */
    console.log(error);
  } else {
    /*
     * successful
     */
  }
})
