const test = require("node:test"), assert = require("node:assert");
const d = require("../dates.js");
const f = (x) => d.fmt(x);

test("parse / fmt round-trip, bad input is null", () => {
  assert.strictEqual(f(d.parse("2027-05-31")), "2027-05-31");
  ["", null, "2027-5-31", "2027-02-30x", "nope"].forEach((s) => assert.strictEqual(d.parse(s), null, s));
});
test("months: month-end clamps instead of spilling into the next month", () => {
  assert.strictEqual(f(d.addMonths(d.parse("2027-05-31"), -3)), "2027-02-28");
  assert.strictEqual(f(d.addMonths(d.parse("2028-05-31"), -3)), "2028-02-29");
  assert.strictEqual(f(d.addMonths(d.parse("2028-02-29"), 12)), "2029-02-28");
  assert.strictEqual(f(d.addMonths(d.parse("2027-01-15"), -3)), "2026-10-15");
  assert.strictEqual(f(d.addMonths(d.parse("2026-11-30"), 3)), "2027-02-28");
});
test("days cross month, year and DST boundaries cleanly", () => {
  assert.strictEqual(f(d.addDays(d.parse("2027-03-20"), 14)), "2027-04-03");
  assert.strictEqual(f(d.addDays(d.parse("2026-12-25"), 14)), "2027-01-08");
  assert.strictEqual(f(d.addDays(d.parse("2027-03-14"), 1)), "2027-03-15"); // US DST starts
  assert.strictEqual(f(d.addDays(d.parse("2026-11-01"), 1)), "2026-11-02"); // US DST ends
});
test("today is the local calendar date", () => {
  const morning = new Date(2026, 9, 27, 7, 30); // 07:30 local
  assert.strictEqual(f(d.today(morning)), "2026-10-27");
  const late = new Date(2026, 9, 27, 23, 59);
  assert.strictEqual(f(d.today(late)), "2026-10-27");
  assert.strictEqual(d.daysBetween(d.today(morning), d.parse("2026-11-10")), 14);
});
