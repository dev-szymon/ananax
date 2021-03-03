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

interface User {
  id: string;
  username: string;
  email: string;
}

interface UseUser {
  user: User | undefined;
  loading: boolean;
}

export function useUser(): UseUser {
  const { data, loading } = useQuery(CURRENT_USER);
  return { user: data?.me, loading: loading };
}
