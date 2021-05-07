import React, {
  ReactNode,
  useContext,
  createContext,
  useState,
  Dispatch,
} from 'react';
import { IIngredientData } from '../types/ingredients';

export interface ISelectedIngredientContextData extends IIngredientData {
  amount: {
    value: number;
    unitName: 'g';
  };
}

export interface ISelectedIngredients {
  [key: string]: ISelectedIngredientContextData;
}

export interface IIngredientsSelectorContext {
  ingredients: ISelectedIngredients;
  setIngredients: Dispatch<React.SetStateAction<ISelectedIngredients>>;
}

const IngredientsSelectorContext = createContext<IIngredientsSelectorContext>({
  ingredients: {},
  setIngredients: () => {},
});

export const IngredientSelectorProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [ingredients, setIngredients] = useState<ISelectedIngredients>({});

  return (
    <IngredientsSelectorContext.Provider
      value={{ ingredients, setIngredients }}
    >
      {children}
    </IngredientsSelectorContext.Provider>
  );
};

export const useIngredientsSelector = () =>
  useContext(IngredientsSelectorContext);
