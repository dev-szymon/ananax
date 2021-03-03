import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useUser } from '../components/credentials/useUser';
import { useUserContext } from '../context/context';
import { BtnBorderStyles, BtnFilledStyles } from '../components/styles/Buttons';
import Guest from '../components/credentials/Guest';
import styled from 'styled-components';

const ActionButtonsWrapper = styled.div`
  width: 100%;
  padding: var(--lengthMd1);
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
`;

export default function Home() {
  // const { user, loading } = useUser();

  const { user } = useUserContext();

  // if (loading) {
  //   return <p>loading...</p>;
  // }

  return (
    <Layout>
      <div className="home">
        <Head>
          <title>Ananax</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1 style={{ padding: '0 1rem' }}>Manage your diet!</h1>
        {!user ? (
          <>
            <Guest />
            <ActionButtonsWrapper>
              <BtnFilledStyles>
                <Link href="/signup">Sign Up!</Link>
              </BtnFilledStyles>
              <BtnBorderStyles>
                <Link href="/signin">Sign in</Link>
              </BtnBorderStyles>
            </ActionButtonsWrapper>
          </>
        ) : (
          <>
            <p>Logged in as:</p>
            <h3>{user.username}</h3>
            <p>id: {user.id}</p>
          </>
        )}
      </div>
    </Layout>
  );
}
