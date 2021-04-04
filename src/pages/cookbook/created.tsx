import React from 'react';
import Layout from '../../components/Layout';

import Loader from '../../components/Loader';
// import RecipeCard from '../../components/RecipeCard';
import Link from 'next/link';
import { PrimaryButton } from '../../components/styles';
import { useAuth } from '../../lib/auth';

export default function CookbookCreated() {
  const { user } = useAuth();
  if (user) {
    return (
      <Layout headerLabel="recipes created">
        <p>recipes created</p>
        {/* {recipesCreated.length === 0 ? (
          <p>no recipes created</p>
        ) : (
          recipesCreated.map((r) => <RecipeCard recipe={r} key={r.id} />)
        )} */}
        <Link href="/create-ingredient">
          <PrimaryButton>new ingredient</PrimaryButton>
        </Link>
        <Link href="/create-recipe">
          <PrimaryButton>new recipe</PrimaryButton>
        </Link>
      </Layout>
    );
  }
  if (!user) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }
}
