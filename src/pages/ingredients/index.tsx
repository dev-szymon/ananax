import React from 'react';
import { useInfiniteQuery } from 'react-query';
import IngredientCard from '../../components/IngredientCard';
import Layout from '../../components/Layout';
import Loader from '../../components/Loader';
import { TertiaryButton } from '../../components/styles';
import { IIngredientData } from '../../types/ingredients';

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
            <IngredientCard key={ingredient.id} ingredient={ingredient} />
          ));
        })}
        {hasNextPage && (
          <TertiaryButton onClick={() => fetchNextPage()}>
            fetch more...
          </TertiaryButton>
        )}
      </Layout>
    );
  }
  if (status === 'loading') {
    return <Loader />;
  }
}
