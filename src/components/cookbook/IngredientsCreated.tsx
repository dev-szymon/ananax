import React from 'react';
import { useQuery } from 'react-query';

import { IIngredientData } from '../../types/ingredients';
import EmptyState from '../EmptyState';
import IngredientCard from '../IngredientCard';
import Loader from '../Loader';

interface IIngredientsCreatedProps {
  userToken: string;
  id: string;
}

export default function IngredientsCreated({
  id,
  userToken,
}: IIngredientsCreatedProps) {
  const { isLoading, data } = useQuery(
    `${id}-ingredients-created`,
    async () => {
      const response = await fetch('/api/cookbook/ingredients-created', {
        method: 'GET',
        headers: {
          token: userToken,
        },
        credentials: 'same-origin',
      });

      return await response.json();
    }
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {data.ingredients.length > 0 ? (
        data.ingredients.map((ingredient: IIngredientData) => (
          <IngredientCard key={ingredient.id} ingredient={ingredient} />
        ))
      ) : (
        <EmptyState />
      )}
    </>
  );
}
