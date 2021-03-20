import React from 'react';
import Layout from '../../components/Layout';
import { useQuery } from '@apollo/client';
import {
  MeRecipesCreatedQuery,
  ME_RECIPES_CREATED_QUERY,
} from '../../lib/queries';
import Loader from '../../components/Loader';
import { useRouter } from 'next/router';
import { isServer } from '../../lib/isServer';
import RecipeCard from '../../components/RecipeCard';
import Link from 'next/link';
import { BtnFilledStyles } from '../../components/styles';

export default function CookbookCreated() {
  const { data, loading }: MeRecipesCreatedQuery = useQuery(
    ME_RECIPES_CREATED_QUERY,
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
    const { recipesCreated } = data.me;
    return (
      <Layout headerLabel="recipes created">
        {recipesCreated.length === 0 ? (
          <p>no recipes created</p>
        ) : (
          recipesCreated.map((r) => <RecipeCard recipe={r} key={r.id} />)
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
