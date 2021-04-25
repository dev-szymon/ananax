import { ingredientNutrients } from '../components/creators/IngredientCreator/IngredientCreator';

type NutrientKeys = typeof ingredientNutrients[number]['name'];

type NutrientInputsType = {
  [Key in NutrientKeys]: number | '';
};

export interface IIngredientCreatorValues extends NutrientInputsType {
  name: string;
}

export type NutrientDataType = {
  [Key in NutrientKeys]: {
    value: number | '';
    unitName: string;
  };
};

export interface ICreateIngredientData {
  name: string;
  authorId: string;
  images: string[] | [];
  createdAt: string;
  nutrients: NutrientDataType;
}
export interface IIngredientData extends ICreateIngredientData {
  type: 'ingredient';
  authorUsername: string;
  id: string;
}
