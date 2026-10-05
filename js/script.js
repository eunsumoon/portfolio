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
    "cv.lead": "언어를 선택해 이력서를 다운로드해주세요.",
    "cv.subtitle": "이력서",
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
    "cv.lead": "Select a language below to download the CV.",
    "cv.subtitle": "Curriculum Vitae",
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
    "cv.lead": "言語を選択して履歴書をダウンロードしてください。",
    "cv.subtitle": "履歴書",
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
   2) 작업물 데이터 (Works) — data/works.js 에서 불러옵니다.
   작업물은 관리자 페이지(푸터의 © Eunsu Moon → /admin)에서 수정하세요.
   각 HTML 페이지가 이 스크립트보다 먼저 data/works.js 와 data/site.js 를
   불러오므로, 아래 두 값은 항상 준비되어 있습니다.
   ========================================================= */
const worksData = Array.isArray(window.WORKS_DATA) ? window.WORKS_DATA : [];
const siteData = window.SITE_DATA || {};

/* About 문구는 data/site.js 의 값이 있으면 위 번역 데이터를 덮어씁니다. */
(function applySiteAbout() {
  const a = siteData.about;
  if (!a) return;
  ["ko", "en", "ja"].forEach((lang) => {
    const t = translations[lang];
    if (a.role && a.role[lang] != null) t["about.role"] = a.role[lang];
    if (a.name && a.name[lang] != null) t["about.name"] = a.name[lang];
    if (a.statement && a.statement[lang] != null) t["about.statement"] = a.statement[lang];
    if (a.practice && a.practice[lang]) t["about.value.practice"] = a.practice[lang].join("<br>");
    if (a.available && a.available[lang]) t["about.value.available"] = a.available[lang].join("<br>");
    if (a.languages && a.languages[lang]) t["about.value.languages"] = a.languages[lang].join("<br>");
  });
})();

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
  worksData.forEach((item, idx) => {
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
          <span class="work-no">${String(idx + 1).padStart(2, "0")}</span>
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

  setText("wdNo", String(index + 1).padStart(2, "0"));
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
        const heroBadge2 = s.copyrightNotice ? `<span class="copyright-badge">${s.copyrightNotice}</span>` : "";
        heroEl2.innerHTML = s.hero
          ? `<img src="${BASE}${s.hero}" alt="${s.titles[currentLang]}">${heroBadge2}`
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

      const existingDisclaimer2 = document.getElementById("wdDisclaimer2");
      if (existingDisclaimer2) existingDisclaimer2.remove();
      if (s.disclaimer) {
        const p2 = document.createElement("p");
        p2.id = "wdDisclaimer2";
        p2.className = "work-disclaimer";
        p2.textContent = s.disclaimer[currentLang];
        secondaryWrap.appendChild(p2);
      }
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

/* 푸터의 "2026 © Eunsu Moon" 을 관리자 페이지 진입 버튼으로 사용합니다. */
(function initAdminEntry() {
  if (!footerYear || !footerYear.parentElement) return;
  const wrap = footerYear.parentElement;
  if (wrap.querySelector(".footer-admin-link")) return;
  const a = document.createElement("a");
  a.className = "footer-admin-link";
  while (wrap.firstChild) a.appendChild(wrap.firstChild);
  wrap.appendChild(a);
  /* 모바일(좁은 화면 또는 터치 기기)에서는 링크 자체를 없애 완전히 비활성화합니다. */
  const mq = window.matchMedia("(max-width: 768px), (hover: none) and (pointer: coarse)");
  const sync = () => {
    if (mq.matches) a.removeAttribute("href");
    else a.setAttribute("href", BASE + "admin/");
  };
  sync();
  if (mq.addEventListener) mq.addEventListener("change", sync);
})();

/* About 페이지의 툴 목록과 수상 내역을 data/site.js 값으로 채웁니다. */
(function renderAboutExtras() {
  const a = siteData.about;
  if (!a) return;
  const esc = (v) => String(v == null ? "" : v).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const tools = document.getElementById("aboutTools");
  if (tools && Array.isArray(a.tools)) tools.innerHTML = a.tools.map(esc).join("<br>");
  const awards = document.getElementById("aboutAwards");
  if (awards && Array.isArray(a.awards)) {
    awards.innerHTML = a.awards.map((w) => `
      <li>
        <span class="about-award-year">${esc(w.year)}</span>
        <div class="about-award-body">
          <span class="about-award-title">${esc(w.title)}</span>
          <span class="about-award-note">${esc(w.note)}</span>
        </div>
      </li>`).join("");
  }
})();

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

/* =========================================================
   CV 다운로드 페이지 전용 (cv/index.html)
   - 데스크톱(hover 가능): 버튼 hover 시 경고 문구 노출, 클릭하면 바로 다운로드
   - 모바일/터치: 버튼 클릭 시 팝업으로 경고 문구 노출, 동의 클릭해야 다운로드
   ========================================================= */
(function () {
  const grid = document.querySelector(".cv-download-grid");
  if (!grid) return; // cv 페이지가 아니면 아무 것도 하지 않음

  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  if (!isTouch) return; // 데스크톱은 CSS hover 툴팁 + 기본 다운로드 동작 그대로 사용

  const overlay = document.getElementById("cvModalOverlay");
  const modalTitle = document.getElementById("cvModalTitle");
  const modalText = document.getElementById("cvModalText");
  const agreeBtn = document.getElementById("cvModalAgree");
  const cancelBtn = document.getElementById("cvModalCancel");
  if (!overlay || !agreeBtn || !cancelBtn) return;

  const cvModalCopy = {
    en: {
      title: "Before you download",
      body: "By downloading this file, you agree not to distribute or share it without permission.",
      agree: "I Agree",
      cancel: "Cancel",
    },
    ko: {
      title: "다운로드 전 확인",
      body: "다운로드 시, 허락 없이 이 파일을 배포하거나 공유하지 않는 것에 동의하는 것으로 간주됩니다.",
      agree: "동의",
      cancel: "취소",
    },
    ja: {
      title: "ダウンロード前の確認",
      body: "ダウンロードすると、許可なくこのファイルを配布・共有しないことに同意したものとみなされます。",
      agree: "同意する",
      cancel: "キャンセル",
    },
  };

  let pendingHref = null;

  function openModal(lang, href) {
    const c = cvModalCopy[lang] || cvModalCopy.en;
    modalTitle.textContent = c.title;
    modalText.textContent = c.body;
    agreeBtn.textContent = c.agree;
    cancelBtn.textContent = c.cancel;
    pendingHref = href;
    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add("is-visible"));
  }

  function closeModal() {
    overlay.classList.remove("is-visible");
    window.setTimeout(() => { overlay.hidden = true; }, 200);
    pendingHref = null;
  }

  grid.querySelectorAll(".cv-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(btn.getAttribute("data-lang"), btn.getAttribute("href"));
    });
  });

  agreeBtn.addEventListener("click", () => {
    if (pendingHref) {
      const a = document.createElement("a");
      a.href = pendingHref;
      a.download = "";
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
    closeModal();
  });

  cancelBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
})();

