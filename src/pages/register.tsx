import Layout from '../components/Layout';
import SignUp from '../components/credentials/SignUp';
import Guest from '../components/credentials/Guest';
import React from 'react';
import Link from 'next/link';
import { RadiusShadow } from '../components/styles/Containers';
import { Caption } from '../components/styles/Forms';

export default function SignUpPage() {
  return (
    <Layout>
      <Guest />
      <RadiusShadow style={{ margin: '0 auto' }}>
        <SignUp />
        <Caption>
          <p>Already have an account?</p>
          <Link href="/login">sign inp!</Link>
        </Caption>
      </RadiusShadow>
    </Layout>
  );
}
