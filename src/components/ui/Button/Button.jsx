import { Link } from 'react-router-dom';

export default function Button({ children, to, href, className = '', ...props }) {
  const finalClassName = `btn ${className}`.trim();

  if (to) {
    return (
      <Link className={finalClassName} to={to} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a className={finalClassName} href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={finalClassName} type="button" {...props}>
      {children}
    </button>
  );
}
