var test = require("tap").test
var minimatch = require('../')
var path = require("path")

test("should handle pattern starting with paren", function(t) {
  var p = "(case)";
  t.equal(minimatch("(case)", p), true);        // and here you go, (...) treated as abunch of literals all...
  t.equal(minimatch("case", p), false);
  t.equal(minimatch("!case", p), false);
  t.equal(minimatch("!(case)", p), false);
  t.equal(minimatch("foo/(case)", p), false);
  t.equal(minimatch("foo/case", p), false);
  t.equal(minimatch("foo/!case", p), false);
  t.equal(minimatch("!foo/case", p), false);
  t.equal(minimatch("foo/!(case)", p), false);
  t.end()
})

test("should handle pattern starting with paren", function(t) {
  var p = "@(case)";
  t.equal(minimatch("(case)", p), false);    // ... while the @ here triggers state and thus (...) now is treated as a *grouping* instead, hence this checks for literal 'case'
  t.equal(minimatch("case", p), true);
  t.equal(minimatch("!case", p), false);
  t.equal(minimatch("!(case)", p), false);
  t.equal(minimatch("foo/(case)", p), false);
  t.equal(minimatch("foo/case", p), false);
  t.equal(minimatch("foo/!case", p), false);
  t.equal(minimatch("!foo/case", p), false);
  t.equal(minimatch("foo/!(case)", p), false);
  t.end()
})

test("should handle pattern starting with exclam", function(t) {
  var p = "\\!case";
  t.equal(minimatch("(case)", p), false);    // all being literals again...
  t.equal(minimatch("case", p), false);
  t.equal(minimatch("!case", p), true);
  t.equal(minimatch("!(case)", p), false);
  t.equal(minimatch("foo/(case)", p), false);
  t.equal(minimatch("foo/case", p), false);
  t.equal(minimatch("foo/!case", p), false);
  t.equal(minimatch("!foo/case", p), false);
  t.equal(minimatch("foo/!(case)", p), false);
  t.end()
})

test("should handle pattern starting with exclam and paren", function(t) {
  var p = "\\!(case)"
  t.equal(minimatch("(case)", p), false);   // and more all literals again...
  t.equal(minimatch("case", p), false);
  t.equal(minimatch("!case", p), false);
  t.equal(minimatch("!(case)", p), true);
  t.equal(minimatch("foo/(case)", p), false);
  t.equal(minimatch("foo/case", p), false);
  t.equal(minimatch("foo/!case", p), false);
  t.equal(minimatch("!foo/case", p), false);
  t.equal(minimatch("foo/!(case)", p), false);
  t.end()
})

test("should handle pattern that is a negative extglob", function(t) {
  var p = "!(case)"
  t.equal(minimatch("(case)", p, { debug: false }), false);    // crazy: ! triggers state, which makes the (...) a group/set instead of literals, no need for @ prefix!
  t.equal(minimatch("case", p), true);
  t.equal(minimatch("!case", p, {debug: false}), true);
  t.equal(minimatch("!(case)", p), true);
  t.equal(minimatch("foo/(case)", p), true);
  t.equal(minimatch("foo/case", p), true);
  t.equal(minimatch("foo/!case", p), true);
  t.equal(minimatch("!foo/case", p), true);
  t.equal(minimatch("foo/!(case)", p), true);
  t.end()
})

test("should ignore pattern starting with paren", function(t) {
  var p = "*/!(case)"
  t.equal(minimatch("(case)", p, { debug: false }), false);   // crazy: ! triggers state, which makes the (...) a group/set instead of literals
  t.equal(minimatch("case", p), false);
  t.equal(minimatch("!case", p), false);
  t.equal(minimatch("!(case)", p), false);
  t.equal(minimatch("bar!(case)", p), false);
  t.equal(minimatch("foo/(case)", p), true);   
  t.equal(minimatch("foo/case", p), false); // foo matches *, then case matches !(case)$ and since that is a negation...
  t.equal(minimatch("foo/!case", p), true); // foo matches *, then the ! in the path allows this bozo to fail the negative /!(case) and give this very non-obvious result...
  t.equal(minimatch("!foo/case", p), false);
  t.equal(minimatch("foo/!(case)", p), true);
  t.equal(minimatch("foo/bar!(case)", p), true);
  t.end()
})

test("should ignore pattern starting with star & paren", function(t) {
  var p = "*!(case)"
  t.equal(minimatch("(case)", p, { debug: false }), true);    // crazy: ! triggers state, which makes the (...) a group/set instead of literals
  t.equal(minimatch("case", p), true);
  t.equal(minimatch("!case", p), true);
  t.equal(minimatch("!(case)", p), true);
  t.equal(minimatch("bar!(case)", p), true);
  t.equal(minimatch("foo/(case)", p), false);
  t.equal(minimatch("foo/case", p), false);
  t.equal(minimatch("foo/!case", p), false);
  t.equal(minimatch("!foo/case", p), false);
  t.equal(minimatch("foo/!(case)", p), false);
  t.end()
})

test("should ignore pattern starting with exclam", function(t) {
  var p = "!\\!case"
  t.equal(minimatch("(case)", p), true);
  t.equal(minimatch("case", p), true);
  t.equal(minimatch("!case", p), false);
  t.equal(minimatch("!(case)", p), true);
  t.equal(minimatch("foo/(case)", p), true);
  t.equal(minimatch("foo/case", p), true);
  t.equal(minimatch("foo/!case", p), true);
  t.equal(minimatch("!foo/case", p), true);
  t.equal(minimatch("foo/!(case)", p), true);
  t.end()
})

test("should ignore pattern starting with exclam and paren", function(t) {
  var p = "!\\!(case)"
  t.equal(minimatch("(case)", p), true);
  t.equal(minimatch("case", p), true);
  t.equal(minimatch("!case", p), true);
  t.equal(minimatch("!(case)", p), false);
  t.equal(minimatch("foo/(case)", p, {debug: false}), true);
  t.equal(minimatch("foo/case", p), true);
  t.equal(minimatch("foo/!case", p), true);
  t.equal(minimatch("!foo/case", p), true);
  t.equal(minimatch("foo/!(case)", p), true);
  t.end()
})

test("should ignore pattern that is a double-negative extglob A", function(t) {
  var p = "!!(case)"
  t.equal(minimatch("(case)", p, { debug: false }), true);
  t.equal(minimatch("case", p), false);
  t.equal(minimatch("!case", p, {debug: false}), false);
  t.equal(minimatch("!(case)", p), false);
  t.equal(minimatch("foo/(case)", p), false);
  t.equal(minimatch("foo/case", p), false);
  t.equal(minimatch("foo/!case", p), false);
  t.equal(minimatch("!foo/case", p), false);
  t.equal(minimatch("foo/!(case)", p), false);
  t.end()
})
