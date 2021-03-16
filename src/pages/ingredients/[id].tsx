import Layout from '../../components/Layout';
import { GetServerSideProps } from 'next';
import {
  SingleIngredient,
  NutrientStyles,
  IngredientImage,
} from '../../components/styles';
import { SINGLE_INGREDIENT_QUERY } from '../../lib/queries';
import { initializeApollo, addApolloState } from '../../lib/apolloClient';

interface SingleIngredientProps {
  ingredient: {
    id: string;
    name: string;
    images: string[];
    kcal: number;
    carbs: number;
    protein: number;
    fats: number;
    glycemicIndex: number;
  };
}

export default function SingleIngredientPage({
  ingredient,
}: SingleIngredientProps) {
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  const {
    data: { getIngredient: ingredient },
  } = await apolloClient.query({
    query: SINGLE_INGREDIENT_QUERY,
    variables: {
      id: params.id,
    },
  });

  return addApolloState(apolloClient, {
    props: { ingredient: ingredient },
  });
};
