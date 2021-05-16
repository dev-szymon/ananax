import React from 'react';
import { useIngredientsSelector } from '../context/ingredientsSelectorContext';
import { IIngredientData, NutrientKeys } from '../types/ingredients';
import Flex from './Flex';
import {
  AmountInputStyles,
  IngredientSearchResultDataContainer,
  IngredientSearchResultStyles,
} from './styles';

const DISPLAY_NUTRIENTS: NutrientKeys[] = ['kcal', 'protein', 'fats', 'carbs'];

interface IIngredientSearchResultProps {
  ingredient: IIngredientData;
}

export default function IngredientSearchResult({
  ingredient,
}: IIngredientSearchResultProps) {
  const { ingredients, setIngredients } = useIngredientsSelector();
  const { name, nutrients, id } = ingredient;
  const defaultContextAmount: { value: number; unitName: 'g' } = {
    value: 0,
    unitName: 'g',
  };
  const contextAmount = ingredients[id]
    ? ingredients[id].amount
    : defaultContextAmount;

  return (
    <IngredientSearchResultStyles
      style={{
        backgroundColor:
          contextAmount.value > 0
            ? 'var(--colorPrimary25)'
            : 'var(--colorLight)',
      }}
    >
      <h5>{name}</h5>
      <IngredientSearchResultDataContainer>
        {DISPLAY_NUTRIENTS.map((nutrientKey) => {
          const { unitName, value } = nutrients[nutrientKey];
          const constructedLabel = unitName
            ? `${nutrientKey} [ ${unitName} ]`
            : nutrientKey;
          return (
            <Flex direction="column" align="flex-start" key={nutrientKey}>
              <span className="nutrient-label">{constructedLabel}</span>
              <div className="nutrient-value">{`${value || 'n/a'}`}</div>
            </Flex>
          );
        })}
        <Flex direction="column" align="flex-end">
          <span className="nutrient-label">{` [ ${contextAmount.unitName} ]`}</span>
          <AmountInputStyles>
            <input
              style={{ textAlign: 'right', width: '100%' }}
              type="number"
              value={contextAmount.value}
              onChange={(e) => {
                setIngredients({
                  ...ingredients,
                  [id]: {
                    ...ingredient,
                    amount: {
                      value: Number(e.target.value),
                      unitName: contextAmount.unitName,
                    },
                  },
                });
              }}
            />
          </AmountInputStyles>
        </Flex>
      </IngredientSearchResultDataContainer>
    </IngredientSearchResultStyles>
  );
}
