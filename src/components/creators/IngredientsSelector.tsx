import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { BaseInputStyles, PlainButton } from '../styles';
import { useIngredientsSelector } from '../../context/ingredientsSelectorContext';
import styled from 'styled-components';
import { useMenu } from '../../context/menuContext';
import IngredientSearchResult from '../IngredientSearchResult';
import { getUsdaData, getInternalData } from '../../lib/parsers';
import { IIngredientData } from '../../types/ingredients';

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
          top: '0',
          paddingTop: '4px',
          backgroundColor: 'var(--colorLight)',
        }}
      >
        <Formik
          initialValues={{ search: '' }}
          onSubmit={async (values) => {
            const responseUSDA = await fetch(
              'https://api.nal.usda.gov/fdc/v1/foods/search?api_key=tIhYSTVEHtMz4AcuBgeI0VnGi7ttWl3hfYYluwhV',
              {
                body: `{"query": "${values.search}", "dataType": ["Foundation"], "pageSize": "1000", "sortOrder": "desc"}`,
                headers: {
                  'Content-Type': 'application/json',
                },
                method: 'POST',
              }
            );

            const responseInternal = await fetch(
              `/api/search-ingredients/${values.search}`
            );

            const itemsInternal = await responseInternal.json();

            const itemsUSDA = await responseUSDA.json();
            setResults([
              ...itemsInternal.ingredients.ingredients.map(
                (food: IIngredientData) => getInternalData(food)
              ),
              ...itemsUSDA.foods.map((food: any) => getUsdaData(food)),
            ]);
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
