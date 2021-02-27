import { ReactNode } from 'react';
import styles from './Header.module.css';

export default function Header({ children }: { children?: ReactNode }) {
  return <header className={styles.appheader}>{children}</header>;
}
