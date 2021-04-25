import React from 'react';
import { useQuery } from 'react-query';

import { IIngredientData } from '../../types/ingredients';
import IngredientCard from '../IngredientCard';
import Loader from '../Loader';

interface IIngredientsCreatedProps {
  userToken: string;
}

export default function IngredientsCreated({
  userToken,
}: IIngredientsCreatedProps) {
  const { isLoading, data } = useQuery('ingredients-created', async () => {
    const response = await fetch('/api/cookbook/ingredients-created', {
      method: 'GET',
      headers: {
        token: userToken,
      },
      credentials: 'same-origin',
    });

    return await response.json();
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {data.ingredients.map((ingredient: IIngredientData) => (
        <IngredientCard key={ingredient.id} ingredient={ingredient} />
      ))}
    </>
  );
}
