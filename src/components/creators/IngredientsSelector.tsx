import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { BaseInputStyles, PrimaryButton } from '../styles';
import { IIngredientsSelectorContext } from '../../context/ingredientsSelectorContext';
import styled from 'styled-components';

const getNutrientData = (product: any, string: string) => {
  const n = product.foodNutrients.filter((nutrient: any) => {
    const { nutrientName, value, unitName } = nutrient;

    if (string === 'Energy') {
      if (nutrientName === string && unitName === 'KCAL') {
        const object = {
          amount: value,
          unitName: unitName,
        };
        return object;
      }
    } else if (nutrientName === string) {
      const object = {
        amount: value,
        unitName: unitName,
      };
      return object;
    }
  });

  return n[0];
};

const getData = (product: any) => {
  const { description, fdcId } = product;

  const data = {
    id: fdcId,
    source: 'usda',
    name: description,
    protein: getNutrientData(product, 'Protein'),
    kcal: getNutrientData(product, 'Energy'),
    fats: getNutrientData(product, 'Total lipid (fat)'),
    carbs: getNutrientData(product, 'Carbohydrate, by difference'),
  };

  return data;
};

const IngredientSelectorStyles = styled.div`
  height: calc(100vh - 5rem - 2px);
`;

const IngredientSelector = ({
  ingredients,
  setIngredients,
}: IIngredientsSelectorContext) => {
  const [results, setResults] = useState<any[] | null>(null);

  return (
    <IngredientSelectorStyles>
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
          <PrimaryButton type="submit">search</PrimaryButton>
        </Form>
      </Formik>
      <div style={{ height: '100%', overflowY: 'scroll' }}>
        {results &&
          results.map((r) => {
            return (
              <div key={r.id} style={{ padding: '4px 0' }}>
                <h5 style={{ font: 'var(--typographyBody)' }}>{r.name}</h5>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p style={{ font: 'var(--typographySmaller' }}>kcal</p>
                    <span style={{ font: 'var(--typographySmallBold' }}>
                      {r.kcal?.value}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p style={{ font: 'var(--typographySmaller' }}>protein</p>
                    <span style={{ font: 'var(--typographySmallBold' }}>
                      {r.protein?.value}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p style={{ font: 'var(--typographySmaller' }}>fats</p>
                    <span style={{ font: 'var(--typographySmallBold' }}>
                      {r.fats?.value}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p style={{ font: 'var(--typographySmaller' }}>carbs</p>
                    <span style={{ font: 'var(--typographySmallBold' }}>
                      {r.carbs?.value}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </IngredientSelectorStyles>
  );
};

export default IngredientSelector;
