// Calendar-date helpers. A date is a Date at UTC midnight ("2027-05-31" → 2027-05-31T00:00Z),
// so adding days or months never depends on the browser's time zone or DST.
(function(root){
  function parse(s){if(!s||!/^\d{4}-\d{2}-\d{2}$/.test(s))return null;var d=new Date(s+"T00:00:00Z");return isNaN(d)?null:d}
  function fmt(d){return d.toISOString().slice(0,10)}
  function addDays(d,n){var x=new Date(d);x.setUTCDate(x.getUTCDate()+n);return x}
  // Same day n months later (or earlier). When that month is shorter, the last day of the
  // month: 3 months before 05-31 is 02-28, like the civil-code rule ISA deadlines follow.
  function addMonths(d,n){
    var y=d.getUTCFullYear(),m=d.getUTCMonth()+n,day=d.getUTCDate();
    var last=new Date(Date.UTC(y,m+1,0)).getUTCDate();
    return new Date(Date.UTC(y,m,Math.min(day,last)));
  }
  // Today's date where the user is (not in UTC: before 9:00 in Japan, UTC is still yesterday).
  function today(now){now=now||new Date();return new Date(Date.UTC(now.getFullYear(),now.getMonth(),now.getDate()))}
  function daysBetween(a,b){return Math.round((b-a)/864e5)}
  var api={parse:parse,fmt:fmt,addDays:addDays,addMonths:addMonths,today:today,daysBetween:daysBetween};
  root.ZLdates=api;
  if(typeof module!=="undefined")module.exports=api;
})(typeof window!=="undefined"?window:globalThis);
