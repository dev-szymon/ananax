import { gql, useQuery } from '@apollo/client';
import Layout from '../../components/Layout';
import { SingleIngredient } from '../../components/styles/Ingredient';

interface Props {
  query: {
    id: string;
  };
}

export default function SingleIngredientPage({ query }: Props) {
  const SINGLE_INGREDIENT_QUERY = gql`
    query getIngredient($id: ID!) {
      getIngredient(id: $id) {
        id
        name
        images
        kcal
        carbs
        protein
        fats
        glycemicIndex
      }
    }
  `;

  const { data, error, loading } = useQuery(SINGLE_INGREDIENT_QUERY, {
    variables: { id: query.id },
  });

  if (error) {
    console.log(error);
    return <p>error</p>;
  }
  if (loading) {
    return <p>loading...</p>;
  }
  if (data) {
    return (
      <Layout>
        <SingleIngredient>
          <h2>{data.getIngredient.name}</h2>
        </SingleIngredient>
      </Layout>
    );
  }
}
