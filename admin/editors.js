/* =========================================================
   admin/editors.js
   편집 상태(S), 데이터 정규화, 작업물/About 편집 화면.
   ========================================================= */
"use strict";
(function (A) {
  const { h } = A;
  const LANGS = ["ko", "en", "ja"];
  const LANG_NAME = { ko: "한국어", en: "English", ja: "日本語" };
  const MAX_FILE = 50 * 1024 * 1024; // GitHub API 요청 크기 한도를 고려한 안전선

  /* ---------- 편집 상태 ---------- */
  const S = (A.S = {
    gh: null,
    tree: new Set(),
    works: [],
    site: { about: {} },
    origWorks: "",
    origSite: "",
    files: new Map(), // 저장소 경로(원문) → { blob, url }  (게시 전 대기 중인 파일)
    keep: new Map(), // 게시 완료됐지만 사이트 반영 전까지 미리보기용으로 들고 있는 파일
    deletes: new Set(), // 게시 때 삭제할 저장소 경로
    optimize: localStorage.getItem("adm_optimize") !== "0",
    onChange() {},
    stage(path, blob) {
      const old = this.files.get(path);
      if (old) URL.revokeObjectURL(old.url);
      this.files.set(path, { blob, url: URL.createObjectURL(blob) });
      this.deletes.delete(path);
      this.onChange();
    },
    unstage(path) {
      const old = this.files.get(path);
      if (old) URL.revokeObjectURL(old.url);
      this.files.delete(path);
      this.onChange();
    },
    /* 데이터에 적힌(인코딩된) 경로 → 화면에 보여줄 URL. 대기 중이면 임시 URL. */
    urlFor(encPath) {
      const p = A.path.dec(encPath);
      const f = this.files.get(p) || this.keep.get(p);
      return f ? f.url : "../" + encPath;
    },
    markPublished() {
      this.files.forEach((v, k) => this.keep.set(k, v));
      this.files.clear();
      this.deletes.clear();
    },
  });

  /* ---------- 알림(toast) ---------- */
  A.toast = function (msg, type) {
    let box = document.getElementById("toasts");
    if (!box) {
      box = h("div", { id: "toasts", "aria-live": "polite" });
      document.body.append(box);
    }
    const t = h("div", { class: "toast " + (type || "") , text: msg });
    box.append(t);
    setTimeout(() => t.remove(), type === "err" ? 7000 : 3500);
  };

  /* =========================================================
     데이터 정규화
     ========================================================= */
  const emptyI18n = () => ({ ko: "", en: "", ja: "" });
  const emptyLines = () => ({ ko: [], en: [], ja: [] });
  const anyText = (o) => !!o && LANGS.some((l) => typeof o[l] === "string" && o[l].trim() !== "");

  function ensureI18n(o, k) {
    if (!o[k] || typeof o[k] !== "object") o[k] = emptyI18n();
    LANGS.forEach((l) => { if (typeof o[k][l] !== "string") o[k][l] = ""; });
    return o[k];
  }
  function ensureLines(o, k) {
    if (!o[k] || typeof o[k] !== "object") o[k] = emptyLines();
    LANGS.forEach((l) => { if (!Array.isArray(o[k][l])) o[k][l] = []; });
    return o[k];
  }
  const cleanI18n = (v) => { const o = {}; LANGS.forEach((l) => (o[l] = v && typeof v[l] === "string" ? v[l] : "")); return o; };
  const cleanLines = (v) => { const o = {}; LANGS.forEach((l) => (o[l] = ((v && v[l]) || []).map((s) => String(s).trim()).filter(Boolean))); return o; };

  /* 저장된 데이터 → 편집용 객체 (갤러리 항목을 모두 { src, label... } 형태로) */
  function toEdit(src) {
    const w = JSON.parse(JSON.stringify(src));
    w.year = String(w.year || "");
    w.image = w.image || "";
    w.hero = w.hero || "";
    w.gallery = (w.gallery || []).map((g) => (typeof g === "string" ? { src: g } : g));
    ["titles", "tags", "descs", "role", "contribution", "client", "award", "disclaimer"].forEach((k) => ensureI18n(w, k));
    ensureLines(w, "responsibilities");
    if (!w.note || typeof w.note !== "object") w.note = {};
    ensureI18n(w.note, "label");
    ensureI18n(w.note, "text");
    if (typeof w.copyrightNotice !== "string") w.copyrightNotice = "";
    if (w.secondary) w.secondary = toEdit(w.secondary);
    return w;
  }
  A.toEdit = toEdit;

  function serializeSlot(s) {
    const label = s.label && anyText(s.label) ? cleanI18n(s.label) : null;
    const zoom = Number(s.videoZoom);
    const hasZoom = zoom > 0 && zoom !== 1;
    if (!label && !s.captionLight && !hasZoom) return s.src || "";
    const o = { src: s.src || "" };
    if (label) o.label = label;
    if (s.captionLight) o.captionLight = true;
    if (hasZoom) o.videoZoom = zoom;
    return o;
  }

  /* 편집용 객체 → 저장용 객체 (선택 항목이 비어 있으면 키 자체를 뺍니다) */
  function serializeWork(w, secondary) {
    const o = {};
    if (!secondary) o.id = w.id;
    o.year = String(w.year || "").trim();
    if (!secondary) o.url = w.url;
    o.image = w.image || "";
    o.hero = w.hero || "";
    if (!secondary && w.listThumb) o.listThumb = w.listThumb;
    o.gallery = (w.gallery || []).filter((g) => g.src !== undefined).map(serializeSlot);
    o.titles = cleanI18n(w.titles);
    o.tags = cleanI18n(w.tags);
    o.descs = cleanI18n(w.descs);
    o.role = cleanI18n(w.role);
    if (anyText(w.client)) o.client = cleanI18n(w.client);
    o.contribution = cleanI18n(w.contribution);
    o.responsibilities = cleanLines(w.responsibilities);
    if (!secondary) {
      if (anyText(w.award)) o.award = cleanI18n(w.award);
      if (w.note && anyText(w.note.text)) o.note = { label: cleanI18n(w.note.label), text: cleanI18n(w.note.text) };
      if (anyText(w.disclaimer)) o.disclaimer = cleanI18n(w.disclaimer);
      if (w.copyrightNotice && w.copyrightNotice.trim()) o.copyrightNotice = w.copyrightNotice.trim();
      if (w.secondary) o.secondary = serializeWork(w.secondary, true);
    }
    return o;
  }
  A.serializeWork = (w) => serializeWork(w, false);

  function serializeSite(site) {
    const a = site.about || {};
    const out = {
      role: cleanI18n(a.role), name: cleanI18n(a.name), statement: cleanI18n(a.statement),
      practice: cleanLines(a.practice), available: cleanLines(a.available), languages: cleanLines(a.languages),
      tools: (a.tools || []).map((s) => String(s).trim()).filter(Boolean),
      awards: (a.awards || [])
        .map((x) => ({ year: String(x.year || "").trim(), title: String(x.title || "").trim(), note: String(x.note || "").trim() }))
        .filter((x) => x.year || x.title || x.note),
    };
    return { about: out };
  }
  A.serializeSite = serializeSite;

  A.siteToEdit = function (site) {
    const s = JSON.parse(JSON.stringify(site || {}));
    s.about = s.about || {};
    const a = s.about;
    ["role", "name", "statement"].forEach((k) => ensureI18n(a, k));
    ["practice", "available", "languages"].forEach((k) => ensureLines(a, k));
    a.tools = Array.isArray(a.tools) ? a.tools : [];
    a.awards = Array.isArray(a.awards) ? a.awards : [];
    return s;
  };

  /* 작업물이 참조하는 모든 파일 경로(원문) */
  A.refsOf = function (works) {
    const set = new Set();
    const add = (p) => { if (p) set.add(A.path.dec(p)); };
    (function walk(list) {
      list.forEach((w) => {
        add(w.image); add(w.hero); add(w.listThumb);
        (w.gallery || []).forEach((g) => add(typeof g === "string" ? g : g.src));
        if (w.secondary) walk([w.secondary]);
      });
    })(works);
    return set;
  };

  /* =========================================================
     언어 탭
     ========================================================= */
  function setLang(l) {
    document.documentElement.dataset.editLang = l;
    document.querySelectorAll(".lang-tabs button").forEach((b) => b.classList.toggle("is-active", b.dataset.l === l));
  }
  A.langTabs = function () {
    const wrap = h("div", { class: "lang-tabs", role: "tablist" });
    LANGS.forEach((l) =>
      wrap.append(h("button", { type: "button", dataset: { l }, class: document.documentElement.dataset.editLang === l ? "is-active" : "", text: LANG_NAME[l], onclick: () => setLang(l) }))
    );
    return wrap;
  };
  document.documentElement.dataset.editLang = "ko";

  /* =========================================================
     폼 부품
     ========================================================= */
  const fieldRow = (label, control, hint) =>
    h("div", { class: "f" }, h("label", { class: "f-label", text: label }), control, hint ? h("p", { class: "hint", text: hint }) : null);

  const card = (title, ...kids) => h("section", { class: "card" }, h("h3", { text: title }), ...kids);

  function textInput(obj, key, opt) {
    opt = opt || {};
    return h("input", {
      class: "in", type: "text", value: obj[key] == null ? "" : obj[key], placeholder: opt.placeholder || "",
      oninput: (e) => { obj[key] = e.target.value; S.onChange(); },
    });
  }

  function i18nInput(obj, key, opt) {
    opt = opt || {};
    const v = ensureI18n(obj, key);
    const box = h("div", { class: "i18n" });
    LANGS.forEach((l) => {
      const common = {
        class: "in", dataset: { l }, value: v[l], placeholder: opt.placeholder || "",
        oninput: (e) => { v[l] = e.target.value; S.onChange(); },
      };
      box.append(opt.multiline ? h("textarea", Object.assign({ rows: opt.rows || 4 }, common)) : h("input", Object.assign({ type: "text" }, common)));
    });
    return box;
  }

  function linesInput(obj, key, opt) {
    opt = opt || {};
    const v = ensureLines(obj, key);
    const box = h("div", { class: "i18n" });
    LANGS.forEach((l) =>
      box.append(
        h("textarea", {
          class: "in", rows: opt.rows || 5, dataset: { l }, value: v[l].join("\n"), placeholder: opt.placeholder || "한 줄에 하나씩",
          oninput: (e) => { v[l] = e.target.value.split("\n").map((s) => s.trim()).filter(Boolean); S.onChange(); },
        })
      )
    );
    return box;
  }

  /* =========================================================
     파일 업로드 (게시 전까지는 브라우저에 임시 보관)
     ========================================================= */
  async function stageUpload(file, folder, base) {
    const isImg = file.type.startsWith("image/");
    let blob = file, ext = A.path.ext(file.name) || "bin";
    if (isImg) ({ blob, ext } = await A.processImage(file, { webp: S.optimize, maxSide: 2400 }));
    if (blob.size > MAX_FILE) throw new Error(`${file.name}: 파일이 너무 큽니다 (${A.fmtSize(blob.size)}). 50MB 이하로 줄여주세요.`);
    const path = `${folder}/${base}-${A.stamp()}.${ext}`;
    S.stage(path, blob);
    return A.path.enc(path);
  }

  function mediaEl(encPath) {
    const url = S.urlFor(encPath);
    return A.path.isVideo(encPath)
      ? h("video", { src: url + "#t=0.1", muted: true, playsinline: true, preload: "metadata" })
      : h("img", { src: url, loading: "lazy", alt: "" });
  }

  /* 단일 이미지 칸 (썸네일/히어로 등) */
  function imageField(label, obj, key, ctx, opt) {
    opt = opt || {};
    const box = h("div", { class: "img-field" });
    function render() {
      box.replaceChildren();
      const p = obj[key];
      const input = h("input", {
        type: "file", accept: "image/*", hidden: true,
        onchange: async (e) => {
          const f = e.target.files[0];
          e.target.value = "";
          if (!f) return;
          box.classList.add("is-busy");
          try { obj[key] = await stageUpload(f, ctx.folder(), opt.base || key); }
          catch (err) { A.toast(err.message, "err"); }
          box.classList.remove("is-busy");
          S.onChange();
          render();
        },
      });
      box.append(
        h("div", { class: "img-prev" }, p ? mediaEl(p) : h("span", { class: "ph", text: "이미지 없음" })),
        h("div", { class: "img-side" },
          h("strong", { text: label }),
          opt.hint ? h("p", { class: "hint", text: opt.hint }) : null,
          h("code", { class: "path", text: p ? A.path.dec(p) : "—" }),
          h("div", { class: "btns" },
            h("button", { type: "button", class: "btn sm", onclick: () => input.click(), text: p ? "교체" : "업로드" }),
            opt.optional && p ? h("button", { type: "button", class: "btn sm ghost", text: "지우기", onclick: () => { obj[key] = ""; S.onChange(); render(); } }) : null,
            input
          )
        )
      );
    }
    render();
    return box;
  }

  /* 갤러리 (이미지·영상 여러 개, 순서 변경, 캡션) */
  function galleryField(work, ctx) {
    const wrap = h("div", { class: "gallery-ed" });
    let dragIdx = null;
    const fileInput = h("input", {
      type: "file", accept: "image/*,video/mp4,video/webm,video/quicktime", multiple: true, hidden: true,
      onchange: (e) => { const fs = [...e.target.files]; e.target.value = ""; addFiles(fs); },
    });
    const status = h("span", { class: "g-status" });

    async function addFiles(files) {
      if (!files.length) return;
      const list = work.gallery;
      let n = 0;
      for (const f of files) {
        n++;
        status.textContent = `처리 중 ${n}/${files.length} …`;
        try {
          const src = await stageUpload(f, ctx.folder(), "gallery");
          list.push({ src });
        } catch (err) { A.toast(err.message, "err"); }
      }
      status.textContent = "";
      S.onChange();
      render();
    }

    const move = (i, d) => {
      const j = i + d, list = work.gallery;
      if (j < 0 || j >= list.length) return;
      [list[i], list[j]] = [list[j], list[i]];
      S.onChange(); render();
    };

    function slotCard(slot, i) {
      const list = work.gallery;
      const isVid = A.path.isVideo(slot.src);
      const media = h("div", { class: "g-media", draggable: "true", title: "끌어서 순서 변경" }, slot.src ? mediaEl(slot.src) : h("span", { class: "ph", text: "비어 있음" }));
      media.addEventListener("dragstart", (e) => { dragIdx = i; e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", String(i)); });
      const capBox = h("div", { class: "g-cap", hidden: !slot._open });
      if (!slot.label) slot.label = emptyI18n();
      ensureI18n(slot, "label");
      capBox.append(
        ...[i18nInput(slot, "label", { placeholder: "캡션 (선택)" }),
        h("label", { class: "chk" }, h("input", { type: "checkbox", checked: !!slot.captionLight, onchange: (e) => { slot.captionLight = e.target.checked; S.onChange(); } }), " 캡션 글자색 밝게"),
        isVid
          ? h("label", { class: "chk" }, "영상 확대 ", h("input", { class: "in xs", type: "number", step: "0.05", min: "1", value: slot.videoZoom || "", placeholder: "1", oninput: (e) => { slot.videoZoom = e.target.value; S.onChange(); } }))
          : null].filter(Boolean)
      );
      const el = h("div", { class: "g-card" },
        h("span", { class: "g-no", text: String(i + 1) }),
        media,
        h("div", { class: "g-btns" },
          h("button", { type: "button", class: "ic", title: "앞으로", text: "←", onclick: () => move(i, -1) }),
          h("button", { type: "button", class: "ic", title: "뒤로", text: "→", onclick: () => move(i, 1) }),
          h("button", { type: "button", class: "ic", title: "캡션", text: "Aa", onclick: () => { slot._open = !slot._open; capBox.hidden = !slot._open; } }),
          h("button", { type: "button", class: "ic danger", title: "삭제", text: "✕", onclick: () => { list.splice(i, 1); S.onChange(); render(); } })
        ),
        capBox
      );
      el.addEventListener("dragover", (e) => { if (dragIdx !== null) { e.preventDefault(); el.classList.add("drop"); } });
      el.addEventListener("dragleave", () => el.classList.remove("drop"));
      el.addEventListener("drop", (e) => {
        el.classList.remove("drop");
        if (dragIdx === null) return;
        e.preventDefault();
        const [m] = list.splice(dragIdx, 1);
        list.splice(i, 0, m);
        dragIdx = null;
        S.onChange(); render();
      });
      media.addEventListener("dragend", () => { dragIdx = null; });
      return el;
    }

    function render() {
      wrap.replaceChildren();
      const grid = h("div", { class: "g-grid" }, work.gallery.map(slotCard));
      const add = h("div", { class: "g-add" },
        h("button", { type: "button", class: "btn", text: "＋ 이미지·영상 추가", onclick: () => fileInput.click() }),
        status, fileInput,
        h("span", { class: "hint", text: "여러 개를 한 번에 선택하거나 이 영역에 끌어다 놓을 수 있습니다." })
      );
      wrap.append(grid, add);
    }
    wrap.addEventListener("dragover", (e) => { if (e.dataTransfer && [...e.dataTransfer.types].includes("Files")) { e.preventDefault(); wrap.classList.add("file-over"); } });
    wrap.addEventListener("dragleave", (e) => { if (e.target === wrap) wrap.classList.remove("file-over"); });
    wrap.addEventListener("drop", (e) => {
      wrap.classList.remove("file-over");
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) { e.preventDefault(); addFiles([...e.dataTransfer.files]); }
    });
    render();
    return wrap;
  }

  /* =========================================================
     작업물 편집기
     ========================================================= */
  function workFolder(w) {
    const cands = [w.image, w.hero, w.listThumb, (w.gallery[0] || {}).src];
    for (const c of cands) {
      if (!c) continue;
      const p = A.path.dec(c);
      if (p.startsWith("images/works/")) return A.path.dir(p);
    }
    return "images/works/" + (A.path.slug(w.titles.en || w.titles.ko) || "work-" + (w.id || A.stamp()));
  }

  function basicCards(w, ctx, secondary) {
    const cards = [];
    cards.push(
      card("기본 정보",
        fieldRow("제목", i18nInput(w, "titles")),
        fieldRow("분류 태그", i18nInput(w, "tags", { placeholder: "예: 브랜딩" })),
        fieldRow("연도", textInput(w, "year", { placeholder: "2024" }))
      ),
      card("대표 이미지",
        imageField("썸네일", w, "image", ctx, { base: "thumb", hint: "상세 페이지 상단 썸네일. 작업 목록에도 사용됩니다." }),
        secondary ? null : imageField("목록 전용 썸네일", w, "listThumb", ctx, { base: "list", optional: true, hint: "선택. 비우면 위 썸네일을 목록에서도 사용합니다." }),
        imageField("히어로 이미지", w, "hero", ctx, { base: "hero", hint: "상세 페이지 맨 위의 큰 이미지." })
      ),
      card("설명", fieldRow("작업 설명", i18nInput(w, "descs", { multiline: true, rows: 10 }), "빈 줄로 문단을 나눕니다.")),
      card("상세 정보",
        fieldRow("역할", i18nInput(w, "role")),
        fieldRow("클라이언트", i18nInput(w, "client"), "모든 언어를 비워두면 이 항목이 화면에서 숨겨집니다."),
        fieldRow("기여도", i18nInput(w, "contribution", { placeholder: "예: 100%" })),
        fieldRow("담당 업무", linesInput(w, "responsibilities"), "한 줄에 하나씩 입력합니다.")
      )
    );
    return cards;
  }

  A.buildWorkEditor = function (w, onBack) {
    const ctx = { folder: () => workFolder(w) };
    const root = h("div", { class: "editor" });
    const titleEl = h("h2", { class: "ed-title" });
    const refreshTitle = () => { titleEl.textContent = w.titles.ko || w.titles.en || "새 작업"; };
    refreshTitle();

    const head = h("div", { class: "ed-head" },
      h("button", { type: "button", class: "btn ghost", text: "← 목록으로", onclick: onBack }),
      h("div", { class: "ed-head-mid" }, h("span", { class: "no", text: "ID " + w.id }), titleEl),
      A.langTabs()
    );
    root.append(head);

    const optLabel = h("label", { class: "chk opt" },
      h("input", { type: "checkbox", checked: S.optimize, onchange: (e) => { S.optimize = e.target.checked; localStorage.setItem("adm_optimize", S.optimize ? "1" : "0"); } }),
      " 업로드 시 PNG·JPG를 WebP로 변환하고 긴 변을 2400px로 줄이기 (권장, 용량 절약)"
    );
    root.append(optLabel);

    basicCards(w, ctx, false).forEach((c) => root.append(c));

    root.append(
      card("추가 문구 (선택)",
        fieldRow("수상", i18nInput(w, "award"), "비워두면 수상 항목이 숨겨집니다."),
        fieldRow("참여 라벨 (예: 참여)", i18nInput(w.note, "label")),
        fieldRow("참여 내용", i18nInput(w.note, "text"), "비워두면 이 항목이 숨겨집니다."),
        fieldRow("저작권 표시 (이미지 위 배지)", textInput(w, "copyrightNotice", { placeholder: "예: © TV TOKYO" })),
        fieldRow("하단 고지문", i18nInput(w, "disclaimer", { multiline: true, rows: 3 }))
      ),
      card("갤러리", galleryField(w, ctx))
    );

    /* 보조 작업(같은 페이지의 두 번째 섹션) */
    const secWrap = h("div", { class: "secondary" });
    let stash = w.secondary || null;
    const renderSecondary = () => {
      secWrap.replaceChildren();
      if (!w.secondary) return;
      secWrap.append(h("h3", { class: "sec-title", text: "보조 작업" }));
      basicCards(w.secondary, ctx, true).forEach((c) => secWrap.append(c));
      secWrap.append(card("보조 작업 갤러리", galleryField(w.secondary, ctx)));
    };
    const secToggle = h("label", { class: "chk" },
      h("input", {
        type: "checkbox", checked: !!w.secondary,
        onchange: (e) => {
          if (e.target.checked) {
            w.secondary = stash || toEdit({ year: w.year, image: "", hero: "", gallery: [], titles: {}, tags: {}, descs: {}, role: {}, contribution: {}, responsibilities: {} });
          } else { stash = w.secondary; w.secondary = null; }
          S.onChange(); renderSecondary();
        },
      }),
      " 이 페이지에 보조 작업 섹션 추가 (한 페이지에 두 번째 작업을 이어서 보여줍니다)"
    );
    root.append(h("section", { class: "card" }, h("h3", { text: "보조 작업 (선택)" }), secToggle), secWrap);
    renderSecondary();

    root.addEventListener("input", refreshTitle);
    return root;
  };

  /* =========================================================
     About 편집기
     ========================================================= */
  A.buildAboutEditor = function (site) {
    const a = site.about;
    const root = h("div", { class: "editor" });
    root.append(
      h("div", { class: "ed-head" },
        h("div", { class: "ed-head-mid" }, h("h2", { class: "ed-title", text: "About 소개" })),
        A.langTabs()
      ),
      card("소개",
        fieldRow("직함", i18nInput(a, "role")),
        fieldRow("이름", i18nInput(a, "name")),
        fieldRow("소개 문구", i18nInput(a, "statement", { multiline: true, rows: 5 }))
      ),
      card("항목 목록",
        fieldRow("작업 분야", linesInput(a, "practice"), "한 줄에 하나씩"),
        fieldRow("협업 가능 분야", linesInput(a, "available")),
        fieldRow("언어", linesInput(a, "languages"))
      )
    );

    const tools = h("textarea", {
      class: "in", rows: 8, value: a.tools.join("\n"), placeholder: "한 줄에 하나씩",
      oninput: (e) => { a.tools = e.target.value.split("\n").map((s) => s.trim()).filter(Boolean); S.onChange(); },
    });
    root.append(card("툴", fieldRow("사용 툴 (모든 언어 공통)", tools, "한 줄에 하나씩")));

    const awardsBox = h("div", { class: "awards" });
    const renderAwards = () => {
      awardsBox.replaceChildren();
      a.awards.forEach((aw, i) => {
        const mv = (d) => { const j = i + d; if (j < 0 || j >= a.awards.length) return; [a.awards[i], a.awards[j]] = [a.awards[j], a.awards[i]]; S.onChange(); renderAwards(); };
        awardsBox.append(
          h("div", { class: "award-row" },
            textInput(aw, "year", { placeholder: "연도" }),
            textInput(aw, "title", { placeholder: "수상명" }),
            textInput(aw, "note", { placeholder: "예: Winner · MUSINSA" }),
            h("div", { class: "g-btns inline" },
              h("button", { type: "button", class: "ic", text: "↑", title: "위로", onclick: () => mv(-1) }),
              h("button", { type: "button", class: "ic", text: "↓", title: "아래로", onclick: () => mv(1) }),
              h("button", { type: "button", class: "ic danger", text: "✕", title: "삭제", onclick: () => { a.awards.splice(i, 1); S.onChange(); renderAwards(); } })
            )
          )
        );
      });
      awardsBox.append(h("button", { type: "button", class: "btn", text: "＋ 수상 내역 추가", onclick: () => { a.awards.push({ year: "", title: "", note: "" }); S.onChange(); renderAwards(); } }));
    };
    renderAwards();
    root.append(card("수상 내역 (모든 언어 공통)", awardsBox));
    return root;
  };

  /* 새 작업 기본값 */
  A.newWork = function (id) {
    return toEdit({
      id, year: String(new Date().getFullYear()), url: `works/project-${id}.html`,
      image: "", hero: "", gallery: [], titles: {}, tags: {}, descs: {}, role: {}, contribution: {}, responsibilities: {},
    });
  };
})(window.Admin);
