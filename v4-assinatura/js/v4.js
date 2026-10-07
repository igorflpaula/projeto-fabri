Object.assign(EN, {
  a_hero_title: "Reveal your <em>essence</em>",
  a_hero_text: "Brows, lashes, hair and body. High-performance care, designed for the real woman.",
  a_hero_cta2: "Discover the ritual",
  a_tk1: "4.9 rating · 12,000+ reviews",
  a_tk2: "Vegan & cruelty free",
  a_tk3: "Free shipping over R$ 299",
  a_tk4: "Up to 6x interest-free",
  a_tk5: "5% off with Pix",
  a_ft_eyebrow: "Best seller nº 1",
  a_ft_s1: "hold, no cracking",
  a_ft_s2: "residue or stiffness",
  a_ft_s3: "to shape and set",
  a_seal: "approval",
  a_rt_title: "Your ritual in <em>3 steps</em>",
  a_s1_label: "Step 01 · Night",
  a_s1: "<em>Nourish</em>",
  a_s1t: "Growth Elixir nourishes lashes and brows from the root while you sleep.",
  a_s2_label: "Step 02 · Morning",
  a_s2: "<em>Shape</em>",
  a_s2t: "Defining Gel lifts and sets the hairs for a natural, groomed finish.",
  a_s3_label: "Step 03 · Finish",
  a_s3: "<em>Glow</em>",
  a_s3t: "Lumière Body Mist adds a subtle golden glow and a long-lasting scent.",
  a_add: "Add",
  a_bundle_title: "Get steps 1 + 2 in the <em>Brow Ritual Set</em>",
  a_bundle_text: "Save R$ 19.90 and receive it in a signature gift box.",
  a_bundle_cta: "Add set",
  a_mq1: "Brows",
  a_mq2: "Lashes",
  a_mq3: "Hair",
  a_mq4: "Body",
  a_ugc_title: "As seen <em>on you</em>",
  a_ugc_text: "Tag @female_a_global to be featured here.",
  a_shop_look: "Shop the look",
  a_rv_eyebrow: "Real reviews",
  a_rv_title: "Women who <em>trust us</em>",
  a_rv_count: "12,000+ verified reviews",
  a_rv1_t: "My brows have never looked so good",
  a_rv1: "Holds all day, no white residue and looks super natural. I've already recommended it to all my friends.",
  a_rv2_t: "Visible results in 5 weeks",
  a_rv2: "My lashes are longer and fuller. I use it every night and it never irritated my eyes.",
  a_rv3_t: "The scent is addictive",
  a_rv3: "A subtle glow on the skin and a scent that lasts. I get compliments every time I wear it.",
  a_v1: "Vegan",
  a_v1t: "No animal-derived ingredients",
  a_v2t: "Never tested on animals",
  a_v3: "Tested",
  a_v3t: "Dermatologically approved",
  a_v4: "Conscious",
  a_v4t: "Recyclable packaging",
  a_ls_title: "The <em>collection</em>",
  a_ls_text: "High-performance formulas for brows, lashes, hair and body. Vegan, cruelty free and made for every woman.",
  a_pr_title: "Your <em>moment</em>, in three gestures",
});

window.FA_HOOKS = [
  (fa) => {
    const tabsEl = document.getElementById("r-tabs");
    const track = document.getElementById("r-track");
    if (!tabsEl || !track) return;

    const progress = document.querySelector(".r-progress span");
    const cats = ["brows", "lashes", "hair", "body", "kits"];
    let current = tabsEl.dataset.current || "brows";

    const updateProgress = () => {
      if (!progress) return;
      progress.style.width = `${(track.clientWidth / track.scrollWidth) * 100}%`;
      progress.style.left = `${(track.scrollLeft / track.scrollWidth) * 100}%`;
    };

    const render = () => {
      tabsEl.dataset.current = current;
      tabsEl.innerHTML = cats.map((c) =>
        `<button class="r-tab${c === current ? " is-active" : ""}" data-r-tab="${c}">${fa.L(CATEGORIES[c])}</button>`
      ).join("");
      const list = [...PRODUCTS.filter((p) => p.cat === current), ...PRODUCTS.filter((p) => p.cat !== current)];
      track.innerHTML = list.map((p) => fa.productCard(p)).join("");
      track.scrollLeft = 0;
      updateProgress();
      fa.observeReveal();
    };

    if (!track.dataset.bound) {
      track.dataset.bound = "1";
      tabsEl.addEventListener("click", (e) => {
        const b = e.target.closest("[data-r-tab]");
        if (!b) return;
        current = b.dataset.rTab;
        render();
      });
      document.querySelectorAll("[data-r-scroll]").forEach((btn) =>
        btn.addEventListener("click", () => {
          const card = track.firstElementChild;
          const step = card ? card.getBoundingClientRect().width + 22 : 300;
          track.scrollBy({ left: Number(btn.dataset.rScroll) * step, behavior: "smooth" });
        })
      );
      track.addEventListener("scroll", updateProgress, { passive: true });
      window.addEventListener("resize", updateProgress);
    }
    render();
  },
];
