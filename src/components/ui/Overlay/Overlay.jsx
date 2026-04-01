export default function Overlay({ open, onClick }) {
  return (
    <button
      className={`overlay ${open ? 'is-open' : ''}`}
      aria-hidden={!open}
      tabIndex={open ? 0 : -1}
      onClick={onClick}
      type="button"
    />
  );
}
