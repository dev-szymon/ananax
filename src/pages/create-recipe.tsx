import React from 'react';
import { Box, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import RecipeCreator from '../components/creators/RecipeCreator/RecipeCreator';
import Layout from '../components/Layout';
import { useAuth } from '../lib/auth';

export default function CreateRecipe() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (!loading && !user) {
    router.push('/login');
    return <Spinner />;
  }

  if (!loading && user) {
    return (
      <Layout>
        <Box as="section" p="1rem" w="100%" maxW="640px" m="0 auto">
          <RecipeCreator userToken={user.token} />
        </Box>
      </Layout>
    );
  }
  return <Spinner />;
}
