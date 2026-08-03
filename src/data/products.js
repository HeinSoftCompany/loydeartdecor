const placeholder = (seed) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=1200&q=80`;

export const products = [
  // Produto 1
  {
  id: "p1",
  title: "Andorinhas Decorativas de Parede",
  slug: "andorinhas-decorativas-de-parede",
  group: "arte-em-barro",
  subcategory: "andorinhas",

  description:
    "Peça artesanal com acabamento rústico e presença marcante para composições autorais.",

  // Menor preço, usado como referência nos cards.
  priceCents: 1500,

  installments: {
    count: 1,
    valueCents: 1500,
  },

  badges: ["destaque"],

  images: [
    {
      src: "/images/arte-em-barro/andorinhas/andorinhas.png",
      alt: "Andorinhas decorativas artesanais em barro natural",
    },
  ],

  variants: [
    {
      id: "andorinha-barro-natural-p",
      sku: "AND-BAR-NAT-P",
      label: "P",
      type: "size",

      attributes: {
        finish: "Natural",
        size: "P",
      },

      priceCents: 1500,

      installments: {
        count: 1,
        valueCents: 1500,
      },

      yampiToken: "9D8AUO82YA",
    },
    {
      id: "andorinha-barro-natural-m",
      sku: "AND-BAR-NAT-M",
      label: "M",
      type: "size",

      attributes: {
        finish: "Natural",
        size: "M",
      },

      priceCents: 2000,

      installments: {
        count: 2,
        valueCents: 1000,
      },

      yampiToken: "DW9AQKBTDT",
    },
    {
      id: "andorinha-barro-natural-g",
      sku: "AND-BAR-NAT-G",
      label: "G",
      type: "size",

      attributes: {
        finish: "Natural",
        size: "G",
      },

      priceCents: 2500,

      installments: {
        count: 2,
        valueCents: 1250,
      },

      yampiToken: "C7FQWM5364",
    },
  ],
},
// Produto 2
  {
  id: "p2",
  title: "Colar em Barro",
  slug: "colar-em-barro",
  group: "arte-em-barro",
  subcategory: "barro",
  description:
    "Conjunto com acabamento delicado para composições em parede com ar leve e sofisticado.",

  priceCents: 4000,
  installments: { count: 10, valueCents: 1590 },
  badges: ["destaque"],

  images: [
    {
      src: "/images/arte-em-barro/colares/barro/colar-barro-branco.png",
      alt: "Colar decorativo artesanal em barro branco",
    },
    {
      src: "/images/arte-em-barro/colares/barro/colar-barro-sortido.png",
      alt: "Colar decorativo artesanal em barro sortido",
    },
  ],

  variants: [
    {
      id: "colar-em-barro-branco",
      sku: "COL-BAR-NAT-001",
      label: "Branco",
      type: "finish",

      attributes: {
        finish: "Branco",
      },

      yampiProductId: 301527863,
      yampiToken: "L0QYV8ABL8",
    },
    {
      id: "colar-em-barro-sortido",
      sku: "COL-BAR-NAT-002",
      label: "Sortido",
      type: "finish",

      attributes: {
        finish: "Sortido",
      },

      yampiProductId: 301527864,
      yampiToken: "G7G122SFMW",
    },
  ],
},
// Produto 3
{
  id: "p3",
  title: "Casinha Decorativa em Barro",
  slug: "casinha-decorativa-em-barro",
  group: "arte-em-barro",
  subcategory: "casinha",

  description:
    "Peça de apoio para bandejas, aparadores e composição de mesas de centro.",

  priceCents: 4000,

  installments: {
    count: 1,
    valueCents: 4000,
  },

  badges: ["destaque"],

  images: [
    {
      src: "/images/arte-em-barro/casinha/casinha-em-barro.png",
      alt: "Casinha decorativa artesanal em barro modelo 1",
    },
    {
      src: "/images/arte-em-barro/casinha/casinha-em-barro1.png",
      alt: "Casinha decorativa artesanal em barro modelo 2",
    },
    {
      src: "/images/arte-em-barro/casinha/casinha-em-barro2.png",
      alt: "Casinha decorativa artesanal em barro modelo 3",
    },
  ],

  variants: [
    {
      id: "casinha-arte-em-barro-modelo-1",
      sku: "CAS-BAR-NAT-001",
      label: "Modelo 1",
      type: "model",

      attributes: {
        model: "Modelo 1",
      },

      priceCents: 4000,

      installments: {
        count: 1,
        valueCents: 4000,
      },

      yampiProductId: 301293261,
      yampiToken: "2RS1Y58E8O",
    },
    {
      id: "casinha-arte-em-barro-modelo-2",
      sku: "CAS-BAR-NAT-002",
      label: "Modelo 2",
      type: "model",

      attributes: {
        model: "Modelo 2",
      },

      priceCents: 4000,

      installments: {
        count: 1,
        valueCents: 4000,
      },

      yampiProductId: 301526798,
      yampiToken: "RQD3ZF0ARP",
    },
    {
      id: "casinha-arte-em-barro-modelo-3",
      sku: "CAS-BAR-NAT-003",
      label: "Modelo 3",
      type: "model",

      attributes: {
        model: "Modelo 3",
      },

      priceCents: 4000,

      installments: {
        count: 1,
        valueCents: 4000,
      },

      yampiProductId: 301527132,
      yampiToken: "3GTSH4HDDD",
    },
  ],
},
// Produto 4
{
  id: "p4",
  title: "Colar em Barro com Cruz",
  slug: "colar-em-barro-com-cruz",
  group: "arte-em-barro",
  subcategory: "colares",
  description:
    "Elemento decorativo com textura manual e visual orgânico para estantes e nichos.",

  priceCents: 4000,
  installments: { count: 1, valueCents: 4000 },
  badges: ["destaque"],

  images: [
    {
      src: "/images/arte-em-barro/colares/cruz/colar-cruz.png",
      alt: "Colar decorativo artesanal em barro com cruz",
    },
  ],

  sku: "COL-BAR-CRUZ-001",
  yampiProductId: 301527954,
  yampiToken: "IYTUBDNSPW",
},
// Produto 5
{
  id: "p5",
  title: "Colar em Barro Folha",
  slug: "colar-em-barro-folha",
  group: "arte-em-barro",
  subcategory: "colares",
  description:
    "Vaso de linhas limpas com acabamento fosco para composição contemporânea.",

  priceCents: 4000,
  installments: { count: 1, valueCents: 4000 },
  badges: ["destaque"],

  images: [
    {
      src: "/images/arte-em-barro/colares/folha/colar-folha-branca.png",
      alt: "Colar artesanal em barro com folha branca",
    },
    {
      src: "public/images/arte-em-barro/colares/folha/colar-folha-sortida.png",
      alt: "Colar artesanal em barro com folhas sortidas",
    },
  ],

  variants: [
    {
      id: "colar-barro-folha-branco",
      sku: "COL-BAR-FOL-001",
      label: "Branco",
      type: "finish",

      attributes: {
        finish: "Branco",
      },

      yampiProductId: 301528573,
      yampiToken: "MNA80TFNB7",
    },
    {
      id: "colar-barro-folha-sortido",
      sku: "COL-BAR-FOL-002",
      label: "Sortido",
      type: "finish",

      attributes: {
        finish: "Sortido",
      },

      yampiProductId: 301528574,
      yampiToken: "ELP1TAH181",
    },
  ],
},
//Produto 6
// Produto 6
{
  id: "p6",
  title: "Móbile Artesanal em Barro",
  slug: "mobile-artesanal-em-barro",
  group: "arte-em-barro",
  subcategory: "colares",

  description:
    "Móbile artesanal em barro para decoração de paredes e ambientes com estilo natural e acolhedor.",

  priceCents: 12500,

  installments: {
    count: 1,
    valueCents: 12500,
  },

  badges: ["destaque"],

  images: [
    {
      src: "/images/arte-em-barro/mobile/mobile-barro.png",
      alt: "Móbile artesanal em barro branco",
    },
    {
      src: "/images/arte-em-barro/mobile/mobile-barro-sortido.png",
      alt: "Móbile artesanal em barro sortido",
    },
  ],

  variants: [
    {
      id: "mobile-em-barro-branco",
      sku: "MOB-BAR-NAT-001",
      label: "Branco",
      type: "finish",

      attributes: {
        finish: "Branco",
      },

      priceCents: 12500,

      installments: {
        count: 1,
        valueCents: 12500,
      },

      yampiProductId: 301653770,
      yampiToken: "IQZP9S33JI",
    },
    {
      id: "mobile-em-barro-sortido",
      sku: "MOB-BAR-NAT-002",
      label: "Sortido",
      type: "finish",

      attributes: {
        finish: "Sortido",
      },

      priceCents: 12500,

      installments: {
        count: 1,
        valueCents: 12500,
      },

      yampiProductId: 301653771,
      yampiToken: "TKKP00ECL3",
    },
  ],
},
// Produto 7
{
  id: "p7",
  title: "Colar em Barro Nossa Senhora",
  slug: "colar-em-barro-nossa-senhora",
  group: "arte-em-barro",
  subcategory: "colares",
  description:
    "Conjunto refinado para composições de mesa com acabamento premium.",

  priceCents: 4000,
  installments: { count: 12, valueCents: 2419 },
  badges: ["destaque"],

  images: [
    {
      src: "/images/arte-em-barro/colares/nossa senhora/colar-nossa-senhora.png",
      alt: "Colar artesanal em barro de Nossa Senhora",
    },
  ],

  sku: "COL-BAR-NSA-001",
  yampiProductId: 301528232,
  yampiToken: "ORLLVIRDRL",
},
// Produto 8
{
  id: "p8",
  title: "Terço Divino em Barro",
  slug: "terco-divino-em-barro",
  group: "arte-em-barro",
  subcategory: "colares",

  description:
    "Terço artesanal em barro para decoração de paredes, altares, aparadores e ambientes religiosos.",

  priceCents: 24000,

  installments: {
    count: 1,
    valueCents: 24000,
  },

  badges: ["destaque"],

  images: [
    {
      src: "/images/arte-em-barro/colares/terço/terço-divino-barro.png",
      alt: "Terço Divino artesanal em barro natural",
    },
    {
      src: "/images/arte-em-barro/colares/terço/terço-divino-branco.png",
      alt: "Terço Divino artesanal em barro branco",
    },
    {
      src: "public/images/arte-em-barro/colares/terço/terço-divino-sortido.png",
      alt: "Terço Divino artesanal em barro sortido",
    },
  ],

  variants: [
    {
      id: "terco-divino-em-barro-branco",
      sku: "TER-BAR-DIV-001",
      label: "Branco",
      type: "finish",

      attributes: {
        finish: "Branco",
      },

      priceCents: 24000,

      installments: {
        count: 1,
        valueCents: 24000,
      },

      yampiProductId: 301652922,
      yampiToken: "NBEGHO2PJF",
    },
    {
      id: "terco-divino-em-barro-sortido",
      sku: "TER-BAR-DIV-002",
      label: "Sortido",
      type: "finish",

      attributes: {
        finish: "Sortido",
      },

      priceCents: 24000,

      installments: {
        count: 1,
        valueCents: 24000,
      },

      yampiProductId: 301652929,
      yampiToken: "JWBSNPQDHW",
    },
    {
      id: "terco-divino-em-barro-natural",
      sku: "TER-BAR-DIV-003",
      label: "Natural",
      type: "finish",

      attributes: {
        finish: "Natural",
      },

      priceCents: 24000,

      installments: {
        count: 1,
        valueCents: 24000,
      },

      yampiProductId: 301652926,
      yampiToken: "286TZBH08Y",
    },
  ],
},
// Produto 9
{
  id: "p9",
  title: "Colar Arte em Barro Divino",
  slug: "colar-arte-em-barro-divino",
  group: "arte-em-barro",
  subcategory: "colares",
  description:
    "Peça regional de forte identidade cultural, ideal para ambientes com personalidade.",
  priceCents: 4000,
  installments: { count: 1, valueCents: 4000 },
  badges: ["destaque"],

  images: [
    {
      src: "/images/arte-em-barro/colares/divino/colar-divino.png",
      alt: "Colar artesanal em barro Divino na cor branca",
    },
    {
      src: "/images/arte-em-barro/colares/divino/colar-divino-sortido.png",
      alt: "Colar artesanal em barro Divino em cores sortidas",
    },
  ],

  variants: [
    {
      id: "colar-barro-divino-branco",
      sku: "COL-BAR-DIV-001",
      label: "Branco",
      type: "finish",

      attributes: {
        finish: "Branco",
      },

      yampiProductId: 301652204,
      yampiToken: "CJIZ4FLK65",
    },
    {
      id: "colar-barro-divino-sortido",
      sku: "COL-BAR-DIV-002",
      label: "Sortido",
      type: "finish",

      attributes: {
        finish: "Sortido",
      },

      yampiProductId: 301652205,
      yampiToken: "GUE7NPFALT",
    },
  ],
}
];

export function findProductBySlug(productSlug) {
  return products.find((product) => product.slug === productSlug) ?? null;
}

export function getProductsByGroup(groupSlug) {
  return products.filter((product) => product.group === groupSlug);
}

export function getProductsBySubcategory(groupSlug, subcategorySlug) {
  return products.filter(
    (product) =>
      product.group === groupSlug && product.subcategory === subcategorySlug,
  );
}

export function getFeaturedProducts(limit = 6) {
  return products.slice(0, limit);
}

export function getOfferProducts(limit = 3) {
  return products
    .filter(
      (product) => product.oldPriceCents || product.badges.includes("destaque"),
    )
    .slice(0, limit);
}