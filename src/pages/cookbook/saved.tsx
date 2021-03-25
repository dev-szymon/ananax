import React from 'react';
import Layout from '../../components/Layout';
import { useQuery } from '@apollo/client';
import { MeRecipesSavedQuery, ME_RECIPES_SAVED_QUERY } from '../../lib/queries';
import Loader from '../../components/Loader';
import { useRouter } from 'next/router';
import { isServer } from '../../lib/isServer';
import RecipeCard from '../../components/RecipeCard';
import Link from 'next/link';
import { BtnFilledStyles } from '../../components/styles';
import { initializeApollo, addApolloState } from '../../lib/apolloClient';

export default function CookbookSaved() {
  const { data, loading }: MeRecipesSavedQuery = useQuery(
    ME_RECIPES_SAVED_QUERY,
    {
      skip: isServer,
    }
  );
  const router = useRouter();

  if (loading || isServer) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  if (data?.me) {
    const { recipesSaved } = data.me;
    return (
      <Layout headerLabel="recipes saved">
        {recipesSaved.length === 0 ? (
          <p>no recipes saved</p>
        ) : (
          recipesSaved.map((r) => <RecipeCard recipe={r} key={r.id} />)
        )}
        <Link href="/create-ingredient">
          <BtnFilledStyles>new ingredient</BtnFilledStyles>
        </Link>

        <Link href="/create-recipe">
          <BtnFilledStyles>new recipe</BtnFilledStyles>
        </Link>
      </Layout>
    );
  }
  if (!loading && !data?.me) {
    router.replace('/login?next=' + router.pathname);
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }
}

export const getServerSideProps = async (ctx: any) => {
  const apolloClient = initializeApollo(null, ctx);

  return addApolloState(apolloClient, { props: {} });
};
