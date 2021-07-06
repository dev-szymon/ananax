import { IIngredientData } from './ingredients';
import { INode } from './nodes';

export interface IRecipeCreatorValues {
  name: string;
  description: string;
  prepTime: number | '';
}
export interface ICreateRecipeValues extends Omit<INode, 'id' | 'type'> {
  authorId: string;
  images: string[] | [];
  ingredients: { [key: IIngredientData['id']]: number };
}

export interface IRecipeData extends Omit<ICreateRecipeValues, 'ingredients'> {
  id: INode['id'];
  type: 'recipe';
  authorUsername: string;
  likesCount: number;
  cookbookCount: number;
  totalKcal: number;
  parentNodes?: {
    [key: IRecipeData[id]]: boolean;
  };
}
