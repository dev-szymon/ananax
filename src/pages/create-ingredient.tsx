import Router from 'next/router';
import IngredientCreator from '../components/creators/IngredientCreator';
import Layout from '../components/Layout';

export default function CreateIngredient() {
  return (
    <Layout>
      <IngredientCreator />
    </Layout>
  );
}
