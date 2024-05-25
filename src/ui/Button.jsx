/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

function Button({ children, disabled, to, type, onClick }) {
  const base =
    'inline-block text-sm rounded-full bg-teal-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-teal-300 focus:bg-teal-300 focus:outline-none focus:ring focus:ring-teal-300 focus:ring-offset-2 disabled:cursor-not-allowed';

  const styles = {
    primary: base + ' px-3 py-2 md:px-6 md:py-4',
    small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
    xsmall: base + ' px-3 py-1 text-sm',
    quant: base + ' px-2 py-0.5 text-sm flex-grow-0 disabled:bg-stone-300',
    secondary:
      '  inline-block text-sm rounded-full border-2 border-stone-500 font-semibold uppercase tracking-wide text-stone-600 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-3 py-2 md:px-6 md:py-3.5',
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick) {
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );
  }

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
