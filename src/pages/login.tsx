import Layout from '../components/Layout';
import SignIn from '../components/credentials/SignIn';
import React from 'react';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <Layout headerLabel="sign in">
      <div style={{ margin: '0 auto', maxWidth: '300px' }}>
        <SignIn />
        <div style={{ font: 'var(--typographySmall)', marginTop: '1rem' }}>
          <p>
            Don't have an account yet? <Link href="/register">sign up!</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
