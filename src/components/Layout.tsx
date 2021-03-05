import Header from './Header';
import { ReactNode, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Hamburger from './Hamburger';
import { useMutation, gql } from '@apollo/client';
import Navigation from '../components/Navigation';
import { PlainButton } from './styles/Buttons';
import { useUser } from '../components/credentials/useUser';
import { useDispatchUser } from '../context/context';

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
  const { user } = useUser();
  const [logOut] = useMutation(LOG_OUT);
  const dispatch = useDispatchUser();
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
            {user && (
              <li>
                <PlainButton
                  onClick={() => {
                    logOut();
                    dispatch({ type: 'SET_CURRENT_USER', currentUser: null });
                    setNav(false);
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
    </>
  );
}
