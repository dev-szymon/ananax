import React from 'react';
import { render } from '@testing-library/react';
import IngredientCreator, { ingredientNutrients } from './IngredientCreator';
import { QueryClient, QueryClientProvider } from 'react-query';

test('Ingredient Creator renders all inputs', () => {
  const queryClient = new QueryClient();
  const { container } = render(
    <QueryClientProvider client={queryClient}>
      <IngredientCreator userToken="mockedUserTokenString" />
    </QueryClientProvider>
  );
  const inputs = container.getElementsByTagName('input');

  // nutrients array length + name input + img input
  expect(inputs).toHaveLength(ingredientNutrients.length + 2);
});
