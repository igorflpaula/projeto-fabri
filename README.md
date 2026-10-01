# Female A · Propostas de layout e-commerce

Layout estático (HTML, CSS e JavaScript puro) para apresentação ao cliente, com três direções visuais
diferentes sobre o mesmo brand book (bronze `#996F52`, creme `#FDFBF7`, logo e diamante).

## Como abrir

Dê dois cliques em `index.html` (raiz). Ele abre a página de apresentação com as três versões lado a lado
e links para a home, a loja e a página de produto de cada uma. Não precisa de servidor nem instalação;
só a internet para carregar as fontes do Google Fonts.

## Estrutura

```
index.html          página de apresentação das 3 versões
v1-refy/            Versão 1 · Clean & Bold (inspiração Refy)
v2-sallve/          Versão 2 · leve & próxima (inspiração Sallve)
v3-editorial/       Versão 3 · Luxo Editorial (direção criativa própria)
  index.html        home
  produtos.html     listagem (filtros por categoria, ordenação, busca ?q=)
  produto.html      página de produto (?id=defining-gel, ?id=growth-elixir, ...)
shared/
  css/base.css      design system base (cada versão sobrescreve as variáveis no seu css/)
  js/data.js        catálogo de produtos, preços, categorias e avaliações
  js/i18n.js        textos em português e inglês
  js/main.js        header, rodapé, sacola lateral, cards, listagem, página de produto
assets/
  img/              imagens tratadas usadas no site
  src/              arquivos originais enviados pela cliente
  previews/         miniaturas das versões usadas na página de apresentação
```

## O que funciona em todas as versões

- Sacola lateral com quantidade, barra de frete grátis (R$ 299), sugestão de produto e subtotal.
- Favoritos, sacola e idioma ficam salvos no navegador (localStorage).
- Seletor PT / EN no topo.
- Listagem com filtros por categoria, ordenação e busca.
- Página de produto com galeria, zoom, parcelamento, cálculo de frete demonstrativo, acordeões e relacionados.
- Layout responsivo (desktop, tablet e celular).

Finalizar compra, login e envio de formulários são apenas demonstrativos (exibem um aviso).

## Como trocar conteúdo

- **Produtos, preços e textos de produto:** `shared/js/data.js`.
- **Imagens:** substitua o arquivo em `assets/img/` mantendo o mesmo nome, ou altere o caminho em
  `data.js` (produtos) ou no HTML da página (banners e seções).
- **Textos das páginas:** direto no HTML. A tradução em inglês de cada texto fica no dicionário `EN`
  (em `shared/js/i18n.js` para a V3 e nos arquivos `js/v1.js` e `js/v2.js` para as outras versões),
  usando a mesma chave do atributo `data-i18n`.
- **Cores e fontes de cada versão:** variáveis CSS no topo de `v1-refy/css/v1.css`,
  `v2-sallve/css/v2.css` e `shared/css/base.css` (V3).

## Observações

Preços, avaliações, depoimentos, ingredientes e números da marca são ilustrativos. As fotos foram
recortadas do material enviado pela cliente. A pasta `tmp/` contém apenas capturas de tela de revisão
e pode ser apagada antes de enviar o projeto.
