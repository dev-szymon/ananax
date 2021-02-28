import Header from './Header';
import { ReactNode, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Hamburger from './Hamburger';
import { ActionMenu } from '../components/styles/Buttons';

const Main = styled.main`
  max-width: 640px;
  margin: 0 auto;
`;

export default function Layout({ children }: { children: ReactNode }) {
  const [nav, setNav] = useState(false);
  return (
    <>
      <Header>
        <div className="header-inner">
          <Link href="/">
            <h2>Ananax</h2>
          </Link>
          <Hamburger open={nav} handler={setNav} />
        </div>
      </Header>
      <Main>
        {children}
        <ActionMenu>^</ActionMenu>
      </Main>
    </>
  );
}