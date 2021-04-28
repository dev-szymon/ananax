import React, { useState } from 'react';
import styled from 'styled-components';
import { Field, Form, Formik } from 'formik';

import { useMenu } from '../../../context/menuContext';
import { IIngredientData } from '../../../types/ingredients';
import { BaseInputStyles, PlainButton } from '../../styles';
import IngredientSearchResult from '../../IngredientSearchResult';
import Flex from '../../Flex';

const IngredientSelectorStyles = styled.div`
  padding: 4px 0 0 0;
  height: 100%;
  .ingredient-selector_search {
    padding: 0 0.25rem;
    position: sticky;
    top: 0;
    padding-top: 4px;
    background-color: var(--colorLight);
  }
`;

const IngredientSelector = () => {
  const [results, setResults] = useState<any[] | null>(null);
  const { menuHandler } = useMenu();

  return (
    <IngredientSelectorStyles>
      <div className="ingredient-selector_search">
        <Formik
          initialValues={{ search: '' }}
          onSubmit={async (values) => {
            const response = await fetch(
              `/api/search-ingredients/${values.search}`
            );

            const {
              ingredients,
            }: { ingredients: IIngredientData[] } = await response.json();

            setResults([...ingredients]);
          }}
        >
          <Form>
            <Flex align="center" justify="space-between">
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
            </Flex>
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
