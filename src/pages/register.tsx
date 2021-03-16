import Layout from '../components/Layout';
import SignUp from '../components/credentials/SignUp';
import Guest from '../components/credentials/Guest';
import React from 'react';
import Link from 'next/link';
import { RadiusShadow, Caption } from '../components/styles';

export default function SignUpPage() {
  return (
    <Layout>
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
}
