import { useQuery } from '@apollo/client';
import Layout from '../../components/Layout';
import Loader from '../../components/Loader';
import { RecipesQuery, RECIPES_QUERY } from '../../lib/queries';
import RecipeCard from '../../components/RecipeCard';

export default function RecipesPage() {
  const { data, loading, error }: RecipesQuery = useQuery(RECIPES_QUERY);

  if (loading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }
  if (data) {
    return (
      <Layout>
        {data.getRecipes.map((r) => (
          <RecipeCard recipe={r} key={r.id} />
        ))}
      </Layout>
    );
  }
}
