import IngredientCreator, {
  IngredientCreatorSkeleton,
} from '../components/creators/IngredientCreator';
import Layout from '../components/Layout';
import { useUser } from '../components/credentials/useUser';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatchUser } from '../context/context';

export default function CreateIngredient() {
  const { user, loading } = useUser();
  const router = useRouter();
  const dispatch = useDispatchUser();
  useEffect(() => {
    if (!(user || loading)) {
      dispatch({ type: 'SET_CURRENT_USER', currentUser: null });
      router.push('/');
    }
  }, [user, loading]);

  if (user) {
    return (
      <Layout>
        <IngredientCreator />
      </Layout>
    );
  }

  return (
    <Layout>
      <IngredientCreatorSkeleton />
    </Layout>
  );
}
