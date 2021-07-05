import { ingredientNutrients } from '../components/creators/IngredientCreator/IngredientCreator';
import { INode } from './nodes';
import { IRecipeData } from './recipes';

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

export interface ICreateIngredientValues extends Omit<INode, 'id'> {
  authorId: string;
  images: string[] | [];
  nutrients: NutrientDataType;
}

export interface IIngredientData extends ICreateIngredientValues, INode {
  // id: INode['id'];
  type: 'ingredient';
  authorUsername: string;
  likesCount: number;
  cookbookCount: number;
  totalKcal: number;
  parentNodes?: {
    [key: IRecipeData['id']]: boolean;
  };
}
