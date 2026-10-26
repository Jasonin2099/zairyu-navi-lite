# Changelog

## 0.2.1 — 2026-10-27
- Fixed: a renewal window for an expiry on the 31st opened on the 3rd of the month instead of the last day of the month 3 months earlier (05-31 → 02-28)
- Fixed: "days left" was one too high between midnight and 09:00 in Japan
- Fixed: `.ics` events on a US DST change day ended on the same day
- Date maths moved to `dates.js` (UTC calendar dates, month-end clamping) with tests
- `npm test` works on Node 22+; GitHub Actions runs it on Node 18–24 in two time zones

## 0.2.0 — 2026-10-26
- Added scenarios: graduation (employment / job hunting / going home), job change, moving, special re-entry
- Document lists per procedure with checklist saved in localStorage
- Timeline sorted by deadline; .ics calendar export; print stylesheet
- Data validation script and tests (`npm test`)

## 0.1.0 — 2026-10-26
- Initial release: period-of-stay renewal and part-time work permission, ja/zh/en
