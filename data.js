// Procedure data. Every fact comes from the official 出入国在留管理庁 (ISA) pages in `src`.
// Last checked: 2026-10-24. Not legal advice.
// Fields: id, name, summary, notes[], docs[] (ja/zh/en), src[], optional:
//   opensMonthsBefore (renewal window), dueDays + dueFrom (deadline N days after a user date), scenario.
var ISA = "https://www.moj.go.jp/isa/";
var PROCEDURES = [
  {
    id: "renewal", scenario: "base",
    name: { ja: "在留期間更新許可申請", zh: "在留期间更新许可申请", en: "Extension of period of stay" },
    opensMonthsBefore: 3,
    summary: {
      ja: "今の在留資格のまま期限後も滞在する場合。住居地を管轄する地方出入国在留管理官署へ。オンライン申請も可。標準処理期間は2週間〜1か月。",
      zh: "以现有在留资格在到期后继续居留时办理。向管辖住址的地方出入国在留管理官署申请，也可在线申请。标准处理时间为2周至1个月。",
      en: "To stay past the expiry with the same status. Apply at the regional immigration office for your address, or online. Standard processing: 2 weeks to 1 month."
    },
    notes: {
      ja: ["在留期間が6か月以上の方は、期限の3か月前から申請できます。", "期限までに申請すれば、結果が出るまで（最長で期限から2か月）は在留できます（特例期間）。", "手数料は許可期間で異なります（例：窓口・1年 33,000円）。"],
      zh: ["在留期间6个月以上者，可在到期前3个月起申请。", "期限前提交申请的话，在出结果前（最长到期后2个月）可以合法居留（特例期间）。", "手续费因许可期间而异（例：窗口・1年 33,000日元）。"],
      en: ["If your period of stay is 6 months or more, you can apply from 3 months before expiry.", "If you apply before expiry, you may stay until the decision, up to 2 months after expiry (special period).", "Fee depends on the period granted (e.g. counter, 1 year: ¥33,000)."]
    },
    docs: {
      ja: ["在留期間更新許可申請書", "写真1葉", "パスポート・在留カード（提示）", "在留資格ごとの資料（公式ページで確認）"],
      zh: ["在留期间更新许可申请书", "照片1张", "护照、在留卡（出示）", "各资格对应的材料（以官方页面为准）"],
      en: ["Application form", "1 photo", "Passport and residence card (shown)", "Documents for your status (see official page)"]
    },
    src: [ISA + "applications/procedures/16-3.html"]
  },
  {
    id: "parttime", scenario: "base",
    name: { ja: "資格外活動許可（アルバイト）", zh: "资格外活动许可（打工）", en: "Permission for activity outside status (part-time work)" },
    summary: {
      ja: "アルバイトを始める前に許可が必要。包括許可は週28時間以内。",
      zh: "开始打工前必须取得许可。包括许可为每周28小时以内。",
      en: "You need permission before starting part-time work. Blanket permission: up to 28 hours a week."
    },
    notes: {
      ja: ["留学は学則の長期休業中に限り1日8時間以内。", "許可の有無は在留カード裏面の許可欄で確認できます。"],
      zh: ["留学生仅在学校规定的长假期间每天8小时以内。", "可在在留卡背面的许可栏确认是否已获许可。"],
      en: ["Students: up to 8 hours a day during the school's long vacations.", "Shown on the back of the residence card."]
    },
    docs: {
      ja: ["資格外活動許可申請書", "パスポート・在留カード（提示）"],
      zh: ["资格外活动许可申请书", "护照、在留卡（出示）"],
      en: ["Application form", "Passport and residence card (shown)"]
    },
    src: [ISA + "applications/procedures/nyuukokukanri07_00045.html", ISA + "applications/procedures/nyuukokukanri07_00003.html"]
  },
  {
    id: "school-notice", scenario: "grad", dueFrom: "grad", dueDays: 14,
    name: { ja: "所属機関（活動機関）に関する届出", zh: "所属机关（活动机关）申报", en: "Notification of affiliated organization (school)" },
    summary: {
      ja: "卒業・退学などで学校を離れた日から14日以内。電子届出システム・窓口・郵送で可。",
      zh: "因毕业、退学等离开学校之日起14天内。可通过电子申报系统、窗口或邮寄。",
      en: "Within 14 days of leaving the school (graduation etc.). Online, at a counter or by post."
    },
    notes: { ja: [], zh: [], en: [] },
    docs: { ja: ["在留カード（窓口は提示、郵送は写し）"], zh: ["在留卡（窗口出示，邮寄附复印件）"], en: ["Residence card (shown, or a copy by post)"] },
    src: [ISA + "applications/procedures/nyuukokukanri10_00014.html"]
  },
  {
    id: "change-job", scenario: "grad", plan: "job", dueFrom: "expiry",
    name: { ja: "在留資格変更許可申請（就職）", zh: "在留资格变更许可申请（就职）", en: "Change of status (employment)" },
    summary: {
      ja: "就職先の仕事に合う就労資格（例：技術・人文知識・国際業務）へ変更。今の期限までに申請。",
      zh: "变更为与工作内容相符的工作签证（如技术·人文知识·国际业务）。须在现有期限前申请。",
      en: "Change to a work status matching the job (e.g. Engineer/Specialist in Humanities/International Services). Apply before your current expiry."
    },
    notes: { ja: [], zh: [], en: [] },
    docs: {
      ja: ["在留資格変更許可申請書", "写真1葉", "パスポート・在留カード（提示）", "就職先・学歴に関する資料（公式ページで確認）"],
      zh: ["在留资格变更许可申请书", "照片1张", "护照、在留卡（出示）", "就职单位及学历相关材料（以官方页面为准）"],
      en: ["Application form", "1 photo", "Passport and residence card (shown)", "Employer and education documents (see official page)"]
    },
    src: [ISA + "applications/procedures/16-2.html"]
  },
  {
    id: "jobhunt", scenario: "grad", plan: "hunt", dueFrom: "expiry",
    name: { ja: "特定活動（継続就職活動）への変更", zh: "变更为特定活动（继续求职）", en: "Change to Designated Activities (job hunting)" },
    summary: {
      ja: "卒業後も就活を続ける場合。在留期間6か月、さらに1回更新で卒業後最長1年。卒業前から就活していることなどが条件。卒業前でも推薦状・卒業見込み証明書があれば申請可。",
      zh: "毕业后继续求职时办理。在留期间6个月，可再更新1次，毕业后最长1年。条件包括毕业前已开始求职等。毕业前凭推荐信和预计毕业证明也可申请。",
      en: "To keep job hunting after graduation: 6 months, renewable once, up to 1 year after graduation. You must have been job hunting before graduating, among other conditions. Can apply before graduation with a recommendation and expected-graduation certificate."
    },
    notes: { ja: [], zh: [], en: [] },
    docs: {
      ja: ["在留資格変更許可申請書", "写真1葉", "大学の推薦状", "卒業証書（写し）又は卒業証明書", "経費支弁能力を証する文書", "就職活動を続けていることの資料"],
      zh: ["在留资格变更许可申请书", "照片1张", "大学推荐信", "毕业证书（复印件）或毕业证明", "经费支付能力证明", "正在求职的证明材料"],
      en: ["Application form", "1 photo", "Recommendation from your school", "Diploma (copy) or graduation certificate", "Proof of ability to pay expenses", "Proof of ongoing job hunting"]
    },
    src: [ISA + "applications/status/designatedactivities14.html", ISA + "applications/resources/nyukan_nyukan84.html"]
  },
  {
    id: "go-home", scenario: "grad", plan: "home", dueFrom: "expiry",
    name: { ja: "帰国の準備", zh: "回国准备", en: "Preparing to go home" },
    summary: {
      ja: "帰国する場合、在留期限までに出国します。学校の届出（14日以内）も忘れずに。",
      zh: "回国的话须在在留期限前出境。别忘了学校相关的申报（14天内）。",
      en: "Leave Japan by your expiry. Remember the school notification (within 14 days)."
    },
    notes: { ja: [], zh: [], en: [] }, docs: { ja: [], zh: [], en: [] },
    src: [ISA + "applications/procedures/nyuukokukanri10_00014.html"]
  },
  {
    id: "contract-notice", scenario: "job", dueFrom: "quit", dueDays: 14,
    name: { ja: "所属機関（契約機関）に関する届出", zh: "所属机关（契约机关）申报", en: "Notification of contracting organization" },
    summary: {
      ja: "契約終了・新しい契約の日からそれぞれ14日以内。電子届出システム・窓口・郵送で可。",
      zh: "合同结束、签新合同之日起各14天内。可通过电子申报系统、窗口或邮寄。",
      en: "Within 14 days of the contract ending and of the new contract. Online, at a counter or by post."
    },
    notes: {
      ja: ["技人国：転職後も同じ資格で働く場合、「就労資格証明書」で確認することもできます（任意）。"],
      zh: ["技人国：换工作后若仍以同一资格工作，也可申请“就劳资格证明书”确认（非必须）。"],
      en: ["Engineer/Humanities: if you keep the same status after changing jobs, you may apply for a Certificate of Authorized Employment (optional)."]
    },
    docs: { ja: ["在留カード（窓口は提示、郵送は写し）"], zh: ["在留卡（窗口出示，邮寄附复印件）"], en: ["Residence card (shown, or a copy by post)"] },
    src: [ISA + "applications/procedures/nyuukokukanri10_00015.html"]
  },
  {
    id: "address", scenario: "move", dueFrom: "move", dueDays: 14,
    name: { ja: "住居地の届出", zh: "住址申报", en: "Notify new address" },
    summary: {
      ja: "転居した日から14日以内に、転居先の市区町村窓口へ。転入届・転居届と一緒にできます。",
      zh: "搬家后14天内，到新住址的市区町村窗口申报，可与转入/转居申报一起办。",
      en: "Within 14 days of moving, at the new city/ward office. Can be done with the moving-in notification."
    },
    notes: { ja: [], zh: [], en: [] },
    docs: { ja: ["在留カード"], zh: ["在留卡"], en: ["Residence card"] },
    src: [ISA + "publications/faq/newimmiact_4_port-city.html"]
  },
  {
    id: "special-reentry", scenario: "trip", dueFrom: "out", dueMonths: 12,
    name: { ja: "みなし再入国許可で出国", zh: "以视为再入国许可出境", en: "Leave with special re-entry permission" },
    summary: {
      ja: "出国時に再入国EDカードの「一時的な出国」にチェックし、審査官に伝える。有効期間は出国から1年、ただし在留期限が先ならその日まで。海外で延長はできません。",
      zh: "出境时在再入国ED卡上勾选“一时出国”，并告知审查官。有效期为出境后1年，若在留期限更早则以期限为准。在海外不能延长。",
      en: "Tick “temporary departure” on the re-entry ED card and tell the officer. Valid 1 year from departure, or until your expiry if earlier. It cannot be extended abroad."
    },
    notes: {
      ja: ["戻る予定が期限を過ぎる場合、再入国許可（通常）の取得か予定の見直しが必要です。"],
      zh: ["预计回来的日期超过了有效期时，需要办理普通再入国许可或调整计划。"],
      en: ["If your planned return is after the limit, get a regular re-entry permit or change your plans."]
    },
    docs: { ja: ["有効なパスポート", "在留カード"], zh: ["有效护照", "在留卡"], en: ["Valid passport", "Residence card"] },
    src: [ISA + "immigration/procedures/minashisainyukoku_00001.html", ISA + "immigration/faq/kanri_qa.html"]
  }
];
if (typeof window !== "undefined") window.PROCEDURES = PROCEDURES;
if (typeof module !== "undefined") module.exports = PROCEDURES;
