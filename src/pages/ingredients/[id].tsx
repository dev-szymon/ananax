import { gql, useQuery } from '@apollo/client';
import Layout from '../../components/Layout';
import {
  SingleIngredient,
  NutrientStyles,
  IngredientImage,
} from '../../components/styles/Ingredient';

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
    const ingredient = data.getIngredient;
    console.log(ingredient);
    return (
      <Layout>
        <SingleIngredient>
          <h2>{ingredient.name}</h2>
          <IngredientImage src={ingredient.images[0]} />
          <>
            <NutrientStyles>
              <span className="label">kcal</span>
              <span className="value">{ingredient.kcal}</span>
            </NutrientStyles>
            <NutrientStyles>
              <span className="label">carbs</span>
              <span className="value">{ingredient.carbs}</span>
            </NutrientStyles>
            <NutrientStyles>
              <span className="label">protein</span>
              <span className="value">{ingredient.protein}</span>
            </NutrientStyles>
            <NutrientStyles>
              <span className="label">fats</span>
              <span className="value">{ingredient.fats}</span>
            </NutrientStyles>
            <NutrientStyles>
              <span className="label">glycemic index</span>
              <span className="value">{ingredient.glycemicIndex}</span>
            </NutrientStyles>
          </>
        </SingleIngredient>
      </Layout>
    );
  }
}
