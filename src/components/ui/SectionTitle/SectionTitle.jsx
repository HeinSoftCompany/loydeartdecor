import { useReveal } from '../../../hooks/useReveal.js';

export default function SectionTitle({ children }) {
  const revealRef = useReveal();

  return (
    <h2 className="section-title reveal" ref={revealRef}>
      {children}
    </h2>
  );
}
