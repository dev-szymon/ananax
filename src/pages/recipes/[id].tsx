import Layout from '../../components/Layout';
import { GetServerSideProps } from 'next';
import {
  SingleIngredient,
  NutrientStyles,
  IngredientImage,
  SelectedIngredientStyles,
} from '../../components/styles';
import Link from 'next/link';
import { SearchQueryResultsType, SINGLE_RECIPE_QUERY } from '../../lib/queries';
import { initializeApollo, addApolloState } from '../../lib/apolloClient';
import { ApolloError } from '@apollo/client';

interface SingleRecipeProps {
  recipe: {
    id: string;
    name: string;
    images: string[];
    createdBy: { id: string; username: string };
    prepTime: number;
    description: string;
    ingredients: SearchQueryResultsType[];
  };
  error?: ApolloError | null;
}

export default function SingleRecipePage({ recipe, error }: SingleRecipeProps) {
  // TODO
  // create error pages
  if (error) {
    return <p>Error</p>;
  }

  return (
    <Layout>
      <SingleIngredient>
        <h2>{recipe.name}</h2>
        <IngredientImage src={recipe.images[0]} />
        <>
          <NutrientStyles>
            <span className="label">preparation time</span>
            <span className="value">{recipe.prepTime}</span>
          </NutrientStyles>
          <h3 style={{ marginBottom: '0.5rem' }}>Ingredients</h3>
          {recipe.ingredients.map((i) => (
            <Link href={`/ingredients/${i.id}`}>
              <SelectedIngredientStyles key={i.id}>
                <p>{i.name}</p>
              </SelectedIngredientStyles>
            </Link>
          ))}
          <h3 style={{ marginBottom: '0.5rem' }}>Preparation</h3>
          <pre style={{ fontFamily: 'var(--baseFont)' }}>
            {recipe.description}
          </pre>
        </>
      </SingleIngredient>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const apolloClient = initializeApollo();
  if (!params) {
    return;
  }

  const {
    data: { getRecipe: recipe },
    error,
  } = await apolloClient.query({
    query: SINGLE_RECIPE_QUERY,
    variables: {
      id: params.id,
    },
  });

  return addApolloState(apolloClient, {
    props: { recipe: recipe, error: error ? error : null },
  });
};
