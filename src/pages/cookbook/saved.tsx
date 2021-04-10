import React from 'react';
import Layout from '../../components/Layout';

import Loader from '../../components/Loader';
import { useAuth } from '../../lib/auth';

export default function CookbookSaved() {
  const { user } = useAuth();
  if (user) {
    return (
      <Layout headerLabel="recipes saved">
        <p>recipes saved</p>
      </Layout>
    );
  }
  if (!user) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }
}
