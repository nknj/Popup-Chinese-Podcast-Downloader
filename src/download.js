// Require
var fs = require('fs');
var casper = require('casper').create({
  pageSettings: {
    loadImages:  false,
    loadPlugins: false,
    webSecurityEnabled: false,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
  }
});

// Vars
var url = "http://popupchinese.com/lessons/absolute-beginners?page=";
var startPage = 1;
var endPage = 7;
var ids = [];

// Main
for (var i = startPage; i < endPage; i++) {
  if (i === startPage) {
    casper.start(url + i, addToResults);
  } else {
    casper.thenOpen(url + i, addToResults);
  }
}
casper.then(print);
casper.then(download);
casper.run();

// Functions
function getIds() {
  var els = document.getElementsByClassName('archive_teaser');
  var _ids = [];

  Array.prototype.map.call(els, function(el) {
    _ids.push(el.className.match(/teaser_(\d+)/)[1]);
  });

  return _ids;
}

function addToResults() {
  var _ids = this.evaluate(getIds);
  ids = ids.concat(_ids);
}

function print() {
  this.echo('\nFile IDs to download');
  this.echo('====================\n');
  this.echo(ids);
  this.echo('\n===================\n');
}

function download() {
  for (var id in ids) {
    this.echo('Downloading ' + ids[id]);
    this.download('http://popupchinese.com/data/' + ids[id] + '/audio.mp3', 'downloads/' + ids[id] + '.mp3');
  }
}
