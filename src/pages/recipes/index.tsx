import { Box, Spinner } from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import { IRecipeData } from '../../types/recipes';

export default function RecipesPage() {
  const { isLoading, data } = useQuery('allRecipes', async () => {
    const response = await fetch('/api/search-recipes', {
      method: 'GET',
      credentials: 'same-origin',
    });

    return await response.json();
  });

  if (data) {
    return (
      <Layout>
        <Box as="section" maxW="400px">
          {data.recipes.map((recipe: IRecipeData) => (
            <Card key={recipe.id} node={recipe} />
          ))}
        </Box>
      </Layout>
    );
  }
  if (isLoading) {
    return <Spinner />;
  }
}
