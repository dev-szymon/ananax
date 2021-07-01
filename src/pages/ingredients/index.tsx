import React from 'react';
import { useInfiniteQuery } from 'react-query';
import Layout from '../../components/Layout';
import { IIngredientData } from '../../types/ingredients';
import { Spinner, Button } from '@chakra-ui/react';
import Card from '../../components/Card';

type Cursor = number;

export default function IngredientsPage() {
  const fetchIngr = async ({ pageParam }: { pageParam?: Cursor }) => {
    const response = await fetch(
      `/api/search-ingredients?cursor=${pageParam}`,
      {
        method: 'GET',
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
  } = useInfiniteQuery('allIngredients', fetchIngr, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextCursor;
    },
  });

  if (data) {
    return (
      <Layout>
        {data.pages.map((page, i) => {
          return page.ingredients.map((ingredient: IIngredientData) => (
            <Card key={ingredient.id} node={ingredient} />
          ));
        })}
        {hasNextPage && (
          <Button onClick={() => fetchNextPage()}>fetch more...</Button>
        )}
      </Layout>
    );
  }
  if (status === 'loading') {
    return <Spinner />;
  }
}
