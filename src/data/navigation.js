export const navigationGroups = [
  {
    id: 'arte-em-barro',
    label: 'Arte em Barro',
    slug: 'arte-em-barro',
    shortLabel: 'Barro',
    icon: '🏺',
    description: 'Peças artesanais e autorais em cerâmica e barro.',
    items: [
      { id: 'aeb-esculturas', label: 'Esculturas', slug: 'esculturas' },
      { id: 'aeb-andorinhas', label: 'Andorinhas', slug: 'andorinhas' },
      { id: 'aeb-colares', label: 'Colares', slug: 'colares' },
      { id: 'aeb-pinhas', label: 'Pinhas', slug: 'pinhas' },
      { id: 'aeb-leao-do-norte', label: 'Leão do Norte', slug: 'leao-do-norte' },
      { id: 'aeb-vasos', label: 'Vasos', slug: 'vasos' },
    ],
  },
  {
    id: 'cozinha',
    label: 'Cozinha',
    slug: 'cozinha',
    shortLabel: 'Cozinha',
    icon: '🍽️',
    description: 'Itens funcionais para organização e beleza na cozinha.',
    items: [
      { id: 'cz-garrafas', label: 'Garrafas', slug: 'garrafas' },
      { id: 'cz-talheres', label: 'Talheres', slug: 'talheres' },
      { id: 'cz-panos', label: 'Panos de prato', slug: 'panos-de-prato' },
      { id: 'cz-copos', label: 'Copos', slug: 'copos' },
      { id: 'cz-organizadores', label: 'Organizadores', slug: 'organizadores' },
    ],
  },
  {
    id: 'decoracao',
    label: 'Decoração',
    slug: 'decoracao',
    shortLabel: 'Decorar',
    icon: '✨',
    description: 'Objetos que trazem identidade visual e aconchego.',
    items: [
      { id: 'dc-esculturas', label: 'Esculturas', slug: 'esculturas' },
      { id: 'dc-livros', label: 'Livros Decorativos', slug: 'livros-decorativos' },
      { id: 'dc-porta-retratos', label: 'Porta-retratos', slug: 'porta-retratos' },
    ],
  },
  {
    id: 'mesa-posta',
    label: 'Mesa Posta',
    slug: 'mesa-posta',
    shortLabel: 'Mesa',
    icon: '🍷',
    description: 'Peças para compor mesas elegantes e acolhedoras.',
    items: [
      { id: 'mp-americano', label: 'Americano', slug: 'americano' },
      { id: 'mp-sousplat', label: 'Sousplat', slug: 'sousplat' },
      { id: 'mp-pratos', label: 'Pratos', slug: 'pratos' },
    ],
  },
  {
    id: 'tecidos',
    label: 'Tecidos',
    slug: 'tecidos',
    shortLabel: 'Tecidos',
    icon: '🧵',
    description: 'Texturas e acabamentos para um ambiente mais acolhedor.',
    items: [
      { id: 'tc-tapecaria', label: 'Tapeçaria', slug: 'tapecaria' },
      { id: 'tc-mantas', label: 'Mantas', slug: 'mantas' },
      { id: 'tc-capas', label: 'Capas', slug: 'capas' },
    ],
  },
];

export function findGroupBySlug(groupSlug) {
  return navigationGroups.find((group) => group.slug === groupSlug) ?? null;
}

export function findSubcategory(groupSlug, subcategorySlug) {
  const group = findGroupBySlug(groupSlug);
  if (!group) return null;

  const subcategory = group.items.find((item) => item.slug === subcategorySlug) ?? null;

  return subcategory ? { group, subcategory } : null;
}
