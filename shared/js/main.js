(() => {
  const LS = { cart: "femalea:cart", lang: "femalea:lang", wish: "femalea:wish" };
  const read = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
  };

  let lang = read(LS.lang, "pt");
  let cart = read(LS.cart, []);
  const wish = new Set(read(LS.wish, []));

  const THEME = window.FA_THEME || {};
  const HOOKS = window.FA_HOOKS || [];
  const page = document.body.dataset.page;
  const params = new URLSearchParams(location.search);

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const t = (k) => STR[lang]?.[k] ?? STR.pt[k] ?? k;
  const L = (obj) => (obj ? obj[lang] ?? obj.pt : "");
  const money = (v) =>
    new Intl.NumberFormat(lang === "pt" ? "pt-BR" : "en-US", { style: "currency", currency: "BRL" }).format(v);
  const icon = (name, cls = "") => `<svg class="icon ${cls}" aria-hidden="true"><use href="#i-${name}"></use></svg>`;
  const getProduct = (id) => PRODUCTS.find((p) => p.id === id);
  const installments = (price) => {
    const n = Math.max(1, Math.min(6, Math.floor(price / 20)));
    return t("installments").replace("{n}", n).replace("{v}", money(price / n));
  };
  const stars = (r) =>
    `<span class="stars" aria-label="${r} / 5">${Array.from({ length: 5 }, (_, i) =>
      icon("star", `icon--fill${i < Math.round(r) ? "" : " is-off"}`)
    ).join("")}</span>`;

  /* ---------- Ícones (sprite inline para funcionar via file://) ---------- */
  const SPRITE = `
  <svg xmlns="http://www.w3.org/2000/svg" style="display:none">
    <symbol id="i-diamond" viewBox="0 0 24 24"><path d="M6.5 4h11l4 5-9.5 11.5L2.5 9z"/><path d="M2.5 9h19"/><path d="M9 4 7.5 9 12 20.5 16.5 9 15 4"/><path d="M7.5 9 12 4l4.5 5"/></symbol>
    <symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></symbol>
    <symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4.5 20.5c.8-3.6 3.8-5.5 7.5-5.5s6.7 1.9 7.5 5.5"/></symbol>
    <symbol id="i-bag" viewBox="0 0 24 24"><path d="M5 8h14l-1.2 12.5H6.2z"/><path d="M9 10.5V6.5a3 3 0 0 1 6 0v4"/></symbol>
    <symbol id="i-heart" viewBox="0 0 24 24"><path d="M12 20s-7.5-4.6-9-9.6C2 6.9 4.4 4.5 7.2 4.5c2 0 3.6 1.1 4.8 2.8 1.2-1.7 2.8-2.8 4.8-2.8 2.8 0 5.2 2.4 4.2 5.9-1.5 5-9 9.6-9 9.6z"/></symbol>
    <symbol id="i-menu" viewBox="0 0 24 24"><path d="M3 7h18M3 12h18M3 17h11"/></symbol>
    <symbol id="i-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></symbol>
    <symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></symbol>
    <symbol id="i-minus" viewBox="0 0 24 24"><path d="M5 12h14"/></symbol>
    <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M3.5 12h17M14.5 6l6 6-6 6"/></symbol>
    <symbol id="i-chevron" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></symbol>
    <symbol id="i-chevron-down" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></symbol>
    <symbol id="i-star" viewBox="0 0 24 24"><path d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z"/></symbol>
    <symbol id="i-truck" viewBox="0 0 24 24"><path d="M2.5 6.5h11v10h-11zM13.5 9.5h4l3 3.2v3.8h-7"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/></symbol>
    <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3 19.5 6v5.5c0 4.6-3.2 8.2-7.5 9.5-4.3-1.3-7.5-4.9-7.5-9.5V6z"/><path d="m8.8 12 2.2 2.2 4.2-4.4"/></symbol>
    <symbol id="i-leaf" viewBox="0 0 24 24"><path d="M5 19.5C4.5 10 10 4.5 20 4.5c0 10-5.5 15.5-15 15z"/><path d="M5 19.5 13 11.5"/></symbol>
    <symbol id="i-sparkle" viewBox="0 0 24 24"><path d="M12 2.5c.6 5 2.5 7 7.5 7.5-5 .6-6.9 2.5-7.5 7.5-.6-5-2.5-6.9-7.5-7.5 5-.5 6.9-2.5 7.5-7.5z"/><path d="M19 16.5c.2 1.6.9 2.3 2.5 2.5-1.6.2-2.3.9-2.5 2.5-.2-1.6-.9-2.3-2.5-2.5 1.6-.2 2.3-.9 2.5-2.5z"/></symbol>
    <symbol id="i-drop" viewBox="0 0 24 24"><path d="M12 3s6.5 7.2 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 10.2 12 3 12 3z"/><path d="M9 15a3 3 0 0 0 3 3"/></symbol>
    <symbol id="i-gift" viewBox="0 0 24 24"><path d="M3.5 8.5h17v4h-17zM5 12.5h14v8H5zM12 8.5v12"/><path d="M12 8.5C10.5 4.5 6.5 4 6.5 6.5c0 1.4 2 2 5.5 2zM12 8.5c1.5-4 5.5-4.5 5.5-2 0 1.4-2 2-5.5 2z"/></symbol>
    <symbol id="i-check" viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></symbol>
    <symbol id="i-trash" viewBox="0 0 24 24"><path d="M4 7h16M9.5 7V4.5h5V7M6 7l1 13.5h10L18 7"/></symbol>
    <symbol id="i-lock" viewBox="0 0 24 24"><rect x="5" y="10.5" width="14" height="10" rx="1.5"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/></symbol>
    <symbol id="i-return" viewBox="0 0 24 24"><path d="M4.5 12a7.5 7.5 0 1 0 2.3-5.4"/><path d="M4.5 3.5v4h4"/></symbol>
    <symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/></symbol>
    <symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></symbol>
    <symbol id="i-instagram" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".6"/></symbol>
    <symbol id="i-tiktok" viewBox="0 0 24 24"><path d="M14 3.5v11a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3.5c.4 2.6 2.4 4.6 5 5"/></symbol>
    <symbol id="i-whatsapp" viewBox="0 0 24 24"><path d="M4 20.5 5.3 16.6A8.5 8.5 0 1 1 8 19.3z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 .9c-1.2-.5-2.3-1.6-2.8-2.8l.9-1-1-2z"/></symbol>
    <symbol id="i-youtube" viewBox="0 0 24 24"><rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="m10 9 5 3-5 3z"/></symbol>
  </svg>`;

  /* ---------- Componentes compartilhados ---------- */
  const NAV = [
    { key: "shop", href: "produtos.html", cat: "all" },
    { key: "brows", href: "produtos.html?cat=brows", cat: "brows" },
    { key: "lashes", href: "produtos.html?cat=lashes", cat: "lashes" },
    { key: "hair", href: "produtos.html?cat=hair", cat: "hair" },
    { key: "body", href: "produtos.html?cat=body", cat: "body" },
    { key: "kits", href: "produtos.html?cat=kits", cat: "kits" },
  ];
  const navLabel = (n) => (n.key === "shop" ? t("navShop") : L(CATEGORIES[n.key]));
  const isActive = (n) => page === "listing" && (params.get("cat") || "all") === n.cat;

  let announcementTimer;

  function renderHeader() {
    const el = $("#site-header");
    if (!el) return;
    el.innerHTML = `
      <div class="announcement" role="region" aria-label="${t("announcements")}">
        <div class="announcement__track">
          ${["ann1", "ann2", "ann3"].map((k, i) => `<p class="announcement__item${i === 0 ? " is-active" : ""}">${icon("diamond")}${t(k)}</p>`).join("")}
        </div>
      </div>
      <header class="header" id="header">
        <div class="container header__inner">
          <div class="header__left">
            <button class="icon-btn menu-toggle" data-menu-open aria-label="${t("menu")}">${icon("menu")}</button>
            <nav class="nav" aria-label="${t("mainNav")}">
              ${NAV.map((n) => `<a class="nav__link${isActive(n) ? " is-active" : ""}" href="${n.href}">${navLabel(n)}</a>`).join("")}
            </nav>
          </div>
          <a class="header__logo" href="index.html" aria-label="Female A — ${t("home")}">
            <img src="${IMG}logo.png" alt="Female A" width="1216" height="230">
          </a>
          ${THEME.headerSearch ? `
          <form class="header__search" role="search" data-search-form>
            ${icon("search")}
            <input type="search" placeholder="${t("searchPlaceholder")}" aria-label="${t("search")}">
          </form>` : ""}
          <div class="header__actions">
            <div class="lang-switch" role="group" aria-label="${t("language")}">
              <button data-lang="pt" class="${lang === "pt" ? "is-active" : ""}">PT</button>
              <button data-lang="en" class="${lang === "en" ? "is-active" : ""}">EN</button>
            </div>
            <button class="icon-btn hide-mobile" data-demo aria-label="${t("search")}">${icon("search")}</button>
            <button class="icon-btn hide-mobile" data-demo aria-label="${t("account")}">${icon("user")}</button>
            <button class="icon-btn hide-mobile" data-demo aria-label="${t("wishlist")}">${icon("heart")}</button>
            <button class="icon-btn" data-open-cart aria-label="${t("cart")}">${icon("bag")}<span class="cart-count">0</span></button>
          </div>
        </div>
      </header>`;

    clearInterval(announcementTimer);
    const items = $$(".announcement__item", el);
    let idx = 0;
    announcementTimer = setInterval(() => {
      const current = items[idx];
      idx = (idx + 1) % items.length;
      current.classList.remove("is-active");
      current.classList.add("is-leaving");
      items[idx].classList.remove("is-leaving");
      items[idx].classList.add("is-active");
      setTimeout(() => current.classList.remove("is-leaving"), 700);
    }, 4200);
    onScroll();
  }

  function renderOverlays() {
    let el = $("#site-overlays");
    if (!el) {
      el = document.createElement("div");
      el.id = "site-overlays";
      document.body.appendChild(el);
    }
    const drawerOpen = $(".drawer")?.classList.contains("is-open");
    el.innerHTML = `
      <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
        <div class="mobile-menu__overlay" data-menu-close></div>
        <aside class="mobile-menu__panel">
          <div class="mobile-menu__head">
            <img src="${IMG}logo.png" alt="Female A">
            <button class="icon-btn" data-menu-close aria-label="${t("close")}">${icon("close")}</button>
          </div>
          <nav class="mobile-menu__links">
            ${NAV.map((n) => `<a href="${n.href}">${navLabel(n)} ${icon("arrow")}</a>`).join("")}
            <a href="index.html#comunidade">${t("community")} ${icon("arrow")}</a>
          </nav>
          <div class="mobile-menu__foot">
            <span>${t("menuHelp")}</span>
            <div class="socials">
              <a href="https://instagram.com/female_a_global" target="_blank" rel="noopener" aria-label="Instagram">${icon("instagram")}</a>
              <a href="#" aria-label="TikTok">${icon("tiktok")}</a>
              <a href="#" aria-label="WhatsApp">${icon("whatsapp")}</a>
            </div>
          </div>
        </aside>
      </div>

      <div class="drawer${drawerOpen ? " is-open" : ""}" id="cart-drawer" aria-hidden="${!drawerOpen}">
        <div class="drawer__overlay" data-close-cart></div>
        <aside class="drawer__panel" role="dialog" aria-modal="true" aria-label="${t("cart")}">
          <div class="drawer__head">
            <h3>${t("cartTitle")} <small data-cart-qty></small></h3>
            <button class="icon-btn" data-close-cart aria-label="${t("close")}">${icon("close")}</button>
          </div>
          <div class="shipping-bar" data-shipping></div>
          <div class="drawer__body" data-cart-body></div>
          <div class="drawer__foot" data-cart-foot></div>
        </aside>
      </div>

      <div class="toast" id="toast" role="status" aria-live="polite"></div>`;
  }

  function renderFooter() {
    const el = $("#site-footer");
    if (!el) return;
    const col = (title, links) => `
      <div class="footer__col">
        <h4>${title}</h4>
        <ul>${links.map(([label, href]) => `<li><a href="${href}">${label}</a></li>`).join("")}</ul>
      </div>`;
    el.innerHTML = `
      <footer class="footer">
        <div class="container">
          <div class="footer__top">
            <div class="footer__brand">
              <img src="${IMG}${THEME.footerLogo || "logo-tagline-white.png"}" alt="Female A — Global Beauty & Wellness">
              <p>${t("footerAbout")}</p>
              <div class="socials">
                <a href="https://instagram.com/female_a_global" target="_blank" rel="noopener" aria-label="Instagram">${icon("instagram")}</a>
                <a href="#" aria-label="TikTok">${icon("tiktok")}</a>
                <a href="#" aria-label="YouTube">${icon("youtube")}</a>
                <a href="#" aria-label="WhatsApp">${icon("whatsapp")}</a>
              </div>
            </div>
            ${col(t("footerShop"), NAV.map((n) => [navLabel(n), n.href]))}
            ${col(t("footerBrand"), [[t("aboutUs"), "index.html#manifesto"], [t("community"), "index.html#comunidade"], [t("boutique"), "index.html#boutique"], [t("press"), "#"], [t("careers"), "#"]])}
            ${col(t("footerHelp"), [[t("faq"), "#"], [t("shippingPolicy"), "#"], [t("returns"), "#"], [t("trackOrder"), "#"], [t("privacy"), "#"]])}
            <div class="footer__col footer__col--contact">
              <h4>${t("footerContact")}</h4>
              <div class="footer__contact">
                <span>${icon("whatsapp")} +55 (11) 90000-0000</span>
                <span>${icon("mail")} contato@femalea.com</span>
                <span>${icon("pin")} São Paulo · Lisboa · Miami</span>
              </div>
            </div>
          </div>
          <div class="footer__bottom">
            <span>© 2026 Female A · Global Beauty & Wellness. ${t("rights")}</span>
            <div class="payments">
              <span>PIX</span><span>VISA</span><span>MASTERCARD</span><span>ELO</span><span>AMEX</span><span>BOLETO</span>
            </div>
          </div>
        </div>
      </footer>`;
  }

  /* ---------- Card de produto ---------- */
  function productCard(p, extraClass = "") {
    const url = `produto.html?id=${p.id}`;
    const badge = p.badge ? `<span class="badge${p.badgeStyle ? ` badge--${p.badgeStyle}` : ""}">${L(p.badge)}</span>` : "";
    return `
      <article class="product-card reveal ${extraClass}" style="--tint:${TINTS[p.id] || "var(--sand)"}">
        <a class="product-card__media" href="${url}" aria-label="${L(p.name)}">
          ${p.images.map((img) => `<img src="${IMG + img}" alt="${L(p.name)}" loading="lazy">`).join("")}
        </a>
        ${badge}
        <button class="wish-btn${wish.has(p.id) ? " is-active" : ""}" data-wish="${p.id}" aria-label="${t("addWishlist")}">${icon("heart", "icon--sm")}</button>
        <button class="quick-add" data-add="${p.id}" aria-label="${t("addToBag")}: ${L(p.name)}">${icon("bag", "icon--sm")}<span>${t("addToBag")}</span></button>
        <div class="product-card__info">
          <span class="product-card__cat">${L(CATEGORIES[p.cat])}</span>
          <h3 class="product-card__name"><a href="${url}">${L(p.name)}</a></h3>
          <p class="product-card__desc">${L(p.sub)} · ${p.size}</p>
          <div class="product-card__row">
            <span class="price">${p.old ? `<del>${money(p.old)}</del>` : ""}${money(p.price)}</span>
            <span class="rating">${stars(p.rating)} (${p.reviews})</span>
          </div>
          <span class="installments">${installments(p.price)}</span>
        </div>
      </article>`;
  }

  /* ---------- Carrinho ---------- */
  const saveCart = () => localStorage.setItem(LS.cart, JSON.stringify(cart));

  function addToCart(id, qty = 1) {
    const item = cart.find((i) => i.id === id);
    if (item) item.qty += qty;
    else cart.push({ id, qty });
    saveCart();
    renderCart();
    const badge = $(".cart-count");
    badge?.classList.remove("bump");
    void badge?.offsetWidth;
    badge?.classList.add("bump");
    openDrawer();
  }

  function setQty(id, qty) {
    if (qty <= 0) cart = cart.filter((i) => i.id !== id);
    else cart.find((i) => i.id === id).qty = qty;
    saveCart();
    renderCart();
  }

  function renderCart() {
    const items = cart.map((i) => ({ ...i, p: getProduct(i.id) })).filter((i) => i.p);
    const count = items.reduce((a, i) => a + i.qty, 0);
    const subtotal = items.reduce((a, i) => a + i.qty * i.p.price, 0);

    $$(".cart-count").forEach((b) => {
      b.textContent = count;
      b.classList.toggle("has-items", count > 0);
    });

    const qtyEl = $("[data-cart-qty]");
    if (!qtyEl) return;
    qtyEl.textContent = count ? `(${count})` : "";

    const remaining = FREE_SHIPPING - subtotal;
    const pct = Math.min(100, (subtotal / FREE_SHIPPING) * 100);
    $("[data-shipping]").innerHTML = `
      <span>${remaining > 0 ? t("shippingRemaining").replace("{v}", `<strong>${money(remaining)}</strong>`) : `<strong>${t("shippingUnlocked")}</strong>`}</span>
      <div class="shipping-bar__track"><div class="shipping-bar__fill" style="width:${pct}%"></div></div>`;

    const body = $("[data-cart-body]");
    const foot = $("[data-cart-foot]");

    if (!items.length) {
      body.innerHTML = `
        <div class="drawer__empty">
          ${icon("bag")}
          <p>${t("cartEmpty")}</p>
          <a href="produtos.html" class="btn btn--primary">${t("cartEmptyCta")}</a>
        </div>`;
      foot.style.display = "none";
      return;
    }

    const upsell = PRODUCTS.find((p) => !cart.some((i) => i.id === p.id));
    body.innerHTML = `
      ${items.map(({ p, qty }) => `
        <div class="cart-item">
          <a class="cart-item__img" href="produto.html?id=${p.id}"><img src="${IMG + p.images[0]}" alt="${L(p.name)}"></a>
          <div class="cart-item__info">
            <div class="cart-item__top">
              <a class="cart-item__name" href="produto.html?id=${p.id}">${L(p.name)}</a>
              <button class="cart-item__remove" data-cart-remove="${p.id}" aria-label="${t("remove")}">${icon("trash", "icon--sm")}</button>
            </div>
            <span class="cart-item__meta">${L(p.sub)} · ${p.size}</span>
            <div class="cart-item__bottom">
              <div class="qty">
                <button data-cart-dec="${p.id}" aria-label="${t("decrease")}">${icon("minus")}</button>
                <span>${qty}</span>
                <button data-cart-inc="${p.id}" aria-label="${t("increase")}">${icon("plus")}</button>
              </div>
              <span class="price">${money(p.price * qty)}</span>
            </div>
          </div>
        </div>`).join("")}
      ${upsell ? `
        <div class="drawer__upsell">
          <h4>${t("completeRitual")}</h4>
          <div class="upsell-item">
            <img src="${IMG + upsell.images[0]}" alt="${L(upsell.name)}">
            <div><strong>${L(upsell.name)}</strong><span>${money(upsell.price)}</span></div>
            <button data-add="${upsell.id}" data-no-open aria-label="${t("addToBag")}">${icon("plus", "icon--sm")}</button>
          </div>
        </div>` : ""}`;

    foot.style.display = "";
    foot.innerHTML = `
      <div class="drawer__total"><span>${t("subtotal")}</span><strong>${money(subtotal)}</strong></div>
      <p class="drawer__note">${installments(subtotal)} · ${t("pixDiscount")}</p>
      <button class="btn btn--primary btn--block" data-checkout>${t("checkout")} ${icon("arrow", "icon--sm")}</button>
      <span class="drawer__secure">${icon("lock")} ${t("secure")}</span>`;
  }

  function openDrawer() {
    const d = $("#cart-drawer");
    d.classList.add("is-open");
    d.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
  }
  function closeDrawer() {
    const d = $("#cart-drawer");
    d.classList.remove("is-open");
    d.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-locked");
  }
  function toggleMenu(open) {
    const m = $("#mobile-menu");
    m.classList.toggle("is-open", open);
    m.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("is-locked", open);
  }

  let toastTimer;
  function toast(msg) {
    const el = $("#toast");
    el.innerHTML = `${icon("diamond")} ${msg}`;
    el.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-visible"), 2800);
  }

  /* ---------- Idioma ---------- */
  function applyStaticTranslations() {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    $$("[data-i18n]").forEach((el) => {
      if (!("pt" in el.dataset)) el.dataset.pt = el.innerHTML;
      const en = EN[el.dataset.i18n];
      el.innerHTML = lang === "en" && en != null ? en : el.dataset.pt;
    });
    $$("[data-i18n-ph]").forEach((el) => {
      if (!("ptPh" in el.dataset)) el.dataset.ptPh = el.placeholder;
      const en = EN[el.dataset.i18nPh];
      el.placeholder = lang === "en" && en != null ? en : el.dataset.ptPh;
    });
  }

  function setLang(next) {
    if (next === lang) return;
    lang = next;
    localStorage.setItem(LS.lang, JSON.stringify(lang));
    renderAll();
  }

  /* ---------- Reveal ---------- */
  const revealObserver = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        revealObserver.unobserve(e.target);
      }
    }),
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  const observeReveal = () => $$(".reveal:not(.is-visible)").forEach((el) => revealObserver.observe(el));

  function onScroll() {
    $("#header")?.classList.toggle("is-scrolled", window.scrollY > 10);
  }

  /* ---------- Páginas ---------- */
  function renderGrid(selector, ids) {
    const el = $(selector);
    if (el) el.innerHTML = ids.map((id) => productCard(getProduct(id))).join("");
  }

  let countdownTimer;
  function initCountdown() {
    const el = $("[data-countdown]");
    if (!el) return;
    const target = new Date(el.dataset.countdown).getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      const parts = {
        d: Math.floor(diff / 864e5),
        h: Math.floor((diff / 36e5) % 24),
        m: Math.floor((diff / 6e4) % 60),
        s: Math.floor((diff / 1e3) % 60),
      };
      Object.entries(parts).forEach(([k, v]) => {
        const n = $(`[data-cd="${k}"]`, el);
        if (n) n.textContent = String(v).padStart(2, "0");
      });
    };
    clearInterval(countdownTimer);
    tick();
    countdownTimer = setInterval(tick, 1000);
  }

  function renderHome() {
    renderGrid("#bestsellers", ["defining-gel", "growth-elixir", "anti-estrias", "kit-brow"]);
    initCountdown();
  }

  /* Listagem */
  let listingCat = params.get("cat") && CATEGORIES[params.get("cat")] ? params.get("cat") : "all";
  let listingSort = "featured";

  function renderListing() {
    const chips = $("#chips");
    const grid = $("#listing-grid");
    if (!grid) return;

    const cats = ["all", ...Object.keys(CATEGORIES)];
    chips.innerHTML = cats.map((c) => {
      const count = c === "all" ? PRODUCTS.length : PRODUCTS.filter((p) => p.cat === c).length;
      const label = c === "all" ? t("allProducts") : L(CATEGORIES[c]);
      return `<button class="chip${c === listingCat ? " is-active" : ""}" data-chip="${c}">${label}<sup>${count}</sup></button>`;
    }).join("");

    const norm = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const query = norm(params.get("q") || "");
    let list = PRODUCTS.filter((p) => listingCat === "all" || p.cat === listingCat);
    if (query) list = list.filter((p) => norm(`${L(p.name)} ${L(p.sub)} ${L(CATEGORIES[p.cat])}`).includes(query));
    const sorters = {
      featured: (a, b) => a.order - b.order,
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
    };
    list = [...list].sort(sorters[listingSort]);

    const cards = list.map((p) => productCard(p));
    if (listingCat === "all" && listingSort === "featured" && !query && !THEME.noPromoTile) {
      cards.splice(4, 0, `
        <a class="promo-tile reveal" href="produto.html?id=kit-ritual">
          <img src="${IMG}ritual-banner.jpg" alt="" loading="lazy">
          <div class="promo-tile__body">
            <span class="eyebrow eyebrow--line">${t("promoEyebrow")}</span>
            <h3 class="display h3">${t("promoTitle")}</h3>
            <span class="btn btn--light">${t("promoCta")} ${icon("arrow", "icon--sm")}</span>
          </div>
        </a>`);
    }
    grid.innerHTML = cards.length ? cards.join("") : `<p class="empty-state">${t("noProducts")}</p>`;

    $("#listing-count").textContent = t("productsCount").replace("{n}", list.length);
    $("#listing-title").innerHTML = query
      ? `${t("resultsFor")} <em>“${params.get("q")}”</em>`
      : listingCat === "all" ? t("collectionTitle") : `<em>${L(CATEGORIES[listingCat])}</em>`;
    $("#listing-crumb").textContent = listingCat === "all" ? t("allProducts") : L(CATEGORIES[listingCat]);
    $("#sort").value = listingSort;
    $$("#sort option").forEach((o) => (o.textContent = t(`sort_${o.value}`)));
    document.title = `${listingCat === "all" ? t("navShop") : L(CATEGORIES[listingCat])} | Female A`;
  }

  /* Produto */
  function renderProduct() {
    const root = $("#pdp");
    if (!root) return;
    const p = getProduct(params.get("id")) || PRODUCTS[0];
    document.title = `${L(p.name)} | Female A`;
    const pix = p.price * 0.95;

    root.innerHTML = `
      <div class="pdp__gallery">
        <div class="pdp__thumbs">
          ${p.gallery.map((img, i) => `<button class="${i === 0 ? "is-active" : ""}" data-thumb="${IMG + img}" aria-label="${t("image")} ${i + 1}"><img src="${IMG + img}" alt=""></button>`).join("")}
        </div>
        <div class="pdp__main" data-zoom>
          ${p.badge ? `<span class="badge${p.badgeStyle ? ` badge--${p.badgeStyle}` : ""}">${L(p.badge)}</span>` : ""}
          <img id="pdp-main-img" src="${IMG + p.gallery[0]}" alt="${L(p.name)}">
        </div>
      </div>

      <div class="pdp__info">
        <nav class="breadcrumb" aria-label="breadcrumb">
          <a href="index.html">${t("home")}</a>${icon("chevron")}
          <a href="produtos.html?cat=${p.cat}">${L(CATEGORIES[p.cat])}</a>${icon("chevron")}
          <span>${L(p.name)}</span>
        </nav>
        <div style="display:grid;gap:14px">
          <span class="eyebrow">${L(CATEGORIES[p.cat])} · ${p.size}</span>
          <h1 class="display pdp__title">${L(p.name)}</h1>
          <p class="pdp__subtitle">${L(p.sub)}</p>
          <a href="#avaliacoes" class="rating">${stars(p.rating)} ${p.rating.toFixed(1)} · ${p.reviews} ${t("reviews")}</a>
        </div>

        <div class="pdp__price">
          <span class="price">${p.old ? `<del>${money(p.old)}</del>` : ""}${money(p.price)}</span>
          <span class="installments">${installments(p.price)}</span>
          <span class="pdp__pix">${icon("sparkle", "icon--sm")} ${money(pix)} ${t("onPix")}</span>
        </div>

        <p class="pdp__desc">${L(p.desc)}</p>

        <div>
          <span class="pdp__label">${t("size")}</span>
          <div class="sizes"><button class="is-active">${p.size}</button></div>
        </div>

        <div class="pdp__buy">
          <div class="qty qty--lg">
            <button data-pdp-dec aria-label="${t("decrease")}">${icon("minus")}</button>
            <input id="pdp-qty" type="text" inputmode="numeric" value="1" aria-label="${t("quantity")}">
            <button data-pdp-inc aria-label="${t("increase")}">${icon("plus")}</button>
          </div>
          <button class="btn btn--primary" id="pdp-add" data-add="${p.id}" data-qty-from="#pdp-qty">${icon("bag", "icon--sm")} ${t("addToBag")}</button>
          <button class="wish-btn${wish.has(p.id) ? " is-active" : ""}" data-wish="${p.id}" aria-label="${t("addWishlist")}">${icon("heart")}</button>
        </div>

        <div class="pdp__perks">
          <div>${icon("truck")}<span>${t("perkShipping")}</span></div>
          <div>${icon("leaf")}<span>${t("perkVegan")}</span></div>
          <div>${icon("return")}<span>${t("perkReturn")}</span></div>
        </div>

        <div class="shipping-calc">
          <span class="pdp__label">${t("calcShipping")}</span>
          <form data-shipping-form>
            <input type="text" inputmode="numeric" maxlength="9" placeholder="00000-000" data-cep aria-label="CEP">
            <button class="btn btn--outline" type="submit">${t("calculate")}</button>
          </form>
          <div class="shipping-result" data-shipping-result></div>
        </div>

        <div class="accordion">
          <details open>
            <summary>${t("benefits")} ${icon("plus")}</summary>
            <div class="accordion__body"><ul>${L(p.benefits).map((b) => `<li>${b}</li>`).join("")}</ul></div>
          </details>
          <details>
            <summary>${t("howToUse")} ${icon("plus")}</summary>
            <div class="accordion__body"><p>${L(p.howTo)}</p></div>
          </details>
          <details>
            <summary>${t("ingredients")} ${icon("plus")}</summary>
            <div class="accordion__body"><p>${p.ingredients}</p><p><small>${t("ingredientsNote")}</small></p></div>
          </details>
          <details>
            <summary>${t("shippingReturns")} ${icon("plus")}</summary>
            <div class="accordion__body"><p>${t("shippingReturnsText")}</p></div>
          </details>
        </div>
      </div>`;

    const related = [
      ...PRODUCTS.filter((x) => x.cat === p.cat && x.id !== p.id),
      ...PRODUCTS.filter((x) => x.cat !== p.cat),
    ].slice(0, 4);
    $("#related").innerHTML = related.map((x) => productCard(x)).join("");

    const dist = { 5: 86, 4: 10, 3: 3, 2: 1, 1: 0 };
    $("#reviews").innerHTML = `
      <div class="reviews__summary">
        <span class="eyebrow eyebrow--line">${t("reviewsEyebrow")}</span>
        <span class="reviews__score">${p.rating.toFixed(1)}</span>
        ${stars(p.rating)}
        <span class="installments">${t("basedOn").replace("{n}", p.reviews)}</span>
        <div class="bars">
          ${[5, 4, 3, 2, 1].map((n) => `<div><span>${n}★</span><i><b style="width:${dist[n]}%"></b></i><span>${dist[n]}%</span></div>`).join("")}
        </div>
        <button class="btn btn--outline" data-demo>${t("writeReview")}</button>
      </div>
      <div class="reviews__list">
        ${REVIEWS.map((r) => `
          <article class="review">
            <div class="review__head"><span><strong>${r.name}</strong> · ${r.city}</span><span>${r.date}</span></div>
            ${stars(r.rating)}
            <h4>${L(r.title)}</h4>
            <p>${L(r.text)}</p>
            <span class="review__verified">${icon("check")} ${t("verified")}</span>
          </article>`).join("")}
      </div>`;

    const sticky = $("#sticky-buy");
    sticky.innerHTML = `
      <div class="container sticky-buy__inner">
        <div class="sticky-buy__product">
          <img src="${IMG + p.images[0]}" alt="">
          <div><strong>${L(p.name)}</strong><span>${money(p.price)} · ${installments(p.price)}</span></div>
        </div>
        <button class="btn btn--primary" data-add="${p.id}" data-qty-from="#pdp-qty">${icon("bag", "icon--sm")} ${t("addToBag")}</button>
      </div>`;

    stickyObserver?.disconnect();
    stickyObserver = new IntersectionObserver(([e]) => {
      sticky.classList.toggle("is-visible", !e.isIntersecting && e.boundingClientRect.top < 0);
    });
    stickyObserver.observe($("#pdp-add"));
  }
  let stickyObserver;

  const api = {
    t, L, money, icon, stars, installments, getProduct, productCard, toast, addToCart, observeReveal,
    get lang() { return lang; },
    params,
  };

  function renderPage() {
    $$("[data-products]").forEach((el) => {
      el.innerHTML = el.dataset.products.split(",").map((id) => productCard(getProduct(id.trim()))).join("");
    });
    if (page === "home") renderHome();
    if (page === "listing") renderListing();
    if (page === "product") renderProduct();
    HOOKS.forEach((fn) => fn(api));
  }

  function renderAll() {
    applyStaticTranslations();
    renderHeader();
    renderOverlays();
    renderFooter();
    renderPage();
    renderCart();
    observeReveal();
  }

  /* ---------- Eventos ---------- */
  document.addEventListener("click", (e) => {
    const el = e.target.closest(
      "[data-add],[data-open-cart],[data-close-cart],[data-cart-inc],[data-cart-dec],[data-cart-remove],[data-wish],[data-lang],[data-menu-open],[data-menu-close],[data-checkout],[data-demo],[data-chip],[data-thumb],[data-zoom],[data-pdp-inc],[data-pdp-dec]"
    );
    if (!el) return;
    const d = el.dataset;

    if ("add" in d) {
      e.preventDefault();
      const qtyInput = d.qtyFrom ? $(d.qtyFrom) : null;
      const qty = Math.max(1, parseInt(qtyInput?.value, 10) || 1);
      if ("noOpen" in d) {
        const item = cart.find((i) => i.id === d.add);
        if (item) item.qty += qty; else cart.push({ id: d.add, qty });
        saveCart();
        renderCart();
      } else {
        addToCart(d.add, qty);
      }
      toast(t("addedToBag").replace("{p}", L(getProduct(d.add).name)));
    } else if ("openCart" in d) openDrawer();
    else if ("closeCart" in d) closeDrawer();
    else if ("cartInc" in d) setQty(d.cartInc, cart.find((i) => i.id === d.cartInc).qty + 1);
    else if ("cartDec" in d) setQty(d.cartDec, cart.find((i) => i.id === d.cartDec).qty - 1);
    else if ("cartRemove" in d) setQty(d.cartRemove, 0);
    else if ("wish" in d) {
      e.preventDefault();
      const id = d.wish;
      wish.has(id) ? wish.delete(id) : wish.add(id);
      localStorage.setItem(LS.wish, JSON.stringify([...wish]));
      $$(`[data-wish="${id}"]`).forEach((b) => b.classList.toggle("is-active", wish.has(id)));
      toast(wish.has(id) ? t("wishAdded") : t("wishRemoved"));
    } else if ("lang" in d) setLang(d.lang);
    else if ("menuOpen" in d) toggleMenu(true);
    else if ("menuClose" in d) toggleMenu(false);
    else if ("checkout" in d || "demo" in d) toast(t("demo"));
    else if ("chip" in d) {
      listingCat = d.chip;
      const url = new URL(location.href);
      listingCat === "all" ? url.searchParams.delete("cat") : url.searchParams.set("cat", listingCat);
      history.replaceState(null, "", url);
      params.set("cat", listingCat);
      renderListing();
      renderHeader();
      renderCart();
      observeReveal();
    } else if ("thumb" in d) {
      const img = $("#pdp-main-img");
      img.style.opacity = 0;
      setTimeout(() => { img.src = d.thumb; img.style.opacity = 1; }, 200);
      $$("[data-thumb]").forEach((b) => b.classList.toggle("is-active", b === el));
    } else if ("zoom" in d) {
      el.classList.toggle("is-zoom");
    } else if ("pdpInc" in d || "pdpDec" in d) {
      const input = $("#pdp-qty");
      const v = Math.max(1, (parseInt(input.value, 10) || 1) + ("pdpInc" in d ? 1 : -1));
      input.value = v;
    }
  });

  document.addEventListener("mousemove", (e) => {
    const zoom = e.target.closest(".pdp__main.is-zoom");
    if (!zoom) return;
    const r = zoom.getBoundingClientRect();
    $("img", zoom).style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
  });

  document.addEventListener("change", (e) => {
    if (e.target.id === "sort") {
      listingSort = e.target.value;
      renderListing();
      observeReveal();
    }
  });

  document.addEventListener("input", (e) => {
    if (e.target.matches("[data-cep]")) {
      const v = e.target.value.replace(/\D/g, "").slice(0, 8);
      e.target.value = v.length > 5 ? `${v.slice(0, 5)}-${v.slice(5)}` : v;
    }
  });

  document.addEventListener("submit", (e) => {
    if (e.target.matches("[data-search-form]")) {
      e.preventDefault();
      const q = $("input", e.target).value.trim();
      location.href = q ? `produtos.html?q=${encodeURIComponent(q)}` : "produtos.html";
    }
    if (e.target.matches("[data-newsletter]")) {
      e.preventDefault();
      e.target.reset();
      toast(t("newsletterOk"));
    }
    if (e.target.matches("[data-shipping-form]")) {
      e.preventDefault();
      const out = $("[data-shipping-result]");
      out.innerHTML = `
        <div><span>${t("standard")} · 5–8 ${t("days")}</span><strong>${money(19.9)}</strong></div>
        <div><span>${t("express")} · 1–3 ${t("days")}</span><strong>${money(34.9)}</strong></div>`;
      out.classList.add("is-visible");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDrawer();
      toggleMenu(false);
    }
  });

  window.addEventListener("scroll", onScroll, { passive: true });

  document.body.insertAdjacentHTML("afterbegin", SPRITE);
  renderAll();
})();
