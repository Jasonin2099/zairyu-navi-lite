(function(){
  var T={
    ja:{title:"在留手続きナビ Lite",h1:"在留期間更新と資格外活動",lead:"在留カードの期限を入れると、更新の申請期間と要点を表示します。",exp:"在留期限（カードの満了日）",from:"申請開始",until:"申請期限",left:"あと{n}日",over:"期限を過ぎています。至急、地方出入国在留管理官署へご相談ください。",src:"公式ページ",disc:"本ツールは出入国在留管理庁の公開情報に基づく目安であり、法的助言ではありません。必ず公式ページまたは外国人在留総合インフォメーションセンター（0570-013904）でご確認ください。確認日 2026-10-24"},
    zh:{title:"在留手续导航 Lite",h1:"在留期间更新与资格外活动",lead:"输入在留卡到期日，显示更新的申请期间和要点。",exp:"在留期限（卡上的到期日）",from:"可申请日",until:"申请截止",left:"还剩{n}天",over:"已超过期限，请尽快咨询地方出入国在留管理官署。",src:"官方页面",disc:"本工具基于出入国在留管理厅的公开信息，仅供参考，不构成法律建议。请务必以官方页面或外国人在留综合信息中心（0570-013904）为准。确认日 2026-10-24"},
    en:{title:"Residence Navi Lite",h1:"Renewal & part-time work permission",lead:"Enter your card's expiry date to see the renewal window and key points.",exp:"Period of stay expiry (card date)",from:"Apply from",until:"Apply by",left:"{n} days left",over:"Your expiry has passed. Contact your regional immigration office immediately.",src:"Official page",disc:"A guide based on public information from the Immigration Services Agency, not legal advice. Always check the official pages or the Immigration Information Center (0570-013904). Checked 2026-10-24"}
  };
  var L=localStorage.getItem("zl-lang")||(navigator.language||"ja").slice(0,2);if(!T[L])L="ja";
  var $=function(s){return document.querySelector(s)},exp=$("#exp");
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
  function fmt(d){return d.toISOString().slice(0,10)}
  function render(){
    var t=T[L];document.documentElement.lang=L==="zh"?"zh-CN":L;
    document.querySelectorAll("[data-i]").forEach(function(e){e.textContent=t[e.dataset.i]});
    document.querySelectorAll("#lang button").forEach(function(b){b.classList.toggle("on",b.dataset.l===L)});
    var h="",today=new Date(fmt(new Date())),e=exp.value?new Date(exp.value):null;
    PROCEDURES.forEach(function(p){
      h+='<div class="card"><h2>'+esc(p.name[L])+'</h2>';
      if(p.opensMonthsBefore&&e){
        var f=new Date(e);f.setMonth(f.getMonth()-p.opensMonthsBefore);
        var n=Math.round((e-today)/864e5);
        h+='<div>'+t.from+': <b>'+fmt(f)+'</b> / '+t.until+': <b>'+fmt(e)+'</b> '+(n<0?'<span class="bad">'+t.over+'</span>':'<span class="dl">'+t.left.replace("{n}",n)+'</span>')+'</div>';
      }
      h+='<p>'+esc(p.summary[L])+'</p><ul>'+p.notes[L].map(function(x){return"<li>"+esc(x)+"</li>"}).join("")+'</ul>';
      h+='<a href="'+p.src+'" target="_blank" rel="noopener">'+t.src+' ↗</a>'+(p.src2?' · <a href="'+p.src2+'" target="_blank" rel="noopener">'+t.src+' 2 ↗</a>':'')+'</div>';
    });
    $("#out").innerHTML=h;
  }
  $("#lang").addEventListener("click",function(ev){var l=ev.target.dataset.l;if(l){L=l;localStorage.setItem("zl-lang",l);render()}});
  exp.addEventListener("input",render);render();
})();
