import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { createUser } from './firestore';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  });
}

interface IAuthContext {
  user: IUserState | null;
  signin: (email: string, password: string) => Promise<firebase.User | null>;
  signup: (email: string, password: string) => Promise<firebase.User | null>;
  signout: () => Promise<void>;
}

const defaultContext: IAuthContext = {
  user: null,
  signin: (email: string, password: string) => new Promise((resolve) => null),
  signup: (email: string, password: string) => new Promise((resolve) => null),
  signout: () => new Promise((resolve) => resolve()),
};

const AuthContext = createContext(defaultContext);

export function ProvideAuth({ children }: { children: ReactNode }) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

interface IUserState {
  uid: string;
}

function useProvideAuth() {
  const [user, setUser] = useState<IUserState | null>(null);

  const signup = (email: string, password: string) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        if (user) {
          createUser(user.uid, {
            email: user.email,
            emailVerified: user.emailVerified,
            photoUrl: user.photoURL,
          });

          setUser(user);

          return user;
        } else {
          return null;
        }
      });
  };

  const signin = (email: string, password: string) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => setUser(null));
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return {
    user,
    signup,
    signin,
    signout,
  };
}

export const useAuth = () => {
  return useContext(AuthContext);
};
