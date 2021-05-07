import { IIngredientData } from './ingredients';

export interface IRecipeCreatorValues {
  name: string;
  description: string;
  prepTime: number | '';
}
export interface ICreateRecipeValues {
  name: string;
  authorId: string;
  images: string[] | [];
  createdAt: string;
  ingredients: { [key: IIngredientData['id']]: number };
}

export interface IRecipeData extends Omit<ICreateRecipeValues, 'ingredients'> {
  id: string;
  type: 'recipe';
  authorUsername: string;
  likesCount: number;
  cookbookCount: number;
  totalKcal: number;
  parentNodes?: {
    [key: IRecipeData[id]]: boolean;
  };
}
