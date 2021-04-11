import { ICreateRecipe } from '../components/creators/RecipeCreator';
import firebase from './firebase';

const firestore = firebase.firestore();

const userDefaults = {
  recipes: {
    created: [],
    saved: [],
    liked: [],
  },
  ingredients: {
    created: [],
    saved: [],
    liked: [],
  },
};

export interface IUserData {
  username?: string;
  email: string | null;
  emailVerified: boolean;
  photoUrl: string | null;
}

export interface IIngredientData {
  name: string;
  author: string;
  images: string[] | [];
  nutrients: {
    fats: number | '';
    kcal: number | '';
    carbs: number | '';
    protein: number | '';
    glycemicIndex: number | '';
  };
}

export const createUser = (uid: string, data: IUserData) => {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...userDefaults, ...data }, { merge: true });
};

export const createIngredient = async (data: IIngredientData) => {
  return firestore
    .collection('ingredients')
    .add({ ...data })
    .then(function (docRef) {
      docRef.get().then(function (doc) {
        console.log(doc?.data());
      });
    })
    .catch(function (error) {
      console.error(error);
    });
};

// export const createRecipe = (data: ICreateRecipe) =>
//   firestore.collection('recipes').add({ ...data });

// export const queryIngredients = () => firestore.collection('ingredients').get();
