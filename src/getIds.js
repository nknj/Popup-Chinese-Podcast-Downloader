// Require
var fs = require('fs');
var casper = require('casper').create({
  loadImages:  false,
  loadPlugins: false
});

// Vars
var url = "http://popupchinese.com/lessons/absolute-beginners?page=";
var startPage = 1;
var endPage = 7;
var result = [];

// Functions
var getIds = function () {
  var els = document.getElementsByClassName('archive_teaser');
  var ids = [];

  Array.prototype.map.call(els, function(el) {
    ids.push(el.className.match(/teaser_(\d+)/)[1]);
  });

  return ids;
};

var addToResults = function () {
  var ids = this.evaluate(getIds);
  result = result.concat(ids);
};

var print = function () {
  this.echo('\nFile IDs to download');
  this.echo('====================\n');
  this.echo(result);
  this.echo('\n===================\n');
};

// Main
for (var i = startPage; i < endPage; i++) {
  if (i === startPage) {
    casper.start(url + i, addToResults);
  } else {
    casper.thenOpen(url + i, addToResults);
  }
}

casper.then(print);
casper.run();
