// ============================================================
// App — Reginaldo Guedes Landing Page
// Renderiza conteúdo, monta links do WhatsApp e animações
// ============================================================

(function () {
  "use strict";

  // ── Helpers ───────────────────────────────────────────────────
  function waUrl(message) {
    var base = "https://wa.me/" + CONFIG.whatsapp.number;
    return message ? base + "?text=" + encodeURIComponent(message) : base;
  }

  function setPhoto(containerId, src, alt, fallbackText, className) {
    var container = document.getElementById(containerId);
    var existing = container.querySelector("img.photo-img, .photo-fallback");
    if (existing) existing.remove();

    var img = document.createElement("img");
    img.className = "photo-img " + (className || "");
    img.alt = alt || "";
    img.onload = function () {
      container.appendChild(img);
    };
    img.onerror = function () {
      var span = document.createElement("span");
      span.className = "photo-fallback";
      span.textContent = fallbackText || "Foto";
      container.appendChild(span);
    };
    img.src = src;
  }

  // ── Cabeçalho ──────────────────────────────────────────────────
  function renderNav() {
    var p = CONFIG.professional;
    document.getElementById("nav-name").textContent = p.name;

    var phone = document.getElementById("nav-phone");
    phone.textContent = "WhatsApp " + CONFIG.whatsapp.display;
    phone.href = waUrl(CONFIG.hero.whatsappMessage);

    var list = document.getElementById("nav-links");
    var mobileList = document.getElementById("menu-mobile-links");

    CONFIG.nav.forEach(function (item) {
      var a = document.createElement("a");
      a.href = item.href;
      a.textContent = item.label;
      a.dataset.nav = item.href.slice(1);

      var li = document.createElement("li");
      li.appendChild(a);
      list.appendChild(li);

      var m = a.cloneNode(true);
      var mli = document.createElement("li");
      mli.appendChild(m);
      mobileList.appendChild(mli);
    });

    document.getElementById("menu-mobile-phone").textContent =
      "WhatsApp " + CONFIG.whatsapp.display;
    document.getElementById("menu-mobile-email").textContent = p.email;

    initMobileMenu();
  }

  function initMobileMenu() {
    var toggle = document.getElementById("nav-toggle");
    var menu = document.getElementById("menu-mobile");

    function open() {
      menu.hidden = false;
      menu.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
    }

    function close() {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      setTimeout(function () { menu.hidden = true; }, 320);
    }

    toggle.addEventListener("click", function () {
      if (menu.classList.contains("open")) { close(); } else { open(); }
    });

    menu.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("a")) { close(); }
    });
  }

  // ── Hero ─────────────────────────────────────────────────────
  function renderHero() {
    var h = CONFIG.hero;
    var p = CONFIG.professional;

    document.getElementById("hero-idline").textContent = h.idLine;
    document.getElementById("hero-name").textContent = p.name;
    document.getElementById("hero-role").textContent = h.roleLine;
    document.getElementById("hero-subtitle").textContent = h.subtitle;

    var cta = document.getElementById("hero-cta");
    cta.textContent = h.cta;
    cta.appendChild(arrowSpan());
    cta.href = waUrl(h.whatsappMessage);

    document.getElementById("hero-cta2").textContent = h.ctaSecondary;
    document.getElementById("hero-hint").textContent = h.scrollHint;

    setPhoto("hero-photo", p.heroPhoto, p.photoAlt, "Retrato de Reginaldo", "hero__img");
  }

  function arrowSpan() {
    var span = document.createElement("span");
    span.className = "btn__arrow";
    span.setAttribute("aria-hidden", "true");
    span.innerHTML = "&rarr;";
    return span;
  }

  // ── Frase intermediária ──────────────────────────────────────
  function renderStatement() {
    document.getElementById("statement-text").textContent = CONFIG.statement.text;
    document.getElementById("statement-author").textContent =
      "— " + CONFIG.statement.author;
  }

  // ── Sobre ────────────────────────────────────────────────────
  function renderAbout() {
    var a = CONFIG.about;
    var p = CONFIG.professional;

    document.getElementById("about-label").textContent = a.label;
    document.getElementById("about-title").textContent = a.title;
    document.getElementById("about-body").textContent = a.body;

    var roles = document.getElementById("about-roles");
    a.roles.forEach(function (r) {
      var li = document.createElement("li");
      var label = document.createElement("span");
      label.className = "role-label";
      label.textContent = r.label;
      var text = document.createElement("span");
      text.className = "role-text";
      text.textContent = r.text;
      li.appendChild(label);
      li.appendChild(text);
      roles.appendChild(li);
    });

    var fields = document.getElementById("about-fields");
    a.fields.forEach(function (f) {
      var div = document.createElement("div");
      div.className = "about__field";
      var label = document.createElement("span");
      label.className = "about__field-label";
      label.textContent = f.label;
      var value = document.createElement("span");
      value.className = "about__field-value";
      value.textContent = f.value;
      div.appendChild(label);
      div.appendChild(value);
      fields.appendChild(div);
    });

    document.getElementById("about-email-label").textContent = a.emailLabel;
    var email = document.getElementById("about-email");
    email.textContent = p.email;
    email.href = "mailto:" + p.email;

    document.getElementById("about-caption").textContent = p.name;
    document.getElementById("about-frame-note").textContent = p.frameNote;
    var areasEl = document.getElementById("about-areas");
    if (areasEl && a.areas) { areasEl.textContent = a.areas.join(" · "); }

    setPhoto("about-photo", p.aboutPhoto, p.photoAlt, "Foto de Reginaldo", "about__img");
  }

  // ── Serviços ─────────────────────────────────────────────────
  function renderServices() {
    var s = CONFIG.services;
    document.getElementById("services-label").textContent = s.label;
    document.getElementById("services-title").textContent = s.title;
    document.getElementById("services-subtitle").textContent = s.subtitle;

    var list = document.getElementById("services-list");
    s.items.forEach(function (item, i) {
      var row = document.createElement("li");
      row.className = "service-row";
      row.setAttribute("data-ghost", item.name);

      var number = document.createElement("span");
      number.className = "service-row__number";
      number.textContent = String(i + 1).padStart(2, "0");
      row.appendChild(number);

      var body = document.createElement("div");
      body.className = "service-row__body";

      var name = document.createElement("h3");
      name.className = "service-row__name";
      name.textContent = item.name;
      body.appendChild(name);

      var category = document.createElement("span");
      category.className = "service-row__category";
      category.textContent = item.category;
      body.appendChild(category);

      var desc = document.createElement("p");
      desc.className = "service-row__desc";
      desc.textContent = item.description;
      body.appendChild(desc);

      row.appendChild(body);

      var action = document.createElement("div");
      action.className = "service-row__action";
      action.appendChild(serviceCta(item));
      row.appendChild(action);

      list.appendChild(row);
    });
  }

  function serviceCta(item) {
    var link = document.createElement("a");
    link.className = "service-cta";
    link.href = waUrl(item.whatsappMessage);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Consultar orçamento";
    link.appendChild(arrowSvg());
    return link;
  }

  function arrowSvg() {
    var span = document.createElement("span");
    span.style.display = "inline-flex";
    span.setAttribute("aria-hidden", "true");
    span.innerHTML =
      '<svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M0 5h14M10.5 1l4 4-4 4" stroke="currentColor" stroke-width="1.4"/>' +
      "</svg>";
    return span;
  }

  // ── Como funciona ────────────────────────────────────────────
  function renderProcess() {
    var pr = CONFIG.process;
    document.getElementById("process-label").textContent = pr.label;
    document.getElementById("process-title").textContent = pr.title;
    document.getElementById("process-note").textContent = pr.note;

    var steps = document.getElementById("process-steps");
    pr.steps.forEach(function (step, i) {
      var div = document.createElement("div");
      div.className = "process-step";

      var number = document.createElement("span");
      number.className = "process-step__number";
      number.textContent = String(i + 1).padStart(2, "0");
      div.appendChild(number);

      var title = document.createElement("h3");
      title.className = "process-step__title";
      title.textContent = step.title;
      div.appendChild(title);

      var desc = document.createElement("p");
      desc.className = "process-step__desc";
      desc.textContent = step.description;
      div.appendChild(desc);

      steps.appendChild(div);
    });
  }

  // ── Contato e rodapé ─────────────────────────────────────────
  function renderContact() {
    var c = CONFIG.contact;
    var p = CONFIG.professional;

    document.getElementById("contact-label").textContent = c.label;
    document.getElementById("contact-title").textContent = c.title;
    document.getElementById("contact-subtitle").textContent = c.subtitle;

    var cta = document.getElementById("contact-cta");
    cta.textContent = c.cta;
    cta.appendChild(arrowSpan());
    cta.href = waUrl(c.whatsappMessage);

    var email = document.getElementById("contact-email");
    email.textContent = p.email;
    email.href = "mailto:" + p.email;

    document.getElementById("contact-sign").textContent =
      p.name + " — " + p.title;

    document.getElementById("footer-text").textContent = CONFIG.footer.text;
    document.getElementById("footer-credit").textContent =
      CONFIG.footer.credit + " · WhatsApp " + CONFIG.whatsapp.display;
  }

  // ── Scroll: fundo do nav + seção ativa ───────────────────────
  function initScroll() {
    var nav = document.getElementById("nav");
    var sections = {};
    CONFIG.nav.forEach(function (item) {
      var el = document.getElementById(item.href.slice(1));
      if (el) sections[item.href.slice(1)] = el;
    });

    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        nav.classList.toggle("nav--solid", y > 20);

        var current = "inicio";
        Object.keys(sections).forEach(function (id) {
          if (sections[id].offsetTop <= y + 140) current = id;
        });

        document.querySelectorAll(".nav__links a, .menu-mobile__links a").forEach(function (a) {
          a.classList.toggle("active", a.dataset.nav === current);
        });

        ticking = false;
      });
    });
  }

  // ── Reveal ao rolar ──────────────────────────────────────────
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("reveal--visible"); });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal--visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    items.forEach(function (el) { observer.observe(el); });
  }

  function initGlow() {
    var targets = document.querySelectorAll(".glow-btn");

    targets.forEach(function (el) {
      el.addEventListener("pointermove", function (e) {
        var rect = el.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var cx = rect.width / 2;
        var cy = rect.height / 2;

        var dx = x - cx;
        var dy = y - cy;

        var kx = dx !== 0 ? cx / Math.abs(dx) : Infinity;
        var ky = dy !== 0 ? cy / Math.abs(dy) : Infinity;
        var edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);

        var angle = 0;
        if (dx !== 0 || dy !== 0) {
          var radians = Math.atan2(dy, dx);
          angle = radians * (180 / Math.PI) + 90;
          if (angle < 0) angle += 360;
        }

        el.style.setProperty("--edge-proximity", edge.toFixed(3));
        el.style.setProperty("--cursor-angle", angle.toFixed(3) + "deg");
      });

      el.addEventListener("pointerleave", function () {
        el.style.setProperty("--edge-proximity", "0");
      });
    });
  }

  function initGlare() {
    var targets = document.querySelectorAll(".btn");

    targets.forEach(function (el) {
      if (el.querySelector(":scope > .btn-glare")) return;

      var computed = window.getComputedStyle(el);
      if (computed.position === "static") {
        el.style.position = "relative";
      }

      var glare = document.createElement("span");
      glare.className = "btn-glare";
      glare.setAttribute("aria-hidden", "true");
      el.insertBefore(glare, el.firstChild);

      function updateSpotlight(clientX, clientY) {
        var rect = el.getBoundingClientRect();
        var x = ((clientX - rect.left) / rect.width) * 100;
        var y = ((clientY - rect.top) / rect.height) * 100;
        glare.style.setProperty("--glare-x", x.toFixed(1) + "%");
        glare.style.setProperty("--glare-y", y.toFixed(1) + "%");
      }

      function triggerSweep() {
        glare.classList.remove("is-glaring");
        // força reflow para poder repetir a animação
        void glare.offsetWidth;
        glare.classList.add("is-glaring");
      }

      el.addEventListener("pointerenter", function (e) {
        if (e.pointerType === "touch") return;
        updateSpotlight(e.clientX, e.clientY);
        triggerSweep();
      });

      el.addEventListener("pointermove", function (e) {
        if (e.pointerType === "touch") return;
        updateSpotlight(e.clientX, e.clientY);
      });

      el.addEventListener("pointerleave", function () {
        glare.classList.remove("is-glaring");
      });

      el.addEventListener("focus", function () {
        glare.style.setProperty("--glare-x", "50%");
        glare.style.setProperty("--glare-y", "50%");
        triggerSweep();
      });

      // Mobile: sem hover, então dispara no toque
      el.addEventListener(
        "touchstart",
        function () {
          glare.style.setProperty("--glare-x", "50%");
          glare.style.setProperty("--glare-y", "50%");
          triggerSweep();
        },
        { passive: true }
      );
    });
  }

  function initClickSpark() {
    var sparkColor = "#8a5a2b"; // tom bronze, combina com a paleta do site
    var sparkSize = 10;
    var sparkRadius = 15;
    var sparkCount = 8;
    var duration = 400;

    // Todos os botões do site (estáticos + criados via JS)
    var targets = document.querySelectorAll(".btn, .service-cta, .spark-btn");

    targets.forEach(function (el) {
      if (el.querySelector(":scope > .spark-canvas")) return;
      el.classList.add("spark-btn");

      var computed = window.getComputedStyle(el);
      if (computed.position === "static") {
        el.style.position = "relative";
      }

      var canvas = document.createElement("canvas");
      canvas.className = "spark-canvas";
      el.appendChild(canvas);

      var ctx = canvas.getContext("2d");

      function resize() {
        var w = Math.ceil(el.offsetWidth) || Math.ceil(el.getBoundingClientRect().width);
        var h = Math.ceil(el.offsetHeight) || Math.ceil(el.getBoundingClientRect().height);
        if (w > 0) canvas.width = w;
        if (h > 0) canvas.height = h;
      }
      resize();
      window.addEventListener("resize", resize);
      // Recalcula após fontes/layout assentarem (evita canvas 0x0)
      setTimeout(resize, 100);
      setTimeout(resize, 500);
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(resize);
      }

      var sparks = [];
      var drawing = false;

      function easeOut(t) {
        return t * (2 - t);
      }

      function draw() {
        drawing = true;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var now = performance.now();

        sparks = sparks.filter(function (spark) {
          var elapsed = now - spark.start;
          if (elapsed >= duration) return false;

          var progress = elapsed / duration;
          var eased = easeOut(progress);
          var distance = eased * sparkRadius;
          var lineLength = sparkSize * (1 - eased);

          var x1 = spark.x + distance * Math.cos(spark.angle);
          var y1 = spark.y + distance * Math.sin(spark.angle);
          var x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
          var y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

          ctx.strokeStyle = sparkColor;
          ctx.lineWidth = 2;
          ctx.globalAlpha = 1 - progress;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
          ctx.globalAlpha = 1;

          return true;
        });

        if (sparks.length > 0) {
          requestAnimationFrame(draw);
        } else {
          drawing = false;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }

      el.addEventListener("click", function (e) {
        resize();
        var rect = el.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        // Clique via teclado não tem clientX/Y -> usa o centro
        if (!e.clientX && !e.clientY) {
          x = rect.width / 2;
          y = rect.height / 2;
        }
        var now = performance.now();

        for (var i = 0; i < sparkCount; i++) {
          sparks.push({
            x: x,
            y: y,
            angle: (2 * Math.PI * i) / sparkCount,
            start: now,
          });
        }

        if (!drawing) requestAnimationFrame(draw);
      });
    });
  }

  // ── Init ─────────────────────────────────────────────────────
  function init() {
    renderNav();
    renderHero();
    renderStatement();
    renderAbout();
    renderServices();
    renderProcess();
    renderContact();
    initScroll();
    initReveal();
    initGlow();
    initGlare();
    initClickSpark();
  }

  document.addEventListener("DOMContentLoaded", init);
})();