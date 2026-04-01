import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Overlay from '../../ui/Overlay/Overlay.jsx';
import { useLockBodyScroll } from '../../../hooks/useLockBodyScroll.js';

export default function MobileCategorySheet({ open, group, onClose }) {
  const panelRef = useRef(null);

  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      panelRef.current?.focus();
    }
  }, [open]);

  return (
    <>
      <Overlay open={open} onClick={onClose} />
      <aside
        aria-hidden={!open}
        aria-label={group?.label ?? 'Categorias'}
        className={`mobile-category-sheet ${open ? 'is-open' : ''}`}
        ref={panelRef}
        tabIndex={-1}
      >
        <div className="mobile-category-sheet__handle" />
        {group && (
          <>
            <div className="mobile-category-sheet__header">
              <div>
                <p className="mobile-category-sheet__eyebrow">{group.label}</p>
                <h3>{group.description}</h3>
              </div>

              <button className="mobile-category-sheet__close" onClick={onClose} type="button">
                Fechar
              </button>
            </div>

            <div className="mobile-category-sheet__content">
              <Link className="mobile-category-sheet__group-link" onClick={onClose} to={`/${group.slug}`}>
                Ver tudo em {group.label}
              </Link>

              <ul className="mobile-category-sheet__links">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <Link onClick={onClose} to={`/${group.slug}/${item.slug}`}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
