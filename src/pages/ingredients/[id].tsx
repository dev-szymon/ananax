import Layout from '../../components/Layout';
import {
  SingleIngredient,
  NutrientStyles,
  IngredientImage,
} from '../../components/styles';

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
}
