import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { BaseInputStyles, PlainButton, PrimaryButton } from '../styles';
import {
  IIngredientsSelectorContext,
  useIngredientsSelector,
} from '../../context/ingredientsSelectorContext';
import styled from 'styled-components';
import { useMenu } from '../../context/menuContext';
import IngredientSearchResult from '../IngredientSearchResult';

const getNutrientData = (product: any, string: string) => {
  const n = product.foodNutrients.filter((nutrient: any) => {
    const { nutrientName, value, unitName } = nutrient;

    if (string === 'Energy') {
      if (nutrientName === string && unitName === 'KCAL') {
        const object = {
          amount: value || 'n/a',
          unitName: unitName,
        };
        return object;
      }
    } else if (nutrientName === string) {
      const object = {
        amount: value || 'n/a',
        unitName: unitName,
      };
      return object;
    }
  });

  return n[0] || 'n/a';
};

const getData = (product: any) => {
  const { description, fdcId } = product;

  const data = {
    id: fdcId,
    source: 'usda',
    name: description,
    nutrients: {
      protein: getNutrientData(product, 'Protein'),
      kcal: getNutrientData(product, 'Energy'),
      fats: getNutrientData(product, 'Total lipid (fat)'),
      carbs: getNutrientData(product, 'Carbohydrate, by difference'),
    },
  };

  return data;
};

const IngredientSelectorStyles = styled.div`
  padding: 4px 0.5rem 0 0.5rem;
  height: 100%;
`;

const IngredientSelector = () => {
  const [results, setResults] = useState<any[] | null>(null);
  const { ingredients, setIngredients } = useIngredientsSelector();
  const { menuHandler } = useMenu();

  return (
    <IngredientSelectorStyles>
      <div
        style={{
          position: 'sticky',
          top: '3rem',
          paddingTop: '4px',
          backgroundColor: 'var(--colorLight)',
        }}
      >
        <Formik
          initialValues={{ search: '' }}
          onSubmit={async (values) => {
            // const response = await fetch(
            //   'https://api.nal.usda.gov/fdc/v1/foods/list?api_key=tIhYSTVEHtMz4AcuBgeI0VnGi7ttWl3hfYYluwhV',
            //   {
            //     body: `{"dataType": ["Foundation"],  "pageSize": "200","sortOrder": "desc"}`,
            //     headers: {
            //       'Content-Type': 'application/json',
            //     },
            //     method: 'POST',
            //   }
            // );
            const response = await fetch(
              'https://api.nal.usda.gov/fdc/v1/foods/search?api_key=tIhYSTVEHtMz4AcuBgeI0VnGi7ttWl3hfYYluwhV',
              {
                body: `{"query": "${values.search}", "dataType": ["Foundation"], "pageSize": "1000", "sortOrder": "desc"}`,
                headers: {
                  'Content-Type': 'application/json',
                },
                method: 'POST',
              }
            );

            const items = await response.json();
            setResults([...items.foods.map((food: any) => getData(food))]);
          }}
        >
          <Form
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <BaseInputStyles>
              <Field
                type="search"
                name="search"
                placeholder="search ingredients..."
                autoComplete={'off'}
              />
            </BaseInputStyles>
            <PlainButton
              style={{
                color: 'var(--colorPrimary)',
                fontWeight: 'bold',
                padding: '0 0.25rem',
              }}
              type="submit"
            >
              search
            </PlainButton>
            <PlainButton
              style={{
                padding: '0 0.25rem',
              }}
              type="button"
              onClick={() => menuHandler(false)}
            >
              cancel
            </PlainButton>
          </Form>
        </Formik>
      </div>

      <div style={{ height: '100%' }}>
        {results &&
          results.map((ingredient) => (
            <IngredientSearchResult
              key={ingredient.id}
              ingredient={ingredient}
            />
          ))}
      </div>
    </IngredientSelectorStyles>
  );
};

export default IngredientSelector;
