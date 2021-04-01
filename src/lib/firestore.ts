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
  email: string | null;
  emailVerified: boolean;
  photoUrl: string | null;
}

export const createUser = (uid: string, data: IUserData) => {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...userDefaults, ...data }, { merge: true });
};
