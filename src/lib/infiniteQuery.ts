import { IIngredientData } from '../types/ingredients';
import { IRecipeData } from '../types/recipes';

export const getInfiniteIngredients = (
  nodes: IIngredientData[],
  cursor: number,
  limit: number
) => {
  let ingredients;
  ingredients = nodes
    .sort((a, b) => b.createdAt - a.createdAt)
    // if cursor exists return only nodes that were created before cursor, otherwise return all nodes
    .filter((node) => (cursor > 0 ? node.createdAt < cursor : node))
    // return one more than limit. The extra one determines next cursor and is removed later
    .slice(0, limit + 1);

  const nextCursor = ingredients[ingredients.length - 1]?.createdAt;
  console.log(nextCursor);
  const outputNodes = ingredients.slice(0, limit);
  return {
    outputNodes,
    nextCursor,
  };
};

export const getInfiniteRecipes = (
  nodes: IRecipeData[],
  cursor: number,
  limit: number
) => {
  nodes
    .sort((a, b) => b.createdAt - a.createdAt)
    // if cursor exists return only nodes that were created before cursor, otherwise return all nodes
    .filter((node) => (cursor > 0 ? node.createdAt < cursor : node))
    // return one more than limit. The extra one determines next cursor and is removed later
    .slice(0, limit + 1);

  const nextCursor = nodes[nodes.length - 1]?.createdAt;
  const outputNodes = nodes.slice(0, limit);
  return {
    outputNodes,
    nextCursor,
  };
};
