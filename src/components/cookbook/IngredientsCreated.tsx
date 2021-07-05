import React from 'react';
import { useInfiniteQuery } from 'react-query';
import { IIngredientData } from '../../types/ingredients';
import { Button, Spinner } from '@chakra-ui/react';
import IngredientCard from '../IngredientCard';

interface IIngredientsCreatedProps {
  userToken: string;
  id: string;
}

type Cursor = number;

export default function IngredientsCreated({
  id,
  userToken,
}: IIngredientsCreatedProps) {
  const fetchIngr = async ({ pageParam }: { pageParam?: Cursor }) => {
    const response = await fetch(
      `/api/cookbook/ingredients-created?cursor=${pageParam}`,
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
  } = useInfiniteQuery(`user-${id}-ingredients-created`, fetchIngr, {
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
        {data.pages.map((page, i) => {
          return page.ingredients.map((ingredient: IIngredientData) => (
            <IngredientCard key={ingredient.id} node={ingredient} />
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
