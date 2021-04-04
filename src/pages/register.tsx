import React from 'react';
import Layout from '../components/Layout';
import SignUp from '../components/credentials/SignUp';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <Layout headerLabel="register">
      <div style={{ margin: '0 auto', maxWidth: '300px' }}>
        <SignUp />
        <div style={{ font: 'var(--typographySmall)', marginTop: '1rem' }}>
          <p>
            Already have an account? <Link href="/login">sign in!</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
