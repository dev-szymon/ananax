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

export function useUser() {
  const { data, loading } = useQuery(CURRENT_USER);
  return { user: data?.me, loading };
}
