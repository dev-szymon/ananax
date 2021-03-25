import Header from './Header';
import React, { ReactNode, useState } from 'react';
import Link from 'next/link';

import Hamburger from './Hamburger';
import Navigation from '../components/Navigation';
import { PlainButton, BottomBar, Main, LoginLinkHeader } from './styles';
import { Colorlogo, CalendarDates, Home, Book } from '../images';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: ReactNode;
  headerLabel?: string;
}

export default function Layout({ children, headerLabel }: LayoutProps) {
  const [nav, setNav] = useState(false);

  const router = useRouter();
  return (
    <>
      <Header>
        <div className="header-inner">
          <Link href="/">
            <h2>
              <Colorlogo />
            </h2>
          </Link>
          <span className="header-label">{headerLabel}</span>
          <LoginLinkHeader>
            <Link href="/login">sign in</Link>
          </LoginLinkHeader>
        </div>
      </Header>
      {nav && (
        <Navigation>
          <ul>
            <li>
              <PlainButton
                onClick={() => {
                  console.log('logout');
                }}
              >
                logout
              </PlainButton>
            </li>
          </ul>
        </Navigation>
      )}
      <Main>{children}</Main>
      <BottomBar>
        <div className="innerBottomBar">
          <Link href="/" passHref>
            <div>
              <Home />
            </div>
          </Link>
          <CalendarDates />
          <Link href="/cookbook/created">
            <div>
              <Book />
            </div>
          </Link>
          <Hamburger open={nav} handler={setNav} />
        </div>
      </BottomBar>
    </>
  );
}
