import Layout from '../components/Layout';
import SignIn from '../components/credentials/SignIn';
import Guest from '../components/credentials/Guest';
import React from 'react';
import { RadiusShadow, Caption } from '../components/styles';
import Link from 'next/link';
import { withApollo } from '../lib/withApollo';

const SignInPage = () => {
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
};

export default withApollo({ ssr: false })(SignInPage);
