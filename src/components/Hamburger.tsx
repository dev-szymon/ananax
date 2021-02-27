import styles from './Hamburger.module.css';
import { Dispatch, SetStateAction } from 'react';

interface HamburgerProps {
  open: boolean;
  handler: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

export default function Hamburger({
  open,
  handler,
  className,
}: HamburgerProps) {
  return (
    <button
      onClick={() => handler(!open)}
      className={`${styles.hamburgerbutton} ${className} ${
        open && styles.open
      }`}
    >
      <div className={styles.hamburgercontainer}>
        <div className={`${styles.hamburgerbar} ${open && styles.open}`}></div>
      </div>
    </button>
  );
}
