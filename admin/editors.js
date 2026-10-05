/* =========================================================
   admin/editors.js
   Edit state (S), data normalization, Works/About editors.
   ========================================================= */
"use strict";
(function (A) {
  const { h } = A;
  const LANGS = ["ko", "en", "ja"];
  const LANG_NAME = { ko: "Korean", en: "English", ja: "Japanese" };
  const MAX_FILE = 50 * 1024 * 1024; // safety limit considering GitHub API request size

  /* ---------- Edit state ---------- */
  const S = (A.S = {
    gh: null,
    tree: new Set(),
    works: [],
    site: { about: {} },
    origWorks: "",
    origSite: "",
    files: new Map(), // repo path (raw) -> { blob, url } (files waiting to be published)
    keep: new Map(), // published, but kept for previews until the site updates
    deletes: new Set(), // repo paths to delete on publish
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
    /* Encoded path from the data -> URL to display. A temporary URL while pending. */
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

  /* ---------- Toast ---------- */
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
     Data normalization
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

  /* Stored data -> edit object (every gallery item as { src, label... }) */
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

  /* Edit object -> stored object (empty optional items are omitted) */
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
    if (anyText(w.disclaimer)) o.disclaimer = cleanI18n(w.disclaimer);
    if (w.copyrightNotice && w.copyrightNotice.trim()) o.copyrightNotice = w.copyrightNotice.trim();
    if (!secondary) {
      if (anyText(w.award)) o.award = cleanI18n(w.award);
      if (w.note && anyText(w.note.text)) o.note = { label: cleanI18n(w.note.label), text: cleanI18n(w.note.text) };
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

  /* Every file path (raw) referenced by the works */
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
     Language tabs
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
  document.documentElement.dataset.editLang = "en";

  /* =========================================================
     Form parts
     ========================================================= */
  const fieldRow = (label, control, hint) =>
    h("div", { class: "f" }, h("label", { class: "f-label", text: label }), control, hint ? A.hint(hint) : null);

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
          class: "in", rows: opt.rows || 5, dataset: { l }, value: v[l].join("\n"), placeholder: opt.placeholder || "One per line",
          oninput: (e) => { v[l] = e.target.value.split("\n").map((s) => s.trim()).filter(Boolean); S.onChange(); },
        })
      )
    );
    return box;
  }

  /* =========================================================
     File upload (held in the browser until published)
     ========================================================= */
  async function stageUpload(file, folder, base) {
    const isImg = file.type.startsWith("image/");
    let blob = file, ext = A.path.ext(file.name) || "bin";
    if (isImg) ({ blob, ext } = await A.processImage(file, { webp: S.optimize, maxSide: 2400 }));
    if (blob.size > MAX_FILE) throw new Error(`${file.name}: file is too large (${A.fmtSize(blob.size)}). Keep it under 50 MB.`);
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

  /* Single image field (thumbnail / hero etc.) */
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
        h("div", { class: "img-prev" }, p ? mediaEl(p) : h("span", { class: "ph", text: "No image" })),
        h("div", { class: "img-side" },
          h("strong", { text: label }),
          opt.hint ? A.hint(opt.hint) : null,
          h("code", { class: "path", text: p ? A.path.dec(p) : "—" }),
          h("div", { class: "btns" },
            h("button", { type: "button", class: "btn sm", onclick: () => input.click(), text: p ? "Replace" : "Upload" }),
            opt.optional && p ? h("button", { type: "button", class: "btn sm ghost", text: "Remove", onclick: () => { obj[key] = ""; S.onChange(); render(); } }) : null,
            input
          )
        )
      );
    }
    render();
    return box;
  }

  /* Gallery (multiple images/videos, reordering, captions) */
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
        status.textContent = `Processing ${n}/${files.length} …`;
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
      const media = h("div", { class: "g-media", draggable: "true", title: "Drag to reorder" }, slot.src ? mediaEl(slot.src) : h("span", { class: "ph", text: "Empty" }));
      media.addEventListener("dragstart", (e) => { dragIdx = i; e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", String(i)); });
      const capBox = h("div", { class: "g-cap", hidden: !slot._open });
      if (!slot.label) slot.label = emptyI18n();
      ensureI18n(slot, "label");
      capBox.append(
        ...[i18nInput(slot, "label", { placeholder: "Caption (optional)" }),
        h("label", { class: "chk" }, h("input", { type: "checkbox", checked: !!slot.captionLight, onchange: (e) => { slot.captionLight = e.target.checked; S.onChange(); } }), " Light caption text"),
        isVid
          ? h("label", { class: "chk" }, "Video zoom ", h("input", { class: "in xs", type: "number", step: "0.05", min: "1", value: slot.videoZoom || "", placeholder: "1", oninput: (e) => { slot.videoZoom = e.target.value; S.onChange(); } }))
          : null].filter(Boolean)
      );
      const el = h("div", { class: "g-card" },
        h("span", { class: "g-no", text: String(i + 1) }),
        media,
        h("div", { class: "g-btns" },
          h("button", { type: "button", class: "ic", title: "Move earlier", text: "←", onclick: () => move(i, -1) }),
          h("button", { type: "button", class: "ic", title: "Move later", text: "→", onclick: () => move(i, 1) }),
          h("button", { type: "button", class: "ic", title: "Caption", text: "Aa", onclick: () => { slot._open = !slot._open; capBox.hidden = !slot._open; } }),
          h("button", { type: "button", class: "ic danger", title: "Delete", text: "✕", onclick: () => { list.splice(i, 1); S.onChange(); render(); } })
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
        h("button", { type: "button", class: "btn", text: "＋ Add images / videos", onclick: () => fileInput.click() }),
        status, fileInput,
        A.hint("Select several files at once, or drag them into this area.", "span")
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
     Work editor
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
      card("Basic info",
        fieldRow("Title", i18nInput(w, "titles")),
        fieldRow("Category tag", i18nInput(w, "tags", { placeholder: "e.g. Branding" })),
        fieldRow("Year", textInput(w, "year", { placeholder: "2024" }))
      ),
      card("Main images",
        imageField("Thumbnail", w, "image", ctx, { base: "thumb", hint: "Thumbnail at the top of the detail page. Also used in the works list." }),
        secondary ? null : imageField("List-only thumbnail", w, "listThumb", ctx, { base: "list", optional: true, hint: "Optional. If empty, the thumbnail above is used in the list too." }),
        imageField("Hero image", w, "hero", ctx, { base: "hero", hint: "The large image at the very top of the detail page." })
      ),
      card("Description", fieldRow("Project description", i18nInput(w, "descs", { multiline: true, rows: 10 }), "Separate paragraphs with a blank line.")),
      card("Details",
        fieldRow("Role", i18nInput(w, "role")),
        fieldRow("Client", i18nInput(w, "client"), "If every language is empty, this item is hidden on the site."),
        fieldRow("Contribution", i18nInput(w, "contribution", { placeholder: "e.g. 100%" })),
        fieldRow("Responsibilities", linesInput(w, "responsibilities"), "Enter one per line.")
      )
    );
    return cards;
  }

  A.buildWorkEditor = function (w, onBack) {
    const ctx = { folder: () => workFolder(w) };
    const root = h("div", { class: "editor" });
    const titleEl = h("h2", { class: "ed-title" });
    const refreshTitle = () => { titleEl.textContent = w.titles.ko || w.titles.en || "New work"; };
    refreshTitle();

    const head = h("div", { class: "ed-head" },
      h("button", { type: "button", class: "btn ghost", text: "← Back to list", onclick: onBack }),
      h("div", { class: "ed-head-mid" }, h("span", { class: "no", text: "ID " + w.id }), titleEl),
      A.langTabs()
    );
    root.append(head);

    const optLabel = h("label", { class: "chk opt" },
      h("input", { type: "checkbox", checked: S.optimize, onchange: (e) => { S.optimize = e.target.checked; localStorage.setItem("adm_optimize", S.optimize ? "1" : "0"); } }),
      " Convert PNG/JPG to WebP on upload and cap the long side at 2400px (recommended, saves space)"
    );
    root.append(optLabel);

    basicCards(w, ctx, false).forEach((c) => root.append(c));

    root.append(
      card("Extra text (optional)",
        fieldRow("Award", i18nInput(w, "award"), "If empty, the award item is hidden."),
        fieldRow("Credit label (e.g. Participation)", i18nInput(w.note, "label")),
        fieldRow("Credit text", i18nInput(w.note, "text"), "If empty, this item is hidden."),
        fieldRow("Copyright badge (shown over the image)", textInput(w, "copyrightNotice", { placeholder: "e.g. © TV TOKYO" })),
        fieldRow("Footer disclaimer", i18nInput(w, "disclaimer", { multiline: true, rows: 3 }))
      ),
      card("Gallery", galleryField(w, ctx))
    );

    /* Secondary work (a second section on the same page) */
    const secWrap = h("div", { class: "secondary" });
    let stash = w.secondary || null;
    const renderSecondary = () => {
      secWrap.replaceChildren();
      if (!w.secondary) return;
      secWrap.append(h("h3", { class: "sec-title", text: "Secondary work" }));
      basicCards(w.secondary, ctx, true).forEach((c) => secWrap.append(c));
      secWrap.append(
        card("Extra text (optional)",
          fieldRow("Copyright badge (shown over the image)", textInput(w.secondary, "copyrightNotice", { placeholder: "e.g. © TV TOKYO" })),
          fieldRow("Footer disclaimer", i18nInput(w.secondary, "disclaimer", { multiline: true, rows: 3 }), "If empty, this item is hidden.")
        ),
        card("Secondary work gallery", galleryField(w.secondary, ctx))
      );
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
      " Add a secondary work section to this page (shows a second project below the first)"
    );
    root.append(h("section", { class: "card" }, h("h3", { text: "Secondary work (optional)" }), secToggle), secWrap);
    renderSecondary();

    root.addEventListener("input", refreshTitle);
    return root;
  };

  /* =========================================================
     About editor
     ========================================================= */
  A.buildAboutEditor = function (site) {
    const a = site.about;
    const root = h("div", { class: "editor" });
    root.append(
      h("div", { class: "ed-head" },
        h("div", { class: "ed-head-mid" }, h("h2", { class: "ed-title", text: "About" })),
        A.langTabs()
      ),
      card("Intro",
        fieldRow("Title", i18nInput(a, "role")),
        fieldRow("Name", i18nInput(a, "name")),
        fieldRow("Statement", i18nInput(a, "statement", { multiline: true, rows: 5 }))
      ),
      card("Lists",
        fieldRow("Practice", linesInput(a, "practice"), "One per line"),
        fieldRow("Available for", linesInput(a, "available")),
        fieldRow("Languages", linesInput(a, "languages"))
      )
    );

    const tools = h("textarea", {
      class: "in", rows: 8, value: a.tools.join("\n"), placeholder: "One per line",
      oninput: (e) => { a.tools = e.target.value.split("\n").map((s) => s.trim()).filter(Boolean); S.onChange(); },
    });
    root.append(card("Tools", fieldRow("Tools used (shared by all languages)", tools, "One per line")));

    const awardsBox = h("div", { class: "awards" });
    const renderAwards = () => {
      awardsBox.replaceChildren();
      a.awards.forEach((aw, i) => {
        const mv = (d) => { const j = i + d; if (j < 0 || j >= a.awards.length) return; [a.awards[i], a.awards[j]] = [a.awards[j], a.awards[i]]; S.onChange(); renderAwards(); };
        awardsBox.append(
          h("div", { class: "award-row" },
            textInput(aw, "year", { placeholder: "Year" }),
            textInput(aw, "title", { placeholder: "Award title" }),
            textInput(aw, "note", { placeholder: "e.g. Winner · MUSINSA" }),
            h("div", { class: "g-btns inline" },
              h("button", { type: "button", class: "ic", text: "↑", title: "Move up", onclick: () => mv(-1) }),
              h("button", { type: "button", class: "ic", text: "↓", title: "Move down", onclick: () => mv(1) }),
              h("button", { type: "button", class: "ic danger", text: "✕", title: "Delete", onclick: () => { a.awards.splice(i, 1); S.onChange(); renderAwards(); } })
            )
          )
        );
      });
      awardsBox.append(h("button", { type: "button", class: "btn", text: "＋ Add award", onclick: () => { a.awards.push({ year: "", title: "", note: "" }); S.onChange(); renderAwards(); } }));
    };
    renderAwards();
    root.append(card("Awards (shared by all languages)", awardsBox));
    return root;
  };

  /* New work defaults */
  A.newWork = function (id) {
    return toEdit({
      id, year: String(new Date().getFullYear()), url: `works/project-${id}.html`,
      image: "", hero: "", gallery: [], titles: {}, tags: {}, descs: {}, role: {}, contribution: {}, responsibilities: {},
    });
  };
})(window.Admin);
