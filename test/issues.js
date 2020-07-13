var test = require("tap").test
var minimatch = require('../')
var path = require("path")

test("match with windows paths #1", function(t) {
  var sample = {
    path: 'W:\\Projects\\sites\\library.visyond.gov\\80\\lib\\js\\node-glob\\test\\fixtures\\edge\\(case)',
    UNIXpath: 'W:/Projects/sites/library.visyond.gov/80/lib/js/node-glob/test/fixtures/edge/(case)',

    pattern: 'W:/Projects/sites/library.visyond.gov/80/lib/js/node-glob/test/fixtures/edge/!\\(case\\)',
    // pattern: 'W:/Projects/sites/library.visyond.gov/80/lib/js/node-glob/test/fixtures/edge/*',
    options: {
      // ignore: [
      //   'W:/Projects/sites/library.visyond.gov/80/lib/js/node-glob/test/fixtures/edge/!\\(case\\)'
      // ],
      debug: false,
      dot: true,
      nonegate: true,
      nocomment: true,
    },
    result: false,
  }
  let m = new minimatch.Minimatch(sample.pattern, sample.options)
  t.equal(m.match(sample.path), sample.result, '.match(), Windows path');
  t.equal(minimatch(sample.path, sample.pattern, sample.options), sample.result, 'minimatch() matching, Windows path');
  t.equal(m.match(sample.UNIXpath), sample.result, '.match(), UNIXy path');
  t.equal(minimatch(sample.UNIXpath, sample.pattern, sample.options), sample.result, 'minimatch() matching, UNIXy path');
  t.end()
})

test("match with windows paths #2", function(t) {
  var sample = {
    path: 'W:\\Projects\\sites\\library.visyond.gov\\80\\lib\\js\\node-glob\\test\\fixtures\\edge\\(case)',
    UNIXpath: 'W:/Projects/sites/library.visyond.gov/80/lib/js/node-glob/test/fixtures/edge/(case)',

    pattern: 'W:/Projects/sites/library.visyond.gov/80/lib/js/node-glob/test/fixtures/edge/!(case)',
    // pattern: 'W:/Projects/sites/library.visyond.gov/80/lib/js/node-glob/test/fixtures/edge/*',
    options: {
      // ignore: [
      //   'W:/Projects/sites/library.visyond.gov/80/lib/js/node-glob/test/fixtures/edge/!\\(case\\)'
      // ],
      debug: false,
      dot: true,
      nonegate: true,
      nocomment: true,
    },
    result: true,
  }
  let m = new minimatch.Minimatch(sample.pattern, sample.options)
  t.equal(m.match(sample.path), sample.result, '.match(), Windows path');
  t.equal(minimatch(sample.path, sample.pattern, sample.options), sample.result, 'minimatch() matching, Windows path');
  t.equal(m.match(sample.UNIXpath), sample.result, '.match(), UNIXy path');
  t.equal(minimatch(sample.UNIXpath, sample.pattern, sample.options), sample.result, 'minimatch() matching, UNIXy path');
  t.end()
})

test("match with windows paths #3", function(t) {
  var sample = {
    path: 'W:\\Projects\\sites\\library.visyond.gov\\80\\lib\\js\\node-glob\\test\\fixtures\\edge\\(case)',
    UNIXpath: 'W:/Projects/sites/library.visyond.gov/80/lib/js/node-glob/test/fixtures/edge/(case)',

    pattern: 'W:/Projects/sites/library.visyond.gov/80/lib/js/node-glob/test/fixtures/edge/\\(case\\)',
    // pattern: 'W:/Projects/sites/library.visyond.gov/80/lib/js/node-glob/test/fixtures/edge/*',
    options: {
      // ignore: [
      //   'W:/Projects/sites/library.visyond.gov/80/lib/js/node-glob/test/fixtures/edge/!\\(case\\)'
      // ],
      debug: false,
      dot: true,
      nonegate: true,
      nocomment: true,
    },
    result: true,
  }
  let m = new minimatch.Minimatch(sample.pattern, sample.options)
  t.equal(m.match(sample.path), sample.result, '.match(), Windows path');
  t.equal(minimatch(sample.path, sample.pattern, sample.options), sample.result, 'minimatch() matching, Windows path');
  t.equal(m.match(sample.UNIXpath), sample.result, '.match(), UNIXy path');
  t.equal(minimatch(sample.UNIXpath, sample.pattern, sample.options), sample.result, 'minimatch() matching, UNIXy path');
  t.end()
})

