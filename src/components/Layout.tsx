import Header from './Header';
import { ReactNode, useState } from 'react';
import Link from 'next/link';
import Hamburger from './Hamburger';

export default function Layout({ children }: { children: ReactNode }) {
  const [nav, setNav] = useState(false);
  return (
    <>
      <Header>
        <Link href="/">
          <h2>Ananax</h2>
        </Link>
        <Hamburger open={nav} handler={setNav} />
      </Header>
      <main>{children}</main>
    </>
  );
}
