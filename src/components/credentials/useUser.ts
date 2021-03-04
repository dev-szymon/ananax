import { useQuery, gql, ApolloError } from '@apollo/client';
export const CURRENT_USER = gql`
  query {
    me {
      id
      username
      email
    }
  }
`;

interface User {
  id: string;
  username: string;
  email: string;
}

interface UseUser {
  user: User | undefined;
  loading: boolean;
  error: ApolloError;
}

export function useUser(): UseUser {
  const { data, loading, error } = useQuery(CURRENT_USER);
  return { user: data?.me, loading: loading, error: error };
}
