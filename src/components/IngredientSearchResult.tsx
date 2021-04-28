import { Formik, Form, Field } from 'formik';
import React from 'react';
import { useIngredientsSelector } from '../context/ingredientsSelectorContext';
import { IIngredientData, NutrientKeys } from '../types/ingredients';
import Flex from './Flex';
import { AmountInputStyles, IngredientSearchResultStyles } from './styles';

const DISPLAY_NUTRIENTS: NutrientKeys[] = ['kcal', 'protein', 'fats', 'carbs'];

interface IIngredientSearchResultProps {
  ingredient: IIngredientData;
}

interface IInitialValues {
  [key: string]: number;
}

export default function IngredientSearchResult({
  ingredient,
}: IIngredientSearchResultProps) {
  const { ingredients, setIngredients } = useIngredientsSelector();
  const { name, nutrients, id } = ingredient;
  const contextAmount = ingredients[id] ? ingredients[id].amount : 0;

  const initialValues: IInitialValues = { [id]: contextAmount };
  return (
    <IngredientSearchResultStyles
      style={{
        backgroundColor:
          contextAmount > 0 ? 'var(--colorPrimary25)' : 'var(--colorLight)',
      }}
    >
      <h5>{name}</h5>
      <Flex justify="space-between">
        <Flex
          justify="space-between"
          style={{ width: '100%', maxWidth: '80%' }}
        >
          {DISPLAY_NUTRIENTS.map((nutrientKey) => {
            const { unitName, value } = nutrients[nutrientKey];
            const constructedLabel = unitName
              ? `${nutrientKey} [ ${unitName} ]`
              : nutrientKey;
            return (
              <Flex direction="column" align="flex-start" key={nutrientKey}>
                <p className="nutrient-label">{constructedLabel}</p>
                <div className="nutrient-value">{`${value || 'n/a'}`}</div>
              </Flex>
            );
          })}
        </Flex>
        <AmountInputStyles>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              if (values[id] > 0) {
                const ingredientContextData = {
                  ...ingredient,
                  amount: values[id],
                };
                setIngredients({
                  ...ingredients,
                  [id]: { ...ingredientContextData },
                });
              }
            }}
          >
            {(formProps) => (
              <Form>
                <Field
                  type="number"
                  onBlur={() => formProps.handleSubmit()}
                  name={id}
                  placeholder="amount [g]"
                />
              </Form>
            )}
          </Formik>
        </AmountInputStyles>
      </Flex>
    </IngredientSearchResultStyles>
  );
}
