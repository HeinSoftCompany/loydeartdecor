export default function MobileBottomNav({ groups, activeGroupSlug, onSelectGroup }) {
  return (
    <nav className="mobile-bottom-nav" aria-label="Categorias mobile">
      {groups.map((group) => (
        <button
          key={group.id}
          className={`mobile-bottom-nav__item ${activeGroupSlug === group.slug ? 'is-active' : ''}`}
          type="button"
          onClick={() => onSelectGroup(group.slug)}
          aria-label={group.label}
        >
          <span className="mobile-bottom-nav__icon" aria-hidden="true">
            {group.icon}
          </span>
          <span className="mobile-bottom-nav__label">{group.shortLabel}</span>
        </button>
      ))}
    </nav>
  );
}
