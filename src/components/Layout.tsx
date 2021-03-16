import Header from './Header';
import { ReactNode, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Hamburger from './Hamburger';
import { useMutation, gql, useApolloClient, useQuery } from '@apollo/client';
import Navigation from '../components/Navigation';
import { PlainButton, BottomBar } from './styles';
import { Colorlogo, CalendarDates, Home, Book } from '../images';
import { ME_QUERY } from '../lib/queries';
import { useRouter } from 'next/router';

const Main = styled.main`
  max-width: 640px;
  margin: 0 auto;
`;

export default function Layout({ children }: { children: ReactNode }) {
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
          <Hamburger open={nav} handler={setNav} />
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
      <BottomBar>
        <Home />
        <CalendarDates />
        <Book />
      </BottomBar>
    </>
  );
}
