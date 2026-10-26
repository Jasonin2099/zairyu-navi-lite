const test = require("node:test"), assert = require("node:assert");
const validate = require("../scripts/validate.js"), P = require("../data.js"), ics = require("../ics.js");
test("data.js passes validation", () => assert.deepStrictEqual(validate(P), []));
test("validator catches a non-official source", () => {
  const bad = JSON.parse(JSON.stringify(P.slice(0, 1))); bad[0].src = ["https://example.com/"];
  assert.ok(validate(bad).some((e) => e.includes("non-official")));
});
test("renewal opens 3 months before expiry", () => assert.strictEqual(P.find((p) => p.id === "renewal").opensMonthsBefore, 3));
test("14-day notifications", () => ["school-notice", "contract-notice", "address"].forEach((id) => assert.strictEqual(P.find((p) => p.id === id).dueDays, 14)));
test("ics output is well-formed and escapes text", () => {
  const out = ics.build([{ id: "a", date: new Date("2027-01-31"), title: "x, y", url: "u" }], "20261026T000000Z");
  assert.match(out, /^BEGIN:VCALENDAR\r\n/); assert.match(out, /DTSTART;VALUE=DATE:20270131/);
  assert.match(out, /DTEND;VALUE=DATE:20270201/); assert.match(out, /SUMMARY:x\\, y/); assert.match(out, /END:VCALENDAR\r\n$/);
});
