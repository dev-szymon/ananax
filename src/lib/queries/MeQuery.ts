import { gql, QueryResult } from '@apollo/client';

export const ME_QUERY = gql`
  query MeQuery {
    me {
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

export const ME_RECIPES_CREATED_QUERY = gql`
  query MeRecipesCreatedQuery {
    me {
      id
      recipesCreated {
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
  }
`;

export const ME_RECIPES_SAVED_QUERY = gql`
  query MeRecipesSavedQuery {
    me {
      id
      recipesSaved {
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
  }
`;

export interface MeRecipesCreatedQuery extends QueryResult {
  data: {
    me: {
      recipesCreated: {
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
  };
}

export interface MeRecipesSavedQuery extends QueryResult {
  data: {
    me: {
      recipesSaved: {
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
  };
}
