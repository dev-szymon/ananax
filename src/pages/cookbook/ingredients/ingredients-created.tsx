import React from 'react';
import { useQuery } from 'react-query';
import IngredientCard from '../../../components/IngredientCard';
import Layout from '../../../components/Layout';

import Loader from '../../../components/Loader';
import { useAuth } from '../../../lib/auth';
import { IIngredientData } from '../../../lib/firestore';

export default function CookbookCreated() {
  const { user } = useAuth();
  const { isLoading, data } = useQuery('ingredients-created', async () => {
    const response = await fetch('/api/cookbook/ingredients-created', {
      method: 'GET',
      headers: {
        token: user ? user.token : '',
      },
      credentials: 'same-origin',
    });

    return await response.json();
  });

  if (data) {
    return (
      <Layout headerLabel="ingredients created">
        {data.ingredients.map((ingredient: IIngredientData) => (
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
