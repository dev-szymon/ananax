import React from 'react';
import IngredientsCreated from '../../components/cookbook/IngredientsCreated';
import Layout from '../../components/Layout';
import Loader from '../../components/Loader';
import { useAuth } from '../../lib/auth';

export default function CookbookCreatedPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }
  if (!loading && user) {
    return (
      <Layout headerLabel="ingredients created">
        <IngredientsCreated userToken={user.token} />
      </Layout>
    );
  }

  return <Layout>please sign in</Layout>;
}
