// Procedure data. Every fact is taken from the official 出入国在留管理庁 (ISA) pages in `src`.
// Last checked: 2026-10-24. Not legal advice.
window.PROCEDURES = [
  {
    id: "renewal",
    name: { ja: "在留期間更新許可申請", zh: "在留期间更新许可申请", en: "Extension of period of stay" },
    opensMonthsBefore: 3, // can apply from 3 months before expiry (for stays of 6 months or more)
    summary: {
      ja: "今の在留資格のまま期限後も滞在する場合。住居地を管轄する地方出入国在留管理官署へ。オンライン申請も可。標準処理期間は2週間〜1か月。",
      zh: "以现有在留资格在到期后继续居留时办理。向管辖住址的地方出入国在留管理官署申请，也可在线申请。标准处理时间为2周至1个月。",
      en: "To stay past the expiry with the same status. Apply at the regional immigration office for your address, or online. Standard processing: 2 weeks to 1 month."
    },
    notes: {
      ja: ["在留期間が6か月以上の方は、期限の3か月前から申請できます。", "期限までに申請すれば、結果が出るまで（最長で期限から2か月）は在留できます（特例期間）。", "手数料は許可期間・申請方法で異なります（例：窓口・1年 33,000円）。"],
      zh: ["在留期间6个月以上者，可在到期前3个月起申请。", "期限前提交申请的话，在出结果前（最长到期后2个月）可以合法居留（特例期间）。", "手续费因许可期间和申请方式而异（例：窗口・1年 33,000日元）。"],
      en: ["If your period of stay is 6 months or more, you can apply from 3 months before expiry.", "If you apply before expiry, you may stay until the decision, up to 2 months after expiry (special period).", "The fee depends on the period granted and how you apply (e.g. counter, 1 year: 33,000 yen)."]
    },
    src: "https://www.moj.go.jp/isa/applications/procedures/16-3.html"
  },
  {
    id: "parttime",
    name: { ja: "資格外活動許可（アルバイト）", zh: "资格外活动许可（打工）", en: "Permission for part-time work" },
    summary: {
      ja: "アルバイトを始める前に許可が必要。包括許可は週28時間以内。",
      zh: "开始打工前必须取得许可。包括许可为每周28小时以内。",
      en: "You need permission before starting part-time work. Blanket permission: up to 28 hours a week."
    },
    notes: {
      ja: ["留学は学則の長期休業中に限り1日8時間以内。", "許可の有無は在留カード裏面の許可欄で確認できます。"],
      zh: ["留学生仅在学校规定的长假期间每天8小时以内。", "可在在留卡背面的许可栏确认是否已获许可。"],
      en: ["Students: up to 8 hours a day during the school's long vacations.", "Check the permission field on the back of your residence card."]
    },
    src: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00045.html",
    src2: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00003.html"
  }
];
