import { gql, QueryResult } from '@apollo/client';
export const SINGLE_RECIPE_QUERY = gql`
  query getRecipe($id: ID!) {
    getRecipe(id: $id) {
      id
      name
      images
      private
      description
      prepTime
      ingredients {
        id
        name
      }
      createdBy {
        id
        username
      }
    }
  }
`;

export const NEW_RECIPE = gql`
  mutation newRecipe($recipe: recipeInput!) {
    newRecipe(recipe: $recipe) {
      id
    }
  }
`;

export const RECIPES_QUERY = gql`
  query {
    getRecipes {
      id
      name
      images
      createdBy {
        id
        username
      }
      kcal
    }
  }
`;

export const TOGGLE_LIKE_RECIPE = gql`
  mutation toggleLikeRecipe($recipe: ID!) {
    toggleLikeRecipe(recipe: $recipe) {
      id
      username
      email
      liked {
        id
      }
      recipesSaved {
        id
      }
    }
  }
`;
export const TOGGLE_SAVE_RECIPE = gql`
  mutation toggleSaveRecipe($recipe: ID!) {
    toggleSaveRecipe(recipe: $recipe) {
      id
      username
      email
      liked {
        id
      }
      recipesSaved {
        id
      }
    }
  }
`;

export interface RecipesQuery extends QueryResult {
  data: {
    getRecipes: {
      id: string;
      name: string;
      images: string[];
      createdBy: {
        id: string;
        username: string;
      };
      kcal: number;
    }[];
  };
}
