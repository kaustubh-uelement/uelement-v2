/* UElement website · site.js
   Plain JavaScript for the static HTML build. No framework, no build step.
   Parts: header menus and mobile drawer · line-art canvases · quantum exposure check ·
   Nexus package picker · contact form.  Every part checks for its own markup first,
   so one file serves every page. */
(function () {
  "use strict";

  var SITE = {
    email: "contact@uelement.co",
    phone: "+91 76206 90561",
    /* Set this to your form service URL (Formspree, Basin, your own API) to switch on online sending. */
    formEndpoint: ""
  };

  /* ---------------------------------------------------------------- header */
  function initHeader() {
    var triggers = Array.prototype.slice.call(document.querySelectorAll(".nav__trigger"));
    var closeTimer = null;

    function openMenu(b, p) {
      if (!b || !p) return;
      if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
      b.setAttribute("aria-expanded", "true");
      p.hidden = false;
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          p.classList.add("is-open");
        });
      });
    }

    function closeMenu(b, p) {
      if (!b || !p) return;
      b.setAttribute("aria-expanded", "false");
      p.classList.remove("is-open");
      setTimeout(function () {
        if (b.getAttribute("aria-expanded") !== "true") {
          p.hidden = true;
        }
      }, 220);
    }

    function closeAll(except) {
      if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
      triggers.forEach(function (b) {
        if (b === except) return;
        var p = document.getElementById(b.getAttribute("aria-controls"));
        if (p) closeMenu(b, p);
      });
    }

    triggers.forEach(function (b) {
      if (b._bound) return;
      b._bound = true;
      var item = b.closest(".nav__item");
      var p = document.getElementById(b.getAttribute("aria-controls"));
      if (item && p) {
        item.addEventListener("mouseenter", function () {
          if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
          if (window.innerWidth >= 1024) {
            closeAll(b);
            openMenu(b, p);
          }
        });
        item.addEventListener("mouseleave", function () {
          if (window.innerWidth >= 1024) {
            closeTimer = setTimeout(function () {
              closeMenu(b, p);
            }, 140);
          }
        });
      }
      b.addEventListener("click", function (ev) {
        ev.stopPropagation();
        var open = b.getAttribute("aria-expanded") === "true";
        closeAll(b);
        if (open) {
          closeMenu(b, p);
        } else {
          openMenu(b, p);
        }
      });
    });
    if (!document._headerBound) {
      document._headerBound = true;
      document.addEventListener("click", function (ev) {
        if (!ev.target.closest || !ev.target.closest(".nav__item")) closeAll(null);
      });
      document.addEventListener("keydown", function (ev) {
        if (ev.key === "Escape") { closeAll(null); closeDrawer(); }
      });
    }

    var megaLinks = Array.prototype.slice.call(document.querySelectorAll(".mega a"));
    megaLinks.forEach(function (lnk) {
      if (lnk._boundClose) return;
      lnk._boundClose = true;
      lnk.addEventListener("click", function () {
        closeAll(null);
      });
    });

    var btn = document.querySelector(".menu-btn");
    var drawer = document.getElementById("drawer");
    var ICON_OPEN = '<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>';
    var ICON_CLOSE = '<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 4l12 12M16 4 4 16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>';
    function closeDrawer() {
      if (!btn || !drawer) return;
      drawer.hidden = true;
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Open menu");
      btn.innerHTML = ICON_OPEN;
    }
    if (btn && drawer && !btn._bound) {
      btn._bound = true;
      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") === "true";
        if (open) { closeDrawer(); return; }
        drawer.hidden = false;
        btn.setAttribute("aria-expanded", "true");
        btn.setAttribute("aria-label", "Close menu");
        btn.innerHTML = ICON_CLOSE;
      });
      window.addEventListener("resize", function () { if (window.innerWidth > 1040) closeDrawer(); });
    }
  }

  /* ---------------------------------------------------------------- platform tabs (SentinelOne style) */
  function initPlatformTabs() {
    var megaContainers = Array.prototype.slice.call(document.querySelectorAll(".mega"));
    if (!megaContainers.length) return;

    megaContainers.forEach(function (mega) {
      var tabs = Array.prototype.slice.call(mega.querySelectorAll(".platform-tab"));
      var panels = Array.prototype.slice.call(mega.querySelectorAll(".platform-panel"));
      if (!tabs.length) return;

      tabs.forEach(function (tab) {
        if (tab._bound) return;
        tab._bound = true;

        function activate() {
          var targetId = tab.getAttribute("data-target");
          tabs.forEach(function (t) {
            var active = t === tab;
            t.classList.toggle("is-active", active);
            t.setAttribute("aria-selected", active ? "true" : "false");
          });
          panels.forEach(function (panel) {
            panel.hidden = panel.id !== targetId;
          });
        }

        tab.addEventListener("mouseenter", activate);
        tab.addEventListener("focus", activate);
        tab.addEventListener("click", function (e) {
          e.preventDefault();
          activate();
        });
      });
    });
  }

  /* ---------------------------------------------------------------- line art */
  var r = "224,167,105", o = "243,231,211", l = "164,181,196", n = "245,193,22";
  function art(canvas, e, h, i, s) {
    var f = { current: canvas };
    let t=f.current;if(!t)return;let a=t.getContext("2d");if(!a)return;let M=i||window.matchMedia("(prefers-reduced-motion: reduce)").matches,y={x:0,y:0,on:!1},g=0,c=0,m=null,x=0,d=!0,b=performance.now(),u=e=>{m&&(a.clearRect(0,0,g,c),m.draw(a,e-b+4e3,y))},p=e=>{u(e),M||!d||document.hidden||(x=requestAnimationFrame(p))},$=()=>{let i=t.getBoundingClientRect(),f=Math.min(window.devicePixelRatio||1,2);g=Math.max(1,i.width),c=Math.max(1,i.height),t.width=Math.round(g*f),t.height=Math.round(c*f),a.setTransform(f,0,0,f,0,0),m=function(e,t,a,h,i){let s,f,M,y,g,c,m,x,d,b,u,p,$,v,P,k,T,S,w=(s=h>>>0,()=>{let e=s=s+0x6d2b79f5>>>0;return e=Math.imul(e^e>>>15,1|e),(((e^=e+Math.imul(e^e>>>7,61|e))^e>>>14)>>>0)/0x100000000});switch(e){case"photon":return f=Array.from({length:Math.max(5,Math.round(a/90))},(e,t)=>({y:a/(Math.max(5,Math.round(a/90))+1)*(t+1),amp:8+26*w(),freq:.002+.003*w(),ph:6*w()})),M=(e,t)=>e.y+Math.sin(t*e.freq+e.ph)*e.amp,y=Array.from({length:4*f.length},(e,a)=>({lane:a%f.length,x:w()*t,v:.08+.14*w(),pol:Math.floor(4*w()),flash:0})),g=0,{draw(e,a,h){let i=g?Math.min(48,a-g):16;for(let r of(g=a,e.lineWidth=1,f)){e.strokeStyle=`rgba(${l},0.14)`,e.beginPath();for(let a=0;a<=t;a+=12){let t=M(r,a);0===a?e.moveTo(a,t):e.lineTo(a,t)}e.stroke()}for(let a of y){a.x+=a.v*i,a.x>t+20&&(a.x=-20,a.pol=Math.floor(4*Math.random()));let l=f[a.lane],s=M(l,a.x);h.on&&70>Math.hypot(a.x-h.x,s-h.y)&&a.flash<=0&&(a.flash=1,a.pol=Math.floor(4*Math.random())),a.flash=Math.max(0,a.flash-.0025*i);for(let t=1;t<=14;t++){let o=a.x-5*t;e.fillStyle=`rgba(${r},${.28*(1-t/14)})`,e.fillRect(o,M(l,o)-.75,4,1.5)}e.fillStyle=`rgba(${o},0.95)`,e.beginPath(),e.arc(a.x,s,2.2,0,2*Math.PI),e.fill();let y=a.pol*Math.PI/4;e.strokeStyle=`rgba(${r},0.8)`,e.beginPath(),e.moveTo(a.x-7*Math.cos(y),s-7*Math.sin(y)),e.lineTo(a.x+7*Math.cos(y),s+7*Math.sin(y)),e.stroke(),a.flash>0&&(e.strokeStyle=`rgba(${n},${.8*a.flash})`,e.beginPath(),e.arc(a.x,s,6+(1-a.flash)*22,0,2*Math.PI),e.stroke())}}};case"mesh":return c=Array.from({length:Math.max(26,Math.round(t*a/26e3))},()=>({x:.25*t+w()*t*.75,y:w()*a,ph:6*w()})),m=[],c.forEach((e,t)=>{c.map((t,a)=>({j:a,d:Math.hypot(e.x-t.x,e.y-t.y)})).filter(e=>e.j!==t).sort((e,t)=>e.d-t.d).slice(0,2).forEach(e=>{m.some(([a,r])=>a===t&&r===e.j||a===e.j&&r===t)||m.push([t,e.j])})}),x=m.map((e,t)=>({e:t,s:w(),v:18e-5+3e-4*w()})),{draw(e,t,a){for(let[t,a]of(e.lineWidth=1,m))e.strokeStyle=`rgba(${l},0.16)`,e.beginPath(),e.moveTo(c[t].x,c[t].y),e.lineTo(c[a].x,c[a].y),e.stroke();for(let a of x){let[o,l]=m[a.e],n=(a.s+t*a.v)%1,h=c[o].x+(c[l].x-c[o].x)*n,i=c[o].y+(c[l].y-c[o].y)*n;e.fillStyle=`rgba(${r},0.75)`,e.beginPath(),e.arc(h,i,1.6,0,2*Math.PI),e.fill()}let h=Math.floor(t/2400)%m.length,[i,s]=m[7*h%m.length];e.setLineDash([3,5]),e.strokeStyle=`rgba(${n},${.6*(1-t%2400/2400)})`,e.beginPath();let f=(c[i].x+c[s].x)/2,M=(c[i].y+c[s].y)/2-60;for(let l of(e.moveTo(c[i].x,c[i].y),e.quadraticCurveTo(f,M,c[s].x,c[s].y),e.stroke(),e.setLineDash([]),c)){let n=a.on?Math.max(0,1-Math.hypot(l.x-a.x,l.y-a.y)/160):0;e.fillStyle=`rgba(${n>.2?o:r},${.55+.45*n})`,e.beginPath(),e.arc(l.x,l.y,2.4+2.5*n+.5*Math.sin(.002*t+l.ph),0,2*Math.PI),e.fill()}}};case"gimbal":return d=.72*t,b=.5*a,u=.42*Math.min(t,a),p=[1,.8,.6,.42].map((e,t)=>({r:u*e,speed:(t%2?-1:1)*(12e-5+5e-5*t),tilt:.25+.12*t})),{draw(e,a,h){let i=h.on?(h.x-d)/t:0;p.forEach((t,o)=>{let n=a*t.speed;e.strokeStyle=`rgba(${0===o?r:l},${0===o?.55:.28})`,e.lineWidth=0===o?1.5:1,e.beginPath(),e.ellipse(d,b,t.r,t.r*Math.abs(Math.cos(n+t.tilt)),.6*n+.3*i,0,2*Math.PI),e.stroke();for(let a=0;a<4;a++){let o=.6*n+.3*i+a*Math.PI/2,l=d+Math.cos(o)*t.r,h=b+Math.sin(o)*t.r*Math.abs(Math.cos(n+t.tilt));e.fillStyle=`rgba(${r},0.6)`,e.fillRect(l-1.5,h-1.5,3,3)}}),e.strokeStyle=`rgba(${o},0.9)`,e.lineWidth=2,e.beginPath(),e.moveTo(d-.3*u,b),e.lineTo(d+.3*u,b),e.stroke(),e.fillStyle=`rgba(${n},0.9)`,e.beginPath(),e.arc(d,b,3.5,0,2*Math.PI),e.fill(),e.lineWidth=1}};case"kernel":return $=Array.from({length:140},(e,r)=>{let o=r%2,l=w()*Math.PI*2,n=o?60+70*w():60*w();return{cls:o,x:.68*t+Math.cos(l)*n*(t/900),y:.5*a+Math.sin(l)*n*(a/600),ph:6*w()}}),{draw(e,o,n){let h=.68*t,i=.5*a;for(let n=0;n<7;n++){let s=t/900*(40+18*n);e.strokeStyle=`rgba(${2===n?r:l},${2===n?.55:.1})`,e.beginPath();for(let r=0;r<=96;r++){let l=r/96*Math.PI*2,f=s+(6*Math.sin(3*l+6e-4*o+n)+4*Math.sin(5*l-4e-4*o)),M=h+Math.cos(l)*f,y=i+Math.sin(l)*f*(a/t)*1.4;0===r?e.moveTo(M,y):e.lineTo(M,y)}e.stroke()}for(let t of $){let a=n.on?Math.max(0,1-Math.hypot(t.x-n.x,t.y-n.y)/120):0,h=t.x+1.5*Math.sin(.001*o+t.ph),i=t.y+1.5*Math.cos(.0012*o+t.ph);t.cls?(e.strokeStyle=`rgba(${l},${.55+.45*a})`,e.strokeRect(h-2.5,i-2.5,5,5)):(e.fillStyle=`rgba(${r},${.65+.35*a})`,e.beginPath(),e.arc(h,i,2.4+2*a,0,2*Math.PI),e.fill())}}};case"rigging":return v=.8*t,P=.06*a,k=.96*a,T=Array.from({length:14},(e,a)=>.18*t+a/13*(.8*t)),{draw(e,t,n){let h=v+6*Math.sin(5e-4*t);e.strokeStyle=`rgba(${o},0.75)`,e.lineWidth=2,e.beginPath(),e.moveTo(v,k),e.lineTo(h,P),e.stroke(),e.lineWidth=1,T.forEach((o,i)=>{let s=P+i%3*(.09*a),f=v+(h-v)*(k-s)/(k-P),M=(f+o)/2,y=(s+k)/2,g=n.on?Math.max(0,1-Math.hypot(M-n.x,y-n.y)/220):0,c=(24+i%4*10)*(1-.85*g)+3*Math.sin(9e-4*t+i),m=6===i||10===i;e.strokeStyle=`rgba(${m||g>.3?r:l},${m?.8:.3+.5*g})`,e.lineWidth=m?1.5:1,e.beginPath(),e.moveTo(f,s),e.quadraticCurveTo(M+.4*c,y+c,o,k),e.stroke()});for(let t=1;t<9;t++){let a=P+t/9*(k-P)*.9,o=14+3*t,l=v+(h-v)*(k-a)/(k-P);e.strokeStyle=`rgba(${r},0.5)`,e.beginPath(),e.moveTo(l-o,a),e.lineTo(l+o,a),e.stroke()}e.lineWidth=1}};case"signal":return S=Array.from({length:7},()=>({a:6*w(),f1:.01+.02*w(),f2:.03+.04*w()})),{draw(e,o,h){let i=.36*t,s=a/8;S.forEach((a,n)=>{let h=s*(n+1);e.strokeStyle=`rgba(${l},0.1)`,e.beginPath(),e.moveTo(i,h),e.lineTo(t,h),e.stroke(),e.strokeStyle=`rgba(${4===n?r:l},${4===n?.8:.45})`,e.beginPath();for(let r=i;r<=t;r+=3){let t=r-.06*o,l=Math.sin(t*a.f1+a.a)*s*.16+Math.sin(t*a.f2)*s*.07;4===n&&(l-=Math.exp(-Math.pow((t%900+900)%900-450,2)/300)*s*.38),r===i?e.moveTo(r,h+l):e.lineTo(r,h+l)}e.stroke()});let f=h.on&&h.x>i?h.x:i+.04*o%(t-i);e.strokeStyle=`rgba(${n},0.5)`,e.beginPath(),e.moveTo(f,.5*s),e.lineTo(f,a-.5*s),e.stroke()}};case"grid":return function(e,t,a){let n=Math.max(26,Math.min(44,e/30)),h=[];for(let r=-2;r<t/(.29*n)+2;r++)for(let t=-2;t<e/n+2;t++){let o=t*n+(r%2?n/2:0),l=r*n*.29;o<.3*e||h.push({x:o,y:l,on:0,target:+(.16>a())})}let i=0;return{draw(e,t,a){if(t-i>900){i=t;for(let e=0;e<6;e++){let e=h[Math.floor(Math.random()*h.length)];e.target=+!e.target}}for(let t of h){t.on+=(t.target-t.on)*.04;let h=a.on&&Math.hypot(t.x-a.x,t.y-a.y)<.6*n;e.beginPath(),e.moveTo(t.x,t.y-.29*n),e.lineTo(t.x+n/2,t.y),e.lineTo(t.x,t.y+.29*n),e.lineTo(t.x-n/2,t.y),e.closePath(),(t.on>.02||h)&&(e.fillStyle=`rgba(${h?o:r},${h?.5:.32*t.on})`,e.fill()),e.strokeStyle=`rgba(${l},0.13)`,e.stroke()}}}}(t,a,w);default:return function(e,t,a,n){let h=Math.max(n?18:30,Math.min(n?26:54,e/(n?12:24))),i={x:.42*h,y:.86*h},s=Math.ceil(e/h)+6,f=Math.ceil(t/i.y)+2,M=[];for(let t=-1;t<f;t++)for(let r=-4;r<s;r++){let o=r*h+t*i.x%h,l=t*i.y;o<-h||o>e+h||M.push({x:o,y:l,ph:a()*Math.PI*2,i:r,j:t})}let y=new Map;M.forEach((e,t)=>y.set(`${e.i},${e.j}`,t));let g=[];M.forEach((e,t)=>{let a=y.get(`${e.i+1},${e.j}`),r=y.get(`${e.i},${e.j+1}`);void 0!==a&&g.push([t,a]),void 0!==r&&g.push([t,r])});let c=M.map(()=>({x:0,y:0,near:0}));return{draw(a,h,i){let s=Math.min(220,Math.max(140,.14*e)),f=6e-5*h%1.6-.3;for(let e=0;e<M.length;e++){let t=M[e],a=Math.hypot(i.on?t.x-i.x:1e4,i.on?t.y-i.y:1e4),r=a<s?1-a/s:0,o=(1-r)*2.2;c[e].x=t.x+Math.cos(t.ph+7e-4*h)*o,c[e].y=t.y+Math.sin(1.3*t.ph+6e-4*h)*o,c[e].near=r}for(let[o,h]of(a.lineWidth=1,g)){let i=Math.max(c[o].near,c[h].near),s=Math.max(0,1-7*Math.abs((M[o].x/e+M[o].y/t)/2-f)),y=n?1:.55+M[o].x/e,g=((n?.16:.1)+.16*s)*y+.5*i;a.strokeStyle=`rgba(${i>.02?r:l},${g})`,a.beginPath(),a.moveTo(c[o].x,c[o].y),a.lineTo(c[h].x,c[h].y),a.stroke()}for(let l=0;l<M.length;l++){let h=c[l].near,i=Math.max(0,1-7*Math.abs((M[l].x/e+M[l].y/t)/2-f)),s=(n?1.3:1.5)+2.4*h+.8*i;a.fillStyle=`rgba(${h>.3?o:r},${(n?.6:.5)+.4*i+.5*h})`,a.beginPath(),a.arc(c[l].x,c[l].y,s,0,2*Math.PI),a.fill(),h>.72&&(a.strokeStyle=`rgba(${r},${(h-.72)*2.2})`,a.beginPath(),a.arc(c[l].x,c[l].y,s+5,0,2*Math.PI),a.stroke())}}}}(t,a,w,i)}}(e,g,c,h,s),u(performance.now())},v=()=>{cancelAnimationFrame(x),M||!d||document.hidden||(x=requestAnimationFrame(p))};$(),v();let P=new ResizeObserver($);P.observe(t);let k=new IntersectionObserver(([e])=>{d=e.isIntersecting,v()});k.observe(t);let T=t.parentElement?.parentElement??t,S=e=>{let a=t.getBoundingClientRect();y.x=e.clientX-a.left,y.y=e.clientY-a.top,y.on=y.x>=0&&y.y>=0&&y.x<=a.width&&y.y<=a.height,M&&u(performance.now())},w=()=>{y.on=!1,M&&u(performance.now())};return i||(T.addEventListener("pointermove",S),T.addEventListener("pointerleave",w)),document.addEventListener("visibilitychange",v),()=>{cancelAnimationFrame(x),P.disconnect(),k.disconnect(),T.removeEventListener("pointermove",S),T.removeEventListener("pointerleave",w),document.removeEventListener("visibilitychange",v)}
  }
  function initArt() {
    Array.prototype.forEach.call(document.querySelectorAll("canvas[data-art]"), function (c) {
      if (c._bound) return;
      c._bound = true;
      try {
        art(c, c.getAttribute("data-art"), Number(c.getAttribute("data-seed") || 7),
            c.hasAttribute("data-still"), c.hasAttribute("data-dense"));
      } catch (err) { /* decorative only */ }
    });
  }

  /* ---------------------------------------------------------------- exposure check */
  function years(v) { return v + " " + (v === 1 ? "year" : "years"); }
  function initExposure() {
    var START = 2026;
    Array.prototype.forEach.call(document.querySelectorAll(".calc"), function (calc) {
      if (calc._bound) return;
      calc._bound = true;
      var ranges = calc.querySelectorAll('input[type="range"]');
      if (ranges.length !== 3) return;
      var xIn = ranges[0], yIn = ranges[1], zIn = ranges[2];
      var bar = calc.querySelector(".bar");
      var dds = calc.querySelectorAll(".spec dd");
      var dt0 = calc.querySelector(".spec dt");
      var verdict = calc.querySelector(".verdict");
      function update() {
        var x = Number(xIn.value), y = Number(yIn.value), z = Number(zIn.value);
        [xIn, yIn, zIn].forEach(function (inp) {
          var min = Number(inp.min), max = Number(inp.max), v = Number(inp.value);
          inp.style.setProperty("--fill", ((v - min) / (max - min) * 100) + "%");
          var out = calc.querySelector('output[for="' + inp.id + '"]');
          if (out) out.textContent = years(v);
        });
        var gap = x + y - z, exposed = gap > 0, total = Math.max(x + y, z) + 2;
        function g(v) { return (v / total * 100) + "%"; }
        if (bar) {
          bar.setAttribute("aria-label", "Migration " + y + " years plus secrecy " + x + " years, compared with " + z + " years");
          var segs = bar.querySelectorAll(".bar__seg");
          segs[0].style.left = "0"; segs[0].style.width = g(y);
          segs[1].style.left = g(y); segs[1].style.width = g(x);
          var risk = segs[2];
          if (exposed) {
            if (!risk) {
              risk = document.createElement("span");
              risk.className = "bar__seg";
              risk.style.background = "repeating-linear-gradient(135deg, rgba(245,193,22,0.55) 0 6px, rgba(245,193,22,0.15) 6px 12px)";
              bar.insertBefore(risk, bar.querySelector(".bar__z"));
            }
            risk.style.left = g(z); risk.style.width = g(gap);
          } else if (risk) { risk.remove(); }
          var zMark = bar.querySelector(".bar__z");
          if (zMark) zMark.style.left = "calc(" + g(z) + " - 1px)";
        }
        if (dt0) dt0.textContent = "Data recorded in " + START;
        if (dds.length === 4) {
          dds[0].textContent = "must stay secret until " + (START + x);
          dds[1].textContent = String(START + y);
          dds[2].textContent = "must stay secret until " + (START + y + x);
          dds[3].textContent = String(START + z);
        }
        if (verdict) {
          verdict.className = "verdict " + (exposed ? "verdict--bad" : "verdict--ok");
          verdict.innerHTML = exposed
            ? '<p class="body"><strong>Exposed by ' + years(gap) + '.</strong> Data encrypted before your migration finishes would still need protection ' + years(gap) + ' after your assumed quantum date. Recording it today is enough for an adversary.</p>'
            : '<p class="body"><strong>Inside the window, by ' + years(-gap) + '.</strong> That margin disappears if migration slips or the quantum date comes sooner. Shortening y is the part you control.</p>';
        }
      }
      [xIn, yIn, zIn].forEach(function (inp) { inp.addEventListener("input", update); });
      update();
    });
  }

  /* ---------------------------------------------------------------- Nexus packages */
  var PACKAGES = [
    { name: "Starter", modules: 3, build: 2500, annual: 1250 },
    { name: "Advance", modules: 6, build: 5000, annual: 2500 },
    { name: "Enterprise", modules: 12, build: 10000, annual: 3750 },
    { name: "Large Enterprise", modules: 24, build: 25000, annual: 5000 }
  ];
  var EXTRA_MODULE = 1000;
  function usd(v) { return "USD " + v.toLocaleString("en-US"); }
  function initPicker() {
    var picker = document.querySelector(".picker");
    if (!picker || picker._bound) return;
    picker._bound = true;
    var fs = picker.closest("fieldset");
    var root = fs ? fs.parentElement : picker.parentElement;
    var boxes = picker.querySelectorAll('input[type="checkbox"]');
    var count = root.querySelector('p[aria-live="polite"]');
    var cards = root.querySelectorAll(".price-card");
    var cta = root.querySelector("a.btn--gold");
    var ctaBase = cta ? cta.getAttribute("href").split("?")[0] : "";
    function update() {
      var h = Array.prototype.filter.call(boxes, function (b) { return b.checked; }).length;
      var need = Math.max(1, h);
      Array.prototype.forEach.call(boxes, function (b) {
        var lbl = b.closest(".pick");
        if (lbl) lbl.classList.toggle("is-checked", b.checked);
      });
      var opts = PACKAGES.map(function (p) {
        var extra = Math.max(0, need - p.modules);
        return { p: p, extra: extra, total: p.build + extra * EXTRA_MODULE };
      });
      var min = Math.min.apply(null, opts.map(function (x) { return x.total; }));
      var best = opts.slice().reverse().find(function (x) { return x.total === min; });
      if (count) count.textContent = h + " " + (h === 1 ? "module" : "modules") + " selected. Packages also include modules beyond this list, up to 24.";
      Array.prototype.forEach.call(cards, function (card, idx) {
        var x = opts[idx]; if (!x) return;
        var isBest = x === best;
        card.setAttribute("data-best", String(isBest));
        var row = card.querySelector(".row");
        var chip = row && row.querySelector(".chip");
        if (isBest && !chip && row) { chip = document.createElement("span"); chip.className = "chip chip--live"; chip.textContent = "Best fit"; row.appendChild(chip); }
        if (!isBest && chip) chip.remove();
        var smalls = card.querySelectorAll("p.small");
        if (smalls[0]) smalls[0].textContent = x.extra > 0 ? "+ " + x.extra + " extra " + (x.extra === 1 ? "module" : "modules") + ": " + usd(x.extra * EXTRA_MODULE) : "No extra modules needed";
        if (smalls[1]) smalls[1].innerHTML = '<strong style="color:var(--text-strong)">Total ' + usd(x.total) + "</strong>";
      });
      if (cta) {
        cta.setAttribute("href", ctaBase + "?topic=nexus&modules=" + h);
        cta.textContent = "Ask for a " + best.p.name + " proposal";
      }
    }
    Array.prototype.forEach.call(boxes, function (b) { b.addEventListener("change", update); });
    update();
  }

  /* ---------------------------------------------------------------- contact form */
  var TOPICS = { assessment: 1, pqc: 1, agility: 1, qkd: 1, research: 1, nexus: 1, vizor: 1, kayak: 1, careers: 1, other: 1 };
  function initForm() {
    var form = document.querySelector("form.form");
    if (!form || form._bound) return;
    form._bound = true;
    var endpoint = form.getAttribute("data-endpoint") || SITE.formEndpoint;
    var topic = new URLSearchParams(window.location.search).get("topic");
    var select = form.querySelector('select[name="topic"]');
    if (select && topic && TOPICS[topic]) select.value = topic;
    var submit = form.querySelector('button[type="submit"]');

    function setError(name, msg) {
      var input = form.querySelector('[name="' + name + '"]');
      if (!input) return;
      var field = input.closest(".field");
      var err = field.querySelector(".err");
      if (msg) {
        if (!err) { err = document.createElement("span"); err.className = "err"; field.appendChild(err); }
        err.textContent = msg;
      } else if (err) { err.remove(); }
      if (name !== "consent") input.setAttribute("aria-invalid", msg ? "true" : "false");
    }
    function notice(kind) {
      var old = form.querySelector(".callout"); if (old) old.remove();
      if (!kind) return;
      var box = document.createElement("div");
      box.className = "callout field--full"; box.setAttribute("role", "alert");
      box.innerHTML = '<p class="h-card">' + (kind === "error" ? "Your message did not send." : "Online sending is not switched on for this site yet.") + "</p>" +
        '<p class="body">Please email us at <span class="mono">' + SITE.email + '</span> or call <span class="mono">' + SITE.phone + "</span>.</p>" +
        '<div><button type="button" class="btn btn--line btn--sm">Copy email address</button></div>';
      var copy = box.querySelector("button");
      copy.addEventListener("click", function () {
        var done = function () { copy.textContent = "Email address copied"; };
        try {
          navigator.clipboard.writeText(SITE.email).then(done, function () {});
        } catch (e) { /* clipboard unavailable: the address is shown above */ }
      });
      form.appendChild(box);
    }
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });
      var errs = {};
      if (!(data.name || "").trim()) errs.name = "Enter your name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || "")) errs.email = "Enter a work email we can reply to.";
      if (!(data.message || "").trim()) errs.message = "Tell us a little about what you need.";
      if (!data.consent) errs.consent = "We need your permission to use these details to reply.";
      ["name", "email", "message", "consent"].forEach(function (k) { setError(k, errs[k]); });
      if (Object.keys(errs).length) { notice(null); return; }
      if (!endpoint) { notice("offline"); return; }
      submit.disabled = true; submit.textContent = "Sending…";
      data.topicLabel = select ? select.options[select.selectedIndex].text : data.topic;
      data.page = window.location.href;
      fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) })
        .then(function (res) {
          if (!res.ok) throw new Error("status " + res.status);
          var done = document.createElement("div");
          done.className = "callout"; done.setAttribute("role", "status");
          done.innerHTML = '<p class="h-sub">Message sent.</p><p class="body">A founder will reply within one working day from an @uelement.co address.</p>';
          form.replaceWith(done);
        })
        .catch(function () { submit.disabled = false; submit.textContent = "Send message"; notice("error"); });
    });
  }

  /* ---------------------------------------------------------------- smooth scroll for hash links */
  function initSmoothScroll() {
    function getTarget(hash) {
      if (!hash || hash === "#") return null;
      try {
        var id = decodeURIComponent(hash.replace(/^#/, ""));
        return document.getElementById(id) || document.querySelector(hash);
      } catch (e) {
        return null;
      }
    }

    function smoothScrollTo(element, pushHash) {
      if (!element) return;
      var header = document.querySelector(".header");
      var headerHeight = header ? header.offsetHeight : 72;
      var elementPosition = element.getBoundingClientRect().top;
      var offsetPosition = elementPosition + window.pageYOffset - (headerHeight + 20);

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth"
      });

      if (pushHash && element.id && history.pushState) {
        history.pushState(null, "", "#" + element.id);
      }
    }

    // Intercept clicks on anchor tags pointing to hash
    document.addEventListener("click", function (e) {
      var link = e.target.closest("a");
      if (!link) return;
      var href = link.getAttribute("href");
      if (!href) return;

      var currentPath = window.location.pathname.replace(/\/$/, "");
      var targetHash = "";

      if (href.startsWith("#")) {
        targetHash = href;
      } else {
        try {
          var url = new URL(link.href, window.location.origin);
          var linkPath = url.pathname.replace(/\/$/, "");
          if (url.hash && linkPath === currentPath) {
            targetHash = url.hash;
          }
        } catch (err) {}
      }

      if (targetHash) {
        var targetEl = getTarget(targetHash);
        if (targetEl) {
          e.preventDefault();
          smoothScrollTo(targetEl, true);
        }
      }
    });

    // Handle initial redirect or page load with hash in URL
    if (window.location.hash) {
      var initialEl = getTarget(window.location.hash);
      if (initialEl) {
        if ("scrollRestoration" in history) {
          history.scrollRestoration = "manual";
        }
        window.scrollTo(0, 0);
        setTimeout(function () {
          smoothScrollTo(initialEl, false);
        }, 180);
      }
    }
  }

  window.initSite = start;
  function start() {
    document.documentElement.classList.add("js");
    initHeader(); initPlatformTabs(); initArt(); initExposure(); initPicker(); initForm(); initSmoothScroll();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
