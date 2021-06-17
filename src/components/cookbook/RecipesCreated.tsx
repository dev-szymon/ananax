import React from 'react';
import { useQuery } from 'react-query';

import { IRecipeData } from '../../types/recipes';
import RecipeCard from '../RecipeCard';
import Loader from '../Loader';
import EmptyState from '../EmptyState';

interface IRecipesCreatedProps {
  userToken: string;
  id: string;
}

export default function IngredientsCreated({
  id,
  userToken,
}: IRecipesCreatedProps) {
  const { isLoading, data } = useQuery(
    `user-${id}-recipes-created`,
    async () => {
      const response = await fetch('/api/cookbook/recipes-created', {
        method: 'GET',
        headers: {
          token: userToken,
        },
        credentials: 'same-origin',
      });

      return await response.json();
    }
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {data.recipes.length > 0 ? (
        data.recipes.map((recipe: IRecipeData) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))
      ) : (
        <EmptyState />
      )}
    </>
  );
}
