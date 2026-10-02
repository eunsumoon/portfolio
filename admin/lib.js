/* =========================================================
   admin/lib.js
   Shared tools: DOM helper, password vault (encryption),
   GitHub API client, image processing, path utils.
   ========================================================= */
"use strict";
window.Admin = window.Admin || {};
(function (A) {
  /* ---------- DOM helper (used instead of innerHTML to avoid XSS) ---------- */
  A.h = function h(tag, attrs, ...kids) {
    const el = document.createElement(tag);
    if (attrs) {
      for (const [k, v] of Object.entries(attrs)) {
        if (v == null || v === false) continue;
        if (k === "class") el.className = v;
        else if (k === "text") el.textContent = v;
        else if (k === "value") el.value = v;
        else if (k === "checked") el.checked = !!v;
        else if (k === "dataset") Object.assign(el.dataset, v);
        else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2), v);
        else el.setAttribute(k, v === true ? "" : v);
      }
    }
    for (const kid of kids.flat(Infinity)) {
      if (kid == null || kid === false) continue;
      el.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
    }
    return el;
  };

  A.$ = (sel, root) => (root || document).querySelector(sel);

  /* Small warning-icon note, used for every hint line. tag: "p" (default) or "span". */
  A.hint = function (text, tag) {
    const NS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2.2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("aria-hidden", "true");
    const tri = document.createElementNS(NS, "path");
    tri.setAttribute("d", "M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z");
    const bar = document.createElementNS(NS, "path");
    bar.setAttribute("d", "M12 9v4M12 17h.01");
    svg.append(tri, bar);
    return A.h(tag || "p", { class: "hint warn" + (tag === "span" ? " inline" : "") }, svg, A.h("span", { text }));
  };

  /* ---------- Base64 ---------- */
  A.b64 = {
    fromBytes(bytes) {
      let s = "";
      const CH = 0x8000;
      for (let i = 0; i < bytes.length; i += CH) s += String.fromCharCode.apply(null, bytes.subarray(i, i + CH));
      return btoa(s);
    },
    toBytes(b64) {
      const s = atob(b64);
      const u = new Uint8Array(s.length);
      for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i);
      return u;
    },
  };

  /* ---------- Password vault ----------
     The GitHub token is encrypted with the password and stored in admin/vault.json.
     PBKDF2-SHA256 (600k iterations) then AES-256-GCM. Without the password the token cannot be recovered. */
  A.vault = {
    ITER: 600000,
    async deriveKey(password, salt, iter) {
      const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]);
      return crypto.subtle.deriveKey(
        { name: "PBKDF2", salt, iterations: iter, hash: "SHA-256" },
        base,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
      );
    },
    async seal(password, payload, meta) {
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const key = await this.deriveKey(password, salt, this.ITER);
      const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(JSON.stringify(payload)));
      return {
        v: 1,
        owner: meta.owner,
        repo: meta.repo,
        branch: meta.branch,
        kdf: "PBKDF2-SHA256",
        iter: this.ITER,
        salt: A.b64.fromBytes(salt),
        iv: A.b64.fromBytes(iv),
        ct: A.b64.fromBytes(new Uint8Array(ct)),
      };
    },
    async open(password, vault) {
      const key = await this.deriveKey(password, A.b64.toBytes(vault.salt), vault.iter);
      let pt;
      try {
        pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: A.b64.toBytes(vault.iv) }, key, A.b64.toBytes(vault.ct));
      } catch (e) {
        throw new Error("WRONG_PASSWORD");
      }
      return JSON.parse(new TextDecoder().decode(pt));
    },
  };

  /* ---------- Path utils ---------- */
  A.path = {
    /* repo path (raw, may contain spaces) <-> URL-encoded path used in data */
    enc: (p) => p.split("/").map(encodeURIComponent).join("/"),
    dec: (p) => p.split("/").map((s) => { try { return decodeURIComponent(s); } catch (e) { return s; } }).join("/"),
    dir: (p) => p.slice(0, p.lastIndexOf("/")),
    ext: (name) => ((name.match(/\.([a-z0-9]+)$/i) || [])[1] || "").toLowerCase(),
    slug: (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
    isVideo: (p) => /\.(mp4|webm|mov)$/i.test(p || ""),
  };

  /* ---------- GitHub API client ---------- */
  A.GH = class GH {
    constructor(cfg) {
      this.token = cfg.token;
      this.owner = cfg.owner;
      this.repo = cfg.repo;
      this.branch = cfg.branch;
    }
    rp(p) { return `/repos/${this.owner}/${this.repo}${p}`; }
    async api(path, opts) {
      opts = opts || {};
      const res = await fetch("https://api.github.com" + path, {
        method: opts.method || "GET",
        headers: Object.assign(
          {
            Accept: opts.accept || "application/vnd.github+json",
            Authorization: "Bearer " + this.token,
            "X-GitHub-Api-Version": "2022-11-28",
          },
          opts.body ? { "Content-Type": "application/json" } : {}
        ),
        body: opts.body ? JSON.stringify(opts.body) : undefined,
        cache: "no-store",
      });
      if (!res.ok) {
        let msg = "";
        try { msg = (await res.json()).message || ""; } catch (e) { /* ignore */ }
        const err = new Error(msg || res.statusText || "Request failed");
        err.status = res.status;
        throw err;
      }
      return res;
    }
    async json(path, opts) { return (await this.api(path, opts)).json(); }

    getRepo() { return this.json(this.rp("")); }

    /* Read the latest file content on the branch as text. null if missing. */
    async getText(path) {
      try {
        const res = await this.api(
          this.rp("/contents/" + A.path.enc(path) + "?ref=" + encodeURIComponent(this.branch)),
          { accept: "application/vnd.github.raw+json" }
        );
        return await res.text();
      } catch (e) {
        if (e.status === 404) return null;
        throw e;
      }
    }

    /* Every file path on the branch (Set) */
    async getTreePaths() {
      const ref = await this.json(this.rp("/git/ref/heads/" + this.branch));
      const commit = await this.json(this.rp("/git/commits/" + ref.object.sha));
      const tree = await this.json(this.rp("/git/trees/" + commit.tree.sha + "?recursive=1"));
      return new Set(tree.tree.filter((t) => t.type === "blob").map((t) => t.path));
    }

    /* Create/update one file (used for the vault) */
    async putFile(path, text, message) {
      let sha;
      try {
        const cur = await this.json(this.rp("/contents/" + A.path.enc(path) + "?ref=" + encodeURIComponent(this.branch)));
        sha = cur.sha;
      } catch (e) {
        if (e.status !== 404) throw e;
      }
      return this.json(this.rp("/contents/" + A.path.enc(path)), {
        method: "PUT",
        body: {
          message,
          content: A.b64.fromBytes(new TextEncoder().encode(text)),
          branch: this.branch,
          sha,
        },
      });
    }

    /* Commit many files at once.
       changes: [{ path, content: string | Uint8Array | null (delete) }] */
    async commit(message, changes, onProgress) {
      const ref = await this.json(this.rp("/git/ref/heads/" + this.branch));
      const parent = ref.object.sha;
      const parentCommit = await this.json(this.rp("/git/commits/" + parent));
      const entries = [];
      let n = 0;
      for (const c of changes) {
        if (c.content === null) {
          entries.push({ path: c.path, mode: "100644", type: "blob", sha: null });
        } else {
          const body =
            typeof c.content === "string"
              ? { content: c.content, encoding: "utf-8" }
              : { content: A.b64.fromBytes(c.content), encoding: "base64" };
          const blob = await this.json(this.rp("/git/blobs"), { method: "POST", body });
          entries.push({ path: c.path, mode: "100644", type: "blob", sha: blob.sha });
        }
        n++;
        if (onProgress) onProgress(n, changes.length);
      }
      const tree = await this.json(this.rp("/git/trees"), { method: "POST", body: { base_tree: parentCommit.tree.sha, tree: entries } });
      const commit = await this.json(this.rp("/git/commits"), { method: "POST", body: { message, tree: tree.sha, parents: [parent] } });
      await this.json(this.rp("/git/refs/heads/" + this.branch), { method: "PATCH", body: { sha: commit.sha } });
      return commit;
    }
  };

  /* ---------- Image processing ----------
     PNG/JPG are converted to WebP and the long side is capped at maxSide. */
  A.processImage = async function (file, opts) {
    const webp = opts && opts.webp;
    const maxSide = (opts && opts.maxSide) || 2400;
    const ext = A.path.ext(file.name);
    const keep = { blob: file, ext: ext || (file.type.split("/")[1] || "bin") };
    if (!webp || !/^image\/(png|jpeg)$/.test(file.type)) return keep;
    try {
      const bmp = await createImageBitmap(file);
      const scale = Math.min(1, maxSide / Math.max(bmp.width, bmp.height));
      const w = Math.max(1, Math.round(bmp.width * scale));
      const h = Math.max(1, Math.round(bmp.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      canvas.getContext("2d").drawImage(bmp, 0, 0, w, h);
      const blob = await new Promise((res) => canvas.toBlob(res, "image/webp", 0.88));
      if (!blob || blob.type !== "image/webp") return keep;
      if (scale === 1 && blob.size >= file.size) return keep;
      return { blob, ext: "webp" };
    } catch (e) {
      return keep;
    }
  };

  A.bytesOf = async (blob) => new Uint8Array(await blob.arrayBuffer());
  A.fmtSize = (n) => (n > 1048576 ? (n / 1048576).toFixed(1) + " MB" : Math.max(1, Math.round(n / 1024)) + " KB");
  A.stamp = () => Date.now().toString(36);

  /* Extract the JSON part of a data/*.js file (window.X = {...};). */
  A.parseDataFile = function (text, globalName) {
    const i = text.indexOf("window." + globalName);
    if (i < 0) throw new Error("Could not find " + globalName + " in the data file.");
    const eq = text.indexOf("=", i);
    const body = text.slice(eq + 1).trim().replace(/;\s*$/, "");
    return JSON.parse(body);
  };
  A.dataFileText = (header, globalName, data) =>
    `/* ${header} */\nwindow.${globalName} = ${JSON.stringify(data, null, 2)};\n`;
})(window.Admin);
