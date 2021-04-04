// import { useRouter } from 'next/router';
import React from 'react';
import RecipeCreator from '../components/creators/RecipeCreator';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import { useAuth } from '../lib/auth';

export default function CreateRecipe() {
  //   const router = useRouter();
  const { user } = useAuth();

  if (user) {
    return (
      <Layout>
        <RecipeCreator />
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
