import React from 'react';
import RecipesCreated from '../../components/cookbook/RecipesCreated';
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
        <RecipesCreated userToken={user.token} />
      </Layout>
    );
  }

  return <Layout>please sign in</Layout>;
}
