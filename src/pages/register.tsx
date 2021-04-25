import React from 'react';
import Layout from '../components/Layout';
import SignUp from '../components/forms/SignUp';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <Layout headerLabel="register">
      <div style={{ margin: '0 auto', maxWidth: '300px' }}>
        <SignUp />
        <div style={{ font: 'var(--typographySmall)', marginTop: '1rem' }}>
          <p>
            <span>Already have an account?</span>
            <span style={{ marginLeft: '4px' }}>
              <Link href="/login">sign in!</Link>
            </span>
          </p>
        </div>
      </div>
    </Layout>
  );
}
