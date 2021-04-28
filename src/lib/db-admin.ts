import { ICreateIngredientValues, IIngredientData } from '../types/ingredients';
import { ICreateRecipeValues } from '../types/recipes';
import { db, FieldPath } from './firebase-admin';

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
        await docRef.get().then(async (doc) => {
          const data = doc.data();

          if (data) {
            const ingredientsIds = Object.keys(data.ingredients);

            const ingredientsDocs = await db
              .collection('nodes')
              .where(FieldPath.documentId(), 'in', ingredientsIds)
              .get();

            const batch = db.batch();
            ingredientsDocs.forEach((doc) => {
              return batch.update(doc.ref, { [`parentNodes.${doc.id}`]: true });
            });

            batch.update(doc.ref, { [`parentNodes.${doc.id}`]: true });
            await batch.commit();

            return { id: doc.id, ...data };
          }
        })
    )
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const getUserIngredientsCreated = async (uid: string) => {
  const snapshot = await db
    .collection('nodes')
    .where('type', '==', 'ingredient')
    .where('authorId', '==', uid)
    .get();
  const ingredients: IIngredientData[] = [];

  snapshot.forEach((doc) => {
    ingredients.push({
      id: doc.id,
      ...doc.data(),
    } as IIngredientData);
  });

  ingredients.sort((a, b) => {
    return Date.parse(a.createdAt) - Date.parse(b.createdAt);
  });

  return ingredients;
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
export const getAllIngredients = async () => {
  const snapshot = await db
    .collection('nodes')
    .where('type', '==', 'ingredient')
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
