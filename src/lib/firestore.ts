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

export interface ICreateIngredientData {
  name: string;
  author: string;
  images: string[] | [];
  createdAt: string;
  nutrients: {
    fats: number | '';
    kcal: number | '';
    carbs: number | '';
    protein: number | '';
    glycemicIndex: number | '';
  };
}

export interface IIngredientData extends ICreateIngredientData {
  id: string;
}

export const onCreateUser = (uid: string, data: IUserData) => {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...userDefaults, ...data }, { merge: true });
};

export const onCreateIngredient = async (data: ICreateIngredientData) => {
  return firestore
    .collection('ingredients')
    .add({ ...data })
    .then(async function (docRef) {
      return await docRef.get().then(async function (doc) {
        const data = doc.data();
        return { id: doc.id, ...data };
      });
    })
    .catch(function (error) {
      console.error(error);
      return error;
    });
};

export const getUserIngredientsCreated = async (uid: string | null) => {
  if (!uid) {
    throw new Error('Please log in!');
  }

  const snapshot = await firestore
    .collection('ingredients')
    .where('author', '==', uid)
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

  return { ingredients };
};

export const getUser = async (uid: string) => {
  const user = await firestore.collection('users').doc(uid).get();

  const userData = { id: uid, ...user.data() };
  return { ...userData };
};
