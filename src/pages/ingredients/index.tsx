import React from 'react';
import { useInfiniteQuery } from 'react-query';
import IngredientCard from '../../components/IngredientCard';
import Layout from '../../components/Layout';
import Loader from '../../components/Loader';
import { TertiaryButton } from '../../components/styles';
import { IIngredientData } from '../../types/ingredients';

export default function IngredientsPage() {
  const fetchIngr = async ({ pageParam }: { pageParam?: any }) => {
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
  } = useInfiniteQuery('allIngredientz', fetchIngr, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextCursor;
    },
  });

  if (data) {
    console.log(data);
    console.log(hasNextPage);
    return (
      <Layout>
        {data.pages.map((page, i) => {
          return page.ingredients.map((ingredient: IIngredientData) => (
            <IngredientCard key={ingredient.id} ingredient={ingredient} />
          ));
        })}
        <TertiaryButton onClick={() => fetchNextPage()}>
          fetch more...
        </TertiaryButton>
      </Layout>
    );
  }
  if (status === 'loading') {
    return <Loader />;
  }
}
