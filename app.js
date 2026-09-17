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

  function initials(name) {
    return name
      .split(" ")
      .slice(0, 2)
      .map(function (w) { return w.charAt(0); })
      .join(".")
      .concat(".");
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
    document.getElementById("hero-caption").textContent = p.photoCaption;
    document.getElementById("hero-monogram").textContent = initials(p.name);

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
  }

  document.addEventListener("DOMContentLoaded", init);
})();