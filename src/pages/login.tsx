import Layout from '../components/Layout';
import SignIn from '../components/forms/SignIn';
import React from 'react';
import Link from 'next/link';
import { useAuth } from '../lib/auth';
import Loader from '../components/Loader';
import { useRouter } from 'next/router';

export default function SignInPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (!loading && user) {
    router.push('/');
    return <Loader />;
  }

  if (!loading && !user) {
    return (
      <Layout headerLabel="login">
        <div style={{ margin: '0 auto', maxWidth: '300px' }}>
          <SignIn />
          <div style={{ font: 'var(--typographySmall)', marginTop: '1rem' }}>
            <p>
              <span>Don't have an account yet?</span>
              <span style={{ marginLeft: '4px' }}>
                <Link href="/register">sign up!</Link>
              </span>
            </p>
          </div>
        </div>
      </Layout>
    );
  }
  return <Loader />;
}
