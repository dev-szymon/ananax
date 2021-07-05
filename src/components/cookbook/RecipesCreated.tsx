import React from 'react';
import { useInfiniteQuery } from 'react-query';

import { IRecipeData } from '../../types/recipes';
import RecipeCard from '../RecipeCard';
import { Button, Spinner } from '@chakra-ui/react';

interface IRecipesCreatedProps {
  userToken: string;
  id: string;
}

export default function RecipesCreated({
  id,
  userToken,
}: IRecipesCreatedProps) {
  const fetchRecipes = async ({ pageParam }: { pageParam?: number }) => {
    const response = await fetch(
      `/api/cookbook/recipes-created?cursor=${pageParam}`,
      {
        method: 'GET',
        headers: {
          token: userToken,
        },
        credentials: 'same-origin',
      }
    );

    return await response.json();
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(`user-${id}-recipes-created`, fetchRecipes, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextCursor;
    },
  });

  if (status === 'loading') {
    return <Spinner />;
  }

  if (data) {
    return (
      <>
        {data.pages.map((page) => {
          return page.recipes.map((recipe: IRecipeData) => (
            <RecipeCard key={recipe.id} node={recipe} />
          ));
        })}
        {hasNextPage && (
          <Button onClick={() => fetchNextPage()}>fetch more...</Button>
        )}
      </>
    );
  }

  return null;
}
