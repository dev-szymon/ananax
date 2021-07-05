import { Box, Button, Spinner } from '@chakra-ui/react';
import React from 'react';
import { useInfiniteQuery } from 'react-query';
import Layout from '../../components/Layout';
import RecipeCard from '../../components/RecipeCard';
import { IRecipeData } from '../../types/recipes';

export default function RecipesPage() {
  const fetchRecipes = async ({ pageParam }: { pageParam?: number }) => {
    const response = await fetch(`/api/search-recipes?cursor=${pageParam}`, {
      method: 'GET',
      credentials: 'same-origin',
    });

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
  } = useInfiniteQuery('allIngredients', fetchRecipes, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextCursor;
    },
  });

  if (data) {
    return (
      <Layout>
        <Box as="section" maxW="600px" m="0 auto">
          {data.pages.map((page) => {
            return page.recipes.map((recipe: IRecipeData) => (
              <RecipeCard key={recipe.id} node={recipe} />
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
