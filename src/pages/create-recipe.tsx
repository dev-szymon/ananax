import { Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import IngredientSelector from '../components/creators/RecipeCreator/IngredientsSelector';
import RecipeCreator from '../components/creators/RecipeCreator/RecipeCreator';
import Layout from '../components/Layout';
import { useMenu } from '../context/menuContext';
import { useAuth } from '../lib/auth';

export default function CreateRecipe() {
  const { menu } = useMenu();
  const { user, loading } = useAuth();
  const router = useRouter();

  if (!loading && !user) {
    router.push('/login');
    return <Spinner />;
  }

  if (!loading && user) {
    return (
      <Layout>
        {menu === 'SEARCH_INGREDIENTS' ? (
          <IngredientSelector />
        ) : (
          <RecipeCreator userToken={user.token} />
        )}
      </Layout>
    );
  }
  return <Spinner />;
}
