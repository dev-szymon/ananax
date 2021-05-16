import { useRouter } from 'next/router';
import React from 'react';
import IngredientCreator from '../components/creators/IngredientCreator/IngredientCreator';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import { useAuth } from '../lib/auth';

export default function CreateIngredient() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (!loading && !user) {
    router.push('/login');
    return <Loader />;
  }

  if (!loading && user) {
    return (
      <Layout>
        <IngredientCreator userToken={user.token} />
      </Layout>
    );
  }

  return <Loader />;
}
