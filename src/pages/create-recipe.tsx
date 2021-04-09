// import { useRouter } from 'next/router';
import React from 'react';
import IngredientSelector from '../components/creators/IngredientsSelector';
import RecipeCreator from '../components/creators/RecipeCreator';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import { useMenu } from '../context/menuContext';
import { useAuth } from '../lib/auth';

export default function CreateRecipe() {
  //   const router = useRouter();
  const { menu } = useMenu();
  const { user } = useAuth();

  if (user) {
    return (
      <Layout>
        {menu === 'SEARCH_INGREDIENTS' ? (
          <IngredientSelector />
        ) : (
          <RecipeCreator />
        )}
      </Layout>
    );
  }
  if (!user) {
    // router.replace('/login?next=' + router.pathname);
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }
}
