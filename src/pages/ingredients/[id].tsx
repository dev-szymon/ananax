import Layout from '../../components/Layout';
import { GetServerSideProps } from 'next';
import {
  SingleIngredient,
  NutrientStyles,
  IngredientImage,
} from '../../components/styles';
import { SINGLE_INGREDIENT_QUERY } from '../../lib/queries';
// import { initializeApollo, addApolloState } from '../../lib/withApollo';
import { ApolloError } from '@apollo/client';
import { withApollo } from '../../lib/withApollo';

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
  error?: ApolloError | null;
}

const SingleIngredientPage = ({ ingredient, error }: SingleIngredientProps) => {
  // TODO
  // create error pages
  if (error) {
    return <p>Error</p>;
  }

  return (
    <Layout>
      ingre
      {/* <SingleIngredient>
        <h2>{ingredient.name}</h2>
        <IngredientImage src={ingredient.images[0]} />
        <>
          <NutrientStyles>
            <span className="nutrient-label">kcal</span>
            <span className="nutrient-value">{ingredient.kcal}</span>
          </NutrientStyles>
          <NutrientStyles>
            <span className="nutrient-label">carbs</span>
            <span className="nutrient-value">{ingredient.carbs}</span>
          </NutrientStyles>
          <NutrientStyles>
            <span className="nutrient-label">protein</span>
            <span className="nutrient-value">{ingredient.protein}</span>
          </NutrientStyles>
          <NutrientStyles>
            <span className="nutrient-label">fats</span>
            <span className="nutrient-value">{ingredient.fats}</span>
          </NutrientStyles>
          <NutrientStyles>
            <span className="nutrient-label">glycemic index</span>
            <span className="nutrient-value">{ingredient.glycemicIndex}</span>
          </NutrientStyles>
        </>
      </SingleIngredient> */}
    </Layout>
  );
};

export default SingleIngredientPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const { params } = ctx;
  console.log(ctx);
  // const apolloClient = initializeApollo();
  // if (!params) {
  //   return;
  // }

  // const {
  //   data: { getIngredient: ingredient },
  //   error,
  // } = await apolloClient.query({
  //   query: SINGLE_INGREDIENT_QUERY,
  //   variables: {
  //     id: params.id,
  //   },
  // });

  return {
    props: { ingredient: 'ingredient' },
  };
};
