import React from 'react';
import { useQuery } from 'react-query';
import IngredientCard from '../../../components/IngredientCard';
import Layout from '../../../components/Layout';

import Loader from '../../../components/Loader';
import { useAuth } from '../../../lib/auth';
import { getUserIngredientsCreated } from '../../../lib/firestore';

export default function CookbookCreated() {
  const { user } = useAuth();
  const { isLoading, data } = useQuery(
    'ingredients-created',
    async () => await getUserIngredientsCreated(user ? user.uid : null)
  );

  if (data) {
    return (
      <Layout headerLabel="ingredients created">
        {data.ingredients.map((ingredient) => (
          <IngredientCard key={ingredient.id} ingredient={ingredient} />
        ))}
      </Layout>
    );
  }
  if (isLoading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }
}
