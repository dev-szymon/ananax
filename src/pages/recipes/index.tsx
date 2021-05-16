import React from 'react';
import { useQuery } from 'react-query';
import Layout from '../../components/Layout';
import Loader from '../../components/Loader';
import RecipeCard from '../../components/RecipeCard';
import { IRecipeData } from '../../types/recipes';

export default function RecipesPage() {
  const { isLoading, data } = useQuery('allRecipes', async () => {
    const response = await fetch('/api/search-recipes', {
      method: 'GET',
      credentials: 'same-origin',
    });

    return await response.json();
  });

  if (data) {
    return (
      <Layout>
        {data.recipes.map((recipe: IRecipeData) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </Layout>
    );
  }
  if (isLoading) {
    return <Loader />;
  }
}
