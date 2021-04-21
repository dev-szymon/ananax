import firebase from './firebase';

const firestore = firebase.firestore();

export interface IUserData {
  username?: string;
  email: string | null;
  photoUrl: string | null;
}
export interface ICreateIngredientData {
  name: string;
  authorId: string;
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
  type: 'ingredient';
  authorUsername: string;
  id: string;
}

export const onCreateUser = (uid: string, data: IUserData) => {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
};
