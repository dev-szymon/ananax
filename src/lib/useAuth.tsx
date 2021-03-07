import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { ME_QUERY } from './queries/MeQuery';

export const useAuth = () => {
  const { data, loading } = useQuery(ME_QUERY);
  const router = useRouter();
  useEffect(() => {
    if (!loading && !data?.me) {
      router.replace('/login?next=' + router.pathname);
    }
  }, [loading, data, router]);
};
