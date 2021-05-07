import React from 'react';
import { useQuery } from 'react-query';

import { IRecipeData } from '../../types/recipes';
import RecipeCard from '../RecipeCard';
import Loader from '../Loader';

interface IRecipesCreatedProps {
  userToken: string;
}

export default function IngredientsCreated({
  userToken,
}: IRecipesCreatedProps) {
  const { isLoading, data } = useQuery('recipes-created', async () => {
    const response = await fetch('/api/cookbook/recipes-created', {
      method: 'GET',
      headers: {
        token: userToken,
      },
      credentials: 'same-origin',
    });

    return await response.json();
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {data.recipes.map((recipe: IRecipeData) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </>
  );
}
