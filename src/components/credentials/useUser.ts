import { useQuery, gql } from '@apollo/client';

export const CURRENT_USER = gql`
  query {
    me {
      id
      username
      email
    }
  }
`;

interface MeQuery {
  data: {
    me: {
      id: string;
      username: string;
      email: string;
    };
  };
}

interface UseUser {
  user: MeQuery | undefined;
  loading: boolean;
}

export function useUser(): UseUser {
  const { data, loading } = useQuery(CURRENT_USER);
  return { user: data?.me, loading };
}
