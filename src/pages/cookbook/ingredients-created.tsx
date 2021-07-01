import { Spinner } from '@chakra-ui/react';
import React from 'react';
import IngredientsCreated from '../../components/cookbook/IngredientsCreated';
import Layout from '../../components/Layout';
import { useAuth } from '../../lib/auth';

export default function CookbookCreatedPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }
  if (!loading && user) {
    return (
      <Layout>
        <IngredientsCreated userToken={user.token} id={user.uid} />
      </Layout>
    );
  }

  return <Layout>please sign in</Layout>;
}
