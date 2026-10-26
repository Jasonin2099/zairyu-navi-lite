(function(){
  var T={
    ja:{title:"在留手続きナビ Lite",h1:"在留手続きタイムライン",lead:"在留期限と予定を入れると、手続きの締切・必要書類・公式ページをまとめます。",exp:"在留期限（カードの満了日）",plans:"これからの予定（任意）",grad:"卒業する",gradd:"卒業日",pjob:"就職",phunt:"就活継続",phome:"帰国",job:"転職する",quit:"契約終了日",move:"引っ越す",moved:"転居日",trip:"一時出国する",out:"出国日",back:"戻る予定日",from:"申請開始",until:"期限",left:"あと{n}日",over:"期限切れ",late:"戻る予定が期限を過ぎています。",docs:"主な書類",src:"公式ページ",need:"在留期限を入れてください。",disc:"本ツールは出入国在留管理庁の公開情報に基づく目安であり、法的助言ではありません。必ず公式ページまたは外国人在留総合インフォメーションセンター（0570-013904）でご確認ください。確認日 2026-10-24",priv:"入力内容はこの端末（localStorage）にのみ保存され、送信されません。"},
    zh:{title:"在留手续导航 Lite",h1:"在留手续时间线",lead:"输入在留期限和接下来的安排，自动整理截止日、所需材料和官方页面。",exp:"在留期限（卡上的到期日）",plans:"接下来的安排（可选）",grad:"将要毕业",gradd:"毕业日",pjob:"就职",phunt:"继续求职",phome:"回国",job:"将要换工作",quit:"合同结束日",move:"将要搬家",moved:"搬家日",trip:"临时出境",out:"出境日",back:"预计回来",from:"可申请日",until:"截止",left:"还剩{n}天",over:"已过期",late:"预计回来的日期超过了有效期。",docs:"主要材料",src:"官方页面",need:"请先输入在留期限。",disc:"本工具基于出入国在留管理厅的公开信息，仅供参考，不构成法律建议。请务必以官方页面或外国人在留综合咨询中心（0570-013904）为准。确认日 2026-10-24",priv:"输入内容仅保存在本设备（localStorage），不会上传。"},
    en:{title:"Residence Procedures Navi Lite",h1:"Your procedure timeline",lead:"Enter your card expiry and plans to see deadlines, documents and the official pages.",exp:"Period of stay ends on",plans:"Upcoming plans (optional)",grad:"Graduating",gradd:"Graduation date",pjob:"Employment",phunt:"Keep job hunting",phome:"Go home",job:"Changing jobs",quit:"Contract end date",move:"Moving",moved:"Moving date",trip:"Leaving Japan temporarily",out:"Departure",back:"Planned return",from:"Apply from",until:"Due",left:"{n} days left",over:"Overdue",late:"Your planned return is after the limit.",docs:"Main documents",src:"Official page",need:"Enter your period-of-stay end date.",disc:"A guide based on public information from the Immigration Services Agency, not legal advice. Always check the official pages or the Immigration Information Center (0570-013904). Checked 2026-10-24",priv:"Your entries stay on this device (localStorage) and are never sent."}
  };
  var K="zl-state",S=JSON.parse(localStorage.getItem(K)||"{}");S.sc=S.sc||{};S.d=S.d||{};S.ck=S.ck||{};
  var L=S.lang||(navigator.language||"ja").slice(0,2);if(!T[L])L="ja";
  var $=function(s){return document.querySelector(s)},$$=function(s){return document.querySelectorAll(s)};
  function save(){S.lang=L;localStorage.setItem(K,JSON.stringify(S))}
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
  function fmt(d){return d.toISOString().slice(0,10)}
  function D(s){return s?new Date(s):null}
  function add(d,days,months){var x=new Date(d);if(days)x.setDate(x.getDate()+days);if(months)x.setMonth(x.getMonth()+months);return x}
  // Compute {from,due} for a procedure given current inputs; exported for ics/tests.
  function timing(p,exp,d){
    var r={};
    if(p.opensMonthsBefore&&exp){r.from=add(exp,0,-p.opensMonthsBefore);r.due=exp}
    else if(p.dueFrom==="expiry")r.due=exp;
    else if(p.dueFrom&&d[p.dueFrom]){r.due=add(D(d[p.dueFrom]),p.dueDays,p.dueMonths);if(p.dueMonths&&exp&&exp<r.due)r.due=exp}
    return r;
  }
  function active(){return PROCEDURES.filter(function(p){
    if(p.scenario==="base")return true;if(!S.sc[p.scenario])return false;
    return !p.plan||p.plan===(S.plan||"job")})}
  window.ZL={timing:timing,active:active,state:S,T:T,lang:function(){return L},fmt:fmt,D:D};
  function render(){
    var t=T[L];document.documentElement.lang=L==="zh"?"zh-CN":L;
    $$("[data-i]").forEach(function(e){e.textContent=t[e.dataset.i]});
    $$("#lang button").forEach(function(b){b.classList.toggle("on",b.dataset.l===L)});
    $$("[data-sc]").forEach(function(c){c.checked=!!S.sc[c.dataset.sc];$('[data-for="'+c.dataset.sc+'"]').classList.toggle("on",c.checked)});
    $$("[data-d]").forEach(function(i){i.value=S.d[i.dataset.d]||""});$("#plan").value=S.plan||"job";$("#exp").value=S.exp||"";
    var exp=D(S.exp),today=new Date(fmt(new Date())),h=exp?"":'<div class="card"><span class="bad">'+t.need+'</span></div>';
    active().map(function(p){return{p:p,r:timing(p,exp,S.d)}}).sort(function(a,b){return(a.r.due||8e15)-(b.r.due||8e15)}).forEach(function(o){
      var p=o.p,r=o.r;h+='<div class="card"><h2>'+esc(p.name[L])+'</h2>';
      if(r.due){var n=Math.round((r.due-today)/864e5);
        h+='<div>'+(r.from?t.from+': <b>'+fmt(r.from)+'</b> / ':'')+t.until+': <b>'+fmt(r.due)+'</b> '+(n<0?'<span class="bad">'+t.over+'</span>':'<span class="dl">'+t.left.replace("{n}",n)+'</span>')+'</div>'}
      if(p.id==="special-reentry"&&r.due&&S.d.back&&D(S.d.back)>r.due)h+='<div class="bad">'+t.late+'</div>';
      h+='<p>'+esc(p.summary[L])+'</p>';
      if(p.notes[L].length)h+='<ul>'+p.notes[L].map(function(x){return"<li>"+esc(x)+"</li>"}).join("")+'</ul>';
      if(p.docs[L].length)h+='<div class="sec">'+t.docs+'</div><ul class="docs">'+p.docs[L].map(function(x,i){var k=p.id+":"+i,c=S.ck[k];return'<li class="'+(c?"done":"")+'"><label><input type="checkbox" data-ck="'+k+'"'+(c?" checked":"")+'>'+esc(x)+'</label></li>'}).join("")+'</ul>';
      h+=p.src.map(function(u,i){return'<a href="'+u+'" target="_blank" rel="noopener">'+t.src+(p.src.length>1?" "+(i+1):"")+' ↗</a>'}).join(" · ")+'</div>';
    });
    $("#out").innerHTML=h;
  }
  document.addEventListener("change",function(e){var x=e.target;
    if(x.id==="exp")S.exp=x.value;else if(x.dataset.sc)S.sc[x.dataset.sc]=x.checked;else if(x.dataset.d)S.d[x.dataset.d]=x.value;
    else if(x.id==="plan")S.plan=x.value;else if(x.dataset.ck)S.ck[x.dataset.ck]=x.checked;else return;save();render()});
  $("#lang").addEventListener("click",function(e){var l=e.target.dataset.l;if(l){L=l;save();render()}});
  window.ZL.render=render;render();
})();
