Object.assign(EN, {
  r_pill: "New · Growth Elixir",
  r_hero_title: "Effortless beauty.",
  r_hero_text: "Brows, lashes, hair and body. Fewer steps, real results.",
  r_hero_cta1: "Shop now",
  r_hero_cta2: "See the routine",
  r_tk1: "4.9 rating · 12,000+ reviews",
  r_tk2: "Vegan & cruelty free",
  r_tk3: "Free shipping over R$ 299",
  r_tk4: "Up to 6x interest-free",
  r_tk5: "5% off with Pix",
  r_shop_eyebrow: "Shop by category",
  r_shop_title: "Find your <em>essentials</em>",
  r_ft_eyebrow: "Best seller nº 1",
  r_ft_text: "The wax-gel that lifts, shapes and sets your brows in seconds. Clear finish, zero residue and up to 24-hour hold.",
  r_ft_s1: "hold without cracking",
  r_ft_s2: "residue or stiffness",
  r_ft_s3: "to shape and set",
  r_ft_cta: "Add · R$ 89.90",
  r_ft_link: "View details",
  r_rt_eyebrow: "Simplifying beauty",
  r_rt_title: "Your routine in <em>3 steps</em>",
  r_rt_link: "Shop all",
  r_s1_label: "Step 01 · Night",
  r_s1: "Treat",
  r_s1t: "Growth Elixir nourishes lashes and brows from the root while you sleep.",
  r_s2_label: "Step 02 · Morning",
  r_s2: "Shape",
  r_s2t: "Defining Gel lifts and sets the hairs for a natural, groomed finish.",
  r_s3_label: "Step 03 · Finish",
  r_s3: "Glow",
  r_s3t: "Lumière Body Mist adds subtle golden glow and long-lasting scent.",
  r_add: "Add",
  r_bundle_title: "Get steps 1 + 2 in the Brow Ritual Set",
  r_bundle_text: "Save R$ 19.90 and receive it in a gift box.",
  r_bundle_cta: "Add set",
  r_mq1: "Brows",
  r_mq2: "Lashes",
  r_mq3: "Hair",
  r_mq4: "Body",
  r_ugc_title: "As seen <em>on you</em>",
  r_ugc_text: "Tag @female_a_global to be featured here.",
  r_shop_look: "Shop the look",
  r_rv_eyebrow: "Real reviews",
  r_rv_count: "12,000+ verified reviews",
  r_rv1_t: "My brows have never looked so good",
  r_rv1: "Holds all day, no white residue and looks super natural. I've already recommended it to all my friends.",
  r_rv2_t: "Visible results in 5 weeks",
  r_rv2: "My lashes are longer and fuller. I use it every night and it never irritated my eyes.",
  r_rv3_t: "The scent is addictive",
  r_rv3: "A subtle glow on the skin and a scent that lasts. I get compliments every time I wear it.",
  r_v1: "Vegan",
  r_v1t: "No animal-derived ingredients",
  r_v2: "Cruelty free",
  r_v2t: "Never tested on animals",
  r_v3: "Tested",
  r_v3t: "Dermatologically approved",
  r_v4: "Conscious",
  r_v4t: "Recyclable packaging",
  r_club_title: "Join the <em>club</em>",
  r_club_text: "Early access to launches, exclusive content and 10% off your first order.",
  r_ls_text: "Formulas that simplify your routine and deliver real results. Vegan, cruelty free and made for every woman.",
  r_pr_eyebrow: "How to use",
  r_pr_title: "Simple <em>as it should be</em>",
});

window.FA_HOOKS = [
  (fa) => {
    const tabsEl = document.getElementById("r-tabs");
    const track = document.getElementById("r-track");
    if (!tabsEl || !track) return;

    const progress = document.querySelector(".r-progress span");
    const cats = ["brows", "lashes", "hair", "body", "kits"];
    let current = tabsEl.dataset.current || "brows";

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

    const updateProgress = () => {
      if (!progress) return;
      const visible = track.clientWidth / track.scrollWidth;
      const left = track.scrollLeft / track.scrollWidth;
      progress.style.width = `${visible * 100}%`;
      progress.style.left = `${left * 100}%`;
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
          const step = card ? card.getBoundingClientRect().width + 20 : 300;
          track.scrollBy({ left: Number(btn.dataset.rScroll) * step, behavior: "smooth" });
        })
      );
      track.addEventListener("scroll", updateProgress, { passive: true });
      window.addEventListener("resize", updateProgress);
    }
    render();
  },
];
