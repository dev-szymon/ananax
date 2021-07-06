import React from 'react';
import { useInfiniteQuery } from 'react-query';
import Layout from '../../components/Layout';
import { IIngredientData } from '../../types/ingredients';
import { Spinner, Button, Box } from '@chakra-ui/react';
import IngredientCard from '../../components/IngredientCard';
import { fetchAllIngredients } from '../../lib/infiniteQuery';

export default function IngredientsPage() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery('allIngredients', fetchAllIngredients, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextCursor;
    },
  });

  if (data) {
    return (
      <Layout>
        <Box as="section" maxW="600px" m="0 auto">
          {data.pages.map((page) => {
            return page.ingredients.map((ingredient: IIngredientData) => (
              <IngredientCard key={ingredient.id} node={ingredient} />
            ));
          })}
          {hasNextPage && (
            <Button onClick={() => fetchNextPage()}>fetch more...</Button>
          )}
        </Box>
      </Layout>
    );
  }
  if (status === 'loading') {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }
}
