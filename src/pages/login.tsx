import Layout from '../components/Layout';
import SignIn from '../components/credentials/SignIn';
import React from 'react';
import NextLink from 'next/link';
import { useAuth } from '../lib/auth';
import { useRouter } from 'next/router';
import { Box, Link, Spinner } from '@chakra-ui/react';

export default function SignInPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (!loading && user) {
    router.push('/');
    return <Spinner />;
  }

  if (!loading && !user) {
    return (
      <Layout>
        <Box margin="3rem auto 3rem" maxWidth="300px">
          <SignIn />
          <Box marginTop="1rem">
            <p>
              <span>Don't have an account yet?</span>
              <NextLink href="/register" passHref>
                <Link marginLeft="0.5rem" fontWeight="bold" color="pink.900">
                  sign up!
                </Link>
              </NextLink>
            </p>
          </Box>
        </Box>
      </Layout>
    );
  }
  return <Spinner />;
}
