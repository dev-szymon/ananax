import Layout from '../components/Layout';
import SignUp from '../components/credentials/SignUp';
import Guest from '../components/credentials/Guest';
import React from 'react';
import Link from 'next/link';
import { RadiusShadow, Caption } from '../components/styles';
import { withApollo } from '../lib/withApollo';

const SignUpPage = () => {
  return (
    <Layout headerLabel="register" hideLogin>
      <Guest />
      <RadiusShadow style={{ margin: '0 auto' }}>
        <SignUp />
        <Caption>
          <p>Already have an account?</p>
          <Link href="/login">sign in!</Link>
        </Caption>
      </RadiusShadow>
    </Layout>
  );
};

export default withApollo({ ssr: false })(SignUpPage);
