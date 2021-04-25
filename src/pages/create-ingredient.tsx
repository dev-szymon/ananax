import React from 'react';
import IngredientCreator from '../components/creators/IngredientCreator/IngredientCreator';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import { useAuth } from '../lib/auth';

export default function CreateIngredient() {
  const { user } = useAuth();

  if (user) {
    return (
      <Layout>
        <IngredientCreator userToken={user.token} />
      </Layout>
    );
  }

  if (!user) {
    return <Loader />;
  }
}
