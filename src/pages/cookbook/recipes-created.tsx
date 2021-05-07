import React from 'react';
import RecipesCreated from '../../components/cookbook/RecipesCreated';
import Layout from '../../components/Layout';
import { useAuth } from '../../lib/auth';

export default function CookbookCreatedPage() {
  const { user } = useAuth();
  if (user) {
    return (
      <Layout headerLabel="ingredients created">
        <RecipesCreated userToken={user.token} />
      </Layout>
    );
  }
}
