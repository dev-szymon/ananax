import { useQuery, gql, ApolloError } from '@apollo/client';
import { useDispatchUser, useUserContext } from '../../context/context';
export const CURRENT_USER = gql`
  query {
    me {
      id
      username
      email
    }
  }
`;

interface UseUser {
  user: string | null;
  loading: boolean;
  error: ApolloError;
}
export function useUser(): UseUser {
  const dispatch = useDispatchUser();
  const { currentUser } = useUserContext();

  const { data, loading, error } = useQuery(CURRENT_USER, {
    onCompleted: (data) => {
      if (data.me) {
        dispatch({
          type: 'SET_CURRENT_USER',
          currentUser: data.me.id,
        });
      }
      if (data.me === undefined && !loading) {
        dispatch({ type: 'SET_CURRENT_USER', currentUser: null });
      }
    },
  });

  return {
    user: currentUser && !loading ? data?.me.id : null,
    loading: loading,
    error: error,
  };
}
