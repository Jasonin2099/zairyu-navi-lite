# zairyu-navi-lite · 在留手続きナビ Lite

A tiny static (HTML/CSS/JS, no backend, no tracking) guide to common residence procedures in Japan for international students and workers.
Enter your card's expiry date and it shows when you can apply, plus links to the official pages.

## 日本語
在留期限と予定（卒業・転職・引っ越し・一時出国）を入力すると、締切・必要書類・公式ページをまとめる軽量な静的サイトです。データは `data.js` にあり、すべて出入国在留管理庁の公開情報に基づき出典を付けています。

## 中文
输入在留期限和接下来的安排（毕业、换工作、搬家、临时出境），自动整理截止日、所需材料和官方页面。纯静态，无后台，不收集任何数据。所有内容均附出入国在留管理厅官方出处。

## Features
- Scenarios synced from the full version: period-of-stay renewal, part-time work permission, graduation (employment / continued job hunting / going home), job change, moving, temporary departure with special re-entry permission
- Timeline sorted by deadline, with days left and overdue warnings
- Document checklist per procedure, progress saved in `localStorage` (nothing is uploaded)
- `.ics` calendar export of deadlines (generated in the browser, 7-day reminder)
- Print-friendly layout with source URLs, automatic dark mode, ja / zh / en

## Development
```
npm test   # validates data.js (3 languages, official ISA sources) and runs tests
```
See [CONTRIBUTING.md](CONTRIBUTING.md) and [CHANGELOG.md](CHANGELOG.md).

## Usage
Open `index.html` in a browser, or serve the folder with any static host (e.g. GitHub Pages).

## Official sources / 公式情報
- 出入国在留管理庁: https://www.moj.go.jp/isa/
- 在留期間更新許可申請: https://www.moj.go.jp/isa/applications/procedures/16-3.html
- 資格外活動許可について: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00045.html
- 「留学」の資格外活動許可: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00003.html
- 在留資格変更許可申請: https://www.moj.go.jp/isa/applications/procedures/16-2.html
- 所属機関に関する届出: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00014.html / nyuukokukanri10_00015.html
- 卒業後の就職活動: https://www.moj.go.jp/isa/applications/status/designatedactivities14.html
- みなし再入国許可: https://www.moj.go.jp/isa/immigration/procedures/minashisainyukoku_00001.html

## Disclaimer / 免責 / 免责声明
This is **not legal advice**. Requirements depend on your situation and may change. Always check the official pages above, your regional immigration office, or the Immigration Information Center (0570-013904).
本ツールは法的助言ではありません。必ず公式情報・地方出入国在留管理官署でご確認ください。
本工具不构成法律建议，请务必以官方信息为准。

Content last checked: 2026-10-24. License: MIT.
