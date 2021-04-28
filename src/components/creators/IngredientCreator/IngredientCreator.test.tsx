import React from 'react';
import { render } from '@testing-library/react';
import IngredientCreator, { ingredientNutrients } from './IngredientCreator';
import { QueryClient, QueryClientProvider } from 'react-query';
import { IngredientSelectorProvider } from '../../../context/ingredientsSelectorContext';

describe('Ingredient Creator', () => {
  test('Ingredient Creator renders all inputs', () => {
    const queryClient = new QueryClient();
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <IngredientSelectorProvider>
          <IngredientCreator userToken="mockedUserTokenString" />
        </IngredientSelectorProvider>
      </QueryClientProvider>
    );
    const inputs = container.getElementsByTagName('input');

    // nutrients array length + name input + img input
    expect(inputs).toHaveLength(ingredientNutrients.length + 2);
  });
});
