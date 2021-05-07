import React from 'react';
import { useQuery } from 'react-query';
import IngredientCard from '../../components/IngredientCard';
import Layout from '../../components/Layout';
import Loader from '../../components/Loader';
import { IIngredientData } from '../../types/ingredients';

export default function IngredientsPage() {
  const { isLoading, data } = useQuery('ingredients', async () => {
    const response = await fetch('/api/search-ingredients', {
      method: 'GET',
      credentials: 'same-origin',
    });

    return await response.json();
  });

  if (data) {
    return (
      <Layout>
        {data.ingredients.map((ingredient: IIngredientData) => (
          <IngredientCard key={ingredient.id} ingredient={ingredient} />
        ))}
      </Layout>
    );
  }
  if (isLoading) {
    return <Loader></Loader>;
  }
}
