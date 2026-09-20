// ============================================================
// App — Site multipágina Assessoria Company
// Renderiza conteúdo por página, monta WhatsApp e animações
// O mesmo arquivo funciona em todas as páginas.
// ============================================================

(function () {
  "use strict";

  function el(id) { return document.getElementById(id); }
  function exists(id) { return !!el(id); }

  // ── Helpers ───────────────────────────────────────────────────
  function waUrl(message) {
    var base = "https://wa.me/" + CONFIG.whatsapp.number;
    return message ? base + "?text=" + encodeURIComponent(message) : base;
  }

  function setPhoto(containerId, src, alt, fallbackText, className) {
    var container = el(containerId);
    if (!container) return;

    var existingImg = container.querySelector("img.photo-img");
    if (existingImg) {
      if (src) existingImg.src = src;
      if (alt) existingImg.alt = alt;
      container.classList.add("has-img");
      container.classList.remove("is-empty");
      return;
    }

    var existingFallback = container.querySelector(".photo-fallback");
    if (existingFallback) existingFallback.remove();

    var img = document.createElement("img");
    img.className = "photo-img " + (className || "");
    img.alt = alt || "";
    img.loading = "lazy";
    img.onload = function () {
      container.classList.add("has-img");
      container.classList.remove("is-empty");
    };
    img.onerror = function () {
      img.remove();
      var span = document.createElement("span");
      span.className = "photo-fallback";
      span.textContent = fallbackText || "Foto";
      container.insertBefore(span, container.firstChild);
      container.classList.add("is-empty");
    };
    img.src = src;
    container.insertBefore(img, container.firstChild);
  }

  function arrowSpan() {
    var span = document.createElement("span");
    span.className = "btn__arrow";
    span.setAttribute("aria-hidden", "true");
    span.innerHTML = "&rarr;";
    return span;
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

  // ── Cabeçalho multipágina (marca: Assessoria Company) ─────────
  function renderNav() {
    var p = CONFIG.professional;
    var brand = el("nav-name");
    if (brand) {
      brand.textContent = CONFIG.company.shortName || CONFIG.company.name;
      var brandLink = brand.closest("a");
      if (brandLink) {
        brandLink.href = "index.html";
        brandLink.setAttribute("aria-label", CONFIG.company.name + " — Início");
      }
    }

    // Logo do cabeçalho (à esquerda do nome; oculto até o arquivo existir)
    var nlogo = el("nav-logo");
    if (nlogo) {
      nlogo.innerHTML = "";
      var nimg = document.createElement("img");
      nimg.alt = "";
      nimg.setAttribute("aria-hidden", "true");
      nimg.onload = function () {
        nlogo.appendChild(nimg);
      };
      nimg.onerror = function () {
        nlogo.classList.add("is-empty");
      };
      nimg.src = CONFIG.company.companyLogo;
    }

    var list = el("nav-links");
    var mobileList = el("menu-mobile-links");
    var currentPage = document.body ? document.body.dataset.page : "";

    if (list) list.innerHTML = "";
    if (mobileList) mobileList.innerHTML = "";

    CONFIG.nav.forEach(function (item) {
      var isActive = item.page === currentPage;

      if (list) {
        var a = document.createElement("a");
        a.href = item.href;
        a.textContent = item.label;
        a.dataset.page = item.page;
        if (isActive) {
          a.classList.add("active");
          a.setAttribute("aria-current", "page");
        }
        var li = document.createElement("li");
        li.appendChild(a);
        list.appendChild(li);
      }

      if (mobileList) {
        var m = document.createElement("a");
        m.href = item.href;
        m.textContent = item.label;
        m.dataset.page = item.page;
        if (isActive) {
          m.classList.add("active");
          m.setAttribute("aria-current", "page");
        }
        var mli = document.createElement("li");
        mli.appendChild(m);
        mobileList.appendChild(mli);
      }
    });

    var mmPhone = el("menu-mobile-phone");
    if (mmPhone) mmPhone.textContent = "Falar no WhatsApp";
    var mmEmail = el("menu-mobile-email");
    if (mmEmail) mmEmail.textContent = p.email;

    initMobileMenu();
  }

  function initMobileMenu() {
    var toggle = el("nav-toggle");
    var menu = el("menu-mobile");
    if (!toggle || !menu) return;

    function open() {
      menu.hidden = false;
      requestAnimationFrame(function () { menu.classList.add("open"); });
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }
    function close() {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      setTimeout(function () { menu.hidden = true; }, 320);
    }
    toggle.addEventListener("click", function () {
      if (menu.classList.contains("open")) { close(); } else { open(); }
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("a")) { close(); }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) close();
    });
  }

  // ── Hero (Início) ───────────────────────────────────────────
  function renderHero() {
    if (!exists("hero-name")) return;
    var h = CONFIG.hero;
    var p = CONFIG.professional;

    el("hero-idline").textContent = h.idLine;
    el("hero-name").textContent = p.name;
    el("hero-role").textContent = h.roleLine;
    el("hero-subtitle").textContent = h.subtitle;

    var cta = el("hero-cta");
    cta.textContent = h.cta;
    cta.appendChild(arrowSpan());
    cta.href = waUrl(h.whatsappMessage);

    var cta2 = el("hero-cta2");
    if (cta2) {
      cta2.textContent = h.ctaSecondary;
      cta2.href = h.ctaSecondaryHref || "como-funciona.html";
    }
    var hint = el("hero-hint");
    if (hint) hint.textContent = h.scrollHint;

    setPhoto("hero-photo", p.heroPhoto, p.photoAlt, "Retrato de Reginaldo", "hero__img");
  }

  // ── Frase intermediária ──────────────────────────────────────
  function renderStatement() {
    if (!exists("statement-text")) return;
    el("statement-text").textContent = CONFIG.statement.text;
    el("statement-author").textContent = "— " + CONFIG.statement.author;
  }

  // ── Empresa — parte 01 ──────────────────────────────────────
  function renderCompany() {
    if (!exists("company-name")) return;
    var c = CONFIG.company;

    el("company-eyebrow").textContent = c.eyebrow;
    el("company-name").textContent = c.name;
    el("company-title").textContent = c.title;
    el("company-intro").textContent = c.intro;

    var paras = el("company-paragraphs");
    if (paras) {
      paras.innerHTML = "";
      c.paragraphs.forEach(function (t) {
        var pEl = document.createElement("p");
        pEl.className = "company__para";
        pEl.textContent = t;
        paras.appendChild(pEl);
      });
    }

    // Ano gráfico 2022
    if (exists("company-year")) el("company-year").textContent = c.foundedYear;
    if (exists("company-year-badge")) el("company-year-badge").textContent = c.foundedBadge;
    if (exists("company-year-label")) el("company-year-label").textContent = c.foundedLabel;

    // Valores
    var values = el("company-values");
    if (values) {
      values.innerHTML = "";
      c.values.forEach(function (v) {
        var li = document.createElement("li");
        li.className = "company__value";
        var l = document.createElement("span");
        l.className = "company__value-label";
        l.textContent = v.label;
        var t = document.createElement("span");
        t.className = "company__value-text";
        t.textContent = v.text;
        li.appendChild(l);
        li.appendChild(t);
        values.appendChild(li);
      });
    }

    // Cobertura / serviços mencionados
    var cov = el("company-coverage");
    if (cov) {
      cov.innerHTML = "";
      c.coverage.forEach(function (item) {
        var li = document.createElement("li");
        li.className = "company__chip";
        li.textContent = item;
        cov.appendChild(li);
      });
    }
    if (exists("company-coverage-label")) el("company-coverage-label").textContent = c.coverageLabel;
    if (exists("company-slogan")) el("company-slogan").textContent = c.slogan;

    // Imagem de fundo da seção empresa (CONFIG.company.companyBackground)
    var companySec = document.querySelector(".company");
    if (companySec && c.companyBackground) {
      companySec.style.setProperty("--company-bg", "url(\"" + c.companyBackground + "\")");
      if (c.companyBackgroundOverlay) {
        companySec.style.setProperty("--company-overlay", c.companyBackgroundOverlay);
      }
      companySec.classList.add("has-bg");
    }

    // CTA da empresa
    var cta = el("company-cta");
    if (cta) {
      cta.textContent = CONFIG.hero.cta;
      cta.appendChild(arrowSpan());
      cta.href = waUrl(CONFIG.hero.whatsappMessage);
    }
  }

  // ── Sobre Reginaldo — parte 02 ──────────────────────────────
  function renderAbout() {
    if (!exists("about-title")) return;
    var a = CONFIG.about;
    var p = CONFIG.professional;

    var label = el("about-label");
    if (label) label.textContent = a.label;
    var num = el("about-number");
    if (num) num.textContent = a.eyebrowNumber;
    var et = el("about-eyebrow-text");
    if (et) et.textContent = a.eyebrowText;

    el("about-title").textContent = a.title;
    el("about-body").textContent = a.body;

    var roles = el("about-roles");
    if (roles) {
      roles.innerHTML = "";
      a.roles.forEach(function (r) {
        var li = document.createElement("li");
        var lab = document.createElement("span");
        lab.className = "role-label";
        lab.textContent = r.label;
        var txt = document.createElement("span");
        txt.className = "role-text";
        txt.textContent = r.text;
        li.appendChild(lab);
        li.appendChild(txt);
        roles.appendChild(li);
      });
    }

    var fields = el("about-fields");
    if (fields) {
      fields.innerHTML = "";
      var allFields = (a.fields || []).slice();
      if (p.formation && p.formation.indexOf("[EDITAR") === -1) {
        allFields.push({ label: "Formação", value: p.formation });
      }
      if (p.experience && p.experience.indexOf("[EDITAR") === -1) {
        allFields.push({ label: "Experiência", value: p.experience });
      }
      allFields.forEach(function (f) {
        if (f.value && f.value.indexOf("[EDITAR") === -1) {
          var div = document.createElement("div");
          div.className = "about__field";
          var lab = document.createElement("span");
          lab.className = "about__field-label";
          lab.textContent = f.label;
          var val = document.createElement("span");
          val.className = "about__field-value";
          val.textContent = f.value;
          div.appendChild(lab);
          div.appendChild(val);
          fields.appendChild(div);
        }
      });
    }

    var emailLabel = el("about-email-label");
    if (emailLabel) emailLabel.textContent = a.emailLabel;
    var email = el("about-email");
    if (email) {
      email.textContent = p.email;
      email.href = "mailto:" + p.email;
    }

    var cap = el("about-caption");
    // Populate mini biography
    var mini = el("about-mini-bio");
    if (mini) {
      var mb = CONFIG.about.miniBio || {};
      var miniHtml = '';
      if (mb.kicker) miniHtml += '<p class="kicker kicker--light">' + mb.kicker + '</p>';
      if (mb.title) miniHtml += '<h3 class="about__mini-title">' + mb.title + '</h3>';
      if (mb.text) miniHtml += '<p class="about__mini-text">' + mb.text + '</p>';
      mini.innerHTML = miniHtml;
    }
    if (cap) {
      var nameStr = (p.name || "Reginaldo Guedes").toUpperCase();
      if (cap.tagName.toLowerCase() === "textpath") {
        cap.textContent = nameStr + " • " + nameStr + " • ";
      } else {
        cap.textContent = p.name;
      }
    }
    var fn = el("about-frame-note");
    if (fn) fn.textContent = p.frameNote;
    var areasEl = el("about-areas");
    if (areasEl && a.areas) { areasEl.textContent = a.areas.join(" · "); }

    var photoPath = p.aboutPhoto || p.photo || "public/images/reguinaldo1.png";
    setPhoto("about-photo", photoPath, p.photoAlt || "Reginaldo Guedes", "Reginaldo Guedes", "about__img");
  }

  // ── Serviços ─────────────────────────────────────────────────
  function renderServices() {
    var holder = el("services-list");
    if (!holder) return;
    var s = CONFIG.services;

    var label = el("services-label");
    if (label) label.textContent = s.label;
    var title = el("services-title");
    if (title) title.textContent = s.title;
    var sub = el("services-subtitle");
    if (sub) sub.textContent = s.subtitle;

    holder.innerHTML = "";
    var limit = parseInt(holder.dataset.limit || "0", 10);
    var items = limit > 0 ? s.items.slice(0, limit) : s.items;

    items.forEach(function (item, i) {
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

      holder.appendChild(row);
    });

    // Contador editorial "11 serviços" se existir
    var count = el("services-count");
    if (count) count.textContent = String(s.items.length).padStart(2, "0");
  }

  function serviceCta(item) {
    var link = document.createElement("a");
    link.className = "service-cta glow-btn";
    link.href = waUrl(item.whatsappMessage);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", CONFIG.services.ctaLabel + " — " + item.name);
    link.textContent = CONFIG.services.ctaLabel + " ";
    var arrow = arrowSvg();
    arrow.setAttribute("aria-hidden", "true");
    // seta com → textual para leitura simples + svg
    var arrowText = document.createElement("span");
    arrowText.setAttribute("aria-hidden", "true");
    arrowText.textContent = "→";
    arrowText.style.marginLeft = "2px";
    link.appendChild(arrowText);
    return link;
  }

  // ── Como funciona ────────────────────────────────────────────
  function renderProcess() {
    if (!exists("process-steps")) return;
    var pr = CONFIG.process;
    var label = el("process-label");
    if (label) label.textContent = pr.label;
    var title = el("process-title");
    if (title) title.textContent = pr.title;
    var note = el("process-note");
    if (note) note.textContent = pr.note;

    var steps = el("process-steps");
    steps.innerHTML = "";
    pr.steps.forEach(function (step, i) {
      var div = document.createElement("div");
      div.className = "process-step";

      var number = document.createElement("span");
      number.className = "process-step__number";
      number.textContent = String(i + 1).padStart(2, "0");
      div.appendChild(number);

      var t = document.createElement("h3");
      t.className = "process-step__title";
      t.textContent = step.title;
      div.appendChild(t);

      var d = document.createElement("p");
      d.className = "process-step__desc";
      d.textContent = step.description;
      div.appendChild(d);

      steps.appendChild(div);
    });
  }

  // ── Home: capa editorial da Assessoria Company ───────────────
  // Frase principal = CONFIG.hero.subtitle (preservada exatamente como está).
  function renderHome() {
    if (!exists("home-title")) return;
    var c = CONFIG.company;
    var h = CONFIG.home || {};
    var hero = CONFIG.hero;

    var eyebrow = el("home-eyebrow");
    if (eyebrow) eyebrow.textContent = h.eyebrow || (c.name + " · Desde " + c.foundedYear);

    // Título a partir do nome da empresa: primeira palavra em romano, resto em itálico
    var title = el("home-title");
    if (title) {
      title.innerHTML = "";
      var parts = String(c.name).split(" ");
      var first = document.createTextNode(parts[0] + " ");
      var rest = document.createElement("em");
      rest.textContent = parts.slice(1).join(" ");
      title.appendChild(first);
      title.appendChild(rest);
    }

    var phrase = el("home-phrase");
    if (phrase) phrase.textContent = hero.subtitle;

    var explore = el("home-explore");
    if (explore) explore.textContent = h.exploreLine || "";

    var ctaA = el("home-cta-empresa");
    if (ctaA && h.ctaPrimary) {
      ctaA.textContent = h.ctaPrimary.label;
      ctaA.appendChild(arrowSpan());
      ctaA.href = h.ctaPrimary.href;
    }
    var ctaB = el("home-cta-servicos");
    if (ctaB && h.ctaSecondary) {
      ctaB.textContent = h.ctaSecondary.label;
      ctaB.href = h.ctaSecondary.href;
    }

    var idx = el("home-index-label");
    if (idx) idx.textContent = h.indexLabel || "Explore";
  }

  // ── Contato e rodapé ─────────────────────────────────────────
  function renderContact() {
    if (exists("contact-title")) {
      var c = CONFIG.contact;
      var p = CONFIG.professional;

      var label = el("contact-label");
      if (label) label.textContent = c.label;
      el("contact-title").textContent = c.title;
      var sub = el("contact-subtitle");
      if (sub) sub.textContent = c.subtitle;

      var cta = el("contact-cta");
      if (cta) {
        cta.textContent = c.cta;
        cta.appendChild(arrowSpan());
        cta.href = waUrl(c.whatsappMessage);
      }

      var email = el("contact-email");
      if (email) {
        email.textContent = p.email;
        email.href = "mailto:" + p.email;
      }

      var sign = el("contact-sign");
      if (sign) sign.textContent = p.name + " — " + p.title;
    }

    // Página de contato dedicada (/contato): canais editoriais.
    // O número de WhatsApp nunca é exibido — só o link com mensagem pronta.
    if (exists("contact-whatsapp-card") || exists("contact-email-card")) {
      var c = CONFIG.contact;
      var p = CONFIG.professional;
      var waCard = el("contact-whatsapp-card");
      if (waCard) waCard.href = waUrl(c.whatsappMessage);
      var waNote = el("contact-whatsapp-note");
      if (waNote) waNote.textContent = "Atendimento direto com Reginaldo, sem compromisso.";
      var mailto = "mailto:" + p.email + "?subject=" + encodeURIComponent("Orçamento — apoio acadêmico");
      var emAddr = el("contact-email-address");
      if (emAddr) {
        emAddr.textContent = p.email;
        emAddr.href = mailto;
      }
      var emCard = el("contact-email-card");
      if (emCard) emCard.href = mailto;
    }

    var ft = el("footer-text");
    if (ft) ft.textContent = CONFIG.footer.text;
    // Home: sem número exposto. Demais páginas: crédito limpo, sem número.
    var fc = el("footer-credit");
    if (fc) fc.textContent = CONFIG.footer.credit;

    // Rodapé institucional rico (todas as páginas)
    var fco = el("footer-company");
    if (fco) fco.textContent = CONFIG.company.name;
    var fpro = el("footer-pro");
    if (fpro) fpro.textContent = CONFIG.professional.name + " · " + CONFIG.professional.title + " · " + CONFIG.company.name;
    var fnav = el("footer-nav");
    if (fnav) {
      fnav.innerHTML = "";
      CONFIG.nav.forEach(function (item) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = item.href;
        a.textContent = item.label;
        if (document.body && document.body.dataset.page === item.page) {
          a.setAttribute("aria-current", "page");
          a.classList.add("active");
        }
        li.appendChild(a);
        fnav.appendChild(li);
      });
    }
    var fwa = el("footer-whatsapp");
    if (fwa) {
      fwa.textContent = "Falar no WhatsApp";
      fwa.href = waUrl(CONFIG.contact.whatsappMessage);
    }
    var fem = el("footer-email");
    if (fem) {
      fem.textContent = CONFIG.professional.email;
      fem.href = "mailto:" + CONFIG.professional.email;
    }

    // Ano dinâmico no rodapé, se houver
    var fy = el("footer-year");
    if (fy) fy.textContent = String(new Date().getFullYear());
  }

  // ── Transição sutil entre páginas ────────────────────────────
  function initPageTransition() {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.body.classList.add("is-loaded");
      });
    });

    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    document.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest('a[href$=".html"]') : null;
      if (!a) return;
      var href = a.getAttribute("href");
      if (!href || href.indexOf("#") !== -1) return;
      if (a.target === "_blank") return;
      // Mesma página + âncora interna (ex.: empresa.html#reginaldo): transição não necessária
      var current = window.location.pathname.split("/").pop() || "index.html";
      var dest = href.split("/").pop().split("#")[0];
      if (dest === current && href.indexOf("#") !== -1) return;
      if (dest === current) return;
      e.preventDefault();
      document.body.classList.add("is-leaving");
      setTimeout(function () { window.location.href = href; }, 220);
    });
  }

  // ── Scroll: fundo do nav ─────────────────────────────────────
  function initScroll() {
    var nav = el("nav");
    if (!nav) return;
    function onScroll() {
      nav.classList.toggle("nav--solid", window.scrollY > 20);
    }
    onScroll();
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { onScroll(); ticking = false; });
    }, { passive: true });
  }

  // ── Reveal ao rolar ──────────────────────────────────────────
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el2) { el2.classList.add("reveal--visible"); });
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
    items.forEach(function (elm) { observer.observe(elm); });
  }

  function initGlow() {
    var targets = document.querySelectorAll(".glow-btn");
    targets.forEach(function (elm) {
      elm.addEventListener("pointermove", function (e) {
        var rect = elm.getBoundingClientRect();
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
        elm.style.setProperty("--edge-proximity", edge.toFixed(3));
        elm.style.setProperty("--cursor-angle", angle.toFixed(3) + "deg");
      });
      elm.addEventListener("pointerleave", function () {
        elm.style.setProperty("--edge-proximity", "0");
      });
    });
  }

  function initGlare() {
    var targets = document.querySelectorAll(".btn, .service-cta");
    targets.forEach(function (elm) {
      if (elm.querySelector(":scope > .btn-glare")) return;
      var computed = window.getComputedStyle(elm);
      if (computed.position === "static") { elm.style.position = "relative"; }
      var glare = document.createElement("span");
      glare.className = "btn-glare";
      glare.setAttribute("aria-hidden", "true");
      elm.insertBefore(glare, elm.firstChild);

      function updateSpotlight(clientX, clientY) {
        var rect = elm.getBoundingClientRect();
        var x = ((clientX - rect.left) / rect.width) * 100;
        var y = ((clientY - rect.top) / rect.height) * 100;
        glare.style.setProperty("--glare-x", x.toFixed(1) + "%");
        glare.style.setProperty("--glare-y", y.toFixed(1) + "%");
      }
      function triggerSweep() {
        glare.classList.remove("is-glaring");
        void glare.offsetWidth;
        glare.classList.add("is-glaring");
      }
      elm.addEventListener("pointerenter", function (e) {
        if (e.pointerType === "touch") return;
        updateSpotlight(e.clientX, e.clientY);
        triggerSweep();
      });
      elm.addEventListener("pointermove", function (e) {
        if (e.pointerType === "touch") return;
        updateSpotlight(e.clientX, e.clientY);
      });
      elm.addEventListener("pointerleave", function () {
        glare.classList.remove("is-glaring");
      });
      elm.addEventListener("focus", function () {
        glare.style.setProperty("--glare-x", "50%");
        glare.style.setProperty("--glare-y", "50%");
        triggerSweep();
      });
      elm.addEventListener("touchstart", function () {
        glare.style.setProperty("--glare-x", "50%");
        glare.style.setProperty("--glare-y", "50%");
        triggerSweep();
      }, { passive: true });
    });
  }

  function initClickSpark() {
    var sparkColor = "#EB9440";
    var sparkSize = 10;
    var sparkRadius = 15;
    var sparkCount = 8;
    var duration = 400;
    var targets = document.querySelectorAll(".btn, .service-cta, .spark-btn");
    targets.forEach(function (elm) {
      if (elm.querySelector(":scope > .spark-canvas")) return;
      elm.classList.add("spark-btn");
      var computed = window.getComputedStyle(elm);
      if (computed.position === "static") { elm.style.position = "relative"; }
      var canvas = document.createElement("canvas");
      canvas.className = "spark-canvas";
      elm.appendChild(canvas);
      var ctx = canvas.getContext("2d");
      function resize() {
        var w = Math.ceil(elm.offsetWidth) || Math.ceil(elm.getBoundingClientRect().width);
        var h = Math.ceil(elm.offsetHeight) || Math.ceil(elm.getBoundingClientRect().height);
        if (w > 0) canvas.width = w;
        if (h > 0) canvas.height = h;
      }
      resize();
      window.addEventListener("resize", resize);
      setTimeout(resize, 100);
      setTimeout(resize, 500);
      if (document.fonts && document.fonts.ready) { document.fonts.ready.then(resize); }
      var sparks = [];
      var drawing = false;
      function easeOut(t) { return t * (2 - t); }
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
        if (sparks.length > 0) { requestAnimationFrame(draw); }
        else { drawing = false; ctx.clearRect(0, 0, canvas.width, canvas.height); }
      }
      elm.addEventListener("click", function (e) {
        resize();
        var rect = elm.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        if (!e.clientX && !e.clientY) { x = rect.width / 2; y = rect.height / 2; }
        var now = performance.now();
        for (var i = 0; i < sparkCount; i++) {
          sparks.push({ x: x, y: y, angle: (2 * Math.PI * i) / sparkCount, start: now });
        }
        if (!drawing) requestAnimationFrame(draw);
      });
    });
  }

  // ── Fundo abstrato editorial (sem objetos literais) ──
  // Composição própria com círculos, arcos e luz — sem capelo/diploma.
  function initVerdeAcademico() {
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Palcos escuros: composição completa. Seções claras: blueprint esmaecido.
    var darkTargets = document.querySelectorAll(".cover, .contact, body[data-page='empresa'] .page-hero, body[data-page='processo'] .page-hero, .home-final");
    var faintTargets = document.querySelectorAll(".services--page, .process--page, .company");
    if (!darkTargets.length && !faintTargets.length) return;

    var techSvg = '<svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<circle cx="545" cy="230" r="205" stroke="#EB9440" stroke-opacity="0.5" stroke-width="1.5"/>' +
      '<circle cx="545" cy="230" r="155" stroke="#F5EEDF" stroke-opacity="0.28" stroke-width="1" stroke-dasharray="3 7"/>' +
      '<circle cx="545" cy="230" r="108" stroke="#EB9440" stroke-opacity="0.42" stroke-width="1.2"/>' +
      '<circle cx="545" cy="230" r="62" stroke="#F5EEDF" stroke-opacity="0.2" stroke-width="1"/>' +
      '<path d="M545 5 V455 M320 230 H770" stroke="#F5EEDF" stroke-opacity="0.14" stroke-width="1"/>' +
      '<path d="M360 420 A250 250 0 0 1 700 120" stroke="#C96A2B" stroke-opacity="0.55" stroke-width="1.5"/>' +
      '<circle cx="545" cy="230" r="4" fill="#EB9440"/>' +
      '<g stroke="#EB9440" stroke-opacity="0.6" stroke-width="1.5"><path d="M120 480 h24 M132 468 v24"/><path d="M690 480 h24 M702 468 v24"/></g>' +
      '<g font-family="monospace" font-size="13" fill="#F5EEDF" fill-opacity="0.35"><text x="118" y="508">ACAD 01</text><text x="648" y="508">2022</text></g>' +
      '<circle cx="180" cy="140" r="2.5" fill="#C8A15A" fill-opacity="0.9"/><circle cx="730" cy="330" r="2.5" fill="#C8A15A" fill-opacity="0.9"/>' +
      '</svg>';

    darkTargets.forEach(function (section, idx) {
      if (section.querySelector(":scope > .acad-bg")) return;
      section.style.position = section.style.position || "";
      var comp = window.getComputedStyle(section);
      if (comp.position === "static") section.style.position = "relative";
      if (window.getComputedStyle(section).overflow === "visible") section.style.overflow = "hidden";

      var bg = document.createElement("div");
      bg.className = "acad-bg";
      bg.setAttribute("aria-hidden", "true");

      var isCover = section.classList.contains("cover");
      var isLight = section.classList.contains("page-hero") && (document.body.dataset.page === "servicos" || document.body.dataset.page === "contato");
      // Hero de /contato segue a direção da página: só luzes estáticas,
      // sem círculos orbitais, linhas, grão ou parallax.
      var isCleanHero = section.classList.contains("page-hero") && document.body.dataset.page === "contato";
      var isClean = isCover || isCleanHero;
      var density = section.classList.contains("contact") ? "full" : "soft";
      var techCls = density === "full" ? "acad-tech" : "acad-tech acad-tech--soft";

      // Cover limpo: só luzes estáticas — sem tech, linhas, grão ou parallax.
      bg.innerHTML =
        '<span class="acad-bg__glow acad-bg__glow--gold"></span>' +
        '<span class="acad-bg__glow acad-bg__glow--green"></span>' +
        '<span class="acad-bg__glow acad-bg__glow--orange"></span>' +
        (isClean ? "" : '<span class="acad-lines"></span>') +
        (isClean ? "" : '<div class="' + techCls + (density === "full" ? " acad-tech--spin" : "") + '" data-acad="-10">' + techSvg + "</div>") +
        (density === "full" ? '<span class="acad-grain"></span>' : "");

      section.insertBefore(bg, section.firstChild);

      if (isLight) {
        bg.style.opacity = "0.32";
        bg.style.filter = "saturate(1.05)";
      }

      if (!isClean && !reduce && window.matchMedia && window.matchMedia("(pointer: fine)").matches) {
        attachAcadParallax(section, bg);
      }
    });

    // Seções claras: véu técnico esmaecido, sem capelo para preservar leitura
    faintTargets.forEach(function (section) {
      if (section.querySelector(":scope > .acad-faint")) return;
      var comp = window.getComputedStyle(section);
      if (comp.position === "static") section.style.position = "relative";
      var veil = document.createElement("div");
      veil.className = "acad-faint";
      veil.setAttribute("aria-hidden", "true");
      section.insertBefore(veil, section.firstChild);
    });
  }

  function attachAcadParallax(section, bg) {
    var figs = Array.prototype.slice.call(bg.querySelectorAll("[data-acad]"));
    var glows = Array.prototype.slice.call(bg.querySelectorAll(".acad-bg__glow"));
    var tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;

    function loop() {
      raf = 0;
      cx += (tx - cx) * 0.055;
      cy += (ty - cy) * 0.055;
      figs.forEach(function (f) {
        var d = parseFloat(f.getAttribute("data-acad")) || 12;
        f.style.translate = (cx * d).toFixed(2) + "px " + (cy * d).toFixed(2) + "px";
      });
      glows.forEach(function (g, i) {
        var gd = (i + 1) * 8;
        g.style.translate = ((-cx * gd).toFixed(2)) + "px " + ((-cy * gd).toFixed(2)) + "px";
      });
      if (Math.abs(tx - cx) > 0.0004 || Math.abs(ty - cy) > 0.0004) raf = requestAnimationFrame(loop);
    }
    function kick() { if (!raf) raf = requestAnimationFrame(loop); }

    section.addEventListener("pointermove", function (e) {
      var r = section.getBoundingClientRect();
      tx = Math.max(-0.5, Math.min(0.5, (e.clientX - (r.left + r.width / 2)) / r.width));
      ty = Math.max(-0.5, Math.min(0.5, (e.clientY - (r.top + r.height / 2)) / r.height));
      kick();
    });
    section.addEventListener("pointerleave", function () { tx = 0; ty = 0; kick(); });
  }

  // ── Emblema 3D da Home: inspeção por arrasto (objeto ancorado) ───────
  // Sensação: segurar e examinar a marca. A logo NÃO se desloca pela página
  // (sem translate) — só a orientação muda (rotateX/rotateY), com momentum
  // ao soltar. render() é a ÚNICA fonte do transform final: nenhum CSS :hover
  // toca em transform, para as animações nunca brigarem entre si.
  var EMBLEM3D = {
    sensX: 0.22,        // graus de rotateY por px arrastado (horizontal)
    sensY: 0.18,        // graus de rotateX por px arrastado (vertical)
    clampX: 38,         // limite de rotateX (deg) — marca sempre legível
    clampY: 60,         // limite de rotateY (deg) — amplitude maior, controlada
    momentum: 0.94,     // desaceleração progressiva do giro após soltar
    returnEase: 0.08,   // retorno suave ao repouso após o momentum
    hoverTilt: 5,       // inclinação máxima do tilt de hover (deg)
    hoverScale: 1.015,  // escala discreta no hover
    holdScale: 1.02,    // escala discreta durante a inspeção
    shadowShift: 0.35,  // deslocamento da sombra por grau de rotação (px/deg)
    idleDelay: 2600,    // ms parado até a micro-oscilação de repouso voltar
    idleAmp: 2.2,       // amplitude da micro-oscilação de repouso (deg)
    idlePeriod: 7000,   // período da micro-oscilação (ms)
    flingMin: 0.15      // velocidade mínima (deg/frame) para gerar momentum
  };

  function initEmblem() {
    var root = el("emblem");
    if (!root) return;
    var tiltEl = root.querySelector(".emblem__tilt");
    if (!tiltEl) return;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var rotX = 0, rotY = 0;     // orientação atual (deg) — a logo fica ancorada
    var velX = 0, velY = 0;     // velocidade angular (deg/frame)
    var tRotX = 0, tRotY = 0;   // alvo do hover; repouso = neutro (0, 0)
    var scale = 1, tScale = 1;
    var dragging = false, hovering = false, gliding = false;
    var lastX = 0, lastY = 0;
    var raf = 0, idleTimer = 0, idleT0 = 0;

    function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

    // ÚNICA fonte de transformação: toda atualização passa por aqui.
    function render(now) {
      var ix = 0, iy = 0;
      if (!dragging && !gliding && !hovering && !reduce && idleT0) {
        var t = ((now || performance.now()) - idleT0) / EMBLEM3D.idlePeriod;
        ix = Math.sin(t * Math.PI * 2) * EMBLEM3D.idleAmp;
        iy = Math.cos(t * Math.PI * 2 * 0.7) * EMBLEM3D.idleAmp;
      }
      tiltEl.style.transform =
        "rotateX(" + (rotX + ix).toFixed(2) + "deg)" +
        " rotateY(" + (rotY + iy).toFixed(2) + "deg)" +
        " scale(" + scale.toFixed(4) + ")";
      // Sombra dinâmica: desloca-se contra a inclinação (profundidade).
      tiltEl.style.setProperty("--shx", (-(rotY + iy) * EMBLEM3D.shadowShift).toFixed(1) + "px");
      tiltEl.style.setProperty("--shy", ((rotX + ix) * EMBLEM3D.shadowShift * 0.6).toFixed(1) + "px");
    }

    function kick() { if (!raf) raf = requestAnimationFrame(loop); }
    function stop() { if (raf) { cancelAnimationFrame(raf); raf = 0; } }

    function wake() {
      idleT0 = 0;
      if (idleTimer) { clearTimeout(idleTimer); idleTimer = 0; }
    }

    function rest() {
      if (reduce) return;
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(function () {
        idleTimer = 0;
        if (!dragging && !gliding && !hovering) {
          idleT0 = performance.now();
          kick();
        }
      }, EMBLEM3D.idleDelay);
    }

    function loop(now) {
      raf = 0;
      if (dragging) {
        // Durante o arrasto o pointermove atualiza rotX/rotY; aqui só a
        // escala converge e o frame é renderizado pela fonte única.
        scale += (tScale - scale) * 0.15;
        render(now);
        kick();
        return;
      }
      if (gliding) {
        // Momentum: continua girando com a velocidade acumulada e desacelera.
        rotX = clamp(rotX + velX, -EMBLEM3D.clampX, EMBLEM3D.clampX);
        rotY = clamp(rotY + velY, -EMBLEM3D.clampY, EMBLEM3D.clampY);
        velX *= EMBLEM3D.momentum;
        velY *= EMBLEM3D.momentum;
        if (Math.abs(velX) < 0.02 && Math.abs(velY) < 0.02) {
          gliding = false; // momentum esgotado → retorno suave ao repouso
          tRotX = 0; tRotY = 0;
        }
      } else {
        rotX += (tRotX - rotX) * EMBLEM3D.returnEase;
        rotY += (tRotY - rotY) * EMBLEM3D.returnEase;
        if (Math.abs(tRotX - rotX) < 0.02) rotX = tRotX;
        if (Math.abs(tRotY - rotY) < 0.02) rotY = tRotY;
      }
      scale += (tScale - scale) * 0.12;
      render(now);
      var settled = !gliding &&
        rotX === tRotX && rotY === tRotY && Math.abs(tScale - scale) < 0.0005;
      if (!settled) {
        kick();
      } else {
        scale = tScale;
        render(now);
        rest();
      }
    }

    function sheen(e) {
      var r = root.getBoundingClientRect();
      if (!r.width || !r.height) return;
      var mx = ((e.clientX - r.left) / r.width) * 100;
      var my = ((e.clientY - r.top) / r.height) * 100;
      tiltEl.style.setProperty("--mx", clamp(mx, 0, 100).toFixed(1) + "%");
      tiltEl.style.setProperty("--my", clamp(my, 0, 100).toFixed(1) + "%");
    }

    root.addEventListener("dragstart", function (e) { e.preventDefault(); });

    root.addEventListener("pointerdown", function (e) {
      if (e.button !== undefined && e.button !== 0) return;
      dragging = true;
      gliding = false;
      wake();
      stop();
      root.classList.add("is-held");
      lastX = e.clientX;
      lastY = e.clientY;
      velX = 0; velY = 0;
      tScale = EMBLEM3D.holdScale;
      // Captura só no mouse: no touch a captura bloquearia o scroll da página.
      if (e.pointerType === "mouse") {
        try { root.setPointerCapture(e.pointerId); } catch (_) {}
      }
      sheen(e);
      kick();
    });

    root.addEventListener("pointermove", function (e) {
      sheen(e);
      if (dragging) {
        // Inspeção: horizontal → rotateY, vertical → rotateX. Sem translate.
        var dx = e.clientX - lastX;
        var dy = e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;
        rotY = clamp(rotY + dx * EMBLEM3D.sensX, -EMBLEM3D.clampY, EMBLEM3D.clampY);
        rotX = clamp(rotX - dy * EMBLEM3D.sensY, -EMBLEM3D.clampX, EMBLEM3D.clampX);
        velY = velY * 0.6 + dx * EMBLEM3D.sensX * 0.4;
        velX = velX * 0.6 + (-dy) * EMBLEM3D.sensY * 0.4;
      } else if (hovering && e.pointerType !== "touch" && e.buttons === 0) {
        // Hover é secundário: tilt pequeno que sinaliza "segurável".
        var r = root.getBoundingClientRect();
        if (r.width && r.height) {
          var relX = (e.clientX - r.left) / r.width - 0.5;
          var relY = (e.clientY - r.top) / r.height - 0.5;
          tRotX = clamp(-relY * 2, -1, 1) * EMBLEM3D.hoverTilt;
          tRotY = clamp(relX * 2, -1, 1) * EMBLEM3D.hoverTilt;
          kick();
        }
      }
    });

    function release(e, isCancel) {
      if (!dragging) return;
      dragging = false;
      root.classList.remove("is-held");
      tScale = hovering ? EMBLEM3D.hoverScale : 1;
      if (reduce || isCancel || (Math.abs(velX) < EMBLEM3D.flingMin && Math.abs(velY) < EMBLEM3D.flingMin)) {
        // Sem momentum: soltura lenta, scroll interrompido ou movimento reduzido.
        velX = 0; velY = 0;
        gliding = false;
        tRotX = 0; tRotY = 0;
      } else {
        gliding = true; // soltura rápida → continua girando e desacelera
        tRotX = 0; tRotY = 0;
      }
      kick();
    }

    root.addEventListener("pointerup", function (e) { release(e, false); });
    root.addEventListener("pointercancel", function (e) { release(e, true); });

    root.addEventListener("pointerenter", function (e) {
      if (e.pointerType === "touch") return;
      hovering = true;
      wake();
      if (!dragging) {
        tScale = EMBLEM3D.hoverScale;
        kick();
      }
    });

    root.addEventListener("pointerleave", function () {
      hovering = false;
      if (dragging) return;
      tRotX = 0; tRotY = 0;
      tScale = 1;
      kick();
    });

    // Teclado: a marca também pode ser inspecionada sem ponteiro.
    root.addEventListener("keydown", function (e) {
      var step = 6, handled = true;
      wake();
      switch (e.key) {
        case "ArrowLeft": rotY = clamp(rotY - step, -EMBLEM3D.clampY, EMBLEM3D.clampY); break;
        case "ArrowRight": rotY = clamp(rotY + step, -EMBLEM3D.clampY, EMBLEM3D.clampY); break;
        case "ArrowUp": rotX = clamp(rotX - step, -EMBLEM3D.clampX, EMBLEM3D.clampX); break;
        case "ArrowDown": rotX = clamp(rotX + step, -EMBLEM3D.clampX, EMBLEM3D.clampX); break;
        case "Home": case "0": rotX = 0; rotY = 0; tRotX = 0; tRotY = 0; break;
        default: handled = false;
      }
      if (handled) { e.preventDefault(); gliding = false; kick(); rest(); }
    });

    // Repouso inicial: micro-oscilação quase imperceptível (só sem reduce).
    if (!reduce) {
      idleT0 = performance.now();
      kick();
    } else {
      render(performance.now());
    }
  }

  // ── Init ─────────────────────────────────────────────────────
  function init() {
    renderNav();
    renderHero();
    renderStatement();
    renderCompany();
    renderAbout();
    renderServices();
    renderProcess();
    renderHome();
    renderContact();
    initVerdeAcademico();
    initEmblem();
    initScroll();
    initReveal();
    initGlow();
    initGlare();
    initClickSpark();
    initPageTransition();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
