import React, {
  useReducer,
  useContext,
  createContext,
  useEffect,
  ReactNode,
} from 'react';
import {
  initialIngredientValues,
  ICreateIngredient,
} from '../components/creators/IngredientCreator';
import {
  initialRecipeValues,
  ICreateRecipe,
} from '../components/creators/RecipeCreator';

interface IIngredientCreator extends ICreateIngredient {
  files: any[];
}

interface IRecipeCreator extends ICreateRecipe {
  files: any[];
}

interface IState {
  ingredientCreator: IIngredientCreator;
  recipeCreator: IRecipeCreator;
}

interface IAction {
  type: string;
  values: IState | ICreateIngredient | ICreateRecipe;
}

const creatorsInitialState: IState = {
  ingredientCreator: { ...initialIngredientValues, files: [] },
  recipeCreator: { ...initialRecipeValues, files: [] },
};

const CreatorStateContext = createContext(creatorsInitialState);
const CreatorDispatchContext = createContext({});

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case 'UPDATE_INGREDIENT_VALUES':
      return {
        ingredientCreator: { ...state.ingredientCreator, ...action.values },
        recipeCreator: { ...state.recipeCreator },
      };
    case 'UPDATE_RECIPE_VALUES':
      return {
        ingredientCreator: { ...state.ingredientCreator },
        recipeCreator: { ...state.recipeCreator, ...action.values },
      };
    case 'CLEAR_INGREDIENT_VALUES':
      return {
        ingredientCreator: { ...creatorsInitialState.ingredientCreator },
        recipeCreator: { ...state.recipeCreator },
      };
    case 'CLEAR_RECIPE_VALUES':
      return {
        ingredientCreator: { ...state.ingredientCreator },
        recipeCreator: { ...creatorsInitialState.recipeCreator },
      };
    case 'FILL':
      return { ...action.values } as IState;
    default:
      throw new Error(`unknown action ${action.type}`);
  }
};

// function useReducer<R extends Reducer<any, any>>(
//     reducer: R,
//     initialState: ReducerState<R>
//    ): [ReducerState<R>, Dispatch<ReducerAction<R>>];

export const CreatorsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, creatorsInitialState);

  useEffect(() => {
    if (window) {
      const data = localStorage.getItem('creators');
      data && dispatch({ type: 'FILL', values: JSON.parse(data) });
    }
  }, []);

  useEffect(() => {
    if (window) {
      localStorage.setItem('creators', JSON.stringify(state));
    }
  });

  return (
    <CreatorDispatchContext.Provider value={dispatch}>
      <CreatorStateContext.Provider value={state}>
        {children}
      </CreatorStateContext.Provider>
    </CreatorDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CreatorStateContext);
export const useDispatchCart = () => useContext(CreatorDispatchContext);
