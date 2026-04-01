# Loyde Art React

Projeto base em React + Vite + React Router + Sass para catálogo com navegação desktop por mega menu e mobile com bottom nav + bottom sheet.

## Rodar o projeto

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Onde alterar depois

- Categorias e grupos: `src/data/navigation.js`
- Produtos e links da Yampi: `src/data/products.js`
- Rotas: `src/app/router.jsx`
- Header e navegação: `src/components/layout/Header` e `src/components/navigation`
- Estilos globais: `src/styles/`

## Segurança aplicada

- Botão externo com `rel="noopener noreferrer"`
- Allowlist básica para links de checkout em `src/utils/urlPolicy.js`
- Sem `dangerouslySetInnerHTML`
