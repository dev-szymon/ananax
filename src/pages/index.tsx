import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useUser } from '../components/credentials/useUser';
import { BtnBorderStyles, BtnFilledStyles } from '../components/styles/Buttons';
import styled from 'styled-components';
import { useEffect } from 'react';

const ActionButtonsWrapper = styled.div`
  width: 60%;
  padding: var(--lengthMd1);
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
`;

export default function Home() {
  const { user, loading, error } = useUser();

  if (loading) {
    return <p>loading...</p>;
  }

  if (user) {
    return (
      <Layout>
        <Head>
          <title>Ananax</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <p>Logged in as:</p>
        <h3>{user.username}</h3>
        <p>id: {user.id}</p>
        <BtnFilledStyles>
          <Link href="/create-ingredient">new ingredient</Link>
        </BtnFilledStyles>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Head>
          <title>Ananax</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1 style={{ padding: '0 1rem' }}>Manage your diet!</h1>
        <>
          <ActionButtonsWrapper>
            <Link href="/signup">
              <BtnFilledStyles>Sign Up! </BtnFilledStyles>
            </Link>
            <Link href="/signin">
              <BtnBorderStyles>Sign in</BtnBorderStyles>
            </Link>
          </ActionButtonsWrapper>
        </>
      </Layout>
    );
  }
}
