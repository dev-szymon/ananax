import React from 'react';
import Flex from './Flex';
import { IngredientSearchResultStyles } from './styles';

interface IIngredientSearchResultNutrients {
  kcal: INutrient;
  protein: INutrient;
  fats: INutrient;
  carbs: INutrient;
}

interface INutrient {
  value: number;
  unitName: string;
}

type INutrientLabel = keyof IIngredientSearchResultNutrients;

export interface IIngredientSearchResult {
  name: string;
  nutrients: IIngredientSearchResultNutrients;
}

interface IIngredientSearchResultProps {
  ingredient: IIngredientSearchResult;
}

const DISPLAY_NUTRIENTS: INutrientLabel[] = [
  'kcal',
  'protein',
  'fats',
  'carbs',
];

export default function IngredientSearchResult({
  ingredient,
}: IIngredientSearchResultProps) {
  const { name, nutrients } = ingredient;
  return (
    <IngredientSearchResultStyles>
      <h5>{name}</h5>
      <Flex style={{ maxWidth: '200px' }} justify="space-between">
        {DISPLAY_NUTRIENTS.map((nutrientLabel: INutrientLabel) => {
          return (
            <Flex direction="column" align="flex-end">
              <p className="nutrient-label">{nutrientLabel}</p>
              <div className="nutrient-value">
                {`${nutrients[nutrientLabel].value || 'n/a'}`}
              </div>
            </Flex>
          );
        })}
      </Flex>
    </IngredientSearchResultStyles>
  );
}
