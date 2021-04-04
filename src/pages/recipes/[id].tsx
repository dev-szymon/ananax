import Layout from '../../components/Layout';
import {
  SingleIngredient,
  NutrientStyles,
  IngredientImage,
  SelectedIngredientStyles,
} from '../../components/styles';
import Link from 'next/link';

interface SingleRecipeProps {
  recipe: {
    id: string;
    name: string;
    images: string[];
    createdBy: { id: string; username: string };
    prepTime: number;
    description: string;
    ingredients: any[];
  };
}

export default function SingleRecipePage({ recipe }: SingleRecipeProps) {
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
          <pre style={{ fontFamily: 'var(--fontPrimary)' }}>
            {recipe.description}
          </pre>
        </>
      </SingleIngredient>
    </Layout>
  );
}
