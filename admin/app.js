/* =========================================================
   admin/app.js
   로그인/설정, 탭, 목록, 게시(커밋) 흐름.
   ========================================================= */
"use strict";
(function (A) {
  const { h } = A;
  const S = A.S;
  const app = document.getElementById("app");

  const SESSION = "adm_session";
  const FAILS = "adm_fails";
  const SESSION_MIN = 60;
  const WORKS_HEADER = "작업물 데이터 — 관리자 페이지(/admin)에서 자동 생성됩니다. 직접 수정해도 됩니다.";
  const SITE_HEADER = "사이트 데이터(About) — 관리자 페이지(/admin)에서 자동 생성됩니다.";
  const MAX_FILE = 50 * 1024 * 1024;

  const FIXED = [
    { path: "images/home/hero.mp4", label: "홈 배경 영상", kind: "video", accept: "video/mp4", ext: "mp4" },
    { path: "cv/cv-ko.pdf", label: "CV · 한국어", kind: "pdf", accept: "application/pdf", ext: "pdf" },
    { path: "cv/cv-en.pdf", label: "CV · English", kind: "pdf", accept: "application/pdf", ext: "pdf" },
    { path: "cv/cv-ja.pdf", label: "CV · 日本語", kind: "pdf", accept: "application/pdf", ext: "pdf" },
  ];
  const FIXED_PATHS = new Set(FIXED.map((f) => f.path));

  const ctx = { gh: null };
  let base = null; // 마지막으로 저장소와 일치하던 상태
  let tab = "works";
  let editing = null;

  /* ---------- 저장소 유틸 ---------- */
  const store = {
    get(area, k) { try { return JSON.parse(window[area].getItem(k)); } catch (e) { return null; } },
    set(area, k, v) { try { window[area].setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } },
    del(area, k) { try { window[area].removeItem(k); } catch (e) { /* ignore */ } },
  };

  function friendly(e) {
    if (!e) return "알 수 없는 오류";
    if (e.message === "WRONG_PASSWORD") return "비밀번호가 올바르지 않습니다.";
    if (e.status === 401) return "토큰이 올바르지 않거나 만료되었습니다.";
    if (e.status === 403) return "권한이 없거나 요청 한도에 걸렸습니다. 토큰의 Contents 권한(Read and write)과 대상 저장소를 확인하세요.";
    if (e.status === 404) return "저장소 또는 브랜치를 찾을 수 없습니다. 소유자·저장소 이름·브랜치와 토큰의 저장소 선택을 확인하세요.";
    if (e.status === 409 || e.status === 422) return "GitHub가 변경을 거부했습니다 (" + e.message + "). 다른 곳에서 먼저 수정했을 수 있으니 새로고침 후 다시 시도하세요.";
    if (e instanceof TypeError) return "네트워크 오류입니다. 인터넷 연결을 확인하세요.";
    return e.message || String(e);
  }

  async function busy(msg, fn) {
    const txt = h("p", { text: msg });
    const bar = h("i");
    const ov = h("div", { class: "overlay" }, h("div", { class: "modal" }, h("h3", { text: "잠시만요" }), txt, h("div", { class: "bar" }, bar)));
    document.body.append(ov);
    try {
      return await fn((t, pct) => {
        if (t) txt.textContent = t;
        if (pct != null) bar.style.width = pct + "%";
      });
    } finally {
      ov.remove();
    }
  }

  function modal(title, body, buttons) {
    return new Promise((resolve) => {
      const close = (v) => { ov.remove(); resolve(v); };
      const ov = h("div", { class: "overlay" },
        h("div", { class: "modal", role: "dialog" },
          h("h3", { text: title }), body,
          h("div", { class: "btns" }, buttons.map((b) => h("button", { type: "button", class: "btn " + (b.cls || ""), text: b.text, onclick: () => close(b.value) })))
        )
      );
      document.body.append(ov);
    });
  }

  /* ---------- 세션 ---------- */
  function saveSession() {
    const g = ctx.gh;
    store.set("sessionStorage", SESSION, { token: g.token, owner: g.owner, repo: g.repo, branch: g.branch, exp: Date.now() + SESSION_MIN * 60000 });
  }
  function readSession() {
    const s = store.get("sessionStorage", SESSION);
    if (!s || !s.token || !s.exp || s.exp < Date.now()) { store.del("sessionStorage", SESSION); return null; }
    return s;
  }

  /* ---------- 공통 화면 틀 ---------- */
  function gate(title, sub, ...kids) {
    app.replaceChildren(h("div", { class: "gate" }, h("div", { class: "gate-box" }, h("h1", { text: title }), sub ? h("p", { class: "sub", text: sub }) : null, ...kids)));
  }
  const field = (label, input, hint) => h("div", { class: "f" }, h("label", { class: "f-label", text: label }), input, hint ? h("p", { class: "hint", text: hint }) : null);
  const pwInput = (ph) => h("input", { class: "in", type: "password", autocomplete: "off", placeholder: ph || "" });

  /* =========================================================
     첫 설정 (금고 만들기)
     ========================================================= */
  function renderSetup() {
    const m = location.hostname.match(/^([^.]+)\.github\.io$/);
    const owner = h("input", { class: "in", type: "text", value: m ? m[1] : "", placeholder: "GitHub 사용자명", autocomplete: "off" });
    const repo = h("input", { class: "in", type: "text", placeholder: "저장소 이름", autocomplete: "off" });
    const branch = h("input", { class: "in", type: "text", placeholder: "비워두면 기본 브랜치" , autocomplete: "off" });
    const token = pwInput("github_pat_...");
    const pw = pwInput("10자 이상");
    const pw2 = pwInput("한 번 더");
    const err = h("p", { class: "err" });
    const btn = h("button", { class: "btn block", type: "submit", text: "설정하고 시작" });

    const form = h("form", {
      onsubmit: async (e) => {
        e.preventDefault();
        err.textContent = "";
        const o = owner.value.trim(), r = repo.value.trim(), t = token.value.trim();
        if (!o || !r || !t) { err.textContent = "소유자, 저장소, 토큰을 모두 입력하세요."; return; }
        if (pw.value.length < 10) { err.textContent = "비밀번호는 10자 이상으로 정하세요."; return; }
        if (pw.value !== pw2.value) { err.textContent = "비밀번호 확인이 일치하지 않습니다."; return; }
        btn.disabled = true;
        try {
          await busy("토큰을 확인하고 금고를 만드는 중… (몇 초 걸립니다)", async () => {
            const gh = new A.GH({ token: t, owner: o, repo: r, branch: branch.value.trim() || "main" });
            const info = await gh.getRepo();
            if (info.permissions && info.permissions.push === false) throw new Error("이 토큰으로는 저장소에 쓸 수 없습니다. Contents 권한을 Read and write로 설정하세요.");
            if (!branch.value.trim()) gh.branch = info.default_branch;
            await gh.json(gh.rp("/git/ref/heads/" + gh.branch));
            const vault = await A.vault.seal(pw.value, { token: t }, { owner: o, repo: r, branch: gh.branch });
            await gh.putFile("admin/vault.json", JSON.stringify(vault, null, 2) + "\n", "Admin: set up vault");
            ctx.gh = gh;
          });
          saveSession();
          A.toast("설정 완료. 비밀번호로 잠긴 금고를 저장소에 올렸습니다.", "ok");
          await enter();
        } catch (e2) {
          err.textContent = friendly(e2);
        }
        btn.disabled = false;
      },
    },
      h("div", { class: "note-box" },
        "처음 한 번만 하는 설정입니다. GitHub에서 ", h("b", { text: "Fine-grained personal access token" }), "을 만들어 아래에 붙여넣으세요.",
        h("ol", null,
          h("li", { text: "GitHub → Settings → Developer settings → Fine-grained tokens → Generate" }),
          h("li", { text: "Repository access: Only select repositories → 이 포트폴리오 저장소만" }),
          h("li", { text: "Permissions → Contents: Read and write" }),
          h("li", { text: "Expiration은 가능한 한 길게 (최대 1년)" })
        ),
        h("div", { text: "토큰은 이 브라우저에서 비밀번호로 암호화된 뒤 저장소에 저장됩니다. 평문으로는 어디에도 남지 않습니다." })
      ),
      h("div", { class: "row2" }, field("GitHub 사용자명", owner), field("저장소", repo)),
      field("브랜치", branch),
      field("토큰", token),
      field("관리자 비밀번호", pw, "이 비밀번호가 곧 열쇠입니다. 길고 다른 곳에서 안 쓰는 문장을 추천합니다."),
      field("비밀번호 확인", pw2),
      err, btn
    );
    gate("관리자 설정", "비밀번호를 정하면 관리자 페이지가 열립니다.", form);
    owner.value ? repo.focus() : owner.focus();
  }

  /* =========================================================
     로그인
     ========================================================= */
  function renderLogin(vault, notice) {
    const pw = pwInput("비밀번호");
    const err = h("p", { class: "err", text: notice || "" });
    const btn = h("button", { class: "btn block", type: "submit", text: "들어가기" });
    let timer = 0;

    const lockLeft = () => { const f = store.get("localStorage", FAILS) || { n: 0, until: 0 }; return Math.max(0, Math.ceil((f.until - Date.now()) / 1000)); };
    const tick = () => {
      const s = lockLeft();
      btn.disabled = s > 0;
      if (s > 0) { err.textContent = `시도가 너무 많습니다. ${s}초 뒤에 다시 시도하세요.`; timer = setTimeout(tick, 500); }
      else if (/시도가 너무/.test(err.textContent)) err.textContent = "";
    };

    const form = h("form", {
      onsubmit: async (e) => {
        e.preventDefault();
        if (lockLeft() > 0 || !pw.value) return;
        err.textContent = "";
        btn.disabled = true;
        try {
          const payload = await busy("확인 중…", () => A.vault.open(pw.value, vault));
          store.del("localStorage", FAILS);
          ctx.gh = new A.GH({ token: payload.token, owner: vault.owner, repo: vault.repo, branch: vault.branch });
          pw.value = "";
          saveSession();
          await enter();
          return;
        } catch (e2) {
          if (e2.message === "WRONG_PASSWORD") {
            const f = store.get("localStorage", FAILS) || { n: 0, until: 0 };
            f.n += 1;
            f.until = f.n >= 3 ? Date.now() + Math.min(60, Math.pow(2, f.n - 2)) * 1000 : 0;
            store.set("localStorage", FAILS, f);
            err.textContent = "비밀번호가 올바르지 않습니다.";
          } else err.textContent = friendly(e2);
        }
        pw.value = "";
        tick();
        if (lockLeft() === 0) btn.disabled = false;
      },
    }, field("비밀번호", pw), err, btn,
      h("p", { class: "hint" },
        h("button", { type: "button", class: "btn ghost sm", text: "토큰 교체 / 만료됨", onclick: () => { clearTimeout(timer); renderReplaceToken(vault); } })
      )
    );
    gate("관리자", "eunsumoon.com", form);
    pw.focus();
    tick();
  }

  /* 로그인 화면에서 쓰는 토큰 교체 (비밀번호는 그대로) */
  function renderReplaceToken(vault) {
    const pw = pwInput("현재 비밀번호");
    const token = pwInput("새 토큰 github_pat_...");
    const err = h("p", { class: "err" });
    const btn = h("button", { class: "btn block", type: "submit", text: "토큰 교체" });
    const form = h("form", {
      onsubmit: async (e) => {
        e.preventDefault();
        err.textContent = "";
        if (!pw.value || !token.value.trim()) { err.textContent = "비밀번호와 새 토큰을 입력하세요."; return; }
        btn.disabled = true;
        try {
          const r = await busy("교체 중…", () => rekey(vault, pw.value, "", token.value.trim()));
          ctx.gh = r.gh;
          saveSession();
          A.toast("토큰을 교체했습니다.", "ok");
          await enter();
          return;
        } catch (e2) { err.textContent = friendly(e2); }
        btn.disabled = false;
      },
    }, field("현재 비밀번호", pw), field("새 토큰", token, "같은 저장소에 Contents: Read and write 권한으로 새로 발급한 토큰"), err, btn,
      h("p", { class: "hint" }, h("button", { type: "button", class: "btn ghost sm", text: "← 돌아가기", onclick: () => renderLogin(vault) })));
    gate("토큰 교체", "비밀번호는 그대로 두고 토큰만 바꿉니다.", form);
  }

  async function rekey(vault, currentPw, newPw, newToken) {
    const cur = await A.vault.open(currentPw, vault);
    const token = newToken || cur.token;
    const gh = new A.GH({ token, owner: vault.owner, repo: vault.repo, branch: vault.branch });
    await gh.getRepo();
    const nv = await A.vault.seal(newPw || currentPw, { token }, vault);
    await gh.putFile("admin/vault.json", JSON.stringify(nv, null, 2) + "\n", "Admin: update vault");
    return { vault: nv, gh };
  }

  /* =========================================================
     데이터 읽기 / 상태 계산
     ========================================================= */
  async function loadData() {
    const gh = ctx.gh;
    const [wt, st, tree] = await Promise.all([gh.getText("data/works.js"), gh.getText("data/site.js"), gh.getTreePaths()]);
    if (wt == null || st == null) throw new Error("저장소에 data/works.js 또는 data/site.js 가 없습니다. 수정된 사이트 파일(data 폴더 포함)을 먼저 GitHub에 올려주세요.");
    const rawWorks = A.parseDataFile(wt, "WORKS_DATA");
    const rawSite = A.parseDataFile(st, "SITE_DATA");
    S.gh = gh;
    S.tree = tree;
    S.works = rawWorks.map(A.toEdit);
    S.site = A.siteToEdit(rawSite);
    S.files.forEach((v) => URL.revokeObjectURL(v.url));
    S.files.clear();
    S.deletes.clear();
    baseline(rawWorks);
    editing = null;
  }

  function baseline(rawWorks) {
    base = {
      wj: JSON.stringify(S.works.map(A.serializeWork)),
      sj: JSON.stringify(A.serializeSite(S.site)),
      ids: (rawWorks || S.works).map((w) => w.id),
      refs: A.refsOf(rawWorks || S.works.map(A.serializeWork)),
    };
    S.works.forEach((w) => { delete w._new; });
  }

  const pagePath = (id) => `works/project-${id}.html`;

  function compute() {
    const works = S.works.map(A.serializeWork);
    const wj = JSON.stringify(works);
    const sj = JSON.stringify(A.serializeSite(S.site));
    const refs = A.refsOf(works);
    const ids = works.map((w) => w.id);
    const up = [...S.files.keys()].filter((p) => refs.has(p) || FIXED_PATHS.has(p));
    const orphans = [...base.refs].filter((p) => !refs.has(p) && S.tree.has(p) && p.startsWith("images/works/") && !FIXED_PATHS.has(p));
    return {
      works, wj, sj, refs, ids, up, orphans,
      wChanged: wj !== base.wj,
      sChanged: sj !== base.sj,
      newPages: ids.filter((id) => !S.tree.has(pagePath(id))),
      delPages: base.ids.filter((id) => !ids.includes(id) && S.tree.has(pagePath(id))),
    };
  }
  const isDirty = () => { const c = compute(); return c.wChanged || c.sChanged || c.up.length > 0; };

  /* =========================================================
     셸 (상단 바, 탭, 하단 게시 바)
     ========================================================= */
  let mainEl, barEl, barMsg, barPub, barRevert;
  const TABS = [["works", "작업물"], ["about", "About"], ["home", "홈 · CV"], ["settings", "설정"]];

  function buildShell() {
    const tabs = h("div", { class: "tabs", role: "tablist" }, TABS.map(([k, label]) =>
      h("button", { type: "button", dataset: { tab: k }, class: k === tab ? "is-active" : "", text: label, onclick: () => { tab = k; editing = null; render(); window.scrollTo(0, 0); } })
    ));
    const top = h("header", { class: "topbar" },
      h("div", { class: "brand" }, "Admin", h("small", { text: ctx.gh.owner + "/" + ctx.gh.repo })),
      tabs,
      h("div", { class: "top-right" },
        h("a", { href: "../", target: "_blank", rel: "noopener", text: "사이트 보기 ↗" }),
        h("button", { type: "button", class: "btn ghost sm", text: "로그아웃", onclick: logout })
      )
    );
    mainEl = h("main", { class: "wrap" });
    barMsg = h("span", { class: "msg" });
    barRevert = h("button", { type: "button", class: "btn ghost sm", text: "변경 취소", onclick: revert });
    barPub = h("button", { type: "button", class: "btn", text: "게시하기", onclick: publish });
    barEl = h("div", { class: "pubbar" }, barMsg, barRevert, barPub);
    app.replaceChildren(top, mainEl, barEl);
    updateBar();
  }

  let raf = 0;
  S.onChange = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(updateBar); };

  function updateBar() {
    if (!barEl) return;
    const c = compute();
    const parts = [];
    if (c.wChanged) parts.push("작업물");
    if (c.sChanged) parts.push("About");
    if (c.up.length) parts.push("파일 " + c.up.length + "개");
    barEl.classList.toggle("is-on", parts.length > 0);
    barMsg.textContent = parts.length ? "저장되지 않은 변경: " + parts.join(", ") + " · 게시해야 사이트에 반영됩니다" : "";
  }

  function logout() {
    if (isDirty() && !confirm("게시하지 않은 변경 사항이 사라집니다. 로그아웃할까요?")) return;
    store.del("sessionStorage", SESSION);
    location.reload();
  }

  async function revert() {
    if (!confirm("게시하지 않은 모든 변경을 버리고 저장소의 현재 내용을 다시 불러옵니다. 계속할까요?")) return;
    try { await busy("다시 불러오는 중…", loadData); render(); updateBar(); }
    catch (e) { A.toast(friendly(e), "err"); }
  }

  window.addEventListener("beforeunload", (e) => {
    if (barEl && isDirty()) { e.preventDefault(); e.returnValue = ""; }
  });

  /* =========================================================
     화면: 작업물 / About / 홈·CV / 설정
     ========================================================= */
  function render() {
    document.querySelectorAll(".tabs button").forEach((b) => b.classList.toggle("is-active", b.dataset.tab === tab));
    mainEl.replaceChildren();
    if (tab === "works") renderWorks();
    else if (tab === "about") mainEl.append(A.buildAboutEditor(S.site));
    else if (tab === "home") renderHome();
    else renderSettings();
    updateBar();
  }

  function nextId() {
    let max = 0;
    S.works.forEach((w) => { max = Math.max(max, parseInt(w.id, 10) || 0); });
    S.tree.forEach((p) => { const m = p.match(/^works\/project-(\d+)\.html$/); if (m) max = Math.max(max, parseInt(m[1], 10)); });
    return String(max + 1).padStart(2, "0");
  }

  function renderWorks() {
    if (editing) {
      mainEl.append(A.buildWorkEditor(editing, () => { editing = null; render(); window.scrollTo(0, 0); }));
      return;
    }
    const list = h("ul", { class: "w-list" });
    const move = (i, d) => {
      const j = i + d;
      if (j < 0 || j >= S.works.length) return;
      [S.works[i], S.works[j]] = [S.works[j], S.works[i]];
      S.onChange(); render();
    };
    S.works.forEach((w, i) => {
      const thumb = w.listThumb || w.image;
      list.append(
        h("li", { class: "w-row" + (w._new ? " is-new" : "") },
          h("span", { class: "no", text: String(i + 1).padStart(2, "0") }),
          h("div", { class: "th" }, thumb ? h("img", { src: S.urlFor(thumb), alt: "", loading: "lazy" }) : h("span", { class: "ph", text: "없음" })),
          h("div", { class: "tt" }, h("strong", { text: w.titles.ko || w.titles.en || "(제목 없음)" }), h("span", { text: [w.tags.ko, w.year].filter(Boolean).join(" · ") })),
          h("div", { class: "acts" },
            h("button", { type: "button", class: "ic", title: "위로", text: "↑", onclick: () => move(i, -1) }),
            h("button", { type: "button", class: "ic", title: "아래로", text: "↓", onclick: () => move(i, 1) }),
            h("button", { type: "button", class: "btn sm ghost", text: "편집", onclick: () => { editing = w; render(); window.scrollTo(0, 0); } }),
            h("button", {
              type: "button", class: "ic danger", title: "삭제", text: "✕",
              onclick: () => {
                if (!confirm(`‘${w.titles.ko || w.titles.en || "제목 없음"}’ 작업을 삭제할까요?\n게시하기 전에는 [변경 취소]로 되돌릴 수 있습니다.`)) return;
                S.works.splice(i, 1); S.onChange(); render();
              },
            })
          )
        )
      );
    });
    mainEl.append(
      h("div", { class: "page-head" },
        h("div", null, h("h2", { text: "작업물" }), h("p", { text: "목록 순서가 사이트의 표시 순서와 번호가 됩니다." })),
        h("button", {
          type: "button", class: "btn", text: "＋ 새 작업",
          onclick: () => { const w = A.newWork(nextId()); w._new = true; S.works.unshift(w); S.onChange(); editing = w; render(); window.scrollTo(0, 0); },
        })
      ),
      list
    );
  }

  function renderHome() {
    const wrap = h("div", { class: "card" }, h("h3", { text: "홈 영상 · CV 파일" }));
    wrap.append(h("p", { class: "hint", text: "파일을 고르면 같은 이름으로 교체됩니다. 게시한 뒤에도 브라우저·CDN 캐시 때문에 최대 10분쯤 이전 파일이 보일 수 있습니다." }));
    const draw = () => {
      wrap.querySelectorAll(".slot").forEach((n) => n.remove());
      FIXED.forEach((f) => {
        const staged = S.files.get(f.path);
        const input = h("input", {
          type: "file", accept: f.accept, hidden: true,
          onchange: (e) => {
            const file = e.target.files[0];
            e.target.value = "";
            if (!file) return;
            if (A.path.ext(file.name) !== f.ext) { A.toast(`.${f.ext} 파일만 올릴 수 있습니다.`, "err"); return; }
            if (file.size > MAX_FILE) { A.toast(`파일이 너무 큽니다 (${A.fmtSize(file.size)}). 50MB 이하로 줄여주세요.`, "err"); return; }
            S.stage(f.path, file);
            draw();
          },
        });
        const url = S.urlFor(A.path.enc(f.path));
        wrap.append(
          h("div", { class: "slot" },
            h("div", { class: "prev" }, f.kind === "video" ? h("video", { src: url + "#t=0.1", muted: true, playsinline: true, controls: true, preload: "metadata" }) : h("span", { class: "pdf", text: "PDF" })),
            h("div", null,
              h("strong", { text: f.label }),
              h("div", { class: "state" + (staged ? " pending" : ""), text: staged ? `교체 대기 중: ${A.fmtSize(staged.blob.size)} (게시하면 반영)` : "현재 사이트에 올라가 있는 파일" }),
              h("code", { class: "path", text: f.path }),
              h("div", { class: "btns" },
                h("button", { type: "button", class: "btn sm", text: "파일 선택", onclick: () => input.click() }),
                staged ? h("button", { type: "button", class: "btn sm ghost", text: "교체 취소", onclick: () => { S.unstage(f.path); draw(); } }) : null,
                f.kind === "pdf" ? h("a", { class: "btn sm ghost", href: url, target: "_blank", rel: "noopener", text: "열어보기" }) : null,
                input
              )
            )
          )
        );
      });
    };
    draw();
    mainEl.append(h("div", { class: "page-head" }, h("div", null, h("h2", { text: "홈 · CV" }))), wrap);
  }

  function renderSettings() {
    const cur = pwInput(), np = pwInput("바꾸지 않으려면 비워두세요"), np2 = pwInput(), nt = pwInput("바꾸지 않으려면 비워두세요");
    const err = h("p", { class: "err" });
    const btn = h("button", { class: "btn", type: "submit", text: "저장" });
    const form = h("form", {
      onsubmit: async (e) => {
        e.preventDefault();
        err.textContent = "";
        if (!cur.value) { err.textContent = "현재 비밀번호를 입력하세요."; return; }
        if (!np.value && !nt.value.trim()) { err.textContent = "바꿀 항목이 없습니다."; return; }
        if (np.value && np.value.length < 10) { err.textContent = "새 비밀번호는 10자 이상이어야 합니다."; return; }
        if (np.value !== np2.value) { err.textContent = "새 비밀번호 확인이 일치하지 않습니다."; return; }
        btn.disabled = true;
        try {
          await busy("저장 중…", async () => {
            const text = await ctx.gh.getText("admin/vault.json");
            if (!text) throw new Error("저장소에서 vault.json 을 찾을 수 없습니다.");
            const r = await rekey(JSON.parse(text), cur.value, np.value, nt.value.trim());
            ctx.gh = r.gh; S.gh = r.gh;
          });
          saveSession();
          [cur, np, np2, nt].forEach((i) => (i.value = ""));
          A.toast("저장했습니다. 사이트 배포(1~3분) 전까지는 이전 비밀번호로도 열릴 수 있습니다.", "ok");
        } catch (e2) { err.textContent = friendly(e2); }
        btn.disabled = false;
      },
    },
      field("현재 비밀번호 (필수)", cur),
      field("새 비밀번호", np),
      field("새 비밀번호 확인", np2),
      field("새 GitHub 토큰", nt, "토큰이 만료됐거나 바꾸고 싶을 때만 입력하세요."),
      err, btn
    );
    mainEl.append(
      h("div", { class: "page-head" }, h("div", null, h("h2", { text: "설정" }))),
      h("div", { class: "set-grid" },
        h("dl", { class: "kv" },
          h("dt", { text: "저장소" }), h("dd", { text: ctx.gh.owner + "/" + ctx.gh.repo }),
          h("dt", { text: "브랜치" }), h("dd", { text: ctx.gh.branch }),
          h("dt", { text: "세션" }), h("dd", { text: "이 탭을 닫거나 로그아웃하면 끝납니다 (최대 " + SESSION_MIN + "분)" })
        ),
        h("div", { class: "card" }, h("h3", { text: "비밀번호 · 토큰 변경" }), form,
          h("p", { class: "hint", text: "비밀번호가 유출됐다면 GitHub에서 토큰을 폐기하고 새로 발급해 함께 교체하세요." }))
      )
    );
  }

  /* =========================================================
     게시
     ========================================================= */
  function validate(c) {
    const errors = [], warns = [];
    c.works.forEach((w, i) => {
      const name = `${String(i + 1).padStart(2, "0")}번 작업`;
      const t = w.titles;
      if (!(t.ko || t.en || t.ja).trim()) errors.push(`${name}: 제목이 비어 있습니다.`);
      else {
        const miss = ["ko", "en", "ja"].filter((l) => !t[l].trim());
        if (miss.length) warns.push(`${name}(${t.ko || t.en || t.ja}): ${miss.join("/")} 제목이 비어 있습니다.`);
      }
      if (!w.image) warns.push(`${name}: 썸네일이 없습니다.`);
      if (!w.hero) warns.push(`${name}: 히어로 이미지가 없습니다.`);
    });
    return { errors, warns };
  }

  async function publish() {
    const c = compute();
    if (!(c.wChanged || c.sChanged || c.up.length)) { A.toast("게시할 변경 사항이 없습니다."); return; }
    const v = validate(c);
    if (v.errors.length) { A.toast(v.errors[0], "err"); return; }

    const total = c.up.reduce((n, p) => n + S.files.get(p).blob.size, 0);
    const lines = [];
    if (c.wChanged) lines.push("작업물 데이터 (data/works.js)");
    if (c.sChanged) lines.push("About 데이터 (data/site.js)");
    if (c.newPages.length) lines.push(`새 작업 페이지 ${c.newPages.length}개 생성`);
    if (c.delPages.length) lines.push(`작업 페이지 ${c.delPages.length}개 삭제`);
    if (c.up.length) lines.push(`파일 ${c.up.length}개 업로드 (${A.fmtSize(total)})`);
    const delBox = h("input", { type: "checkbox", checked: true });
    const body = h("div", null,
      h("ul", null, lines.map((l) => h("li", { text: l }))),
      c.orphans.length ? h("label", { class: "chk" }, delBox, ` 더 이상 쓰지 않는 이미지 ${c.orphans.length}개도 저장소에서 삭제`) : null,
      v.warns.length ? h("div", { class: "note-box" }, h("b", { text: "확인해 주세요" }), h("ul", null, v.warns.slice(0, 8).map((w) => h("li", { text: w })), v.warns.length > 8 ? h("li", { text: `…외 ${v.warns.length - 8}건` }) : null)) : null,
      h("p", { class: "hint", text: "게시하면 GitHub에 커밋되고 1~3분 뒤 사이트에 반영됩니다." })
    );
    const ok = await modal("게시할까요?", body, [{ text: "취소", value: false, cls: "ghost" }, { text: "게시", value: true }]);
    if (!ok) return;
    const delOrphans = c.orphans.length > 0 && delBox.checked;

    try {
      barPub.disabled = true;
      await busy("준비 중…", async (prog) => {
        const changes = [];
        if (c.wChanged) changes.push({ path: "data/works.js", content: A.dataFileText(WORKS_HEADER, "WORKS_DATA", c.works) });
        if (c.sChanged) changes.push({ path: "data/site.js", content: A.dataFileText(SITE_HEADER, "SITE_DATA", JSON.parse(c.sj)) });

        if (c.newPages.length) {
          prog("작업 페이지 틀을 읽는 중…");
          const tpl = [...S.tree].filter((p) => /^works\/project-\d+\.html$/.test(p)).sort()[0];
          if (!tpl) throw new Error("작업 페이지 틀로 쓸 works/project-NN.html 을 저장소에서 찾지 못했습니다.");
          const html = await ctx.gh.getText(tpl);
          if (!html || !/data-work-id="[^"]*"/.test(html)) throw new Error(tpl + " 형식이 예상과 다릅니다.");
          c.newPages.forEach((id) => changes.push({ path: pagePath(id), content: html.replace(/data-work-id="[^"]*"/, `data-work-id="${id}"`) }));
        }
        c.delPages.forEach((id) => changes.push({ path: pagePath(id), content: null }));
        for (const p of c.up) changes.push({ path: p, content: await A.bytesOf(S.files.get(p).blob) });
        if (delOrphans) c.orphans.forEach((p) => changes.push({ path: p, content: null }));

        const parts = [];
        if (c.wChanged) parts.push("works");
        if (c.sChanged) parts.push("about");
        if (c.up.length) parts.push(c.up.length + " files");
        await ctx.gh.commit("Admin: update " + parts.join(", "), changes, (n, t) => prog(`올리는 중 ${n}/${t}`, Math.round((n / t) * 90)));
        prog("마무리 중…", 100);

        c.up.forEach((p) => S.tree.add(p));
        c.newPages.forEach((id) => S.tree.add(pagePath(id)));
        c.delPages.forEach((id) => S.tree.delete(pagePath(id)));
        if (delOrphans) c.orphans.forEach((p) => S.tree.delete(p));
      });
      S.markPublished();
      baseline(c.works);
      saveSession();
      A.toast("게시했습니다. 사이트에는 1~3분 뒤 반영됩니다.", "ok");
      render();
    } catch (e) {
      A.toast("게시 실패: " + friendly(e), "err");
    }
    barPub.disabled = false;
    updateBar();
  }

  /* =========================================================
     시작
     ========================================================= */
  async function enter() {
    try {
      await busy("저장소에서 불러오는 중…", loadData);
    } catch (e) {
      if (e.status === 401 || e.status === 403) store.del("sessionStorage", SESSION);
      gate("불러오지 못했습니다", null,
        h("p", { class: "err", text: friendly(e) }),
        h("div", { class: "btns" },
          h("button", { class: "btn", type: "button", text: "처음으로", onclick: boot }),
          h("button", { class: "btn ghost", type: "button", text: "다시 시도", onclick: enter })
        )
      );
      return;
    }
    tab = "works";
    buildShell();
    render();
  }

  async function boot() {
    if (window.matchMedia("(max-width: 768px), (hover: none) and (pointer: coarse)").matches) {
      app.replaceChildren(h("p", { class: "boot", text: "관리자 페이지는 데스크톱에서만 사용할 수 있습니다." }));
      return;
    }
    app.replaceChildren(h("p", { class: "boot", text: "불러오는 중…" }));
    const s = readSession();
    if (s) {
      ctx.gh = new A.GH(s);
      await enter();
      return;
    }
    let vault = null;
    try {
      const r = await fetch("vault.json", { cache: "no-store" });
      if (r.ok) vault = await r.json();
      else if (r.status !== 404) throw new Error("vault.json 을 읽지 못했습니다 (" + r.status + ")");
    } catch (e) {
      gate("연결할 수 없습니다", null, h("p", { class: "err", text: "관리자 페이지는 웹 서버(https://eunsumoon.com/admin/)에서 열어야 합니다. " + (e.message || "") }));
      return;
    }
    if (vault && vault.ct) renderLogin(vault);
    else renderSetup();
  }

  boot();
})(window.Admin);
