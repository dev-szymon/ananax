import Header from './Header';
import React, { ReactNode } from 'react';
import Link from 'next/link';

import Navigation from '../components/Navigation';
import { PlainButton, BottomBar, Main } from './styles';
import { Colorlogo, CalendarDates, Home, Book, More } from '../images';
import { useAuth } from '../lib/auth';
import { MenuEnum, useMenu } from '../context/menuContext';
import { useRouter } from 'next/router';
import Flex from './Flex';

interface LayoutProps {
  children: ReactNode;
  headerLabel?: string;
  menuType?: MenuEnum;
}

export default function Layout({
  children,
  headerLabel,
  menuType,
}: LayoutProps) {
  const { menu, menuHandler } = useMenu();
  const { user } = useAuth();
  const router = useRouter();

  const isLoginPage =
    router.pathname === '/login' || router.pathname === '/register';

  return (
    <>
      <Header>
        <div className="header-inner">
          <Link href="/">
            <h2>
              <Colorlogo />
            </h2>
          </Link>
          <span style={{ font: 'var(--typographySmallBold)' }}>
            {headerLabel}
          </span>
          {!user && !isLoginPage && (
            <div
              style={{
                textAlign: 'right',
                font: 'var(--typographySmallBold)',
              }}
            >
              <Link href="/login">sign in</Link>
            </div>
          )}
        </div>
      </Header>
      {menu && <Navigation />}
      <Main>{children}</Main>
      {user && (
        <BottomBar>
          <div className="innerBottomBar">
            <Link href="/" passHref>
              <div>
                <Home />
              </div>
            </Link>
            <CalendarDates />
            <PlainButton onClick={() => menuHandler('COOKBOOK')}>
              <div style={{ width: '24px', height: '24px' }}>
                <Book fill={'black'} />
              </div>
            </PlainButton>
            <PlainButton
              type="button"
              onClick={() => menuHandler(menuType || 'DEFAULT')}
            >
              <div style={{ width: '2rem' }}>
                <More fill="var(--colorText)" />
              </div>
            </PlainButton>
          </div>
        </BottomBar>
      )}
    </>
  );
}
