import { gql } from '@apollo/client';
export const SINGLE_INGREDIENT_QUERY = gql`
  query getIngredient($id: ID!) {
    getIngredient(id: $id) {
      id
      name
      images
      kcal
      carbs
      protein
      fats
      glycemicIndex
    }
  }
`;

export const SEARCH_INGREDIENTS_QUERY = gql`
  query getIngredientByName($name: String!) {
    getIngredientByName(name: $name) {
      id
      name
    }
  }
`;
