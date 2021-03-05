import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../components/Layout';
import { useUser } from '../components/credentials/useUser';
import { BtnFilledStyles } from '../components/styles/Buttons';
import {
  SkeletonContainerStyles,
  SkeletonRowStyles,
} from '../components/styles/Containers';
import Guest from '../components/credentials/Guest';
import { RadiusShadow } from '../components/styles/Containers';
import { Caption } from '../components/styles/Forms';
import SignIn from '../components/credentials/SignIn';
import SignUp from '../components/credentials/SignUp';

export default function Home() {
  const [signin, setSignin] = useState(false);
  const { user, loading } = useUser();
  if (loading) {
    return (
      <Layout>
        <SkeletonContainerStyles>
          <SkeletonRowStyles width="100%" height="150px" />
          <SkeletonRowStyles width="150px" height="42px" />
          <SkeletonRowStyles width="150px" height="42px" />
        </SkeletonContainerStyles>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <Head>
          <title>Ananax</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1 style={{ padding: '0 1rem' }}>Manage your diet!</h1>
        <Guest />
        <RadiusShadow style={{ margin: '0 auto' }}>
          {signin ? <SignIn /> : <SignUp />}
          <Caption>
            <p>
              {signin
                ? `Don't have an account yet?`
                : `Already have an account?`}
            </p>
            <button onClick={() => setSignin(!signin)}>
              {signin ? `sign up!` : `sign in!`}
            </button>
          </Caption>
        </RadiusShadow>
      </Layout>
    );
  }

  if (user) {
    return (
      <Layout>
        <Head>
          <title>Ananax</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <p>Logged in as:</p>
        <h3>{user}</h3>
        <p>id: {user}</p>
        <Link href="/create-ingredient">
          <BtnFilledStyles>new ingredient</BtnFilledStyles>
        </Link>
        <Link href="/create-recipe">
          <BtnFilledStyles>new recipe</BtnFilledStyles>
        </Link>
      </Layout>
    );
  }
}
