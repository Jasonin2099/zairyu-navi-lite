// Client-side .ics export of procedure deadlines (no server involved).
(function(root){
  function ymd(d){return d.toISOString().slice(0,10).replace(/-/g,"")}
  function escTxt(s){return String(s).replace(/[\\;,]/g,function(c){return"\\"+c}).replace(/\n/g,"\\n")}
  function build(items,stamp){
    var out=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//zairyu-navi-lite//EN","CALSCALE:GREGORIAN"];
    items.forEach(function(it,i){
      var end=new Date(it.date);end.setUTCDate(end.getUTCDate()+1); // UTC: a DST change must not move the end date
      out.push("BEGIN:VEVENT","UID:"+it.id+"-"+ymd(it.date)+"@zairyu-navi-lite","DTSTAMP:"+stamp,
        "DTSTART;VALUE=DATE:"+ymd(it.date),"DTEND;VALUE=DATE:"+ymd(end),"SUMMARY:"+escTxt(it.title),
        "DESCRIPTION:"+escTxt(it.url),"BEGIN:VALARM","ACTION:DISPLAY","DESCRIPTION:"+escTxt(it.title),"TRIGGER:-P7D","END:VALARM","END:VEVENT");
    });
    out.push("END:VCALENDAR");return out.join("\r\n")+"\r\n";
  }
  root.ZLics={build:build};
  if(typeof module!=="undefined")module.exports={build:build};
})(typeof window!=="undefined"?window:globalThis);
