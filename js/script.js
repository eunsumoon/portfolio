/* =========================================================
   0) SITE_BASE
   각 HTML 페이지 상단에서 아래처럼 한 줄을 지정해줍니다.
     루트(index.html):        <script>window.SITE_BASE = "";</script>
     하위 폴더(about/, works/ 등): <script>window.SITE_BASE = "../";</script>
   이 값 덕분에 어느 페이지에서 검색하든 작업물 상세 페이지로
   정확한 경로로 이동할 수 있습니다.
   ========================================================= */
const BASE = window.SITE_BASE || "";

/* =========================================================
   1) UI 번역 데이터 (메뉴, 문구 등 — 화면 구성 요소용)
   새 문구를 추가하려면 ko / en / ja 세 군데에 같은 key로 넣어주세요.
   ========================================================= */
const translations = {
  ko: {
    "meta.title": "eunsumoon.com",
    "nav.about": "소개",
    "nav.works": "작업",
    "nav.contact": "연락처",
    "about.role": "비주얼 커뮤니케이션 디자이너",
    "about.name": "문은수",
    "about.statement": "좋은 디자인은 화려한 기교가 아니라 정확한 커뮤니케이션에서 시작됩니다. 기술에 기대기보다, 아이디어가 가장 잘 전달되는 형태를 찾는 데 집중하겠습니다.",
    "about.label.practice": "작업 분야",
    "about.value.practice": "브랜드 아이덴티티<br>그래픽 디자인<br>편집 디자인<br>타이포그래피<br>디지털 캠페인<br>패키지<br>모션 그래픽",
    "about.label.tools": "툴",
    "about.label.available": "협업 가능 분야",
    "about.value.available": "프리랜스 프로젝트<br>브랜드 협업<br>전시 그래픽<br>편집 디자인 의뢰",
    "about.label.languages": "언어",
    "about.value.languages": "영어<br>한국어<br>일본어",
    "about.label.recognition": "수상",
    "brand.welcome": "eunsumoon.com에 오신 것을 환영합니다",
    "home.cta": "작업 확인하기",
    "home.note": "이력서 및 추가 자료는 요청 시 제공해드립니다.<br><a href=\"contact/\">컨택트 폼</a>을 통해 요청해주세요.",
    "contact.lead": "새로운 작업 제안, 협업 문의를 기다리고 있습니다.",
    "contact.form.name": "이름",
    "contact.form.phone": "전화번호 (선택)",
    "contact.form.email": "이메일",
    "contact.form.message": "문의 내용",
    "contact.form.submit": "보내기",
    "contact.form.sending": "보내는 중...",
    "contact.form.success": "메시지가 전송되었습니다. 감사합니다!",
    "contact.form.error": "전송에 실패했습니다. contact@eunsumoon.com으로 직접 메일 보내주세요.",
    "footer.cookiepolicy": "쿠키 정책",
    "cookie.text": "이 사이트는 더 나은 경험 제공을 위해 쿠키를 사용합니다. 계속 이용하시면 쿠키 사용에 동의하는 것으로 간주됩니다.",
    "cookie.viewpolicy": "쿠키 정책 보기",
    "cookie.accept": "동의",
    "cookie.decline": "거부",
    "search.trigger": "검색",
    "search.noresults": "검색 결과가 없습니다.",
    "work.back": "← 작업물 목록으로",
    "work.rolelabel": "역할",
    "work.clientlabel": "클라이언트",
    "work.contributionlabel": "기여도",
    "work.responsibilitieslabel": "담당 업무",
    "work.yearlabel": "연도",
    "work.awardlabel": "수상",
    "work.prev": "이전 작업",
    "work.next": "다음 작업",
    "notfound.title": "페이지를 찾을 수 없어요",
    "notfound.body": "요청하신 페이지가 삭제되었거나, 주소가 잘못 입력된 것 같아요.",
    "notfound.cta": "홈으로 돌아가기"
  },
  en: {
    "meta.title": "eunsumoon.com",
    "nav.about": "About",
    "nav.works": "Works",
    "nav.contact": "Contact",
    "about.role": "Visual Communication Designer",
    "about.name": "Eunsu Moon",
    "about.statement": "Good design begins not with flashy technique, but with precise communication. Rather than relying on technique, the focus is on finding the form in which an idea is delivered best.",
    "about.label.practice": "Areas of Practice",
    "about.value.practice": "Brand Identity<br>Graphic Design<br>Editorial Design<br>Typography<br>Digital Campaign<br>Packaging<br>Motion Graphics",
    "about.label.tools": "Tools",
    "about.label.available": "Available for",
    "about.value.available": "Freelance projects<br>Brand collaborations<br>Exhibition graphics<br>Editorial commissions",
    "about.label.languages": "Languages",
    "about.value.languages": "English<br>Korean<br>Japanese",
    "about.label.recognition": "Recognition",
    "brand.welcome": "Welcome to eunsumoon.com",
    "home.cta": "View Works",
    "home.note": "CV and additional information are available upon request.<br>Please use the <a href=\"contact/\">contact form</a> to request a copy.",
    "contact.lead": "Open to new projects and collaborations.",
    "contact.form.name": "Name",
    "contact.form.phone": "Phone (optional)",
    "contact.form.email": "Email",
    "contact.form.message": "Message",
    "contact.form.submit": "Send",
    "contact.form.sending": "Sending...",
    "contact.form.success": "Your message has been sent. Thank you!",
    "contact.form.error": "Something went wrong. Please email contact@eunsumoon.com directly.",
    "footer.cookiepolicy": "Cookie Policy",
    "cookie.text": "This site uses cookies to improve your experience. By continuing to browse, you agree to our use of cookies.",
    "cookie.viewpolicy": "View Cookie Policy",
    "cookie.accept": "Accept",
    "cookie.decline": "Decline",
    "search.trigger": "Search",
    "search.noresults": "No results found.",
    "work.back": "← Back to Works",
    "work.rolelabel": "Role",
    "work.clientlabel": "Client",
    "work.contributionlabel": "Contribution",
    "work.responsibilitieslabel": "Responsibilities",
    "work.yearlabel": "Year",
    "work.awardlabel": "Award",
    "work.prev": "Previous",
    "work.next": "Next",
    "notfound.title": "Page not found",
    "notfound.body": "The page you're looking for may have been removed or the address may be incorrect.",
    "notfound.cta": "Back to Home"
  },
  ja: {
    "meta.title": "eunsumoon.com",
    "nav.about": "プロフィール",
    "nav.works": "作品",
    "nav.contact": "お問い合わせ",
    "about.role": "ビジュアルコミュニケーションデザイナー",
    "about.name": "ムン ウンス",
    "about.statement": "良いデザインは、華やかなテクニックではなく、正確なコミュニケーションから始まります。技術に頼るのではなく、アイデアが最も良く伝わるかたちを見つけることに焦点を置いています。",
    "about.label.practice": "業務領域",
    "about.value.practice": "ブランドアイデンティティ<br>グラフィックデザイン<br>エディトリアルデザイン<br>タイポグラフィ<br>デジタルキャンペーン<br>パッケージ<br>モーショングラフィックス",
    "about.label.tools": "ツール",
    "about.label.available": "対応可能な業務",
    "about.value.available": "フリーランスプロジェクト<br>ブランドコラボレーション<br>展示グラフィック<br>エディトリアルのご依頼",
    "about.label.languages": "言語",
    "about.value.languages": "英語<br>韓国語<br>日本語",
    "about.label.recognition": "受賞歴",
    "brand.welcome": "eunsumoon.comへようこそ",
    "home.cta": "作品を見る",
    "home.note": "履歴書およびその他の資料はご要望に応じてご提供いたします。<br><a href=\"contact/\">お問い合わせフォーム</a>よりご請求ください。",
    "contact.lead": "新しいご依頼・コラボレーションのご連絡をお待ちしています。",
    "contact.form.name": "お名前",
    "contact.form.phone": "電話番号(任意)",
    "contact.form.email": "メールアドレス",
    "contact.form.message": "お問い合わせ内容",
    "contact.form.submit": "送信",
    "contact.form.sending": "送信中...",
    "contact.form.success": "メッセージを送信しました。ありがとうございます!",
    "contact.form.error": "送信に失敗しました。contact@eunsumoon.comまで直接ご連絡ください。",
    "footer.cookiepolicy": "Cookieポリシー",
    "cookie.text": "当サイトでは、より良い体験を提供するためにCookieを使用しています。閲覧を続けると、Cookieの使用に同意したことになります。",
    "cookie.viewpolicy": "Cookieポリシーを見る",
    "cookie.accept": "同意",
    "cookie.decline": "拒否",
    "search.trigger": "検索",
    "search.noresults": "検索結果がありません。",
    "work.back": "← 作品一覧へ",
    "work.rolelabel": "役割",
    "work.clientlabel": "クライアント",
    "work.contributionlabel": "貢献度",
    "work.responsibilitieslabel": "担当業務",
    "work.yearlabel": "年度",
    "work.awardlabel": "受賞",
    "work.prev": "前の作品",
    "work.next": "次の作品",
    "notfound.title": "ページが見つかりません",
    "notfound.body": "お探しのページは削除されたか、URLが間違っている可能性があります。",
    "notfound.cta": "ホームに戻る"
  }
};

/* =========================================================
   2) 작업물 데이터 (Works) — 단 하나의 기준(source of truth)
   작업물을 추가/수정/삭제하려면 이 배열만 고치면 됩니다.
   새 작업물을 추가할 땐:
     1) 아래 배열에 항목을 하나 추가하고
     2) works/project-05.html 처럼 상세 페이지 파일을
        기존 project-01.html을 복사해서 만든 뒤
        <main data-work-id="..."> 값만 새 id로 바꿔주면 됩니다.
   ========================================================= */
const worksData = [
  {
    id: "01",
    year: "2023",
    url: "works/project-01.html",
    image: "images/works/Busan%20Initiative/thumb.png",
    hero: "images/works/Busan%20Initiative/hero.png",
    gallery: [
      "images/works/Busan%20Initiative/gallery-01.png",
      "images/works/Busan%20Initiative/gallery-02.png",
      "images/works/Busan%20Initiative/gallery-03.png",
      "images/works/Busan%20Initiative/gallery-04.png",
      "images/works/Busan%20Initiative/gallery-05.png",
      "images/works/Busan%20Initiative/gallery-06.webp",
      "images/works/Busan%20Initiative/gallery-07.webp",
      "images/works/Busan%20Initiative/gallery-08.webp",
      "images/works/Busan%20Initiative/gallery-09.webp",
      "images/works/Busan%20Initiative/gallery-10.webp"
    ],
    titles: { ko: "Busan Initiative", en: "Busan Initiative", ja: "Busan Initiative" },
    tags:   { ko: "브랜딩", en: "Branding", ja: "ブランディング" },
    descs: {
      ko: "Busan Initiative는 부산에서 개최되는 2030 세계박람회(World EXPO) 유치를 위해 대한민국 정부가 에델만 코리아(Edelman Korea)에 의뢰한 전략 브랜딩 프로젝트입니다. 정부는 2030 세계박람회 유치를 위한 6가지 핵심 전략을 수립했고, 이 모든 전략을 아우를 수 있는 키비주얼과 로고를 요청했습니다. 프로젝트는 로고, 슬로건, 폰트, 키비주얼 디자인을 아우르며, 전문적이면서도 간결한 분위기를 유지하는 데 중점을 두었습니다.\n\n디자인은 6가지 전략을 상징하는 7개 레이어의 정사각형으로 구성되어 있으며, 이는 부산광역시와 대한민국 정부가 2030 세계박람회 유치를 위해 추진한 활동인 코너스톤 프로젝트(Cornerstone Projects)와 인사이트 부산(Insight Busan)으로 이루어져 있습니다. 이 7개의 정사각형은 'BUSAN'이라는 단어 왼쪽에 배치되어 완전한 직사각형 비율을 이루며, 다양한 포맷에 쉽게 적용할 수 있도록 설계되었습니다.",
      en: "Busan Initiative is the strategic branding commissioned by the South Korean government to Edelman Korea for attracting the hosting rights of World EXPO 2030 in Busan, Korea. The government devised six key strategies for securing the World EXPO 2030, and they requested a key visual and logo that could encompass all these strategies. The project involved designing the logo, slogan, font, and key visual, all with a focus on maintaining a professional and concise atmosphere.\n\nThe design features seven layers of squares symbolizing the 6 strategies consisting Cornerstone Projects and Insight Busan, the promotional activities conducted by Busan Metropolitan City and the South Korean government for attracting the World EXPO 2030. These seven squares are positioned to the left of the word \"BUSAN,\" creating a complete rectangular ratio that allows for easy adaptation to various formats.",
      ja: "Busan Initiativeは、韓国・釜山での2030年世界博覧会(World EXPO)誘致のために韓国政府がEdelman Koreaに委託した戦略的ブランディングプロジェクトです。政府は2030年世界博覧会誘致に向けた6つの主要戦略を策定し、これらすべての戦略を包括するキービジュアルとロゴを求めていました。本プロジェクトでは、ロゴ、スローガン、フォント、キービジュアルのデザインを手がけ、専門性と簡潔さを両立させることに重点を置きました。\n\nデザインは、6つの戦略を象徴する7層の正方形で構成されています。これらは、釜山広域市と韓国政府が2030年世界博覧会誘致のために展開したCornerstone ProjectsとInsight Busanという活動を表しています。この7つの正方形は「BUSAN」という単語の左側に配置され、完全な長方形の比率を形成することで、さまざまなフォーマットへの展開を容易にしています。"
    },
    role:   { ko: "리드 브랜드 디자이너", en: "Lead Brand Designer", ja: "リードブランドデザイナー" },
    client: { ko: "부산 세계박람회 유치위원회", en: "Busan World Expo Committee", ja: "釜山世界博覧会誘致委員会" },
    contribution: { ko: "80% (팀 3인)", en: "80% (Team of 3)", ja: "80%(3人チーム)" },
    responsibilities: { ko: ["로고", "컬러 시스템", "타이포그래피", "슬로건", "키비주얼"], en: ["Logo", "Color System", "Typography", "Slogan", "Key Visual"], ja: ["ロゴ", "カラーシステム", "タイポグラフィ", "スローガン", "キービジュアル"] }
  },
  {
    id: "02",
    year: "2023",
    url: "works/project-02.html",
    image: "images/works/World%20EXPO%202030%20Busan,%20Korea/thumb.png",
    hero: "images/works/World%20EXPO%202030%20Busan,%20Korea/hero.png",
    gallery: [
      { src: "images/works/World%20EXPO%202030%20Busan,%20Korea/gallery_01.png", label: { ko: "에디토리얼", en: "Editorial", ja: "エディトリアル" } },
      { src: "images/works/World%20EXPO%202030%20Busan,%20Korea/gallery_02.png", label: { ko: "에디토리얼", en: "Editorial", ja: "エディトリアル" } },
      { src: "images/works/World%20EXPO%202030%20Busan,%20Korea/gallery_03.png", label: { ko: "프레젠테이션 키비주얼", en: "Presentation Key Visual", ja: "プレゼンテーションキービジュアル" }, captionLight: true },
      { src: "images/works/World%20EXPO%202030%20Busan,%20Korea/gallery_04.png", label: { ko: "프레젠테이션 키비주얼", en: "Presentation Key Visual", ja: "プレゼンテーションキービジュアル" }, captionLight: true },
      { src: "images/works/World%20EXPO%202030%20Busan,%20Korea/gallery_05.png", label: { ko: "프레젠테이션 키비주얼", en: "Presentation Key Visual", ja: "プレゼンテーションキービジュアル" }, captionLight: true },
      { src: "images/works/World%20EXPO%202030%20Busan,%20Korea/gallery_06.png", label: { ko: "국내 캠페인", en: "Domestic Campaign", ja: "国内キャンペーン" } },
      { src: "images/works/World%20EXPO%202030%20Busan,%20Korea/gallery_07.png", label: { ko: "국내 캠페인", en: "Domestic Campaign", ja: "国内キャンペーン" } },
      { src: "images/works/World%20EXPO%202030%20Busan,%20Korea/gallery_08.png", label: { ko: "국내 캠페인", en: "Domestic Campaign", ja: "国内キャンペーン" } },
      { src: "images/works/World%20EXPO%202030%20Busan,%20Korea/gallery_09.png", label: { ko: "뉴욕타임즈 캠페인", en: "The New York Times Campaign", ja: "ニューヨーク・タイムズキャンペーン" } },
      { src: "images/works/World%20EXPO%202030%20Busan,%20Korea/gallery_10.png", label: { ko: "뉴욕타임즈 캠페인", en: "The New York Times Campaign", ja: "ニューヨーク・タイムズキャンペーン" } },
      { src: "images/works/World%20EXPO%202030%20Busan,%20Korea/gallery_11.png", label: { ko: "뉴욕타임즈 캠페인", en: "The New York Times Campaign", ja: "ニューヨーク・タイムズキャンペーン" } },
      { src: "images/works/World%20EXPO%202030%20Busan,%20Korea/gallery_12.png", label: { ko: "대한항공 항공기 랩핑", en: "Korean Air Aircraft Wrap", ja: "大韓航空機体ラッピング" } },
      { src: "images/works/World%20EXPO%202030%20Busan,%20Korea/gallery_13.png", label: { ko: "대한항공 항공기 랩핑", en: "Korean Air Aircraft Wrap", ja: "大韓航空機体ラッピング" } }
    ],
    titles: { ko: "World EXPO 2030 Busan, Korea", en: "World EXPO 2030 Busan, Korea", ja: "World EXPO 2030 Busan, Korea" },
    tags:   { ko: "브랜딩", en: "Branding", ja: "ブランディング" },
    descs: {
      ko: "대한민국 정부와 부산광역시가 발주한 World EXPO 2030 BUSAN, KOREA의 키비주얼은 국내 대중 광고를 위한 인쇄물과 디지털 등 다양한 광고 포맷에 사용된 핵심적인 작업이었습니다. 또한 파리에서 열린 대한민국 대통령과 가수 싸이 등이 연사로 참여한 공식 프레젠테이션을 비롯한 다양한 홍보 활동에서도 중요한 역할을 했습니다. 1차 타깃은 국내외 방문객이었으며, 키비주얼은 기차역, 공항, 지하철, 버스 등 주요 교통 거점을 비롯한 다양한 플랫폼에 광범위하게 노출되었습니다. 클라이언트는 화려하거나 복잡한 배경은 최대한 지양하고, 단순하고 직관적인 폰트를 사용한 디자인을 강조했습니다. 특히 국제박람회기구(BIE) 사무총장을 포함한 대표단이 2030 세계박람회를 위한 대한민국의 준비 상황을 점검하기 위해 방한했을 당시, 해당 광고는 전국적으로 폭넓게 활용되었습니다.",
      en: "The key visual designed for the World EXPO 2030 BUSAN, KOREA, commissioned by the South Korean government and Busan Metropolitan City, was a crucial task used in various advertising formats, both in print and digital, for domestic public advertisements in South Korea. It also played a significant role in promotional activities, including official presentations with speakers such as the South Korean President and singer Psy, held in Paris. The first target audience was domestic and international visitors in South Korea, and the key visual was extensively displayed on various platforms, including major transportation hubs such as train stations, airports, subways, and buses. The client emphasized a design with simple and intuitive fonts, while avoiding flashy or elaborate backgrounds as much as possible. The advertisements gained widespread usage nationwide, especially when the Bureau International des Expositions' delegation, including the Secretary-General, visited South Korea for an inspection of the country's preparations for the World EXPO 2030.",
      ja: "韓国政府と釜山広域市が発注したWorld EXPO 2030 BUSAN, KOREAのキービジュアルは、韓国国内向けの一般広告として、印刷物からデジタルまで様々な広告フォーマットで使用された重要な業務でした。また、パリで開催された、韓国大統領や歌手PSYなどが登壇した公式プレゼンテーションをはじめとする様々なプロモーション活動においても重要な役割を果たしました。第一のターゲットは韓国国内外からの訪問者で、キービジュアルは鉄道駅、空港、地下鉄、バスなどの主要交通拠点をはじめとする様々なプラットフォームに幅広く展開されました。クライアントからは、派手で凝った背景はできるだけ避け、シンプルで直感的なフォントを用いたデザインが求められました。特に、博覧会国際事務局(BIE)の事務局長を含む代表団が2030年世界博覧会に向けた韓国の準備状況を視察するために訪韓した際には、この広告が全国的に幅広く活用されました。"
    },
    role:   { ko: "키비주얼 디자이너", en: "Key Visual Designer", ja: "キービジュアルデザイナー" },
    client: { ko: "부산 세계박람회 유치위원회", en: "Busan World Expo Committee", ja: "釜山世界博覧会誘致委員会" },
    contribution: { ko: "30% (팀 3인)", en: "30% (Team of 3)", ja: "30%(3人チーム)" },
    responsibilities: {
      ko: ["키비주얼 디자인", "인쇄물 및 디지털 광고", "프레젠테이션 자료", "캠페인 디자인"],
      en: ["Key Visual Design", "Print & Digital Advertising", "Presentation Materials", "Campaign Design"],
      ja: ["キービジュアルデザイン", "印刷物・デジタル広告", "プレゼンテーション資料", "キャンペーンデザイン"]
    }
  },
  {
    id: "03",
    year: "2023",
    url: "works/project-03.html",
    image: "images/works/The%20New%20X4%20Campaign%20for%20World%20EXPO%202030%20BUSAN,%20KOREA/thumb.png",
    hero: "images/works/The%20New%20X4%20Campaign%20for%20World%20EXPO%202030%20BUSAN,%20KOREA/hero.png",
    gallery: [
      "images/works/The%20New%20X4%20Campaign%20for%20World%20EXPO%202030%20BUSAN,%20KOREA/gallery_01.png",
      "images/works/The%20New%20X4%20Campaign%20for%20World%20EXPO%202030%20BUSAN,%20KOREA/gallery_02.png",
      "images/works/The%20New%20X4%20Campaign%20for%20World%20EXPO%202030%20BUSAN,%20KOREA/gallery_03.png",
      "images/works/The%20New%20X4%20Campaign%20for%20World%20EXPO%202030%20BUSAN,%20KOREA/gallery_04.png"
    ],
    titles: { ko: "The New X4 Campaign for World EXPO 2030 BUSAN, KOREA", en: "The New X4 Campaign for World EXPO 2030 BUSAN, KOREA", ja: "The New X4 Campaign for World EXPO 2030 BUSAN, KOREA" },
    tags:   { ko: "그래픽 디자인", en: "Graphic Design", ja: "グラフィックデザイン" },
    descs: {
      ko: "The New X4 Campaign은 대한민국 정부와 부산광역시가 발주한 국내 대중 광고 디자인입니다. 클라이언트는 'Expo'라는 단어를 'X4'로 변형해 대중이 보다 쉽고 직관적으로 받아들일 수 있도록 세계박람회를 홍보하고자 했습니다. 이에 따라 'X4' 폰트를 중심으로 한 화려하고 대중적인 캠페인을 요청했습니다. 그 결과 저는 홀로그램과 렌즈 플레어 효과를 활용해 화려하고 반사되는 배경을 만들고, 그 중앙에 단순한 'X4' 폰트를 배치하여 시선을 사로잡으면서도 세련된 광고를 디자인했습니다. 배경의 빛이 중앙의 'X4' 레터링에도 반사되도록 하여, 마치 글자가 빛을 끌어당기거나 가까워지는 듯한 보다 자연스럽고 은은하게 빛나는 느낌을 주었습니다. 이러한 효과를 더욱 강조하기 위해 배경에 그라디언트를 추가했습니다. 중앙 레터링에 시선이 집중될 수 있도록 로고는 상단과 하단에 배치하여 메인 콘텐츠를 방해하지 않도록 했습니다.",
      en: "The New X4 Campaign is a domestic public advertising design commissioned by the South Korean government and Busan Metropolitan City. The client wanted to promote the Expo by transforming the word \"Expo\" into \"X4\" to make it more accessible and intuitive to the public. They requested a campaign with a flashy and popular design centered around the font \"X4.\" As a result, I designed an advertisement that was both eye-catching and sophisticated, using hologram and lens flare effects to create a dazzling and reflective background, with the straightforward \"X4\" font placed at the center. The background's light also reflects onto the central \"X4\" lettering, giving it a more natural and radiant feel, almost as if the letters are being pulled in or coming closer. I added a gradient to the background to enhance the effect. To maintain the focus on the central lettering, the logo was placed at the top and bottom, ensuring it does not distract from the main content.",
      ja: "The New X4 Campaignは、韓国政府と釜山広域市が発注した国内向け一般広告デザインです。クライアントは「Expo」という言葉を「X4」に変換することで、大衆がより身近で直感的に博覧会を認識できるようプロモーションしたいと考えていました。そのため、「X4」というフォントを中心に据えた、華やかで大衆的なキャンペーンデザインが求められました。その結果、私はホログラムとレンズフレア効果を用いて華やかで反射感のある背景を作り、その中央にシンプルな「X4」のフォントを配置することで、目を引きながらも洗練された広告をデザインしました。背景の光が中央の「X4」の文字にも反射することで、まるで文字が光を引き寄せている、あるいは近づいてくるかのような、より自然で輝きのある印象を与えています。この効果をさらに際立たせるため、背景にはグラデーションを加えました。中央の文字への視線の集中を保つため、ロゴは上部と下部に配置し、メインコンテンツの妨げにならないようにしました。"
    },
    role:   { ko: "키비주얼 디자이너", en: "Key Visual Designer", ja: "キービジュアルデザイナー" },
    client: { ko: "부산 세계박람회 유치위원회", en: "Busan World Expo Committee", ja: "釜山世界博覧会誘致委員会" },
    contribution: { ko: "100%", en: "100%", ja: "100%" },
    responsibilities: {
      ko: ["키비주얼 디자인", "인쇄물 및 디지털 광고"],
      en: ["Key Visual Design", "Print & Digital Advertising"],
      ja: ["キービジュアルデザイン", "印刷物・デジタル広告"]
    }
  },
  {
    id: "04",
    year: "2023",
    url: "works/project-04.html",
    image: "images/works/World%20EXPO%20BUSAN%20Magazine/thumb.png",
    hero: "images/works/World%20EXPO%20BUSAN%20Magazine/hero.webp",
    gallery: [
      "images/works/World%20EXPO%20BUSAN%20Magazine/gallery-01.webp",
      "images/works/World%20EXPO%20BUSAN%20Magazine/gallery-02.webp",
      "images/works/World%20EXPO%20BUSAN%20Magazine/gallery-03.webp",
      "images/works/World%20EXPO%20BUSAN%20Magazine/gallery-04.webp",
      "images/works/World%20EXPO%20BUSAN%20Magazine/gallery-05.webp",
      "images/works/World%20EXPO%20BUSAN%20Magazine/gallery-06.webp",
      "images/works/World%20EXPO%20BUSAN%20Magazine/gallery-07.webp",
      "images/works/World%20EXPO%20BUSAN%20Magazine/gallery-08.webp"
    ],
    titles: { ko: "World EXPO BUSAN Magazine", en: "World EXPO BUSAN Magazine", ja: "World EXPO BUSAN Magazine" },
    tags:   { ko: "편집디자인", en: "Editorial", ja: "エディトリアル" },
    descs: {
      ko: "World EXPO BUSAN Magazine는 2030 부산세계박람회 유치위원회가 발행하는 온라인 및 오프라인 월간 발행물입니다. 매거진은 부산에 대한 정보와 여행 가이드, 세계박람회 관련 뉴스, 시사 저널, 박람회 관련 홍보 콘텐츠 등 다양한 기사를 다룹니다. 또한 부산광역시와 유치위원회가 2030 세계박람회 유치를 위해 기울인 노력과 전략을 소개하며, Busan Initiative의 가장 핵심적인 가치인 코너스톤 프로젝트(The Cornerstone Projects)를 조명합니다. 다양한 형태의 매거진들은 부산과 유치위원회가 대한민국 국민들에게 2030 세계박람회를 어떻게 알려왔는지를 보여주는 확실하고 중요한 증거 역할을 해왔습니다. 이러한 발행물들은 2030 세계박람회 유치를 위한 활동 중 하나로 국제박람회기구(BIE, Bureau International des Expositions)로부터 공식적으로 인정받았습니다.",
      en: "World EXPO BUSAN Magazine is a monthly online and physical publication issued by the World EXPO 2030 BUSAN, KOREA Committee. The magazine covers a wide range of articles, including information and travel guides about Busan, news related to the World EXPO, current affairs journals, and promotional content related to the EXPO. The magazine also showcases the efforts and strategies of Busan Metropolitan City and the EXPO Committee in attracting the 2030 World EXPO, highlighting the most important core value of Busan Initiative, The Cornerstone Projects. Various types of magazines have served as robust and vital evidence of how Busan and the EXPO Committee promoted the 2030 World EXPO to the Korean citizens. These publications have been recognized by the Bureau International des Expositions as one of the activities aimed at attracting the 2030 World EXPO.",
      ja: "World EXPO BUSAN Magazineは、2030年釜山世界博覧会誘致委員会が発行するオンライン・オフライン両方の月刊誌です。本誌では、釜山に関する情報や旅行ガイド、世界博覧会関連ニュース、時事ジャーナル、博覧会関連のプロモーションコンテンツなど、幅広い記事を取り上げています。また、釜山広域市と誘致委員会が2030年世界博覧会誘致に向けて注いできた努力や戦略を紹介し、Busan Initiativeの最も重要な核となる価値であるコーナーストーンプロジェクト(The Cornerstone Projects)を紹介しています。さまざまな形態の雑誌は、釜山と誘致委員会が韓国国民に2030年世界博覧会をどのように広報してきたかを示す確かで重要な証拠としての役割を果たしてきました。これらの刊行物は、2030年世界博覧会誘致に向けた活動の一つとして、博覧会国際事務局(BIE)から公式に認定されています。"
    },
    role:   { ko: "편집 디자이너", en: "Editorial Designer", ja: "エディトリアルデザイナー" },
    client: { ko: "부산 세계박람회 유치위원회", en: "Busan World Expo Committee", ja: "釜山世界博覧会誘致委員会" },
    contribution: { ko: "100%", en: "100%", ja: "100%" },
    responsibilities: {
      ko: ["에디토리얼 디자인", "레이아웃 디자인", "아트 디렉션", "인쇄물 제작"],
      en: ["Editorial Design", "Layout Design", "Art Direction", "Print Production"],
      ja: ["エディトリアルデザイン", "レイアウトデザイン", "アートディレクション", "印刷物制作"]
    }
  },
  {
    id: "05",
    year: "2023",
    url: "works/project-05.html",
    image: "images/works/2023%20Seoul%20Greenwave/thumb.png",
    hero: "images/works/2023%20Seoul%20Greenwave/hero.png",
    gallery: [
      "images/works/2023%20Seoul%20Greenwave/gallery_01.png",
      "images/works/2023%20Seoul%20Greenwave/gallery_02.png",
      "images/works/2023%20Seoul%20Greenwave/gallery_03.png",
      "images/works/2023%20Seoul%20Greenwave/gallery_04.png",
      "images/works/2023%20Seoul%20Greenwave/gallery_05.png",
      "images/works/2023%20Seoul%20Greenwave/gallery_06.png"
    ],
    titles: { ko: "2023 Seoul Greenwave", en: "2023 Seoul Greenwave", ja: "2023 Seoul Greenwave" },
    tags:   { ko: "브랜딩", en: "Branding", ja: "ブランディング" },
    descs: {
      ko: "그린웨이브(Greenwave)는 부산의 세계박람회 유치에 대한 인식을 서울 시민들에게 알리기 위해 기획된 공공 페스티벌입니다. 이 프로젝트는 마케팅팀과의 협업으로 진행되었으며, Busan Initiative의 6가지 핵심 가치 중 하나인 '지속가능성(Sustainability)'과 궤를 같이합니다.\n\n초기 콘셉트 단계부터 네이밍, 로고, 비주얼 콘셉트, 일러스트레이션 스타일, 타이포그래피 시스템을 포함한 페스티벌의 브랜드 아이덴티티 개발에 참여했습니다. '그린웨이브'라는 이름은 지속가능성이라는 이니셔티브의 비전을 전달하는 동시에, 공공 페스티벌 특유의 에너지와 집단적인 움직임을 함께 담아내고자 만들어졌습니다.\n\n비주얼 아이덴티티는 로고 속 독특한 괄호 모티프를 중심으로 한 유연한 시스템으로 디자인되었습니다. 괄호 안에 다양한 테마, 키워드, 행사 메시지를 삽입함으로써, 아이덴티티는 다양한 맥락에 쉽게 적응하면서도 각 페스티벌 활동의 초점을 즉각적으로 전달할 수 있었습니다. 이러한 확장 가능한 접근 방식은 유쾌하고 알아보기 쉬운 비주얼 언어를 유지하면서도, 다양한 캠페인 자료 전반에 걸쳐 일관된 브랜딩을 가능하게 했습니다.",
      en: "Greenwave was a public festival created to raise awareness of Busan's World Expo bid among citizens in Seoul. The project was developed in collaboration with the marketing team, aligning with Sustainability, one of the six core values of the Busan Initiative.\n\nFrom the early concept stage, I contributed to the development of the festival's brand identity, including the naming, logo, visual concept, illustration style, and typographic system. The name Greenwave was created to communicate the initiative's sustainability vision while conveying the energy and collective momentum of a public festival.\n\nThe visual identity was designed as a flexible system centered around a distinctive parenthesis motif in the logo. By inserting different themes, keywords, or event messages within the parentheses, the identity could easily adapt to various contexts while instantly communicating the focus of each festival activity. This scalable approach enabled consistent branding across a wide range of campaign materials while maintaining a playful and recognizable visual language.",
      ja: "グリーンウェーブ(Greenwave)は、釜山の世界博覧会誘致についての認知をソウル市民に広めるために企画されたパブリックフェスティバルです。本プロジェクトはマーケティングチームとの協業で進行し、Busan Initiativeの6つの中核的価値の一つである「サステナビリティ(Sustainability)」と軌を一にしています。\n\n初期のコンセプト段階から、ネーミング、ロゴ、ビジュアルコンセプト、イラストレーションスタイル、タイポグラフィシステムを含む、フェスティバルのブランドアイデンティティ開発に携わりました。「グリーンウェーブ」という名称は、サステナビリティというイニシアチブのビジョンを伝えると同時に、パブリックフェスティバルならではのエネルギーと集団的な高揚感を表現するために生み出されました。\n\nビジュアルアイデンティティは、ロゴにおける特徴的な括弧のモチーフを中心とした柔軟なシステムとしてデザインされました。括弧の中に異なるテーマ、キーワード、イベントメッセージを挿入することで、アイデンティティはさまざまな文脈に容易に対応しながら、各フェスティバル活動の焦点を即座に伝えることができました。このスケーラブルなアプローチにより、遊び心があり認識しやすいビジュアル言語を維持しながら、幅広いキャンペーン素材全体で一貫したブランディングを実現しました。"
    },
    role:   { ko: "브랜드 디자이너", en: "Brand Designer", ja: "ブランドデザイナー" },
    client: { ko: "부산 세계박람회 유치위원회, 서울특별시", en: "Busan World Expo Committee, Seoul Metropolitan Government", ja: "釜山世界博覧会誘致委員会, ソウル特別市" },
    contribution: { ko: "50% (팀 3인)", en: "50% (Team of 3)", ja: "50%(3人チーム)" },
    responsibilities: {
      ko: ["네이밍", "로고 디자인", "비주얼 아이덴티티", "일러스트레이션"],
      en: ["Naming", "Logo Design", "Visual Identity", "Illustration"],
      ja: ["ネーミング", "ロゴデザイン", "ビジュアルアイデンティティ", "イラストレーション"]
    }
  },
  {
    id: "06",
    year: "2024",
    url: "works/project-06.html",
    image: "images/works/Super%20Mario/thumb.png",
    hero: "images/works/Super%20Mario/hero.png",
    gallery: [
      "images/works/Super%20Mario/gallery_01.png",
      "images/works/Super%20Mario/gallery_02.png",
      "images/works/Super%20Mario/gallery_03.png"
    ],
    titles: { ko: "Super Mario Bros Wonder", en: "Super Mario Bros Wonder", ja: "Super Mario Bros Wonder" },
    tags:   { ko: "그래픽 디자인", en: "Graphic Design", ja: "グラフィックデザイン" },
    descs: {
      ko: "이커머스 플랫폼 PRIZM으로부터 베스트셀러 상품 중 하나인 Super Mario Bros Wonder의 프로모션 포스터 제작을 의뢰받았습니다. 일관성을 유지하기 위해 게임 로고를 기반으로 한 커스텀 폰트를 개발했습니다. 포스터는 게임 칩 케이스가 펼쳐지며 마리오 캐릭터들의 그림자가 나타나는 모습을 담고 있습니다. 게임 칩에서 뿜어져 나오는 빛과 역동적인 그림자를 표현함으로써, 광고를 보는 사람들에게 기대감과 즐거움을 불러일으키는 것을 목표로 했습니다.",
      en: "I was commissioned by the e-commerce platform PRIZM to create a promotional poster for Super Mario Bros Wonder which is one of their best-selling products. To maintain consistency, I developed a custom font based on the game logo. The poster features a shadow representation of Mario characters emerging when the game chip case is unfolded. By depicting light emanating from the game chip and dynamic shadows, the design aims to generate anticipation and excitement for viewers of the advertisement.",
      ja: "Eコマースプラットフォームである PRIZM から、ベストセラー商品の一つであるSuper Mario Bros Wonderのプロモーションポスター制作を依頼されました。一貫性を保つため、ゲームロゴを基にしたカスタムフォントを開発しました。ポスターは、ゲームチップケースが開かれた際にマリオキャラクターたちの影が浮かび上がる様子を表現しています。ゲームチップから放たれる光とダイナミックな影を描くことで、広告を見る人々に期待感とワクワク感を呼び起こすことを目指しました。"
    },
    role:   { ko: "그래픽 디자이너", en: "Graphic Designer", ja: "グラフィックデザイナー" },
    client: { ko: "PRIZM", en: "PRIZM", ja: "PRIZM" },
    contribution: { ko: "100%", en: "100%", ja: "100%" },
    responsibilities: {
      ko: ["키비주얼 디자인", "커스텀 타이포그래피", "포스터 디자인"],
      en: ["Key Visual Design", "Custom Typography", "Poster Design"],
      ja: ["キービジュアルデザイン", "カスタムタイポグラフィ", "ポスターデザイン"]
    }
  },
  {
    id: "07",
    year: "2024",
    url: "works/project-07.html",
    image: "images/works/wireless%20x%20spotify/thumb.png",
    hero: "images/works/wireless%20x%20spotify/hero.png",
    gallery: [
      "images/works/wireless%20x%20spotify/gallery_02.png",
      "images/works/wireless%20x%20spotify/gallery_01.png",
      "images/works/wireless%20x%20spotify/gallery_04.png",
      "images/works/wireless%20x%20spotify/gallery_03.png"
    ],
    titles: { ko: "Spotify x wireless", en: "Spotify x wireless", ja: "Spotify x wireless" },
    tags:   { ko: "브랜딩", en: "Branding", ja: "ブランディング" },
    descs: {
      ko: "2024 wireless 페스티벌에서 Spotify VIP 게스트를 위한 로고, 키비주얼, 패키지 디자인과 Spotify VIP 부스 디자인을 담당했습니다. Spotify를 상징하는 컬러에서 영감을 받아, 이를 컨테이너 박스라는 독특한 공간 안에 녹여내면서도 모든 결과물이 하나의 비주얼 언어로 서로 연결되도록 하는 데 집중했습니다. 어디서든 공연을 즐길 수 있도록 야외에서 진행되는 wireless 페스티벌의 특성을 고려해, 컨테이너 박스가 바(bar) 역할을 하도록 설계했습니다. 관람객들은 박스 위에 설치된 계단을 올라가 멀리서도 무대를 선명하게 볼 수 있었습니다. 또한 멀리서도 Spotify의 존재감이 확실히 드러나야 하는 페스티벌의 특성을 고려하여, 하나의 컨테이너 박스를 다른 박스 위에 대각선으로 세우고 그 위에 빛나는 로고를 배치함으로써 어느 지점에서든 Spotify를 알아볼 수 있도록 했습니다. 더불어 상단 컨테이너 박스의 문을 열고 Spotify의 메인 컬러 조명을 하늘을 향해 비추게 함으로써 더욱 드라마틱하고 눈에 띄는 공간을 완성했습니다.",
      en: "I was in charge of designing the logo, key visual, package for Spotify VIP Guests, and Spotify VIP Booth at 2024 wireless festival. I was inspired by the iconic color of Spotify and tried to dissolve it into a unique setting with container boxes while all outcomes are connected with each other with single visual language. Wireless festival, being outdoors with the aim of enjoying performances from anywhere, led me to design the container box function as a bar. Customers could ascend stairs placed on the box, providing a clear view of the stage even from a distance. In consideration of the festival's nature, where visibility of Spotify from afar was crucial, one container box was positioned diagonally on the other container box, with a luminous logo placed at the top. This ensured that Spotify's presence was noticeable from any point. Additionally, opening the door of the container box at the top and directing a vibrant light in Spotify's main color towards the sky creates a more dramatic and prominent space.",
      ja: "2024年のワイヤレス・フェスティバルにて、Spotify VIPゲストのためのロゴ、キービジュアル、パッケージデザイン、およびSpotify VIPブースのデザインを担当しました。Spotifyを象徴するカラーからインスピレーションを得て、それをコンテナボックスというユニークな空間の中に溶け込ませながら、すべての制作物が一つのビジュアル言語でつながるよう意識しました。どこからでもパフォーマンスを楽しめることを目指す屋外フェスティバルという特性上、コンテナボックスをバーとして機能させるデザインにしました。来場者はボックスに設置された階段を上ることで、遠くからでもステージをはっきりと見渡すことができました。また、遠くからでもSpotifyの存在感を示すことが重要なフェスティバルの性質を考慮し、一方のコンテナボックスをもう一方の上に斜めに配置し、その頂部に光るロゴを設置することで、どの地点からでもSpotifyの存在が際立つようにしました。さらに、上部のコンテナボックスの扉を開け、Spotifyのメインカラーの鮮やかな光を空に向けて照射することで、よりドラマチックで印象的な空間を演出しました。"
    },
    role:   { ko: "브랜드 디자이너", en: "Brand Designer", ja: "ブランドデザイナー" },
    client: { ko: "Spotify", en: "Spotify", ja: "Spotify" },
    contribution: { ko: "100%", en: "100%", ja: "100%" },
    responsibilities: {
      ko: ["로고 디자인", "키비주얼 디자인", "패키지 디자인", "부스 디자인"],
      en: ["Logo Design", "Key Visual Design", "Package Design", "Booth Design"],
      ja: ["ロゴデザイン", "キービジュアルデザイン", "パッケージデザイン", "ブースデザイン"]
    }
  },
  {
    id: "08",
    year: "2024",
    url: "works/project-08.html",
    image: "images/works/CLO%20Virtual%20User%20Summit/thumb.png",
    hero: "images/works/CLO%20Virtual%20User%20Summit/hero.png",
    gallery: [
      "images/works/CLO%20Virtual%20User%20Summit/gallery_01.png",
      "images/works/CLO%20Virtual%20User%20Summit/gallery_02.png",
      "images/works/CLO%20Virtual%20User%20Summit/gallery_03.mp4"
    ],
    titles: { ko: "CLO Virtual User Summit", en: "CLO Virtual User Summit", ja: "CLO Virtual User Summit" },
    tags:   { ko: "브랜딩", en: "Branding", ja: "ブランディング" },
    descs: {
      ko: "이 프로젝트의 핵심 목표는 3D 패션 소프트웨어 기업 CLO가 주최하는 2024 Virtual User Summit(VUS)의 키비주얼을 디자인하는 것이었습니다. 이 국제 컨퍼런스는 전 세계 여러 시간대에 걸쳐 동시에 진행되는 다학제적 행사입니다. 핵심 작업은 독자적인 타이포그래픽 로고를 제작하고 행사 전반을 아우르는 크리에이티브 디렉션을 수립하는 것이었습니다. 패션 업계에 널리 쓰이는 스티치(stitch)와 CLO의 기존 타이포그래피 감성에 맞춰, 독창적인 서체 기반 로고를 개발했습니다. 이는 CLO의 아이덴티티와도 조화를 이루면서 패션 업계 안에서의 일관성도 유지할 수 있도록 했습니다. 또한 이 비주얼 콘셉트를 사용자 프로필에도 확장 적용하여 스티치 요소를 반영함으로써, 서밋의 비주얼 아이덴티티 전반에 걸쳐 일관되고 통일감 있는 표현을 구현했습니다.",
      en: "The primary objective of the project was to design the key visual for the 2024 Virtual User Summit (VUS) hosted by 3D Fashion Software CLO. This international multidisciplinary conference unfolds simultaneously across various time zones worldwide. The central task involved creating a distinctive typographic logo and establishing an overarching creative direction for the event. In alignment with CLO's existing typographic aesthetic and stitches, prevalent in the fashion industry, I developed a unique typeface logo. This not only complemented CLO's identity but also maintained consistency within the fashion sector. Additionally, I extended this visual concept to user profiles by incorporating stitches, reinforcing the overall theme and ensuring a cohesive representation across all elements of the summit's visual identity.",
      ja: "本プロジェクトの主な目的は、3Dファッションソフトウェア企業CLOが主催する2024 Virtual User Summit(VUS)のキービジュアルをデザインすることでした。この国際カンファレンスは、世界各地のさまざまなタイムゾーンで同時に展開される学際的なイベントです。中心となる作業は、独自性のあるタイポグラフィックロゴを制作し、イベント全体を貫くクリエイティブディレクションを確立することでした。ファッション業界で広く用いられるステッチと、CLOの既存のタイポグラフィの美学に沿って、独自の書体ロゴを開発しました。これによりCLOのアイデンティティと調和しながら、ファッション業界内での一貫性も維持しました。さらに、このビジュアルコンセプトをユーザープロフィールにも拡張し、ステッチ要素を取り入れることで、サミットのビジュアルアイデンティティ全体において統一感のある表現を実現しました。"
    },
    role:   { ko: "브랜드 디자이너", en: "Brand Designer", ja: "ブランドデザイナー" },
    client: { ko: "CLO", en: "CLO", ja: "CLO" },
    contribution: { ko: "100%", en: "100%", ja: "100%" },
    responsibilities: {
      ko: ["로고 디자인", "키비주얼 디자인", "타이포그래피"],
      en: ["Logo Design", "Key Visual Design", "Typography"],
      ja: ["ロゴデザイン", "キービジュアルデザイン", "タイポグラフィ"]
    }
  },
  {
    id: "09",
    year: "2020",
    url: "works/project-09.html",
    image: "images/works/Lotteria%20Lunch%20Time%20Key%20Visual/thumb.png",
    hero: "images/works/Lotteria%20Lunch%20Time%20Key%20Visual/hero.webp",
    gallery: [
      "images/works/Lotteria%20Lunch%20Time%20Key%20Visual/gallery-01.webp",
      "images/works/Lotteria%20Lunch%20Time%20Key%20Visual/gallery-02.webp",
      "images/works/Lotteria%20Lunch%20Time%20Key%20Visual/gallery-03.webp",
      "images/works/Lotteria%20Lunch%20Time%20Key%20Visual/gallery-04.webp",
      "images/works/Lotteria%20Lunch%20Time%20Key%20Visual/gallery-05.webp",
      "images/works/Lotteria%20Lunch%20Time%20Key%20Visual/gallery-06.webp"
    ],
    titles: { ko: "Lotteria Lunch Time Key Visual", en: "Lotteria Lunch Time Key Visual", ja: "Lotteria Lunch Time Key Visual" },
    tags:   { ko: "그래픽 디자인", en: "Graphic Design", ja: "グラフィックデザイン" },
    descs: {
      ko: "롯데리아 2020 그래픽 디자인 공모전에 제출한 작품이 파이널리스트로 선정되었습니다. 당시 롯데리아는 런치타임을 적극적으로 홍보하고 있었습니다. 저는 롯데리아의 프로모션 내용을 담아내면서도 전체적인 브랜드 이미지와 조화를 이루는 키비주얼을 만드는 방향으로 접근했습니다. 많은 소비자들이 당시 적극적으로 홍보되던 런치타임에 대해 잘 알지 못한다는 점을 고려해, 브랜드를 상징하는 레드 컬러, 햄버거·패스트푸드를 연상시키는 빨대, 그리고 런치타임 운영 시간을 하나의 키비주얼 안에 함께 담았습니다. 이 디자인은 브랜드의 전체적인 분위기를 유지하면서도 프로모션 메시지를 효과적으로 전달하는 것을 목표로 했습니다.",
      en: "The artwork I submitted for the Lotteria 2020 graphic design competition was selected as a finalist. At that time, Lotteria was aggressively promoting their Lunch Time. My approach was to create a key visual that not only represented Lotteria's promotional content but also harmonized with the overall brand image. Considering that many consumers were not familiar with the Lunch Time they were aggressively promoting, I integrated the key elements that symbolized their identity, such as the red color associated with their brand, a straw reminiscent of hamburgers or fast food, and the operating hours of the Lunch Time, all within one key visual. This design aimed to maintain the overall brand atmosphere while effectively conveying their promotional message.",
      ja: "ロッテリア2020グラフィックデザインコンペティションに応募した作品がファイナリストに選出されました。当時ロッテリアはランチタイムを積極的にプロモーションしていました。私は、ロッテリアのプロモーション内容を伝えながらも、ブランド全体のイメージと調和するキービジュアルを作ることを目指しました。多くの消費者が当時積極的に宣伝されていたランチタイムについてあまり知らないという点を考慮し、ブランドを象徴する赤色、ハンバーガーやファストフードを連想させるストロー、そしてランチタイムの営業時間を一つのキービジュアルの中に統合しました。このデザインは、ブランド全体の雰囲気を保ちながら、プロモーションメッセージを効果的に伝えることを目指しています。"
    },
    role:   { ko: "그래픽 디자이너", en: "Graphic Designer", ja: "グラフィックデザイナー" },
    client: { ko: "Lotteria", en: "Lotteria", ja: "Lotteria" },
    contribution: { ko: "100%", en: "100%", ja: "100%" },
    responsibilities: {
      ko: ["키비주얼 디자인", "컨셉 개발", "환경 그래픽"],
      en: ["Key Visual Design", "Concept Development", "Environmental Graphics"],
      ja: ["キービジュアルデザイン", "コンセプト開発", "環境グラフィック"]
    },
    award: {
      ko: "2020 LOTTERIA Graphic Design Competition Finalist",
      en: "2020 LOTTERIA Graphic Design Competition Finalist",
      ja: "2020 LOTTERIA Graphic Design Competition Finalist"
    }
  },
  {
    id: "10",
    year: "2023",
    url: "works/project-10.html",
    image: "images/works/2023%20International%20Broadcasting%20Leadership%20Program/thumb.png",
    hero: "images/works/2023%20International%20Broadcasting%20Leadership%20Program/hero.png",
    gallery: [
      "images/works/2023%20International%20Broadcasting%20Leadership%20Program/gallery_01.png",
      "images/works/2023%20International%20Broadcasting%20Leadership%20Program/gallery_02.png",
      "images/works/2023%20International%20Broadcasting%20Leadership%20Program/gallery_03.jpg",
      "images/works/2023%20International%20Broadcasting%20Leadership%20Program/gallery_04.png",
      "images/works/2023%20International%20Broadcasting%20Leadership%20Program/gallery_05.png",
      "images/works/2023%20International%20Broadcasting%20Leadership%20Program/gallery_06.png",
      "images/works/2023%20International%20Broadcasting%20Leadership%20Program/gallery_07.png"
    ],
    titles: { ko: "2023 International Broadcasting Leadership Program", en: "2023 International Broadcasting Leadership Program", ja: "2023 International Broadcasting Leadership Program" },
    tags:   { ko: "브랜딩", en: "Branding", ja: "ブランディング" },
    descs: {
      ko: "2023 International Broadcasting Leadership Program은 아리랑국제방송(Arirang International Broadcasting)과 대한민국 문화체육관광부가 주최·주관하는 국제 행사입니다. 매년 초청 국가가 달라지는데, 2023년에는 아나운서, 카메라맨, 앵커, 저널리스트를 포함한 몽골 대표단이 공식 초청되었습니다. 클라이언트는 행사의 국제성과 전문성을 강조하는 로고와 비주얼을 요청했습니다. 저는 방송을 상징하는 일러스트를 우측 하단에 배치했으며, 자료의 사양과 의도에 따라 아트워크의 라이트 이펙트를 넣거나 뺄 수 있도록 유연하게 설계했습니다. 로고는 중앙에 재생(play) 버튼과 알파벳 'P'를 결합해 '방송(broadcasting)'이라는 키워드를 직관적으로 표현하도록 디자인했습니다. 지나치게 화려하지 않도록 의도적으로 절제하여 명확성과 이해도를 높이는 데 집중했습니다. 로고를 제외한 모든 폰트는 San Francisco로 통일하여 일관성을 유지했습니다.",
      en: "The 2023 International Broadcasting Leadership Program is an international event hosted and organized by Arirang International Broadcasting and the Ministry of Culture, Sports, and Tourism of South Korea. Each year, the invited country varies, and for 2023, Mongolia's representatives, including announcers, cameramen, anchors, and journalists, were officially invited. The client requested a logo and visual that emphasize internationality and professionalism for the event. I placed an illustration symbolizing broadcasting in the bottom right corner, with the flexibility to include or remove the light effect in the artwork depending on the specifications and intentions of the materials. The logo was designed to intuitively represent the keyword \"broadcasting\" by incorporating a play button in the center and the letter \"P\". The design intentionally avoided being too flashy to ensure clarity and easy understanding. All fonts used, except for the logo, maintained consistency using San Francisco.",
      ja: "2023 International Broadcasting Leadership Programは、アリラン国際放送(Arirang International Broadcasting)と韓国文化体育観光部が主催・主管する国際イベントです。招待国は毎年異なり、2023年はアナウンサー、カメラマン、アンカー、ジャーナリストを含むモンゴル代表団が正式に招待されました。クライアントからは、イベントの国際性と専門性を強調するロゴとビジュアルが求められました。私は放送を象徴するイラストを右下に配置し、資料の仕様や意図に応じてアートワークのライトエフェクトを加えたり外したりできる柔軟性を持たせました。ロゴは中央に再生(プレイ)ボタンと文字「P」を組み合わせることで、「放送(broadcasting)」というキーワードを直感的に表現するようデザインしました。過度に華やかにならないよう意図的に抑え、明瞭さと分かりやすさを重視しました。ロゴを除くすべてのフォントはSan Franciscoで統一し、一貫性を保ちました。"
    },
    role:   { ko: "브랜드 디자이너", en: "Brand Designer", ja: "ブランドデザイナー" },
    client: { ko: "대한민국 문화체육관광부, Arirang", en: "Ministry of Culture, Sports and Tourism of Korea, Arirang", ja: "韓国文化体育観光部, Arirang" },
    contribution: { ko: "100%", en: "100%", ja: "100%" },
    responsibilities: {
      ko: ["로고 디자인", "키비주얼 디자인", "일러스트레이션"],
      en: ["Logo Design", "Key Visual Design", "Illustration"],
      ja: ["ロゴデザイン", "キービジュアルデザイン", "イラストレーション"]
    }
  },
  {
    id: "11",
    year: "2023",
    url: "works/project-11.html",
    image: "images/works/Tour%20de%20K-VEGAN%202023/thumb.png",
    hero: "images/works/Tour%20de%20K-VEGAN%202023/hero.png",
    gallery: [
      "images/works/Tour%20de%20K-VEGAN%202023/gallery_01.png",
      "images/works/Tour%20de%20K-VEGAN%202023/gallery_02.png",
      "images/works/Tour%20de%20K-VEGAN%202023/gallery_03.png",
      "images/works/Tour%20de%20K-VEGAN%202023/gallery_04.png",
      "images/works/Tour%20de%20K-VEGAN%202023/gallery_05.png",
      "images/works/Tour%20de%20K-VEGAN%202023/gallery_06.png",
      "images/works/Tour%20de%20K-VEGAN%202023/gallery_07.png",
      "images/works/Tour%20de%20K-VEGAN%202023/gallery_08.png",
      "images/works/Tour%20de%20K-VEGAN%202023/gallery_09.png"
    ],
    titles: { ko: "Tour de K-VEGAN 2023", en: "Tour de K-VEGAN 2023", ja: "Tour de K-VEGAN 2023" },
    tags:   { ko: "브랜딩", en: "Branding", ja: "ブランディング" },
    descs: {
      ko: "전 세계 비건 전문 연구자들을 대상으로 한 2023 International Vegan Festival의 키비주얼과 브랜딩을 담당했습니다. 이 행사에서는 한국의 비거니즘이 중요한 초점이었습니다. 클라이언트는 한국적, 동양적 미감과 세련되고 전문적인 분위기가 조화를 이루는 디자인을 원했습니다. 한국 전통 나전(자개) 공예에서 영감을 받아, 비거니즘을 상징하는 채소와 과일 아이콘에 수공예적인 질감을 부여했습니다. 역동적인 느낌을 더하기 위해 가장자리에는 컬러풀한 일러스트를 배치했습니다. 다양한 포맷과 사양에 맞춰 활용할 수 있도록 여러 버전으로 디자인을 제작했습니다.",
      en: "I was responsible for handling the key visual and branding for 2023 International Vegan Festival targeted at professional vegan researchers around the world. Korean veganism was a significant focal point for this event. The client desired a blend of Korean and Eastern aesthetics with a sophisticated and professional aura. Drawing inspiration from traditional Korean mother-of-pearl inlay(Jagae), I created a handcrafted feel for icons representing vegetables and fruits, which are symbols of veganism. To add a dynamic touch, colorful illustrations were incorporated around the edges. The design was created with multiple variations to ensure compatibility with various formats and specifications as needed.",
      ja: "世界各国のヴィーガン専門研究者を対象とした2023 International Vegan Festivalのキービジュアルとブランディングを担当しました。本イベントでは韓国のヴィーガニズムが重要な焦点となっていました。クライアントからは、韓国的・東洋的な美意識と洗練された専門的な雰囲気を融合させたデザインが求められました。韓国伝統の螺鈿(ラジョン)工芸からインスピレーションを得て、ヴィーガニズムの象徴である野菜や果物のアイコンに手作り感のある質感を与えました。ダイナミックな印象を加えるため、縁にはカラフルなイラストを配置しました。さまざまなフォーマットや仕様に対応できるよう、複数のバリエーションでデザインを制作しました。"
    },
    role:   { ko: "브랜드 디자이너", en: "Brand Designer", ja: "ブランドデザイナー" },
    client: { ko: "한국관광공사", en: "Korea Tourism Organization", ja: "韓国観光公社" },
    contribution: { ko: "100%", en: "100%", ja: "100%" },
    responsibilities: {
      ko: ["키비주얼 디자인", "브랜딩", "일러스트레이션"],
      en: ["Key Visual Design", "Branding", "Illustration"],
      ja: ["キービジュアルデザイン", "ブランディング", "イラストレーション"]
    }
  },
  {
    id: "12",
    year: "2025-2026",
    url: "works/project-12.html",
    image: "images/works/AIRFRIC%20Brand%20Launch/thumb.png",
    hero: "images/works/AIRFRIC%20Brand%20Launch/hero.png",
    gallery: [
      "images/works/AIRFRIC%20Brand%20Launch/gallery-01.png",
      "images/works/AIRFRIC%20Brand%20Launch/gallery-02.png",
      "images/works/AIRFRIC%20Brand%20Launch/gallery-03.png",
      "images/works/AIRFRIC%20Brand%20Launch/gallery-04.png",
      "images/works/AIRFRIC%20Brand%20Launch/gallery-05.png",
      "images/works/AIRFRIC%20Brand%20Launch/gallery-06.png",
      "images/works/AIRFRIC%20Brand%20Launch/gallery-07.png"
    ],
    titles: { ko: "AIRFRIC Brand Launch", en: "AIRFRIC Brand Launch", ja: "AIRFRIC Brand Launch" },
    tags:   { ko: "브랜딩", en: "Branding", ja: "ブランディング" },
    descs: {
      ko: "AIRFRIC는 Atsude의 모브랜드로, 이전에는 자사 이름으로 제품을 선보인 적이 없었습니다. Atsude 베이비 케어 라인의 성공에 힘입어, 브랜드는 온 가족을 위한 제품으로 라이프스타일 시장 전반으로 영역을 확장했습니다.\n\n첫 출시는 페이셜 티슈에 초점을 맞췄습니다. 일본 시장 리서치를 통해 컴팩트함이 핵심 차별화 포인트로 확인되었고, 합리적인 가격의 데일리 티슈와 프리미엄 로션 티슈, 두 가지 제품 라인을 개발했습니다.\n\n저는 프레젠테이션 자료, 비주얼 아이덴티티, 소재 및 컬러 디렉션, 마케팅 캠페인 에셋, 그리고 이커머스 마켓플레이스를 위한 플랫폼별 비주얼 에셋을 디자인하며 브랜드 론칭에 기여했습니다.",
      en: "AIRFRIC was the parent brand of Atsude and had not previously offered products under its own name. Following the success of Atsude's baby care line, the brand expanded into the broader lifestyle market with products designed for the whole family.\n\nThe first launch focused on facial tissues. Through research into the Japanese market, compactness was identified as a key point of differentiation. Two product lines were developed: an affordable everyday tissue and a premium lotion tissue.\n\nI contributed to the brand launch by designing presentation materials, visual identity, material and color direction, marketing campaign assets, and platform-specific visual assets for e-commerce marketplaces.",
      ja: "AIRFRICはAtsudeの親ブランドであり、これまで自社名義で製品を展開したことはありませんでした。Atsudeのベビーケアラインの成功を受け、家族全員のための製品でより広いライフスタイル市場へと展開しました。\n\n最初のローンチはフェイシャルティッシュに焦点を当てました。日本市場のリサーチを通じて、コンパクトさが重要な差別化ポイントであることが分かり、手頃な価格のデイリーティッシュと、プレミアムなローションティッシュという2つの製品ラインを開発しました。\n\n私はプレゼンテーション資料、ビジュアルアイデンティティ、素材・カラーディレクション、マーケティングキャンペーンアセット、そしてECマーケットプレイス向けのプラットフォーム別ビジュアルアセットのデザインを通じてブランドローンチに貢献しました。"
    },
    role:   { ko: "사내 브랜드 디자이너", en: "In-house Brand Designer", ja: "社内ブランドデザイナー" },
    client: { ko: "Airfric", en: "Airfric", ja: "Airfric" },
    contribution: { ko: "50% (팀 2인)", en: "50% (Team of 2)", ja: "50%(2人チーム)" },
    responsibilities: {
      ko: ["브랜드 리포지셔닝", "마케팅 디자인", "캠페인 비주얼", "UI/UX", "이커머스 디자인", "제품 사진 디렉션", "멀티플랫폼 비주얼 최적화", "인쇄물 제작", "브랜드 가이드라인"],
      en: ["Brand Repositioning", "Marketing Design", "Campaign Visuals", "UI/UX", "E-commerce Design", "Product Photography Direction", "Multi-platform Visual Optimization", "Print Production", "Brand Guidelines"],
      ja: ["ブランドリポジショニング", "マーケティングデザイン", "キャンペーンビジュアル", "UI/UX", "Eコマースデザイン", "製品写真ディレクション", "マルチプラットフォームビジュアル最適化", "印刷物制作", "ブランドガイドライン"]
    }
  },
  {
    id: "13",
    year: "2025-2026",
    url: "works/project-13.html",
    image: "images/works/Atsude%20Rebranding/thumb.png",
    hero: "images/works/Atsude%20Rebranding/hero.png",
    gallery: [
      "images/works/Atsude%20Rebranding/gallery-01.png",
      "images/works/Atsude%20Rebranding/gallery-02.png",
      "images/works/Atsude%20Rebranding/gallery-03.png",
      "images/works/Atsude%20Rebranding/gallery-04.png",
      "images/works/Atsude%20Rebranding/gallery-05.png",
      "images/works/Atsude%20Rebranding/gallery-06.png",
      "images/works/Atsude%20Rebranding/gallery-07.png",
      "images/works/Atsude%20Rebranding/gallery-08.png",
      "images/works/Atsude%20Rebranding/gallery-09.mp4"
    ],
    titles: { ko: "Atsude Rebranding", en: "Atsude Rebranding", ja: "Atsude Rebranding" },
    tags:   { ko: "브랜딩", en: "Branding", ja: "ブランディング" },
    descs: {
      ko: "사내 디자이너로서 브랜드를 현대적인 부모 세대와 더 잘 공감할 수 있도록 리포지셔닝하는 1년 규모의 브랜드 리브랜딩 프로젝트를 주도했습니다. 기존 아이덴티티는 전통적인 유아용품 느낌이 강했던 반면, 새로운 방향은 브랜드의 핵심 가치를 유지하면서도 엄마들에게 어필할 수 있는 더 깔끔하고 세련된, 라이프스타일 중심의 이미지를 만드는 데 초점을 맞췄습니다.\n\n이번 리브랜딩은 한 번의 리디자인이 아니라 1년에 걸쳐 단계적으로 진행되었습니다. 일관된 브랜드 경험을 구축하기 위해 모든 고객 접점을 세심하게 검토하고 다듬었습니다. 여기에는 제품 패키지, 배송 박스, 마케팅 캠페인, 웹사이트 디자인, 제품 프레젠테이션이 포함됩니다. 또한 모든 에셋이 일관된 브랜드 언어를 전달하도록 제품 사진과 라이프스타일 이미지의 비주얼 방향을 직접 지휘했습니다.\n\n이 외에도 라쿠텐, 야후 쇼핑, 아마존, 틱톡샵, 공식 온라인 스토어를 위한 플랫폼별 비주얼 에셋을 개발했습니다. 통일된 브랜드 아이덴티티를 유지하면서도, 각 플랫폼의 레이아웃과 타깃 고객, 구매 행동에 맞춰 제품 이미지와 프로모션 비주얼을 최적화하여 참여도와 전환율을 극대화했습니다.",
      en: "As the in-house designer, I led a year-long brand rebranding initiative aimed at repositioning the brand to better resonate with modern parents. While the original identity leaned heavily toward a traditional baby product aesthetic, the new direction focused on creating a cleaner, more refined, and lifestyle-oriented image that would appeal to mothers while preserving the brand's core values.\n\nRather than being a one-time redesign, the rebrand was carried out as a phased process over the course of a year. Every customer touchpoint was carefully reviewed and refined to build a cohesive brand experience. This included product packaging, shipping boxes, marketing campaigns, website design, and product presentation. I also directed the visual approach for product photography and lifestyle imagery to ensure every asset communicated a consistent brand language.\n\nIn addition, I developed platform-specific visual assets for Rakuten, Yahoo Shopping, Amazon, TikTok Shop, and the official online store. While maintaining a unified brand identity, product imagery and promotional visuals were optimized for each platform's layout, audience, and shopping behavior to maximize engagement and conversion.",
      ja: "社内デザイナーとして、現代の親世代により響くブランドへとリポジショニングする、1年にわたるリブランディングプロジェクトを主導しました。従来のアイデンティティは伝統的なベビー用品らしい印象が強かった一方、新しい方向性ではブランドの核となる価値を保ちながら、母親たちに響く、よりクリーンで洗練されたライフスタイル志向のイメージづくりに重点を置きました。\n\nこのリブランディングは一度限りのリデザインではなく、1年をかけて段階的に進められました。一貫したブランド体験を構築するため、すべての顧客接点を丁寧に見直し、磨き上げました。これには製品パッケージ、配送用ボックス、マーケティングキャンペーン、ウェブサイトデザイン、製品プレゼンテーションが含まれます。また、すべてのアセットが一貫したブランド言語を伝えられるよう、製品写真やライフスタイルイメージのビジュアルディレクションも担当しました。\n\nさらに、楽天、Yahoo!ショッピング、Amazon、TikTok Shop、公式オンラインストア向けにプラットフォーム別のビジュアルアセットを制作しました。統一されたブランドアイデンティティを保ちながら、各プラットフォームのレイアウトやユーザー層、購買行動に合わせて製品画像とプロモーションビジュアルを最適化し、エンゲージメントとコンバージョンの最大化を図りました。"
    },
    role:   { ko: "사내 브랜드 디자이너", en: "In-house Brand Designer", ja: "社内ブランドデザイナー" },
    client: { ko: "Airfric", en: "Airfric", ja: "Airfric" },
    contribution: { ko: "50% (팀 2인)", en: "50% (Team of 2)", ja: "50%(2人チーム)" },
    responsibilities: {
      ko: ["브랜드 아이덴티티", "브랜드 리포지셔닝", "마케팅 디자인", "캠페인 비주얼", "UI/UX", "이커머스 디자인", "제품 사진 디렉션", "멀티플랫폼 비주얼 최적화", "인쇄물 제작", "브랜드 가이드라인"],
      en: ["Brand Identity", "Brand Repositioning", "Marketing Design", "Campaign Visuals", "UI/UX", "E-commerce Design", "Product Photography Direction", "Multi-platform Visual Optimization", "Print Production", "Brand Guidelines"],
      ja: ["ブランドアイデンティティ", "ブランドリポジショニング", "マーケティングデザイン", "キャンペーンビジュアル", "UI/UX", "Eコマースデザイン", "製品写真ディレクション", "マルチプラットフォームビジュアル最適化", "印刷物制作", "ブランドガイドライン"]
    }
  },
  {
    id: "14",
    year: "2026",
    url: "works/project-14.html",
    image: "images/works/Synapusyu%20Diaper%20Launch/thumb.png",
    hero: "images/works/Synapusyu%20Diaper%20Launch/hero.png",
    gallery: [
      "images/works/Synapusyu%20Diaper%20Launch/gallery_01.jpg",
      "images/works/Synapusyu%20Diaper%20Launch/gallery_02.png",
      "images/works/Synapusyu%20Diaper%20Launch/gallery_03.png",
      "images/works/Synapusyu%20Diaper%20Launch/gallery_04.png",
      "images/works/Synapusyu%20Diaper%20Launch/gallery_05.png",
      "images/works/Synapusyu%20Diaper%20Launch/gallery_06t.png",
      "images/works/Synapusyu%20Diaper%20Launch/gallery_07.mp4"
    ],
    titles: { ko: "Synapusyu Diaper Launch", en: "Synapusyu Diaper Launch", ja: "Synapusyu Diaper Launch" },
    tags:   { ko: "패키지", en: "Packaging", ja: "パッケージ" },
    descs: {
      ko: "TV도쿄의 인기 어린이 프로그램 Synapusyu와의 라이선스 기저귀 컬렉션 협업에 참여하여, 로고와 캐릭터를 포함한 프로그램의 기존 IP를 활용해 부모와 어린이 모두에게 공감을 얻을 수 있는 제품을 만들었습니다.\n\n기저귀 프린트, 리테일 패키지, 배송용 카톤박스를 포함한 패키지 시스템 전체 디자인에 참여했습니다. Synapusyu의 브랜드 가이드라인 안에서 비주얼 언어, 레이아웃, 그래픽 구성을 다듬어, 제품이 프로그램 특유의 발랄한 아이덴티티를 충실히 반영하면서도 제품의 기능적 장점을 명확하게 전달할 수 있도록 했습니다.\n\n디자인 과정 전반에 걸쳐 여러 비주얼 방향을 탐색하고 반복하며, 감성적 매력과 상업적 효과 사이의 균형을 맞추고자 했습니다. 목표는 아이들에게는 친근하고 흥미롭게 다가가면서도 부모들에게는 신뢰와 확신을 주는 디자인을 만들어, Synapusyu의 인지도 높은 IP와 제품의 기술적 특징을 자연스럽게 결합하는 것이었습니다.\n\n제품 출시를 다양한 접점에서 뒷받침하기 위해, 제품 랜딩 페이지, 매장 내 프로모션 디스플레이 보드, 유아용품 박람회 전시 부스 그래픽, 그리고 TV도쿄에서 방영된 TV 광고의 캠페인 에셋까지 함께 디자인하여, 디지털, 리테일, 행사, 광고 전반에 걸쳐 일관된 브랜드 경험을 만드는 데 기여했습니다.",
      en: "Collaborated on a licensed diaper collection with TV Tokyo's popular children's program Synapusyu, leveraging the show's established IP—including its logo and characters—to create a product that resonated with both parents and young children.\n\nI contributed to the design of the complete packaging system, including the diaper prints, retail packaging, and shipping carton. Working within the Synapusyu brand guidelines, I refined the visual language, layout, and graphic composition to ensure the product faithfully reflected the program's playful identity while maintaining clear communication of the product's functional benefits.\n\nThroughout the design process, I explored and iterated on multiple visual directions to create a balance between emotional appeal and commercial effectiveness. The goal was to develop a design that felt approachable and engaging for children while inspiring confidence and trust among parents, seamlessly integrating Synapusyu's recognizable IP with the product's technical features.\n\nTo support the product launch across multiple touchpoints, I also designed the product landing page, in-store promotional display boards, exhibition booth graphics for a baby products trade show, and campaign assets for the television commercial broadcast on TV Tokyo, helping create a consistent brand experience across digital, retail, events, and advertising.",
      ja: "TV東京の人気子供向け番組Synapusyuとのライセンスおむつコレクションのコラボレーションに携わり、ロゴやキャラクターを含む番組既存のIPを活用して、保護者と子供の双方の共感を得られる製品を作り上げました。\n\nおむつのプリント、店頭パッケージ、出荷用カートンを含むパッケージシステム全体のデザインに携わりました。Synapusyuのブランドガイドラインに沿って、ビジュアル言語、レイアウト、グラフィック構成を磨き上げ、製品が番組ならではの遊び心あるアイデンティティを忠実に反映しながらも、製品の機能的な利点を明確に伝えられるようにしました。\n\nデザインプロセス全体を通して、複数のビジュアル方向性を検討・反復し、感情的な魅力と商業的な効果のバランスを取ることを目指しました。目標は、子供たちにとって親しみやすく魅力的でありながら、保護者には信頼と安心感を与えるデザインを生み出し、Synapusyuの認知度の高いIPと製品の技術的特徴をシームレスに統合することでした。\n\n複数の接点にわたる製品ローンチを支えるため、製品のランディングページ、店頭プロモーション用ディスプレイボード、ベビー用品展示会向けのブース展示グラフィック、そしてTV東京で放映されたテレビCMのキャンペーンアセットもデザインし、デジタル、小売、イベント、広告全体にわたって一貫したブランド体験の実現に貢献しました。"
    },
    role:   { ko: "패키지 디자이너", en: "Packaging Designer", ja: "パッケージデザイナー" },
    client: { ko: "Airfric", en: "Airfric", ja: "Airfric" },
    contribution: { ko: "50% (팀 2인)", en: "50% (Team of 2)", ja: "50%(2人チーム)" },
    responsibilities: {
      ko: ["패키지 디자인", "랜딩 페이지 디자인", "리테일 디스플레이 디자인", "캠페인 디자인"],
      en: ["Packaging Design", "Landing Page Design", "Retail Display Design", "Campaign Design"],
      ja: ["パッケージデザイン", "ランディングページデザイン", "リテールディスプレイデザイン", "キャンペーンデザイン"]
    },
    disclaimer: {
      ko: "© TV TOKYO\n본 제품에 사용된 'Synapusyu'의 이미지 및 캐릭터는 주식회사 TV도쿄의 저작물입니다.",
      en: "© TV TOKYO\nThe images and characters of \"Synapusyu\" used in this product are the copyrighted works of TV TOKYO Corporation.",
      ja: "© TV TOKYO\n本製品に使用されている「シナぷしゅ」の画像およびキャラクターは、株式会社テレビ東京の著作物です。"
    },
    copyrightNotice: "© TV TOKYO"
  },
  {
    id: "15",
    year: "2025",
    url: "works/project-15.html",
    image: "images/works/KLARR%20Rebranding/thumb.png",
    hero: "images/works/KLARR%20Rebranding/hero.png",
    gallery: [
      "images/works/KLARR%20Rebranding/gallery_01.png",
      "images/works/KLARR%20Rebranding/gallery_02.png",
      "images/works/KLARR%20Rebranding/gallery_03.png",
      "images/works/KLARR%20Rebranding/gallery_04.png",
      "images/works/KLARR%20Rebranding/gallery_05.png",
      "images/works/KLARR%20Rebranding/gallery_06.png",
      "images/works/KLARR%20Rebranding/gallery_07.png",
      "images/works/KLARR%20Rebranding/gallery_08.png",
      "images/works/KLARR%20Rebranding/gallery_09.png",
      "images/works/KLARR%20Rebranding/gallery_10.png",
      "images/works/KLARR%20Rebranding/gallery_11.png",
      "images/works/KLARR%20Rebranding/gallery_12.png",
      "images/works/KLARR%20Rebranding/gallery_13.mp4"
    ],
    titles: { ko: "KLARR Rebranding", en: "KLARR Rebranding", ja: "KLARR Rebranding" },
    tags:   { ko: "브랜딩", en: "Branding", ja: "ブランディング" },
    descs: {
      ko: "공기살균기 브랜드 KLARR의 전면적인 리브랜딩을 위해 전략 기획과 크리에이티브 디렉션을 모두 주도했습니다. 폭넓은 시장 조사를 바탕으로, 경쟁이 치열하고 건강에 대한 관심이 높은 시장에서 KLARR의 잠재력을 반영하는 새로운 브랜드 포지셔닝과 아이덴티티를 개발했습니다. 여기에는 업데이트된 브랜드 가치와 소비자 인사이트에 부합하도록 마케팅 전략의 일부를 수립하는 작업도 포함되었습니다. 이 프로젝트의 핵심 성과 중 하나는 'Klear Shield Technology'의 개발이었습니다. 이는 눈에 보이지 않지만 강력한 보호력이라는 제품의 핵심 강점을 뒷받침하기 위해 만들어진 브랜드 고유의 기능입니다. 이 콘셉트는 제품의 목적에 대한 신뢰와 명확성을 구축하는 동시에, 브랜드 서사에 독자적인 가치를 더하는 역할을 했습니다. 디자인 측면에서는 로고 디자인, 타이포그래피 시스템, 브랜드 컬러 팔레트는 물론 제품 디자인 요소에 이르기까지 새로운 비주얼 아이덴티티 개발 전반에 깊이 관여했습니다. 그 결과 혁신성과 신뢰성을 함께 전달하는 일관되고 한층 격상된 브랜드 경험을 완성할 수 있었습니다.",
      en: "I led both the strategic planning and creative direction for the complete rebranding of KLARR, an air sterilizer brand. Based on extensive market research, I developed a new brand positioning and identity that reflect KLARR's potential in a highly competitive and health-conscious market. This included devising parts of the marketing strategy to align with the updated brand values and consumer insights. One of the key highlights of the project was the creation of Klear Shield Technology—a branded feature developed to reinforce the product's core benefit of invisible yet powerful protection. This concept helped build trust and clarity around the product's purpose while adding a layer of proprietary value to the brand narrative. On the design side, I was deeply involved in the development of the new visual identity, including the logo design, typography system, brand color palette, and even product design elements. The result was a cohesive and elevated brand experience that communicates both innovation and reliability.",
      ja: "空気殺菌機ブランドKLARRの全面的なリブランディングに向け、戦略立案とクリエイティブディレクションの両方を主導しました。幅広い市場調査を基に、競争が激しく健康志向の高い市場においてKLARRの可能性を反映した新たなブランドポジショニングとアイデンティティを開発しました。これには、更新されたブランド価値と消費者インサイトに沿ったマーケティング戦略の一部の策定も含まれます。本プロジェクトの重要な成果の一つが「Klear Shield Technology」の開発でした。これは、目に見えないながらも強力な保護というプロダクトの中核的なベネフィットを補強するために開発された、ブランド独自の機能です。このコンセプトは、プロダクトの目的に対する信頼と明確さを築くと同時に、ブランドナラティブに独自の付加価値をもたらしました。デザイン面では、ロゴデザイン、タイポグラフィシステム、ブランドカラーパレット、さらにはプロダクトデザインの要素に至るまで、新しいビジュアルアイデンティティの開発に深く携わりました。その結果、革新性と信頼性の両方を伝える、一貫性がありながら格上げされたブランド体験を完成させることができました。"
    },
    role:   { ko: "크리에이티브 디렉터", en: "Creative Director", ja: "クリエイティブディレクター" },
    client: { ko: "KLARR Inc.", en: "KLARR Inc.", ja: "KLARR Inc." },
    contribution: { ko: "70% (팀 8인)", en: "70% (Team of 8)", ja: "70%(8人チーム)" },
    responsibilities: {
      ko: ["브랜드 전략", "로고 디자인", "비주얼 아이덴티티"],
      en: ["Brand Strategy", "Logo Design", "Visual Identity"],
      ja: ["ブランド戦略", "ロゴデザイン", "ビジュアルアイデンティティ"]
    }
  },
  {
    id: "16",
    year: "2025",
    url: "works/project-16.html",
    image: "images/works/Hwido%20Rebranding/thumb.png",
    hero: "images/works/Hwido%20Rebranding/hero.png",
    gallery: [
      "images/works/Hwido%20Rebranding/gallery_01.png",
      "images/works/Hwido%20Rebranding/gallery_02.png",
      "images/works/Hwido%20Rebranding/gallery_03.png",
      "images/works/Hwido%20Rebranding/gallery_04.png",
      "images/works/Hwido%20Rebranding/gallery_05.png",
      "images/works/Hwido%20Rebranding/gallery_06.png",
      "images/works/Hwido%20Rebranding/gallery_07.png",
      "images/works/Hwido%20Rebranding/gallery_08.png",
      "images/works/Hwido%20Rebranding/gallery_09.png",
      "images/works/Hwido%20Rebranding/gallery_10.png"
    ],
    titles: { ko: "Hwido Rebranding", en: "Hwido Rebranding", ja: "Hwido Rebranding" },
    tags:   { ko: "브랜딩", en: "Branding", ja: "ブランディング" },
    descs: {
      ko: "뷰티 브랜드 Hwido의 리브랜딩 리드 디자이너로서, 브랜드의 전반적인 비주얼 전환을 총괄하고 실행하는 역할을 맡았습니다. 저의 역할은 새로워진 브랜드 아이덴티티 시스템을 구축하는 것부터, 이를 디지털과 실물 자산 전반에 일관되게 적용하는 것까지, 브랜드의 모든 접점을 아우르는 엔드투엔드 디자인이었습니다.\n\n이 프로젝트에는 시트 마스크, 앰플 등 주요 제품의 신규 패키지 디자인 제작이 포함되었으며, 심미적 매력과 명확성, 사용성 사이의 균형을 맞추는 데 중점을 두었습니다. 또한 타이포그래피, 컬러 팔레트, 레이아웃 시스템, 제품 단위의 디테일을 통해 브랜드의 비주얼 톤을 정의함으로써 일관되고 한층 격상된 소비자 경험을 만들고자 했습니다.\n\n직접적인 디자인 작업 외에도, 내부 디자인팀을 이끌며 워크플로우 관리, 업무 분배, 그리고 각 디자이너의 작업물을 취합하는 역할을 수행했습니다. 정기적인 리뷰를 진행하며 크리에이티브 방향성을 맞추고 모든 결과물의 퀄리티를 유지할 수 있도록 했습니다. 이러한 리더십 역할을 통해 크리에이티브의 완성도와 일정 준수를 동시에 지켜낼 수 있었고, 그 결과 일관되고 전략적으로 탄탄한 브랜드 리뉴얼을 완성할 수 있었습니다.",
      en: "As the lead designer for the rebranding of Hwido, a beauty brand, I was responsible for directing and executing the comprehensive visual transformation of the brand. My role encompassed the end-to-end design of all brand touchpoints — from establishing a refreshed brand identity system to applying it consistently across both digital and physical assets.\n\nThis project involved the creation of new packaging designs for key products, including sheet masks and ampoules, where I aimed to balance aesthetic appeal with clarity and usability. I also defined the brand's visual tone through typography, color palette, layout systems, and product-level details to ensure a cohesive and elevated consumer experience.\n\nIn addition to hands-on design work, I led the internal design team, overseeing workflow management, task delegation, and the consolidation of each designer's contributions. I facilitated regular reviews to align our creative direction and maintain quality across all deliverables. This leadership role allowed me to ensure both creative integrity and timely execution, resulting in a cohesive and strategically grounded brand revamp.",
      ja: "ビューティーブランドHwidoのリブランディングにおいて、リードデザイナーとしてブランド全体のビジュアルトランスフォーメーションのディレクションと実行を担当しました。私の役割は、刷新されたブランドアイデンティティシステムの構築から、それをデジタル・実物双方のアセット全体に一貫して適用することまで、ブランドのあらゆる接点をカバーするエンドツーエンドのデザインでした。\n\n本プロジェクトには、シートマスクやアンプルといった主要製品の新しいパッケージデザインの制作が含まれ、審美性と分かりやすさ、使いやすさのバランスを取ることを重視しました。また、タイポグラフィ、カラーパレット、レイアウトシステム、プロダクトレベルのディテールを通じてブランドのビジュアルトーンを定義し、一貫性がありながら格上げされた消費者体験を実現することを目指しました。\n\n実務としてのデザイン制作に加え、社内デザインチームを率い、ワークフロー管理、タスクの割り振り、各デザイナーの成果物の統合を担いました。定期的なレビューを実施してクリエイティブディレクションを揃え、すべての制作物の品質を維持しました。このリーダーシップの役割を通じて、クリエイティブの完成度とスケジュール遵守の両方を確保することができ、その結果、一貫性があり戦略的に裏付けられたブランドリニューアルを実現しました。"
    },
    role:   { ko: "리드 디자이너", en: "Lead Designer", ja: "リードデザイナー" },
    client: { ko: "Hwido", en: "Hwido", ja: "Hwido" },
    contribution: { ko: "50% (팀 8인)", en: "50% (Team of 8)", ja: "50%(8人チーム)" },
    responsibilities: {
      ko: ["브랜드 아이덴티티", "패키지 디자인", "팀 리딩"],
      en: ["Brand Identity", "Packaging Design", "Team Leadership"],
      ja: ["ブランドアイデンティティ", "パッケージデザイン", "チームリーディング"]
    }
  },
  {
    id: "17",
    year: "2023",
    url: "works/project-17.html",
    image: "images/works/Vieol%20Branding/thumb.jpg",
    hero: "images/works/Vieol%20Branding/hero.webp",
    listThumb: "images/works/Vieol%20Branding/hero.webp",
    gallery: [
      "images/works/Vieol%20Branding/gallery-01.webp",
      "images/works/Vieol%20Branding/gallery-02.webp",
      "images/works/Vieol%20Branding/gallery-03.jpg",
      "images/works/Vieol%20Branding/gallery-04.jpg",
      "images/works/Vieol%20Branding/gallery-05.jpg"
    ],
    titles: { ko: "Vieol", en: "Vieol", ja: "Vieol" },
    tags:   { ko: "브랜딩", en: "Branding", ja: "ブランディング" },
    descs: {
      ko: "Vieol은 전통 의상을 실용성과 활동성 중심으로 재해석한 남성복 브랜드입니다. 모든 디테일에는 목적이 있으며, 다크하면서도 섹시하고 실용적인 남성성의 이미지를 표현하는 것을 목표로 합니다. 2023년, Vieol은 두 번째 브랜드인 LIMFINITY를 론칭했습니다.\n\n저는 이 두 브랜드의 전반적인 브랜드 이미징과 크리에이티브 디렉션을 담당했습니다. 디자인은 전반적으로 다크하고 시크한 분위기를 강조하며, 심볼형 로고 사용을 지양하고자 메인 로고는 타이포그래피형 로고로 디자인했습니다. 다만 클라이언트가 심볼형 로고를 적극적으로 요청함에 따라, 명함이나 문구류와 함께 실물로 사용할 수 있도록 클립 형태의 심볼을 디자인했습니다.",
      en: "Vieol is a menswear brand based on the reinterpretation of traditional clothing with a focus on practicality and activity. Every detail of their works serves a purpose, aiming to portray a dark yet sexy and utilitarian image of masculinity. In 2023, Vieol launched its second brand, LIMFINITY.\n\nI have undertaken the overall brand imaging and creative direction for the two mentioned brands. The design emphasizes a dark and cool atmosphere throughout, and the main logo has been designed as a typographic logo to avoid the use of symbol-type logos. However, as the client actively requested a symbol-type logo, I designed it in the form of a clip, allowing it to be physically used together with business cards and stationery.",
      ja: "Vieolは、伝統的な衣服を実用性とアクティビティを重視して再解釈したメンズウェアブランドです。すべてのディテールに目的があり、ダークでありながらセクシーで実用的な男性像を表現することを目指しています。2023年、Vieolは第2ブランドとなるLIMFINITYをローンチしました。\n\n私はこの2つのブランドの全体的なブランドイメージとクリエイティブディレクションを担当しました。デザインは全体を通してダークでクールな雰囲気を強調しており、シンボル型ロゴの使用を避けるため、メインロゴはタイポグラフィ型ロゴとしてデザインしました。しかしクライアントからシンボル型ロゴの使用を強く要望されたため、名刺や文房具と共に実物として使用できるよう、クリップの形をしたシンボルをデザインしました。"
    },
    role:   { ko: "브랜드 디자이너", en: "Brand Designer", ja: "ブランドデザイナー" },
    client: { ko: "Vieol", en: "Vieol", ja: "Vieol" },
    contribution: { ko: "100%", en: "100%", ja: "100%" },
    responsibilities: {
      ko: ["브랜드 아이덴티티", "로고 디자인", "크리에이티브 디렉션", "브랜드 이미징", "문구류 디자인"],
      en: ["Brand Identity", "Logo Design", "Creative Direction", "Brand Imaging", "Stationery Design"],
      ja: ["ブランドアイデンティティ", "ロゴデザイン", "クリエイティブディレクション", "ブランドイメージング", "文房具デザイン"]
    },
    secondary: {
      year: "2023",
      image: "images/works/Vieol%20Branding/limfinity/thumb.png",
      hero: "images/works/Vieol%20Branding/limfinity/hero.webp",
      gallery: [
        "images/works/Vieol%20Branding/limfinity/gallery-01.webp",
        "images/works/Vieol%20Branding/limfinity/gallery-02.png",
        "images/works/Vieol%20Branding/limfinity/gallery-03.png",
        "images/works/Vieol%20Branding/limfinity/gallery-04.mp4"
      ],
      titles: { ko: "LIMFINITY", en: "LIMFINITY", ja: "LIMFINITY" },
      tags:   { ko: "브랜딩", en: "Branding", ja: "ブランディング" },
      descs: {
        ko: "Vieol은 2023년 두 번째 브랜드인 LIMFINITY를 론칭했습니다. 로고는 주로 타이포그래피 형태로 사용되며, 필요에 따라 무한대를 상징하는 클립을 부착하여 브랜드의 캐주얼함과 차가운 느낌을 동시에 전달합니다.",
        en: "Vieol has launched its second label, LIMFINITY in 2023. The logo is mostly used in the form of a typeface, and a clip symbolizing infinity is attached if needed, conveying the brand's casualness and coldness simultaneously.",
        ja: "Vieolは2023年、第2ブランドとなるLIMFINITYをローンチしました。ロゴは主にタイポグラフィの形で使用され、必要に応じて無限を象徴するクリップを付けることで、ブランドのカジュアルさと冷たさを同時に表現しています。"
      },
      role:   { ko: "브랜드 디자이너", en: "Brand Designer", ja: "ブランドデザイナー" },
      client: { ko: "Vieol", en: "Vieol", ja: "Vieol" },
      contribution: { ko: "100%", en: "100%", ja: "100%" },
      responsibilities: {
        ko: ["브랜드 아이덴티티", "로고 디자인", "크리에이티브 디렉션"],
        en: ["Brand Identity", "Logo Design", "Creative Direction"],
        ja: ["ブランドアイデンティティ", "ロゴデザイン", "クリエイティブディレクション"]
      }
    }
  },
  {
    id: "18",
    year: "2022",
    url: "works/project-18.html",
    image: "images/works/The%20Psychologist's%20Guide%20to%20Daily%20Recovery%20in%20Pandemic/thumb.png",
    hero: "images/works/The%20Psychologist's%20Guide%20to%20Daily%20Recovery%20in%20Pandemic/hero.png",
    gallery: [
      "images/works/The%20Psychologist's%20Guide%20to%20Daily%20Recovery%20in%20Pandemic/gallery_01.png",
      "images/works/The%20Psychologist's%20Guide%20to%20Daily%20Recovery%20in%20Pandemic/gallery_02.png",
      "images/works/The%20Psychologist's%20Guide%20to%20Daily%20Recovery%20in%20Pandemic/gallery_03.png",
      "images/works/The%20Psychologist's%20Guide%20to%20Daily%20Recovery%20in%20Pandemic/gallery_04.png",
      "images/works/The%20Psychologist's%20Guide%20to%20Daily%20Recovery%20in%20Pandemic/gallery_05.png"
    ],
    titles: { ko: "The Psychologist's Guide to Daily Recovery in Pandemic", en: "The Psychologist's Guide to Daily Recovery in Pandemic", ja: "The Psychologist's Guide to Daily Recovery in Pandemic" },
    tags:   { ko: "편집디자인", en: "Editorial", ja: "エディトリアル" },
    descs: {
      ko: "한국심리학회를 위해 'The Psychologist's Guide to Daily Recovery in Pandemic'을 디자인했습니다. 표지와 내지 디자인 요소를 모두 담당했습니다. 선택한 폰트는 간결하면서도, 'psychologist'라는 단어에 변형을 주어 그 의미와 전문성을 강조함으로써 시선을 사로잡습니다. 표지의 전체적인 컬러는 화이트와 연한 그린의 조합으로, 독자에게 편안한 느낌을 전달하고자 했습니다. 뒤표지는 이 책을 통해 마치 실제 심리학자가 속삭이듯, 독자가 전문적이고 진정성 있는 위로를 받을 수 있다는 메시지를 전달하도록 디자인했습니다.",
      en: "I designed \"The Psychologist's Guide to Daily Recovery in Pandemic\" on behalf of the Korean Psychological Association. I handled both the cover and internal design elements of the book. The chosen font is concise, yet it catches the attention by modifying the word \"psychologist\" to emphasize its significance and professionalism. The overall color scheme of the cover is a combination of white and light green, aiming to provide readers with a sense of comfort. The back cover is designed to convey the message that through this book, readers can receive professional and genuine comfort, as if real psychologists are whispering to them.",
      ja: "韓国心理学会のために「The Psychologist's Guide to Daily Recovery in Pandemic」をデザインしました。表紙と本文デザインの両方を担当しました。選んだフォントは簡潔でありながら、「psychologist」という単語に変化を加えることで、その意味と専門性を強調し、目を引くようにしています。表紙全体のカラーは白と淡いグリーンの組み合わせで、読者に安心感を与えることを目指しました。裏表紙は、この本を通じて、まるで本物の心理学者がささやきかけるように、読者が専門的で本物の慰めを受け取れるというメッセージを伝えるようデザインしました。"
    },
    role:   { ko: "편집 디자이너", en: "Editorial Designer", ja: "エディトリアルデザイナー" },
    client: { ko: "한국심리학회", en: "Korean Psychological Association", ja: "韓国心理学会" },
    contribution: { ko: "100%", en: "100%", ja: "100%" },
    responsibilities: {
      ko: ["북 디자인", "표지 디자인", "타이포그래피"],
      en: ["Book Design", "Cover Design", "Typography"],
      ja: ["ブックデザイン", "表紙デザイン", "タイポグラフィ"]
    }
  },
  {
    id: "19",
    year: "2024",
    url: "works/project-19.html",
    image: "images/works/3%20Shades%20of%20Guitar/thumb.png",
    hero: "images/works/3%20Shades%20of%20Guitar/hero.png",
    gallery: [
      "images/works/3%20Shades%20of%20Guitar/gallery_01.png",
      "images/works/3%20Shades%20of%20Guitar/gallery_02.png",
      "images/works/3%20Shades%20of%20Guitar/gallery_03.png",
      "images/works/3%20Shades%20of%20Guitar/gallery_04.png",
      "images/works/3%20Shades%20of%20Guitar/gallery_05.png",
      "images/works/3%20Shades%20of%20Guitar/gallery_06.png"
    ],
    titles: { ko: "3 Shades of Guitar", en: "3 Shades of Guitar", ja: "3 Shades of Guitar" },
    tags:   { ko: "그래픽 디자인", en: "Graphic Design", ja: "グラフィックデザイン" },
    descs: {
      ko: "이 포스터 디자인은 IMG Artists의 의뢰로 진행되었으며, 클라이언트는 이미지를 전혀 사용하지 않는 매우 미니멀한 디자인을 요청했습니다. 콘서트다운 느낌을 간결하게 전달하고자 했기에, 빛과 렌즈 플레어를 활용해 단순하면서도 임팩트 있는 포스터를 디자인했습니다. 이 요소들은 모든 키비주얼에서 다양한 변형으로 활용할 수 있도록 설계되었습니다. 빛과 렌즈 플레어 요소의 방향과 크기를 자유롭게 조정할 수 있어, 브로슈어, 랜딩 페이지 등 다양한 포맷에 맞춰 적용할 수 있습니다.",
      en: "The poster design was commissioned by IMG Artists, and the client requested a very minimalistic design without any images. They wanted a concise and concert-like feel for the design, so I used light and lens flare to create a simple yet impactful poster. These elements were designed in a way that they could be adapted and used in various variations for all key visuals. The direction and size of the light and lens flare elements are adaptable, making them suitable for different formats such as brochures, landing pages, and more.",
      ja: "このポスターデザインはIMG Artistsからの依頼で制作され、クライアントは画像を一切使用しない非常にミニマルなデザインを求めていました。コンサートらしい雰囲気を簡潔に伝えるため、光とレンズフレアを用いてシンプルながらもインパクトのあるポスターをデザインしました。これらの要素は、すべてのキービジュアルにおいて様々なバリエーションに展開・活用できるよう設計されています。光とレンズフレア要素の方向やサイズは自由に調整可能で、ブローシャーやランディングページなど、様々なフォーマットに適応できます。"
    },
    role:   { ko: "그래픽 디자이너", en: "Graphic Designer", ja: "グラフィックデザイナー" },
    client: { ko: "IMG Artists, AVECS", en: "IMG Artists, AVECS", ja: "IMG Artists, AVECS" },
    contribution: { ko: "100%", en: "100%", ja: "100%" },
    responsibilities: {
      ko: ["포스터 디자인", "키비주얼 디자인"],
      en: ["Poster Design", "Key Visual Design"],
      ja: ["ポスターデザイン", "キービジュアルデザイン"]
    }
  },
  {
    id: "20",
    year: "2021",
    url: "works/project-20.html",
    image: "images/works/Eye%20of%20Providence/thumb.png",
    hero: "images/works/Eye%20of%20Providence/hero.png",
    gallery: [
      "images/works/Eye%20of%20Providence/gallery_01.png",
      "images/works/Eye%20of%20Providence/gallery_02.png",
      "images/works/Eye%20of%20Providence/gallery_03.png"
    ],
    titles: { ko: "Eye of Providence", en: "Eye of Providence", ja: "Eye of Providence" },
    tags:   { ko: "그래픽 디자인", en: "Graphic Design", ja: "グラフィックデザイン" },
    descs: {
      ko: "2021년, Kenectid Book Store에서 열린 Kenectid Little Market에 참여하여 'Eye of Providence'라는 제목의 작품 시리즈를 선보였습니다. 이 시리즈는 섭리의 눈(eye of providence)에서 영감을 받았으며, 저에게 깊은 인상을 남긴 영화 '홀리 마운틴(Holy Mountain)'의 영향을 받았습니다.\n\n태양, 눈, 연금술, 피라미드와 같은 상징들을 작품에 담았습니다. 시각적으로 풍부한 구성을 만들기 위해 의도적으로 수많은 레이어와 오브젝트를 겹쳐 표현했습니다. 이 전시는 판매를 겸한 단발성 행사였기 때문에, 보다 폭넓은 관객에게 다가갈 수 있도록 전체적인 디자인의 의도를 더 쉽고 직관적으로 전달하고자 했습니다.",
      en: "In 2021, I participated in the Kenectid Little Market held at Kenectid Book Store, showcasing my artwork series titled \"Eye of Providence.\" This series was inspired by eye of providence and was influenced by the profoundly impactful movie \"Holy Mountain,\" which left a deep impression on me.\n\nI incorporated symbols such as the sun, the eye, alchemy, and pyramids. I intentionally overlapped numerous layers and objects to create a visually rich composition. As the exhibition was a one-time event that included sales, I aimed to make the overall design more accessible and straightforward in its intent, appealing to a broader audience.",
      ja: "2021年、Kenectid Book Storeで開催されたKenectid Little Marketに参加し、「Eye of Providence」と題した作品シリーズを発表しました。このシリーズは摂理の目(eye of providence)からインスピレーションを受けたもので、私に深い印象を残した映画『ホーリー・マウンテン』の影響を受けています。\n\n太陽、目、錬金術、ピラミッドといった象徴を作品に取り入れました。視覚的に豊かな構成を作るため、意図的に数多くのレイヤーとオブジェクトを重ね合わせました。この展示は販売を伴う一度限りのイベントだったため、より幅広い観客に届くよう、デザイン全体の意図をより分かりやすく直感的に伝えることを目指しました。"
    },
    role:   { ko: "일러스트레이터", en: "Illustrator", ja: "イラストレーター" },
    contribution: { ko: "100%", en: "100%", ja: "100%" },
    responsibilities: {
      ko: ["일러스트레이션", "아트워크 시리즈"],
      en: ["Illustration", "Artwork Series"],
      ja: ["イラストレーション", "アートワークシリーズ"]
    },
    note: {
      label: { ko: "참여", en: "Participation", ja: "参加" },
      text: {
        ko: "2021 Kenectid Little Market Exhibition",
        en: "2021 Kenectid Little Market Exhibition",
        ja: "2021 Kenectid Little Market Exhibition"
      }
    }
  },
  {
    id: "21",
    year: "2017",
    url: "works/project-21.html",
    image: "images/works/Magazine%20April/thumb.png",
    hero: "images/works/Magazine%20April/hero.webp",
    gallery: [
      "images/works/Magazine%20April/gallery-01.webp",
      "images/works/Magazine%20April/gallery-02.webp",
      "images/works/Magazine%20April/gallery-03.webp",
      "images/works/Magazine%20April/gallery-04.webp",
      "images/works/Magazine%20April/gallery-05.webp"
    ],
    titles: { ko: "Magazine April", en: "Magazine April", ja: "Magazine April" },
    tags:   { ko: "편집디자인", en: "Editorial", ja: "エディトリアル" },
    descs: {
      ko: "대학 재학 시절 진행한 프로젝트의 일환으로, 대학 매거진에 실릴 아티클들의 레이아웃을 디자인했습니다. 첫 번째 아티클은 BBC에서 방영된 Adam Curtis 감독의 다큐멘터리 'HyperNormalisation'에서 영감을 받았습니다. 세상에 보이는 것들과 그 이면에 작용하는 힘에 대해 이야기하고 싶었습니다. 두 번째 아티클은 당시 시의성 있던 주제인 인종 차별 문제를 다룹니다. 만약 인간의 눈에 보이는 피부색이 구분의 기준이 아니었다면, 우리가 인식하는 모든 인종 사이에는 아무런 차이도 없었을 것이라는 메시지를 담고 있습니다. 마지막으로 세 번째 아티클은 고전 미술과 현대 미술에 관한 페이지를 디자인하는 것을 목표로, 고전 작품을 동시대적인 스타일로 재해석했습니다. 흐르는 듯한 천의 질감을 표현한 조각상은 현대에는 흔히 시도되지 않는 예술 형태입니다. 그러나 여기에 약간의 변화를 주는 것만으로도 완전히 다른 느낌을 만들어낼 수 있으며, 이는 전혀 다른 해석을 가능케 하는 작은 틈을 보여줍니다.",
      en: "I have designed the layout for articles to be featured in the university magazine as part of a project during my time at university. The first article is inspired by Adam Curtis' documentary 'HyperNormalisation' from the BBC. I wanted to discuss the visible aspects of the world and the forces beyond. The second article is about the issue of racial discrimination, which was relevant at that time. The statement expresses that if the visible color of humans were not a distinguishing factor, then there would be no difference between all races that we perceive. Lastly, the third aimed to design a page related to classical and modern art, reinterpreting classical works in a contemporary style. The sculpture that conveys the sense of flowing fabric is a form of art that is not often practiced in modern times. However, by making slight changes to it, one can create an entirely different feeling, illustrating the small gap that allows for a completely different interpretation.",
      ja: "大学在学中に取り組んだプロジェクトの一環として、大学の雑誌に掲載される記事のレイアウトをデザインしました。最初の記事は、BBCで放送されたアダム・カーティス監督のドキュメンタリー『ハイパーノーマリゼーション』にインスピレーションを得ています。世界に見えている部分と、その裏にある力について語りたいと考えました。2番目の記事は、当時関心を集めていた人種差別の問題を扱っています。もし人間の目に見える肌の色が区別の基準でなければ、私たちが認識するすべての人種の間に違いは存在しなかったはずだという主張を表現しています。最後に3番目の記事では、クラシックアートとモダンアートに関するページのデザインを目指し、古典作品を現代的なスタイルで再解釈しました。流れるような布の質感を表現した彫刻は、現代ではあまり試みられない芸術形式です。しかし、そこにわずかな変化を加えるだけで、まったく異なる印象を生み出すことができ、それはまったく違う解釈を可能にするわずかな隙間を示しています。"
    },
    role:   { ko: "편집 디자이너", en: "Editorial Designer", ja: "エディトリアルデザイナー" },
    contribution: { ko: "100%", en: "100%", ja: "100%" },
    responsibilities: {
      ko: ["에디토리얼 디자인", "레이아웃 디자인", "타이포그래피"],
      en: ["Editorial Design", "Layout Design", "Typography"],
      ja: ["エディトリアルデザイン", "レイアウトデザイン", "タイポグラフィ"]
    }
  },
  {
    id: "22",
    year: "2025",
    url: "works/project-22.html",
    image: "images/works/Bagel%20by%20SunLake/thumb.png",
    hero: "images/works/Bagel%20by%20SunLake/hero.png",
    gallery: [
      "images/works/Bagel%20by%20SunLake/gallery_01.png",
      "images/works/Bagel%20by%20SunLake/gallery_02.png",
      "images/works/Bagel%20by%20SunLake/gallery_03.png",
      "images/works/Bagel%20by%20SunLake/gallery_04.mp4"
    ],
    titles: { ko: "Bagel by SunLake", en: "Bagel by SunLake", ja: "Bagel by SunLake" },
    tags:   { ko: "그래픽 디자인", en: "Graphic Design", ja: "グラフィックデザイン" },
    descs: {
      ko: "이 프로젝트의 핵심은 대한민국의 음악 프로듀서 SunLake가 새롭게 발매한 앨범 'Bagel'의 앨범 커버와 티저 영상을 제작하는 것이었습니다. 저는 베이글 특유의 형태를 담아낸 타이포그래픽 로고를 만들어, 이 상징이 전체 콘셉트의 서사 안에서 강력한 비주얼 언어로 기능하도록 했습니다. 티저 영상의 목표는 시청자의 시선을 사로잡는 것이었습니다. 이를 위해 베이글과 관련된 다양한 요소들을 활용했으며, 음악이 갑작스럽게 시작되는 순간에 맞춰 타이포그래픽 로고가 드러나도록 연출했습니다. 이러한 전략적 접근을 통해 앨범의 주제적 요소들이 자연스럽게 녹아든 시각적으로 몰입감 있는 경험을 만들고자 했습니다.",
      en: "The primary focus of this project was to create the album cover and a teaser video for the newly released album \"Bagel\" by South Korean music producer SunLake. My role involved crafting a typographic logo that embodies the distinctive shape of a bagel, ensuring that the symbol serves as a potent visual language within the overarching narrative of the entire concept. The objective of the teaser video was to captivate viewers' attention. To achieve this, I incorporated various elements associated with bagels, unveiling the typographic logo in tandem with the sudden onset of the music. This strategic approach aimed to create a visually engaging experience that seamlessly integrated the thematic elements of the album.",
      ja: "本プロジェクトの中心となったのは、韓国の音楽プロデューサーSunLakeが新たにリリースしたアルバム「Bagel」のアルバムカバーとティザー映像の制作でした。私はベーグル特有の形状を体現したタイポグラフィックロゴを制作し、そのシンボルが全体のコンセプトの物語の中で強力なビジュアル言語として機能するようにしました。ティザー映像の目的は視聴者の注意を引きつけることでした。そのために、ベーグルにまつわるさまざまな要素を取り入れ、音楽が突然始まる瞬間に合わせてタイポグラフィックロゴが現れる演出を行いました。この戦略的なアプローチにより、アルバムのテーマ的要素がシームレスに統合された、視覚的に魅力的な体験を作り出すことを目指しました。"
    },
    role:   { ko: "그래픽 디자이너", en: "Graphic Designer", ja: "グラフィックデザイナー" },
    client: { ko: "SunLake", en: "SunLake", ja: "SunLake" },
    contribution: { ko: "100%", en: "100%", ja: "100%" },
    responsibilities: {
      ko: ["로고 디자인", "앨범 커버 디자인", "영상 디자인"],
      en: ["Logo Design", "Album Cover Design", "Video Design"],
      ja: ["ロゴデザイン", "アルバムカバーデザイン", "映像デザイン"]
    }
  },
  {
    id: "23",
    year: "2022",
    url: "works/project-23.html",
    image: "images/works/s'il%20ver%20plait/thumb.png",
    hero: "images/works/s'il%20ver%20plait/hero.png",
    gallery: [
      "images/works/s'il%20ver%20plait/gallery_01.png",
      { src: "images/works/s'il%20ver%20plait/gallery_02.mp4", videoZoom: 1.2 },
      "images/works/s'il%20ver%20plait/gallery_03.png",
      "images/works/s'il%20ver%20plait/gallery_04.png",
      "images/works/s'il%20ver%20plait/gallery_05.png",
      "images/works/s'il%20ver%20plait/gallery_06.png",
      "images/works/s'il%20ver%20plait/gallery_07.png"
    ],
    titles: { ko: "s'il ver plait", en: "s'il ver plait", ja: "s'il ver plait" },
    tags:   { ko: "브랜딩", en: "Branding", ja: "ブランディング" },
    descs: {
      ko: "론칭을 준비 중인 액세서리 브랜드의 전반적인 브랜딩과 크리에이티브 디렉션을 담당했습니다. 이 브랜드는 '부탁드립니다'라는 뜻의 프랑스어 표현 'S'il Vous Plaît'를 살짝 변형한 이름을 가진 실버 전문 액세서리 브랜드입니다. 차갑고 거리감 있는 이미지를 가진 대부분의 실버 브랜드와 차별화하기 위해, 따뜻하고 친근한 느낌을 담아내고자 했습니다. 브랜드 특유의 분위기를 담아내기 위해 자연스럽고 유기적인 느낌으로 랜딩 페이지, 브랜드 로고, 문구류를 디자인했습니다.",
      en: "I have worked on the overall branding and creative direction for an upcoming accessory brand that is preparing for its launch. The brand is a silver-specialized accessory brand named after 'S'il Vous Plaît,' which is a slight variation of the French phrase meaning 'Please.' It aims to differentiate itself from most silver brands, which typically have a cool and distant image, by embodying a warm and inviting feeling. I have designed the landing page, brand logo, and stationery with a natural and organic atmosphere to capture the essence of the brand's vibe.",
      ja: "ローンチを控えたアクセサリーブランドの全体的なブランディングとクリエイティブディレクションを担当しました。このブランドは、「お願いします」を意味するフランス語表現「S'il Vous Plaît」を少し変化させた名前を持つ、シルバー専門のアクセサリーブランドです。冷たく距離感のあるイメージを持つことが多いシルバーブランドの中で差別化を図るため、温かみのある親しみやすい印象を体現することを目指しました。ブランドならではの雰囲気を表現するため、自然でオーガニックな雰囲気でランディングページ、ブランドロゴ、文房具をデザインしました。"
    },
    role:   { ko: "브랜드 디자이너", en: "Brand Designer", ja: "ブランドデザイナー" },
    client: { ko: "s'il ver plait", en: "s'il ver plait", ja: "s'il ver plait" },
    contribution: { ko: "100%", en: "100%", ja: "100%" },
    responsibilities: {
      ko: ["브랜드 아이덴티티", "로고 디자인", "랜딩 페이지 디자인"],
      en: ["Brand Identity", "Logo Design", "Landing Page Design"],
      ja: ["ブランドアイデンティティ", "ロゴデザイン", "ランディングページデザイン"]
    }
  },
  {
    id: "24",
    year: "2024",
    url: "works/project-24.html",
    image: "images/works/SUMMER%20KIM/thumb.png",
    hero: "images/works/SUMMER%20KIM/hero.png",
    gallery: [
      "images/works/SUMMER%20KIM/gallery_01.png",
      "images/works/SUMMER%20KIM/gallery_02.png",
      "images/works/SUMMER%20KIM/gallery_03.png",
      "images/works/SUMMER%20KIM/gallery_04.png",
      "images/works/SUMMER%20KIM/gallery_05.png",
      "images/works/SUMMER%20KIM/gallery_06.mp4"
    ],
    titles: { ko: "SUMMER KIM", en: "SUMMER KIM", ja: "SUMMER KIM" },
    tags:   { ko: "브랜딩", en: "Branding", ja: "ブランディング" },
    descs: {
      ko: "이 프로젝트는 작사가 Summer Kim의 의뢰로 진행되었으며, 클라이언트는 자신의 퍼스널 브랜딩과 파생 키비주얼에 함께 활용할 수 있는 디자인을 요청했습니다. 그녀의 작업은 역동적이고 진솔하며, 깊이 이해할수록 더욱 아름다워지는 특징을 가지고 있습니다. 저는 이러한 역동성과 아름다움을 디자인 안에 함께 담아내고자 했습니다. 움직이는 꽃의 형태와 꽃의 클로즈업 사진을 리서치하던 중, X-ray를 요소로 활용한다는 아이디어를 떠올리게 되었습니다. X-ray를 통해 포착된 아름다움이 어떤 모습일지 궁금해졌습니다. 저는 클라이언트가 표현하고자 했던 아름다움을 해부하듯 자세히 들여다보고 싶었습니다. 꽃의 겉모습도 아름답지만, 싹을 틔우고 피어나고 결국 시드는 그 과정 자체가 아름답습니다. 그래서 저는 꽃과 X-ray라는 요소를 결합해 일러스트를 제작했습니다. 이 일러스트는 단순한 형태부터 복잡한 형태까지 총 4가지 버전으로 활용할 수 있습니다. 실제 꽃 사진과 제가 제작한 일러스트를 함께 사용하는 것이 보다 직관적인 디자인을 만들어낼 것이라 판단했습니다.",
      en: "The project was commissioned by the lyricist Summer Kim, who requested a design that could be used for her personal branding as well as in derivative key visuals. Her work is dynamic, authentic, and becomes more beautiful the deeper it is understood. My aim was to capture both dynamism and beauty in the design. During my research on moving flower shapes and close-up photographs of flowers, I came across the idea of using X-rays as an element. I was curious about how beauty would look when captured through X-rays. I wanted to delve into the beauty that the client wanted to express, dissecting and examining it in detail. While the appearance of flowers is pretty, the process of sprouting, blooming, and eventually withering is beautiful. Therefore, I combined the elements of flowers and X-rays to create an illustration. This illustration can be used in four different variations, ranging from simple to complex. I decided that using both the actual photograph of the flower and my illustration together would result in a more intuitive design.",
      ja: "本プロジェクトは、作詞家Summer Kimからの依頼で進行し、クライアントは自身のパーソナルブランディングと派生キービジュアルの両方に活用できるデザインを求めていました。彼女の作品はダイナミックで誠実であり、深く理解するほどより美しく感じられるという特徴を持っています。私はそのダイナミズムと美しさを共にデザインへ落とし込むことを目指しました。動く花の形状や花のクローズアップ写真をリサーチする中で、X線を要素として用いるというアイデアに行き着きました。X線を通して捉えられる美しさがどのようなものか興味を持ちました。クライアントが表現したいと考えていた美しさを、解剖するように細部まで見つめてみたいと思いました。花の見た目そのものも美しいですが、芽吹き、咲き、そしてやがて枯れていくその過程自体が美しいものです。そこで私は花とX線という要素を組み合わせ、イラストを制作しました。このイラストはシンプルなものから複雑なものまで、全4パターンのバリエーションで使用できます。実際の花の写真と私が制作したイラストを組み合わせて使用することで、より直感的なデザインになると考えました。"
    },
    role:   { ko: "브랜드 디자이너", en: "Brand Designer", ja: "ブランドデザイナー" },
    client: { ko: "Summer Kim", en: "Summer Kim", ja: "Summer Kim" },
    contribution: { ko: "100%", en: "100%", ja: "100%" },
    responsibilities: {
      ko: ["브랜드 아이덴티티", "일러스트레이션", "키비주얼 디자인"],
      en: ["Brand Identity", "Illustration", "Key Visual Design"],
      ja: ["ブランドアイデンティティ", "イラストレーション", "キービジュアルデザイン"]
    }
  }
];

let currentLang = localStorage.getItem("lang") || "en";

/* =========================================================
   3) 언어 적용
   ========================================================= */
function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key] !== undefined) el.innerHTML = translations[lang][key];
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.lang === lang);
  });

  document.querySelectorAll("[data-lang-block]").forEach((el) => {
    el.style.display = el.getAttribute("data-lang-block") === lang ? "" : "none";
  });

  renderWorksList();
  renderWorkDetail();
}

const langSwitchEl = document.querySelector(".lang-switch");
document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const isMobileDropdown = langSwitchEl && window.matchMedia("(max-width: 760px)").matches;
    if (isMobileDropdown && !langSwitchEl.classList.contains("is-open") && btn.classList.contains("is-active")) {
      e.preventDefault();
      langSwitchEl.classList.add("is-open");
      return;
    }
    applyLanguage(btn.dataset.lang);
    if (langSwitchEl) langSwitchEl.classList.remove("is-open");
  });
});
if (langSwitchEl) {
  document.addEventListener("click", (e) => {
    if (!langSwitchEl.contains(e.target)) langSwitchEl.classList.remove("is-open");
  });
}

/* =========================================================
   4) Works 목록 페이지 렌더링 (works/index.html 전용)
   #workIndex 요소가 있는 페이지에서만 동작합니다.
   ========================================================= */
function renderWorksList() {
  const list = document.getElementById("workIndex");
  if (!list) return;

  list.innerHTML = "";
  worksData.forEach((item) => {
    const li = document.createElement("li");
    const title = item.titles[currentLang];
    const listImage = item.listThumb || item.image;
    const thumb = listImage
      ? `<img class="work-thumb-img" src="${BASE}${listImage}" alt="${title}">`
      : `<span class="work-thumb-placeholder">IMAGE</span>`;
    li.innerHTML = `
      <a class="work-item" href="${BASE}${item.url}">
        <div class="work-thumb">${thumb}</div>
        <div class="work-meta">
          <span class="work-no">${item.id}</span>
          <span class="work-tag">${item.tags[currentLang]}</span>
          <span class="work-year">${item.year}</span>
        </div>
      </a>`;
    list.appendChild(li);
  });
}

/* =========================================================
   5) Works 상세 페이지 렌더링 (works/project-0X.html 전용)
   <main data-work-id="01"> 요소가 있는 페이지에서만 동작합니다.
   ========================================================= */
function renderWorkDetail() {
  const main = document.querySelector("main[data-work-id]");
  if (!main) return;

  const id = main.getAttribute("data-work-id");
  const index = worksData.findIndex((w) => w.id === id);
  if (index === -1) return;
  const item = worksData[index];

  const setText = (elId, value) => {
    const el = document.getElementById(elId);
    if (el) el.textContent = value;
  };

  setText("wdNo", item.id);
  setText("wdTitle", item.titles[currentLang]);
  setText("wdTag", item.tags[currentLang]);
  setText("wdDesc", item.descs[currentLang]);
  setText("wdRole", item.role[currentLang]);
  const clientEl = document.getElementById("metaClient");
  if (clientEl) {
    if (item.client) {
      clientEl.hidden = false;
      setText("wdClient", item.client[currentLang]);
    } else {
      clientEl.hidden = true;
    }
  }
  setText("wdContribution", item.contribution[currentLang]);
  setText("wdYear", item.year);

  const awardEl = document.getElementById("wdAward");
  if (awardEl) {
    if (item.award) {
      awardEl.hidden = false;
      setText("wdAwardText", item.award[currentLang]);
    } else {
      awardEl.hidden = true;
    }
  }

  const existingNote = document.getElementById("wdNote");
  if (existingNote) existingNote.remove();
  if (item.note && awardEl) {
    const noteDiv = document.createElement("div");
    noteDiv.className = "work-award";
    noteDiv.id = "wdNote";
    const labelP = document.createElement("p");
    labelP.className = "work-award-label";
    labelP.textContent = item.note.label[currentLang];
    const textP = document.createElement("p");
    textP.className = "work-award-text";
    textP.textContent = item.note.text[currentLang];
    noteDiv.appendChild(labelP);
    noteDiv.appendChild(textP);
    awardEl.insertAdjacentElement("afterend", noteDiv);
  }

  const heroEl = document.getElementById("wdHero");
  if (heroEl) {
    const heroBadge = item.copyrightNotice ? `<span class="copyright-badge">${item.copyrightNotice}</span>` : "";
    heroEl.innerHTML = item.hero
      ? `<img src="${BASE}${item.hero}" alt="${item.titles[currentLang]}">${heroBadge}`
      : `<span class="work-thumb-placeholder">IMAGE</span>`;
  }

  const thumbEl = document.getElementById("wdThumb");
  if (thumbEl) {
    thumbEl.innerHTML = item.image
      ? `<img src="${BASE}${item.image}" alt="${item.titles[currentLang]}">`
      : `<span class="work-thumb-placeholder">IMAGE</span>`;
  }

  const respEl = document.getElementById("wdResponsibilities");
  if (respEl) {
    respEl.innerHTML = "";
    item.responsibilities[currentLang].forEach((line) => {
      const li = document.createElement("li");
      li.textContent = line;
      respEl.appendChild(li);
    });
  }

  function renderGallery(containerId, slots, altTitle, copyrightNotice) {
    const gallery = document.getElementById(containerId);
    if (!gallery) return;
    gallery.innerHTML = "";
    const videoExtensions = [".mp4", ".webm", ".mov"];
    slots.forEach((slot) => {
      const src = typeof slot === "string" ? slot : slot.src;
      const label = typeof slot === "string" ? null : slot.label;
      const captionClass = typeof slot !== "string" && slot.captionLight ? "gallery-caption gallery-caption--light" : "gallery-caption";
      const captionHtml = label ? `<span class="${captionClass}">${label[currentLang]}</span>` : "";
      const div = document.createElement("div");
      const isVideo = src && videoExtensions.some((ext) => src.toLowerCase().endsWith(ext));

      if (isVideo) {
        const fullSrc = BASE + src;
        const videoZoom = typeof slot !== "string" && slot.videoZoom ? slot.videoZoom : null;
        const zoomStyle = videoZoom ? ` style="transform: scale(${videoZoom})"` : "";
        div.className = "gallery-image gallery-video";
        div.innerHTML = `
          <video class="gallery-video-el" autoplay muted loop playsinline${zoomStyle}>
            <source src="${fullSrc}">
          </video>
          ${captionHtml}
          <button class="gallery-sound-btn" type="button" aria-label="Toggle sound">
            <svg class="icon-sound-on" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3,9 8,9 13,4 13,20 8,15 3,15" fill="currentColor" stroke="none"/><path d="M16 8a5 5 0 0 1 0 8"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>
            <svg class="icon-sound-off" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" hidden><polygon points="3,9 8,9 13,4 13,20 8,15 3,15" fill="currentColor" stroke="none"/><line x1="16" y1="9" x2="22" y2="15"/><line x1="22" y1="9" x2="16" y2="15"/></svg>
          </button>`;
        const videoEl = div.querySelector(".gallery-video-el");
        const soundBtn = div.querySelector(".gallery-sound-btn");
        const iconOn = div.querySelector(".icon-sound-on");
        const iconOff = div.querySelector(".icon-sound-off");
        soundBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          videoEl.muted = !videoEl.muted;
          iconOn.hidden = !videoEl.muted;
          iconOff.hidden = videoEl.muted;
        });
      } else if (src) {
        const fullSrc = BASE + src;
        const copyrightHtml = copyrightNotice ? `<span class="copyright-badge">${copyrightNotice}</span>` : "";
        div.className = "gallery-image";
        div.innerHTML = `<img src="${fullSrc}" alt="${altTitle}">${captionHtml}${copyrightHtml}`;
        div.addEventListener("click", () => openLightbox(fullSrc, altTitle));
      } else {
        div.className = "gallery-image is-placeholder";
        div.innerHTML = label ? `<span>IMAGE</span>${captionHtml}` : `<span>IMAGE</span>`;
      }
      gallery.appendChild(div);
    });
  }

  const slots = item.gallery && item.gallery.length ? item.gallery : new Array(10).fill("");
  renderGallery("wdGallery", slots, item.titles[currentLang], item.copyrightNotice);

  const secondaryWrap = document.getElementById("wdSecondary");
  if (secondaryWrap) {
    if (item.secondary) {
      secondaryWrap.hidden = false;
      const s = item.secondary;
      setText("wdTitle2", s.titles[currentLang]);
      setText("wdTag2", s.tags[currentLang]);
      setText("wdDesc2", s.descs[currentLang]);
      setText("wdRole2", s.role[currentLang]);
      const clientEl2 = document.getElementById("metaClient2");
      if (clientEl2) {
        if (s.client) {
          clientEl2.hidden = false;
          setText("wdClient2", s.client[currentLang]);
        } else {
          clientEl2.hidden = true;
        }
      }
      setText("wdContribution2", s.contribution[currentLang]);
      setText("wdYear2", s.year);

      const heroEl2 = document.getElementById("wdHero2");
      if (heroEl2) {
        heroEl2.innerHTML = s.hero
          ? `<img src="${BASE}${s.hero}" alt="${s.titles[currentLang]}">`
          : `<span class="work-thumb-placeholder">IMAGE</span>`;
      }

      const thumbEl2 = document.getElementById("wdThumb2");
      if (thumbEl2) {
        thumbEl2.innerHTML = s.image
          ? `<img src="${BASE}${s.image}" alt="${s.titles[currentLang]}">`
          : `<span class="work-thumb-placeholder">IMAGE</span>`;
      }

      const respEl2 = document.getElementById("wdResponsibilities2");
      if (respEl2) {
        respEl2.innerHTML = "";
        s.responsibilities[currentLang].forEach((line) => {
          const li = document.createElement("li");
          li.textContent = line;
          respEl2.appendChild(li);
        });
      }

      const slots2 = s.gallery && s.gallery.length ? s.gallery : [];
      renderGallery("wdGallery2", slots2, s.titles[currentLang], s.copyrightNotice);
    } else {
      secondaryWrap.hidden = true;
    }
  }

  const prevItem = worksData[(index - 1 + worksData.length) % worksData.length];
  const nextItem = worksData[(index + 1) % worksData.length];
  const prevLink = document.getElementById("wdPrev");
  const nextLink = document.getElementById("wdNext");
  if (prevLink) prevLink.href = BASE + prevItem.url;
  if (nextLink) nextLink.href = BASE + nextItem.url;

  const existingDisclaimer = document.getElementById("wdDisclaimer");
  if (existingDisclaimer) existingDisclaimer.remove();
  if (item.disclaimer) {
    const navEl = document.querySelector(".work-detail-nav");
    if (navEl) {
      const p = document.createElement("p");
      p.id = "wdDisclaimer";
      p.className = "work-disclaimer";
      p.textContent = item.disclaimer[currentLang];
      navEl.insertAdjacentElement("beforebegin", p);
    }
  }
}

/* =========================================================
   5-1) 라이트박스 — 갤러리 이미지 클릭 시 확대
   ========================================================= */
const lightboxOverlay = document.getElementById("lightboxOverlay");
const lightboxImg = document.getElementById("lightboxImg");

function openLightbox(src, alt) {
  if (!lightboxOverlay || !lightboxImg) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt || "";
  lightboxOverlay.hidden = false;
}

function closeLightbox() {
  if (!lightboxOverlay) return;
  lightboxOverlay.hidden = true;
  lightboxImg.src = "";
}

if (lightboxOverlay) {
  lightboxOverlay.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightboxOverlay.hidden) closeLightbox();
  });
}

/* =========================================================
   6) 검색 — 헤더 우측 "Search" 텍스트 → 입력창 전환
   worksData를 기준으로 검색하므로 어떤 페이지에서든 동작합니다.
   ========================================================= */
const searchTrigger = document.getElementById("searchTrigger");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
let searchBlurTimer = null;

function openSearch() {
  searchTrigger.hidden = true;
  searchInput.hidden = false;
  searchInput.value = "";
  searchInput.focus();
}

function closeSearch() {
  clearTimeout(searchBlurTimer);
  searchInput.hidden = true;
  searchResults.hidden = true;
  searchResults.innerHTML = "";
  searchTrigger.hidden = false;
}

if (searchTrigger) {
  searchTrigger.addEventListener("click", openSearch);

  searchInput.addEventListener("blur", () => {
    searchBlurTimer = setTimeout(closeSearch, 150);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !searchInput.hidden) closeSearch();
  });

  searchInput.addEventListener("input", () => {
    const q = searchInput.value.trim().toLowerCase();
    searchResults.innerHTML = "";

    if (!q) {
      searchResults.hidden = true;
      return;
    }

    const matches = worksData.filter((item) => {
      const haystack = [
        item.titles.ko, item.titles.en, item.titles.ja,
        item.tags.ko, item.tags.en, item.tags.ja
      ].join(" ").toLowerCase();
      return haystack.includes(q);
    });

    if (matches.length === 0) {
      const li = document.createElement("li");
      li.className = "no-match";
      li.textContent = translations[currentLang]["search.noresults"];
      searchResults.appendChild(li);
    } else {
      matches.forEach((item) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = BASE + item.url;
        const titleSpan = document.createElement("span");
        titleSpan.textContent = item.titles[currentLang];
        const yearSpan = document.createElement("span");
        yearSpan.className = "work-year";
        yearSpan.textContent = item.year;
        a.appendChild(titleSpan);
        a.appendChild(yearSpan);
        li.appendChild(a);
        searchResults.appendChild(li);
      });
    }

    searchResults.hidden = false;
  });
}

/* =========================================================
   7) 모바일 메뉴 토글
   ========================================================= */
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("is-open");
  });
}

/* =========================================================
   8) 현재 페이지 메뉴 활성 표시
   ========================================================= */
function highlightActiveNav() {
  const path = location.pathname.replace(/index\.html$/, "");
  document.querySelectorAll(".main-nav a").forEach((link) => {
    const linkPath = new URL(link.href).pathname.replace(/index\.html$/, "");
    if (linkPath !== "" && path.endsWith(linkPath)) {
      link.classList.add("is-active");
    }
  });
}

/* =========================================================
   9) 헤더 스크롤 시 "Welcome to eunsumoon.com" → 로고 전환
   ========================================================= */
const siteHeader = document.querySelector(".site-header");

function updateHeaderScrollState() {
  if (!siteHeader) return;
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 24);
}

window.addEventListener("scroll", updateHeaderScrollState, { passive: true });

/* =========================================================
   10) 쿠키 정책 팝업
   ========================================================= */
const cookieBanner = document.getElementById("cookieBanner");
const cookieAccept = document.getElementById("cookieAccept");
const cookieDecline = document.getElementById("cookieDecline");

function initCookieBanner() {
  const consent = localStorage.getItem("cookieConsent");
  if (consent) return;
  cookieBanner.hidden = false;
  setTimeout(() => cookieBanner.classList.add("is-visible"), 600);
}

function hideCookieBanner(choice) {
  localStorage.setItem("cookieConsent", choice);
  cookieBanner.classList.remove("is-visible");
  setTimeout(() => { cookieBanner.hidden = true; }, 450);
}

if (cookieAccept) cookieAccept.addEventListener("click", () => hideCookieBanner("accepted"));
if (cookieDecline) cookieDecline.addEventListener("click", () => hideCookieBanner("declined"));

/* =========================================================
   11) 푸터 연도 자동 갱신
   ========================================================= */
const footerYear = document.getElementById("footerYear");
if (footerYear) footerYear.textContent = new Date().getFullYear();

/* =========================================================
   11) 컨택트 폼 전송 (FormSubmit.co 사용)
   ========================================================= */
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector(".cf-submit");
    const status = document.getElementById("cfStatus");
    const originalLabel = btn.textContent;

    btn.disabled = true;
    btn.textContent = translations[currentLang]["contact.form.sending"];
    status.hidden = true;

    try {
      const formData = new FormData(contactForm);
      const countrySelect = document.getElementById("cfCountry");
      const phoneInput = document.getElementById("cfPhone");
      if (phoneInput && phoneInput.value.trim()) {
        formData.set("Phone", `${countrySelect.value} ${phoneInput.value.trim()}`);
      } else {
        formData.delete("Phone");
      }

      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });

      let result = null;
      try {
        result = await response.json();
      } catch (parseErr) {
        // The form backend should always return JSON when Accept: application/json is sent;
        // if it doesn't, treat as a failure rather than assuming success.
      }

      const isDelivered = response.ok && result && (result.success === true || result.success === "true");
      if (!isDelivered) {
        console.error("Contact form submission was not confirmed as delivered:", result || (await response.text().catch(() => "")));
        throw new Error((result && result.message) || "Request failed");
      }

      status.textContent = translations[currentLang]["contact.form.success"];
      status.className = "cf-status is-success";
      status.hidden = false;
      contactForm.reset();
    } catch (err) {
      status.textContent = translations[currentLang]["contact.form.error"];
      status.className = "cf-status is-error";
      status.hidden = false;
    } finally {
      btn.disabled = false;
      btn.textContent = originalLabel;
    }
  });
}

/* =========================================================
   12) 홈 히어로 영상 — 버튼이 마우스 커서를 따라다니고
   영상 어디를 클릭해도 Works 페이지로 이동
   ========================================================= */
const homeMedia = document.getElementById("homeMedia");
const homeCtaBtn = document.getElementById("homeCtaBtn");

if (homeMedia && homeCtaBtn) {
  homeMedia.addEventListener("mousemove", (e) => {
    const rect = homeMedia.getBoundingClientRect();
    homeCtaBtn.style.left = `${e.clientX - rect.left}px`;
    homeCtaBtn.style.top = `${e.clientY - rect.top}px`;
  });

  homeMedia.addEventListener("mouseleave", () => {
    homeCtaBtn.style.left = "";
    homeCtaBtn.style.top = "";
  });

  homeMedia.addEventListener("click", () => {
    window.location.href = homeCtaBtn.getAttribute("href");
  });
}

const homeNote = document.getElementById("homeNote");
const homeNoteClose = document.getElementById("homeNoteClose");
if (homeNote && homeNoteClose) {
  homeNote.addEventListener("click", (e) => e.stopPropagation());
  homeNoteClose.addEventListener("click", (e) => {
    e.stopPropagation();
    homeNote.hidden = true;
  });
}

/* =========================================================
   초기화
   ========================================================= */
applyLanguage(currentLang);
highlightActiveNav();
updateHeaderScrollState();
initCookieBanner();
