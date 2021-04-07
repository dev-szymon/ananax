import React from 'react';
import Layout from '../../components/Layout';

import Loader from '../../components/Loader';
import { useAuth } from '../../lib/auth';

export default function CookbookCreated() {
  const { user } = useAuth();
  if (user) {
    return (
      <Layout headerLabel="recipes created">
        <p>recipes created</p>
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
