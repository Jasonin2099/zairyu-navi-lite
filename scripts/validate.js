#!/usr/bin/env node
// Validates data.js: required fields, all three languages, official ISA source URLs, sane timing fields.
var P = require("../data.js");
var LANGS = ["ja", "zh", "en"], SC = ["base", "grad", "job", "move", "trip"], errs = [];
function validate(list) {
  var e = [], ids = {};
  list.forEach(function (p, i) {
    var at = p.id || "#" + i;
    if (!p.id) e.push(at + ": missing id"); else if (ids[p.id]) e.push(at + ": duplicate id"); ids[p.id] = 1;
    if (SC.indexOf(p.scenario) < 0) e.push(at + ": bad scenario");
    ["name", "summary", "notes", "docs"].forEach(function (f) {
      LANGS.forEach(function (l) { if (!p[f] || p[f][l] == null) e.push(at + ": " + f + "." + l + " missing"); });
      if (p[f] && Array.isArray(p[f].ja)) LANGS.forEach(function (l) { if (p[f][l].length !== p[f].ja.length) e.push(at + ": " + f + "." + l + " length differs from ja"); });
    });
    if (!Array.isArray(p.src) || !p.src.length) e.push(at + ": no source");
    else p.src.forEach(function (u) { if (u.indexOf("https://www.moj.go.jp/isa/") !== 0) e.push(at + ": non-official source " + u); });
    if (p.dueDays != null && !(p.dueDays > 0)) e.push(at + ": bad dueDays");
    if (p.scenario !== "base" && !p.dueFrom) e.push(at + ": scenario item without dueFrom");
  });
  return e;
}
if (require.main === module) {
  errs = validate(P);
  if (errs.length) { console.error(errs.join("\n")); process.exit(1); }
  console.log("data.js OK: " + P.length + " procedures");
}
module.exports = validate;
