
/* ============================================================
   MainSTAY — static site behaviour
   ============================================================ */

/* ---- nav: products dropdown + mobile menu ---- */
(function () {
  var toggle = document.getElementById("navToggle");
  var links  = document.getElementById("primaryNav");
  var drop   = document.getElementById("navDrop");
  var dropBtn= document.getElementById("navDropBtn");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Close" : "Menu";
    });
  }

  if (drop && dropBtn) {
    dropBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = drop.getAttribute("data-open") !== "true";
      drop.setAttribute("data-open", String(open));
      dropBtn.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("mousedown", function (e) {
      if (!drop.contains(e.target)) {
        drop.setAttribute("data-open", "false");
        dropBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (drop) { drop.setAttribute("data-open", "false"); dropBtn.setAttribute("aria-expanded", "false"); }
    if (links && links.classList.contains("open")) {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "Menu";
    }
  });
})();

/* ---- reveal on scroll ---- */
(function () {
  var els = document.querySelectorAll(".rv");
  if (!("IntersectionObserver" in window)) {
    Array.prototype.forEach.call(els, function (el) { el.classList.add("on"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  Array.prototype.forEach.call(els, function (el) { io.observe(el); });
})();

/* ---- footer year ---- */
(function () {
  var el = document.getElementById("yr");
  if (el) el.textContent = new Date().getFullYear();
})();

/* ============================================================
   Signature canvases. Each page loads at most one, selected by
   the data-canvas attribute on <canvas class="rig">.
   All render a single static frame under prefers-reduced-motion.
   ============================================================ */
(function () {
  var canvas = document.querySelector("canvas.rig");
  if (!canvas) return;
  var kind = canvas.getAttribute("data-canvas");
  var ctx = canvas.getContext("2d");
  if (!ctx) return;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var raf = 0, last = 0;

  function resize() {
    var w = canvas.clientWidth, h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  /* ---------------- RIG (home) ---------------- */
  var STAYS = [
    { color: "#6d5df5", spread: -0.34 },
    { color: "#38bdf8", spread:  0.06 },
    { color: "#f43f5e", spread:  0.42 }
  ];
  var pulses = STAYS.map(function (_, i) {
    return [0.15, 0.55, 0.9].map(function (t) {
      return { t: t + i * 0.1, speed: 0.00012 + i * 0.00002 };
    });
  });

  function drawRig(dt) {
    var w = canvas.clientWidth, h = canvas.clientHeight;
    var mastX = w * 0.68, headY = h * 0.13, footY = h * 0.94, anchorY = h * 0.88;
    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = "rgba(140, 154, 168, 0.05)";
    ctx.lineWidth = 1;
    for (var i = 1; i <= 4; i++) {
      var y = h * (0.2 * i + 0.08);
      ctx.beginPath(); ctx.moveTo(w * 0.3, y); ctx.lineTo(w, y); ctx.stroke();
    }

    ctx.beginPath(); ctx.moveTo(mastX, headY); ctx.lineTo(mastX, footY);
    ctx.strokeStyle = "rgba(217, 164, 65, 0.5)"; ctx.lineWidth = 2; ctx.stroke();

    ctx.beginPath(); ctx.arc(mastX, headY, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = "#d9a441"; ctx.shadowColor = "#d9a441"; ctx.shadowBlur = 16;
    ctx.fill(); ctx.shadowBlur = 0;

    STAYS.forEach(function (s, i) {
      var ax = mastX + w * s.spread, ay = anchorY;
      ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(mastX, headY);
      ctx.strokeStyle = s.color; ctx.globalAlpha = 0.28; ctx.lineWidth = 1.5;
      ctx.stroke(); ctx.globalAlpha = 1;

      ctx.beginPath(); ctx.arc(ax, ay, 3, 0, Math.PI * 2);
      ctx.fillStyle = s.color; ctx.globalAlpha = 0.75; ctx.fill(); ctx.globalAlpha = 1;

      pulses[i].forEach(function (p) {
        if (!reduced) { p.t += dt * p.speed; if (p.t > 1) p.t -= 1; }
        var px = ax + (mastX - ax) * p.t, py = ay + (headY - ay) * p.t;
        var near = 0.35 + p.t * 0.65;
        ctx.beginPath(); ctx.arc(px, py, 2.6, 0, Math.PI * 2);
        ctx.fillStyle = s.color; ctx.globalAlpha = near;
        ctx.shadowColor = s.color; ctx.shadowBlur = 12 * near;
        ctx.fill(); ctx.shadowBlur = 0; ctx.globalAlpha = 1;
      });
    });
  }

  /* ---------------- WEAVE (Ankura) ---------------- */
  var THREADS = ["#6d5df5", "#5b8def", "#35c4b5", "#e8b04b"];
  var FAINT = "rgba(154, 160, 190, 0.10)";

  function weaveLine(w, h, t, base, amp, freq, phase, color, width, glow) {
    ctx.beginPath();
    for (var i = 0; i <= 60; i++) {
      var x = (i / 60) * w;
      var y = base + Math.sin((x / w) * Math.PI * freq + phase + t) * amp
                   + Math.sin((x / w) * Math.PI * (freq * 0.5) + t * 0.6) * (amp * 0.4);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = color; ctx.lineWidth = width;
    if (glow) { ctx.shadowColor = color; ctx.shadowBlur = 14; } else { ctx.shadowBlur = 0; }
    ctx.stroke(); ctx.shadowBlur = 0;
  }

  function drawWeave(ms) {
    var w = canvas.clientWidth, h = canvas.clientHeight;
    var t = reduced ? 0 : ms * 0.00028;
    ctx.clearRect(0, 0, w, h);

    var gap = Math.max(48, w / 26);
    ctx.strokeStyle = FAINT; ctx.lineWidth = 1;
    for (var x = gap / 2; x < w; x += gap) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (var i = 0; i < 16; i++) {
      weaveLine(w, h, t, (h / 17) * (i + 1), 14, 2.2 + (i % 3) * 0.6, i * 1.7, FAINT, 1, false);
    }
    THREADS.forEach(function (c, j) {
      weaveLine(w, h, t, h * (0.42 + j * 0.14), 26 + j * 5, 1.6 + j * 0.35, j * 2.2, c, 2, true);
    });
  }

  /* ---------------- SCOPE (Vizor) ---------------- */
  var LANES = ["#34d399", "#22d3ee", "#38bdf8", "#60a5fa", "#818cf8", "#a78bfa", "#e879f9"];
  var lanes = LANES.map(function () { return []; });
  var links = [];
  var nextCorr = 1400;

  function scopeGeom(w, h) {
    var top = h * 0.16, bottom = h * 0.9;
    return { top: top, gap: (bottom - top) / (LANES.length - 1), x1: w };
  }
  function seedScope() {
    var g = scopeGeom(canvas.clientWidth, canvas.clientHeight);
    lanes.forEach(function (q) {
      q.length = 0;
      var n = 14 + Math.floor(Math.random() * 8);
      for (var i = 0; i < n; i++) {
        q.push({ x: Math.random() * g.x1, w: 2 + Math.random() * 16,
                 a: 0.25 + Math.random() * 0.5, corr: false });
      }
    });
  }
  function fireCorrelation(w) {
    var count = 3 + Math.floor(Math.random() * 3);
    var pool = [0,1,2,3,4,5,6].sort(function () { return Math.random() - 0.5; });
    var rows = pool.slice(0, count).sort(function (a, b) { return a - b; });
    var x = w * (0.55 + Math.random() * 0.35);
    rows.forEach(function (r) { lanes[r].push({ x: x, w: 22, a: 1, corr: true }); });
    links.push({ x: x, rows: rows, life: 1 });
  }
  function drawScope(dt) {
    var w = canvas.clientWidth, h = canvas.clientHeight;
    var g = scopeGeom(w, h), top = g.top, gap = g.gap, x1 = g.x1;
    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = "rgba(140, 154, 168, 0.055)"; ctx.lineWidth = 1;
    var step = Math.max(90, w / 14);
    for (var x = w % step; x < w; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, top - gap * 0.5);
      ctx.lineTo(x, top + gap * (LANES.length - 0.5));
      ctx.stroke();
    }

    links = links.filter(function (l) { return l.life > 0; });
    links.forEach(function (l) {
      ctx.beginPath();
      ctx.moveTo(l.x, top + gap * l.rows[0]);
      ctx.lineTo(l.x, top + gap * l.rows[l.rows.length - 1]);
      ctx.strokeStyle = "rgba(232, 240, 245, " + (0.16 * l.life) + ")";
      ctx.lineWidth = 1; ctx.stroke();
      if (!reduced) l.life -= dt * 0.0011;
    });

    lanes.forEach(function (q, i) {
      var y = top + gap * i, color = LANES[i];
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y);
      ctx.strokeStyle = "rgba(140, 154, 168, 0.10)"; ctx.lineWidth = 1; ctx.stroke();

      for (var k = q.length - 1; k >= 0; k--) {
        var e = q[k];
        if (!reduced) e.x -= dt * (0.028 + i * 0.0016);
        if (e.x + e.w < 0) { q.splice(k, 1); continue; }
        ctx.beginPath(); ctx.moveTo(e.x, y); ctx.lineTo(e.x + e.w, y);
        ctx.strokeStyle = color;
        ctx.globalAlpha = e.corr ? Math.min(1, e.a) : e.a * 0.75;
        ctx.lineWidth = e.corr ? 3 : 2;
        if (e.corr) { ctx.shadowColor = color; ctx.shadowBlur = 14; }
        ctx.stroke(); ctx.shadowBlur = 0; ctx.globalAlpha = 1;
        if (e.corr && !reduced) e.a -= dt * 0.0008;
        if (e.a <= 0.15) e.corr = false;
      }
      if (!reduced && Math.random() < 0.045 + i * 0.004) {
        q.push({ x: x1 + Math.random() * 40, w: 2 + Math.random() * 16,
                 a: 0.25 + Math.random() * 0.5, corr: false });
      }
    });
  }

  /* ---------------- LEDGER (Kayak) ---------------- */
  var ROSE = "#f43f5e", ROSE_DIM = "rgba(244, 63, 94, 0.28)";
  var blocks = [], clock = 0, counter = 0, nextBlock = 900;

  function addBlock() {
    blocks.push({ i: counter++, born: clock });
    if (blocks.length > 9) blocks.shift();
  }
  function drawLedger() {
    var w = canvas.clientWidth, h = canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);

    var gx = Math.max(46, w / 26), gy = Math.max(46, h / 12);
    for (var x = gx; x < w; x += gx) {
      for (var y = gy * 0.6; y < h; y += gy) {
        var lit = (Math.sin(x * 0.07) + Math.cos(y * 0.11)) > 1.45;
        ctx.beginPath(); ctx.arc(x, y, lit ? 1.9 : 1.1, 0, Math.PI * 2);
        ctx.fillStyle = lit ? ROSE_DIM : "rgba(140, 154, 168, 0.12)";
        ctx.fill();
      }
    }

    var bw = Math.min(74, w / 13), bh = bw * 0.62, gap = bw * 0.42;
    var chainY = h * 0.66, startX = w * 0.30;

    blocks.forEach(function (b, idx) {
      var age = clock - b.born;
      var appear = reduced ? 1 : Math.min(1, age / 420);
      var seal = reduced ? 1 : Math.max(0, 1 - Math.max(0, age - 420) / 700);
      var bx = startX + idx * (bw + gap);
      if (bx > w + bw) return;

      if (idx > 0) {
        ctx.beginPath();
        ctx.moveTo(bx - gap, chainY + bh / 2); ctx.lineTo(bx, chainY + bh / 2);
        ctx.strokeStyle = ROSE; ctx.globalAlpha = 0.32 * appear;
        ctx.lineWidth = 1.5; ctx.stroke(); ctx.globalAlpha = 1;
      }

      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(bx, chainY, bw, bh, 4);
      else ctx.rect(bx, chainY, bw, bh);
      ctx.strokeStyle = ROSE;
      ctx.globalAlpha = (0.3 + 0.5 * seal) * appear;
      ctx.lineWidth = 1.5;
      if (seal > 0.02) { ctx.shadowColor = ROSE; ctx.shadowBlur = 16 * seal; }
      ctx.stroke(); ctx.shadowBlur = 0;

      ctx.globalAlpha = 0.34 * appear; ctx.lineWidth = 1;
      for (var r = 0; r < 3; r++) {
        var ly = chainY + bh * (0.3 + r * 0.22);
        var lw = bw * (0.28 + ((b.i + r) % 4) * 0.14);
        ctx.beginPath();
        ctx.moveTo(bx + bw * 0.16, ly); ctx.lineTo(bx + bw * 0.16 + lw, ly);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    });
  }

  /* ---------------- driver ---------------- */
  function frame(ms) {
    var dt = last ? Math.min(48, ms - last) : 16;
    last = ms;

    if (kind === "rig")        drawRig(dt);
    else if (kind === "weave") drawWeave(ms);
    else if (kind === "scope") {
      if (!reduced) {
        nextCorr -= dt;
        if (nextCorr <= 0) { fireCorrelation(canvas.clientWidth); nextCorr = 2600 + Math.random() * 2200; }
      }
      drawScope(dt);
    } else if (kind === "ledger") {
      clock += dt;
      nextBlock -= dt;
      if (nextBlock <= 0) { addBlock(); nextBlock = 1500 + Math.random() * 900; }
      drawLedger();
    }

    if (!reduced) raf = requestAnimationFrame(frame);
  }

  resize();
  if (kind === "scope") { seedScope(); if (reduced) fireCorrelation(canvas.clientWidth); }
  if (kind === "ledger") {
    for (var i = 0; i < 6; i++) { clock += 1500; addBlock(); }
    clock += 2000;
  }

  if (reduced) frame(16); else raf = requestAnimationFrame(frame);

  window.addEventListener("resize", function () { resize(); if (reduced) frame(16); });
})();
