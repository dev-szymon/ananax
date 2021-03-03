import Header from './Header';
import { ReactNode, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Hamburger from './Hamburger';
import Navigation from '../components/Navigation';
import { gql, useMutation } from '@apollo/client';
import Router from 'next/router';
import { useDispatchUser } from '../context/context';
import { PlainButton } from './styles/Buttons';

const Main = styled.main`
  max-width: 640px;
  margin: 0 auto;
`;

export default function Layout({ children }: { children: ReactNode }) {
  const [nav, setNav] = useState(false);

  const dispatch = useDispatchUser();

  const LOG_OUT = gql`
    mutation {
      logOut
    }
  `;

  const [logOut] = useMutation(LOG_OUT, {
    onCompleted: (data) => {
      if (data.logOut) {
        dispatch({ type: 'LOG_OUT' });
        Router.push('/');
      }
    },
  });

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
      {nav && (
        <Navigation>
          <ul>
            <li>
              <PlainButton
                onClick={() => {
                  logOut();
                  Router.push('/');
                  setNav(false);
                }}
              >
                logout
              </PlainButton>
            </li>
          </ul>
        </Navigation>
      )}
      <Main>{children}</Main>
    </>
  );
}
