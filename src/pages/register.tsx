import React from 'react';
import Layout from '../components/Layout';
import SignUp from '../components/credentials/SignUp';
import NextLink from 'next/link';
import { useAuth } from '../lib/auth';
import { useRouter } from 'next/router';
import { Spinner, Link, Box } from '@chakra-ui/react';

export default function SignUpPage() {
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
          <SignUp />
          <Box marginTop="1rem">
            <p>
              <span>Already have an account?</span>
              <NextLink href="/login" passHref>
                <Link
                  marginLeft="0.5rem"
                  p="0.1rem 0.5rem"
                  borderRadius="0.5rem"
                  fontWeight="bold"
                  color="pink.900"
                >
                  sign in!
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
