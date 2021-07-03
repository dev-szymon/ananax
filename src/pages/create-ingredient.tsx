import { Box, Flex, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import IngredientCreator from '../components/creators/IngredientCreator/IngredientCreator';
import Layout from '../components/Layout';
import { useAuth } from '../lib/auth';

export default function CreateIngredient() {
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
          <IngredientCreator userToken={user.token} />
        </Box>
      </Layout>
    );
  }

  return <Spinner />;
}
