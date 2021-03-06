import RecipeCreator, {
  RecipeCreatorSkeleton,
} from '../components/creators/RecipeCreator';
import Layout from '../components/Layout';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../components/credentials/useUser';

export default function CreateIngredient() {
  const { user, loading } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!(user || loading)) {
      router.push('/');
    }
  }, [user, loading]);

  if (user) {
    return (
      <Layout>
        <RecipeCreator />
      </Layout>
    );
  }

  return (
    <Layout>
      <RecipeCreatorSkeleton />
    </Layout>
  );
}
