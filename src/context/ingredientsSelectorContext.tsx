import React, {
  ReactNode,
  useContext,
  createContext,
  useState,
  Dispatch,
} from 'react';

interface INutrient {
  amount: number;
  unitName: string;
}

interface ISelectedIngredients {
  id: string | number;
  source: 'internal' | 'usda';
  name: string;
  protein: INutrient;
  kcal: INutrient;
  fats: INutrient;
  carbs: INutrient;
}

export interface IIngredientsSelectorContext {
  ingredients: ISelectedIngredients[];
  setIngredients: Dispatch<React.SetStateAction<ISelectedIngredients[]>>;
}

const IngredientsSelectorContext = createContext<IIngredientsSelectorContext>({
  ingredients: [],
  setIngredients: () => {},
});

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [ingredients, setIngredients] = useState<ISelectedIngredients[]>([]);

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
