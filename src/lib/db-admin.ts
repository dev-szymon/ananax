import { ICreateIngredientValues, IIngredientData } from '../types/ingredients';
import { ICreateRecipeValues, IRecipeData } from '../types/recipes';
import { db, FieldPath } from './firebase-admin';
import { getInfiniteIngredients } from './infiniteQuery';

const ingredientDefaults = {
  type: 'ingredient',
  likesCount: 0,
  cookbookCount: 0,
};

export const onCreateIngredient = async (data: ICreateIngredientValues) => {
  const authorData = await db.collection('users').doc(data.authorId).get();

  return db
    .collection('nodes')
    .add({
      ...data,
      ...ingredientDefaults,
      authorUsername: authorData.data()?.username,
    })
    .then(async (docRef) => {
      return await docRef.get().then(async (doc) => {
        const data = doc.data();
        return { id: doc.id, ...data } as IIngredientData;
      });
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
};

const recipeDefaults = {
  type: 'recipe',
  likesCount: 0,
  cookbookCount: 0,
};

export const onCreateRecipe = async (data: ICreateRecipeValues) => {
  const authorData = await db.collection('users').doc(data.authorId).get();

  return db
    .collection('nodes')
    .add({
      ...data,
      ...recipeDefaults,
      authorUsername: authorData.data()?.username,
    })
    .then(
      async (docRef) =>
        await docRef.get().then(async (recipeDoc) => {
          const data = recipeDoc.data();

          let totalKcal = 0;

          if (data) {
            const ingredientsIds = Object.keys(data.ingredients);

            const ingredientsDocs = await db
              .collection('nodes')
              .where(FieldPath.documentId(), 'in', ingredientsIds)
              .get();

            const batch = db.batch();
            ingredientsDocs.forEach((doc) => {
              totalKcal = totalKcal + doc.data().nutrients.kcal.value;
              return batch.update(doc.ref, {
                [`parentNodes.${recipeDoc.id}`]: true,
              });
            });

            batch.update(recipeDoc.ref, {
              [`parentNodes.${recipeDoc.id}`]: true,
              totalKcal: totalKcal,
            });
            await batch.commit();

            return { id: recipeDoc.id, ...data };
          }
        })
    )
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const getUserIngredientsCreated = async (
  uid: string,
  cursor: number = 0
) => {
  const limit = 2;
  const snapshot = await db
    .collection('nodes')
    .where('type', '==', 'ingredient')
    .where('authorId', '==', uid)
    .get();

  let nodes: IIngredientData[] = [];

  snapshot.forEach((doc) => {
    nodes.push({
      id: doc.id,
      ...doc.data(),
    } as IIngredientData);
  });

  const { outputNodes, nextCursor } = getInfiniteIngredients(
    nodes,
    cursor,
    limit
  );

  return {
    ingredients: outputNodes,
    nextCursor,
  };
};

export const getUserRecipesCreated = async (uid: string) => {
  const snapshot = await db
    .collection('nodes')
    .where('type', '==', 'recipe')
    .where('authorId', '==', uid)
    .get();
  const recipes: IRecipeData[] = [];

  snapshot.forEach((doc) => {
    recipes.push({
      id: doc.id,
      ...doc.data(),
    } as IRecipeData);
  });

  recipes.sort((a, b) => b.createdAt - a.createdAt);

  return recipes;
};

export const getIngredientsByKeyword = async (keyword: string) => {
  const snapshot = await db
    .collection('nodes')
    .where('type', '==', 'ingredient')
    .where('name', '==', keyword)
    .get();

  const ingredients: IIngredientData[] = [];

  snapshot.forEach((doc) => {
    ingredients.push({
      id: doc.id,
      ...doc.data(),
    } as IIngredientData);
  });

  return ingredients;
};

export const getRecipesByKeyword = async (keyword: string) => {
  const snapshot = await db
    .collection('nodes')
    .where('type', '==', 'recipe')
    .where('name', '==', keyword)
    .get();

  const recipes: IRecipeData[] = [];

  snapshot.forEach((doc) => {
    recipes.push({
      id: doc.id,
      ...doc.data(),
    } as IRecipeData);
  });

  return recipes;
};

export const getAllIngredients = async (cursor: number = 0) => {
  const limit = 2;
  const snapshot = await db
    .collection('nodes')
    .where('type', '==', 'ingredient')
    .get();

  let nodes: IIngredientData[] = [];

  snapshot.forEach((doc) => {
    nodes.push({
      id: doc.id,
      ...doc.data(),
    } as IIngredientData);
  });

  const { outputNodes, nextCursor } = getInfiniteIngredients(
    nodes,
    cursor,
    limit
  );

  return {
    ingredients: outputNodes,
    nextCursor,
  };
};

export const getAllRecipes = async () => {
  const snapshot = await db
    .collection('nodes')
    .where('type', '==', 'recipe')
    .get();

  const recipes: IRecipeData[] = [];

  snapshot.forEach((doc) => {
    recipes.push({
      id: doc.id,
      ...doc.data(),
    } as IRecipeData);
  });

  recipes.sort((a, b) => b.createdAt - a.createdAt);

  return recipes;
};

export const getSingleIngredient = async (id: string) => {
  const ingredient = await db.collection('nodes').doc(id).get();
  return ingredient.data();
};
