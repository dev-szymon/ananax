import React from 'react';
import IngredientCreator from '../components/creators/IngredientCreator';
import Layout from '../components/Layout';
import { useQuery } from '@apollo/client';
import { ME_QUERY } from '../lib/queries/MeQuery';
import Loader from '../components/Loader';
import { useRouter } from 'next/router';
import { isServer } from '../lib/isServer';

export default function CreateIngredient() {
  const { data, loading } = useQuery(ME_QUERY, {
    skip: typeof window === 'undefined',
  });
  const router = useRouter();

  if (loading || isServer) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  if (data?.me) {
    return (
      <Layout>
        <IngredientCreator />
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
