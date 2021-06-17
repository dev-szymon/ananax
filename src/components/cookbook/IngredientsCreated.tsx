import React from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';

import { IIngredientData } from '../../types/ingredients';
import EmptyState from '../EmptyState';
import IngredientCard from '../IngredientCard';
import Loader from '../Loader';
import { TertiaryButton } from '../styles';

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
    return <Loader />;
  }
  if (data) {
    return (
      <>
        {data.pages.map((page, i) => {
          return page.ingredients.map((ingredient: IIngredientData) => (
            <IngredientCard key={ingredient.id} ingredient={ingredient} />
          ));
        })}
        {hasNextPage && (
          <TertiaryButton onClick={() => fetchNextPage()}>
            fetch more...
          </TertiaryButton>
        )}
      </>
    );
  }
}
