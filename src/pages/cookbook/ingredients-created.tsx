import React from 'react';
import IngredientsCreated from '../../components/cookbook/IngredientsCreated';
import Layout from '../../components/Layout';
import { useAuth } from '../../lib/auth';

export default function CookbookCreatedPage() {
  const { user } = useAuth();
  if (user) {
    return (
      <Layout headerLabel="ingredients created">
        <IngredientsCreated userToken={user.token} />
      </Layout>
    );
  }
}
