import Layout from '../../components/Layout';
import {
  SingleIngredient,
  NutrientStyles,
  IngredientImage,
  SelectedIngredientStyles,
} from '../../components/styles';
import Link from 'next/link';
import { SearchQueryResultsType, SINGLE_RECIPE_QUERY } from '../../lib/queries';
import { useQuery } from '@apollo/client';
import { withApollo } from '../../lib/withApollo';

interface IRecipe {
  id: string;
  name: string;
  images: string[];
  createdBy: { id: string; username: string };
  prepTime: number;
  description: string;
  ingredients: SearchQueryResultsType[];
}

const SingleRecipePage = ({ recipeID }: { recipeID: string }) => {
  const { data, loading, error } = useQuery(SINGLE_RECIPE_QUERY, {
    variables: { id: recipeID },
  });

  const recipe: IRecipe = data?.getRecipe;

  // TODO
  // create error pages
  if (error) {
    return <p>Error</p>;
  }

  if (data) {
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
              <Link key={i.id} href={`/ingredients/${i.id}`}>
                <SelectedIngredientStyles>
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
};

export const getServerSideProps = async (ctx: any) => {
  const { params } = ctx;
  if (!params) {
    return;
  }

  return {
    props: { recipeID: params.id },
  };
};

export default withApollo({ ssr: true })(SingleRecipePage);
