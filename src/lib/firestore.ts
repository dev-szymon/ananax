import firebase from './firebase';

const firestore = firebase.firestore();

export interface IUserData {
  username?: string;
  email: string | null;
  photoUrl: string | null;
}

export const onCreateUser = (uid: string, data: IUserData) => {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
};
