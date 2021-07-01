import React from 'react';
import { useQuery } from 'react-query';

import { IRecipeData } from '../../types/recipes';
import Card from '../Card';
import EmptyState from '../EmptyState';
import { Spinner } from '@chakra-ui/react';

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
    return <Spinner />;
  }

  return (
    <>
      {data.recipes.length > 0 ? (
        data.recipes.map((recipe: IRecipeData) => (
          <Card key={recipe.id} node={recipe} />
        ))
      ) : (
        <EmptyState />
      )}
    </>
  );
}
