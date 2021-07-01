import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';

import { useMenu } from '../../../context/menuContext';
import { IIngredientData } from '../../../types/ingredients';
import IngredientSearchResult from '../../IngredientSearchResult';
import { Box, Button, Flex } from '@chakra-ui/react';

const IngredientSelector = () => {
  const [results, setResults] = useState<any[] | null>(null);
  const { menuHandler } = useMenu();

  return (
    <Box>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <div className="ingredient-selector_search">
          <Formik
            initialValues={{ search: '' }}
            onSubmit={async (values) => {
              const response = await fetch(
                `/api/search-ingredients/${values.search}`
              );

              const { ingredients }: { ingredients: IIngredientData[] } =
                await response.json();

              setResults([...ingredients]);
            }}
          >
            <Form>
              <Flex align="center" justify="space-between">
                <Field
                  type="search"
                  name="search"
                  placeholder="search ingredients..."
                  autoComplete={'off'}
                />
                <Button type="submit">search</Button>
                <Button
                  style={{
                    padding: '0 0.25rem',
                  }}
                  type="button"
                  onClick={() => menuHandler(false)}
                >
                  cancel
                </Button>
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
      </div>
    </Box>
  );
};

export default IngredientSelector;
