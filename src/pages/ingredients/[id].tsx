import React from 'react';
import Layout from '../../components/Layout';
import {
  SingleIngredient,
  NutrientStyles,
  IngredientImage,
} from '../../components/styles';
import { SINGLE_INGREDIENT_QUERY } from '../../lib/queries';
import { useQuery } from '@apollo/client';
import { withApollo } from '../../lib/withApollo';
import { useRouter } from 'next/router';
import Loader from '../../components/Loader';

interface IIngredient {
  id: string;
  name: string;
  images: string[];
  kcal: number;
  carbs: number;
  protein: number;
  fats: number;
  glycemicIndex: number;
}

const SingleIngredientPage = () => {
  const router = useRouter();

  const ingredientID = router.query.id;

  const { data, loading, error } = useQuery(SINGLE_INGREDIENT_QUERY, {
    variables: { id: ingredientID },
  });

  const ingredient: IIngredient = data?.getIngredient;
  console.log(ingredient);

  if (loading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  // TODO
  // create error pages
  if (error) {
    return <p>Error</p>;
  }

  return (
    <Layout>
      <SingleIngredient>
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
      </SingleIngredient>
    </Layout>
  );
};

// export const getServerSideProps = (ctx: any) => {
//   const { params } = ctx;
//   if (!params) {
//     return;
//   }

//   return {
//     props: { ingredientID: params.id },
//   };
// };

export default withApollo({ ssr: true })(SingleIngredientPage);
