import { gql } from '@apollo/client';
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
