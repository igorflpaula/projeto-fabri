Object.assign(EN, {
  s_pill: "new · growth elixir",
  s_hero_title: "brows and lashes on point, <em>every single day</em>",
  s_hero_text: "vegan, tested formulas co-created with our community. real results, no complicated routine.",
  s_hero_cta1: "shop now",
  s_hero_cta2: "take the quiz",
  s_trust: "<strong>12k+ women</strong> already use it · 4.9 rating",
  s_chip_rating: "4.9 · 12k reviews",
  s_chip_new: "new",
  s_pk1: "5% off with pix",
  s_pk1t: "on every order",
  s_pk2: "free shipping",
  s_pk2t: "on orders over R$ 299",
  s_pk3: "up to 6x",
  s_pk3t: "interest-free",
  s_pk4: "first exchange free",
  s_pk4t: "within 30 days",
  s_cats_eyebrow: "categories",
  s_cats_title: "what do you want to <em>care for</em> today?",
  s_cat_brows: "brows",
  s_cat_lashes: "lashes",
  s_cat_hair: "hair",
  s_cat_body: "body",
  s_cat_kits: "sets",
  s_items: "items",
  s_item: "item",
  s_duos_eyebrow: "save more",
  s_duos_title: "find your <em>ideal routine</em>",
  s_duos_link: "see all sets",
  s_quiz_eyebrow: "2-minute quiz",
  s_quiz_title: "what do you <em>need</em> today?",
  s_quiz_text: "answer 2 quick questions and we'll build the ideal routine for you. no small print, just real results.",
  s_quiz_note: "personalized recommendation · no sign-up needed",
  s_favs_eyebrow: "community favorites",
  s_favs_title: "the <em>most loved</em>",
  s_favs_link: "see all",
  s_cm_eyebrow: "science + community",
  s_cm_title: "formulas created <em>with you</em>, not just for you",
  s_cm_text: "we listen. every Female A formula goes through rounds of testing with our community before reaching you — texture, scent, packaging, results. that's why it works.",
  s_st1: "women in our community",
  s_st2: "testing rounds per formula",
  s_st3: "approval in sensory tests",
  s_cm_cta: "I want to take part",
  s_cm_chip: "co-created with 12k women",
  s_act_eyebrow: "ingredients",
  s_act_title: "actives that <em>really work</em>",
  s_a1: "Panthenol",
  s_a1t: "pro-vitamin B5 that nourishes and adds flexibility to the hairs, without weighing them down.",
  s_a2: "Biomimetic peptides",
  s_a2t: "they signal the follicle to strengthen and boost natural growth of lashes and brows.",
  s_a3: "Centella asiatica",
  s_a3t: "stimulates collagen and helps restore skin elasticity and firmness.",
  s_a4: "Argan oil",
  s_a4t: "rich in vitamin E, it seals ends, tames frizz and delivers shine.",
  s_in: "found in",
  s_rv_eyebrow: "reviews",
  s_rv_title: "results are <em>always real</em>",
  s_rv_count: "real reviews",
  s_rv1: "\"my brows stay in place from 7am until night. it doesn't flake and doesn't feel sticky. I'm obsessed.\"",
  s_rv2: "\"I used it for 6 weeks and my lashes grew so much people ask if I have extensions!\"",
  s_rv3: "\"the mask left my hair soft for days. and the scent is incredible.\"",
  s_rv4: "\"my stretch marks are much lighter after 2 months. the texture absorbs fast, I use it every day.\"",
  s_nl_eyebrow: "coming soon · our boutique",
  s_nl_title: "join <em>our list</em>",
  s_nl_text: "be the first to know about launches, our first physical store and get 10% off your first order.",
  s_nl_ph: "your best e-mail",
  s_whats: "chat with us on whatsapp",
  s_ls_eyebrow: "shop",
  s_ls_text: "vegan, tested formulas created with our community. find the right product for you.",
  s_pr_eyebrow: "how to use",
  s_pr_title: "your routine in <em>3 steps</em>",
  s_rel_eyebrow: "pairs well with",
  s_rel_title: "complete <em>your routine</em>",
});

const QUIZ = {
  pt: {
    q1: "o que você quer cuidar hoje?",
    q2: "e o que você mais quer resolver?",
    result: "a gente recomenda pra você:",
    back: "voltar",
    restart: "refazer o teste",
    view: "ver produto",
    add: "adicionar à sacola",
    areas: { brows: "sobrancelhas", lashes: "cílios", hair: "cabelo", body: "corpo" },
    needs: {
      brows: [["sobrancelhas no lugar o dia todo", "defining-gel"], ["fios mais cheios e preenchidos", "growth-elixir"], ["quero os dois!", "kit-brow"]],
      lashes: [["cílios mais longos", "growth-elixir"], ["cílios mais fortes, que não caem", "growth-elixir"], ["rotina completa para o olhar", "kit-brow"]],
      hair: [["pontas duplas e frizz", "serum-capilar"], ["fios ressecados e sem brilho", "mascara-gold"], ["tratamento completo", "kit-ritual"]],
      body: [["estrias e firmeza", "anti-estrias"], ["pele perfumada e iluminada", "body-mist"], ["quero os dois!", "kit-corpo"]],
    },
  },
  en: {
    q1: "what do you want to care for today?",
    q2: "and what do you most want to fix?",
    result: "we recommend for you:",
    back: "back",
    restart: "retake the quiz",
    view: "view product",
    add: "add to bag",
    areas: { brows: "brows", lashes: "lashes", hair: "hair", body: "body" },
    needs: {
      brows: [["brows in place all day", "defining-gel"], ["fuller, filled-in brows", "growth-elixir"], ["I want both!", "kit-brow"]],
      lashes: [["longer lashes", "growth-elixir"], ["stronger lashes that don't fall out", "growth-elixir"], ["a complete eye routine", "kit-brow"]],
      hair: [["split ends and frizz", "serum-capilar"], ["dry, dull hair", "mascara-gold"], ["complete treatment", "kit-ritual"]],
      body: [["stretch marks and firmness", "anti-estrias"], ["scented, glowing skin", "body-mist"], ["I want both!", "kit-corpo"]],
    },
  },
};

const AREA_IMG = { brows: "card-defining-gel.jpg", lashes: "card-growth-elixir.jpg", hair: "card-serum-capilar.jpg", body: "card-anti-estrias.jpg" };

window.FA_HOOKS = [
  (fa) => {
    const panel = document.getElementById("quiz");
    if (!panel) return;
    const state = panel._quiz || (panel._quiz = { step: 1, area: null, result: null });

    const render = () => {
      const q = QUIZ[fa.lang] || QUIZ.pt;
      const bars = `<div class="s-quiz__steps">${[1, 2, 3].map((n) => `<span class="${n <= state.step ? "is-done" : ""}"></span>`).join("")}</div>`;

      if (state.step === 1) {
        panel.innerHTML = `${bars}
          <p class="s-quiz__q">${q.q1}</p>
          <div class="s-quiz__options">
            ${Object.entries(q.areas).map(([k, label]) => `
              <button class="s-quiz__opt" data-quiz-area="${k}"><img src="${IMG + AREA_IMG[k]}" alt="">${label}</button>`).join("")}
          </div>`;
      } else if (state.step === 2) {
        panel.innerHTML = `${bars}
          <button class="s-quiz__back" data-quiz-back>${fa.icon("arrow")} ${q.back}</button>
          <p class="s-quiz__q">${q.q2}</p>
          <div class="s-quiz__options s-quiz__options--list">
            ${q.needs[state.area].map(([label, id]) => `
              <button class="s-quiz__opt" data-quiz-result="${id}">${fa.icon("sparkle")}${label}</button>`).join("")}
          </div>`;
      } else {
        const p = fa.getProduct(state.result);
        panel.innerHTML = `${bars}
          <p class="s-quiz__q">${q.result}</p>
          <div class="s-result" style="--tint:${TINTS[p.id]}">
            <img src="${IMG + p.images[0]}" alt="${fa.L(p.name)}">
            <div>
              <h4>${fa.L(p.name)}</h4>
              <p>${fa.L(p.sub)} · ${p.size}</p>
              <p style="margin-top:6px">${fa.stars(p.rating)} <strong class="price">${fa.money(p.price)}</strong></p>
              <div class="s-result__actions">
                <button class="btn btn--primary" data-add="${p.id}">${q.add}</button>
                <a class="btn btn--outline" href="produto.html?id=${p.id}">${q.view}</a>
              </div>
            </div>
          </div>
          <button class="s-quiz__back" data-quiz-restart>${fa.icon("return")} ${q.restart}</button>`;
      }
    };

    if (!panel.dataset.bound) {
      panel.dataset.bound = "1";
      panel.addEventListener("click", (e) => {
        const area = e.target.closest("[data-quiz-area]");
        const result = e.target.closest("[data-quiz-result]");
        if (area) Object.assign(state, { step: 2, area: area.dataset.quizArea });
        else if (result) Object.assign(state, { step: 3, result: result.dataset.quizResult });
        else if (e.target.closest("[data-quiz-back]")) state.step = 1;
        else if (e.target.closest("[data-quiz-restart]")) Object.assign(state, { step: 1, area: null, result: null });
        else return;
        render();
      });
    }
    render();
  },
];
