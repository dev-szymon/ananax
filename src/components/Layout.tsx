import Header from './Header';
import React, { ReactNode, useState } from 'react';
import Link from 'next/link';

import Hamburger from './Hamburger';
import { useMutation, gql, useApolloClient, useQuery } from '@apollo/client';
import Navigation from '../components/Navigation';
import { PlainButton, BottomBar, Main, LoginLinkHeader } from './styles';
import { Colorlogo, CalendarDates, Home, Book } from '../images';
import { ME_QUERY } from '../lib/queries';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: ReactNode;
  headerLabel?: string;
  hideLogin?: boolean;
}

export default function Layout({
  children,
  headerLabel,
  hideLogin,
}: LayoutProps) {
  const [nav, setNav] = useState(false);
  const LOG_OUT = gql`
    mutation {
      logOut
    }
  `;

  const { data, loading } = useQuery(ME_QUERY, {
    skip: typeof window === 'undefined',
  });
  const [logOut] = useMutation(LOG_OUT);
  const apolloClient = useApolloClient();
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
          {!data && !loading && !hideLogin && (
            <LoginLinkHeader>
              <Link href="/login">sign in</Link>
            </LoginLinkHeader>
          )}
        </div>
      </Header>
      {nav && (
        <Navigation>
          <ul>
            {data && (
              <li>
                <PlainButton
                  onClick={async () => {
                    await logOut();
                    await apolloClient.clearStore();
                    router.pathname === '/'
                      ? router.reload()
                      : router.push('/');
                  }}
                >
                  logout
                </PlainButton>
              </li>
            )}
          </ul>
        </Navigation>
      )}
      <Main>{children}</Main>
      {data && (
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
      )}
    </>
  );
}
