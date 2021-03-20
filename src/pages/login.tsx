import Layout from '../components/Layout';
import SignIn from '../components/credentials/SignIn';
import Guest from '../components/credentials/Guest';
import React from 'react';
import { RadiusShadow, Caption } from '../components/styles';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <Layout headerLabel="sign in" hideLogin>
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
