import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function DesktopMegaMenu({ groups }) {
  const [activeGroupSlug, setActiveGroupSlug] = useState(null);

  return (
    <nav className="desktop-mega-menu" aria-label="Categorias principais">
      <ul className="desktop-mega-menu__list">
        {groups.map((group) => {
          const isOpen = activeGroupSlug === group.slug;

          return (
            <li
              className="desktop-mega-menu__item"
              key={group.id}
              onMouseEnter={() => setActiveGroupSlug(group.slug)}
              onMouseLeave={() => setActiveGroupSlug(null)}
            >
              <div className="desktop-mega-menu__trigger-wrap">
                <Link
                  className="desktop-mega-menu__trigger"
                  to={`/${group.slug}`}
                  onFocus={() => setActiveGroupSlug(group.slug)}
                  aria-expanded={isOpen}
                  aria-controls={`mega-panel-${group.slug}`}
                >
                  {group.label}
                </Link>
              </div>

              <div
                className={`desktop-mega-menu__panel ${isOpen ? 'is-open' : ''}`}
                id={`mega-panel-${group.slug}`}
                onMouseEnter={() => setActiveGroupSlug(group.slug)}
                onMouseLeave={() => setActiveGroupSlug(null)}
              >
                <div className="desktop-mega-menu__panel-content">
                  <div className="desktop-mega-menu__intro">
                    <p className="desktop-mega-menu__eyebrow">{group.label}</p>
                    <p className="desktop-mega-menu__description">{group.description}</p>
                    <Link className="desktop-mega-menu__all-link" to={`/${group.slug}`}>
                      Ver tudo →
                    </Link>
                  </div>

                  <ul className="desktop-mega-menu__links">
                    {group.items.map((item) => (
                      <li key={item.id}>
                        <Link to={`/${group.slug}/${item.slug}`}>{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}