import Layout from '../components/Layout';
import SignIn from '../components/credentials/SignIn';
import Guest from '../components/credentials/Guest';
import React from 'react';
import { RadiusShadow } from '../components/styles/Containers';
import { Caption } from '../components/styles/Forms';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <Layout>
      <Guest />
      <RadiusShadow style={{ margin: '0 auto' }}>
        <SignIn />
        <Caption>
          <p>Don't have an account yet?</p>
          <Link href="/register">sign up!</Link>
        </Caption>
      </RadiusShadow>
    </Layout>
  );
}
