import Header from './Header';
import React, { ReactNode } from 'react';
import Link from 'next/link';

import Navigation from '../components/Navigation';
import { PlainButton, Main } from './styles';
import { Colorlogo, More } from '../images';
import { useAuth } from '../lib/auth';
import { MenuEnum, useMenu } from '../context/menuContext';
import { useRouter } from 'next/router';

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
          <PlainButton onClick={() => menuHandler('NAVIGATION')}>
            <More fill="var(--colorText)" />
          </PlainButton>
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
    </>
  );
}
