import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { onCreateUser } from './firestore';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  });
}

interface IAuthContext {
  user: IUserState | null;
  loading: boolean;
  signin: (
    email: string,
    password: string
  ) => Promise<IUserState | null> | undefined;
  signup: (
    username: string,
    email: string,
    password: string
  ) => Promise<IUserState | null> | undefined;
  signout: () => Promise<void>;
}

interface IUserState {
  uid: string;
  email: string | null;
  token: string;
}

const defaultContext: IAuthContext = {
  user: null,
  loading: true,
  signin: (email: string, password: string) => new Promise((resolve) => null),
  signup: (email: string, password: string) => new Promise((resolve) => null),
  signout: () => new Promise((resolve) => resolve()),
};

export const AuthContext = createContext(defaultContext);

export function ProvideAuth({ children }: { children: ReactNode }) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function useProvideAuth() {
  const [user, setUser] = useState<IUserState | null>(null);
  const [loading, setLoading] = useState(true);

  const signup = (email: string, password: string, username: string) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        if (user) {
          const formattedUser = await formatUser(user);
          const { token, ...restUser } = formattedUser;

          onCreateUser(user.uid, {
            username: username,
            email: restUser.email,
          });

          setUser(formattedUser);
          setLoading(false);

          return formattedUser;
        } else {
          setUser(null);
          return null;
        }
      });
  };

  const signin = (email: string, password: string) => {
    try {
      return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async ({ user }) => {
          if (user) {
            const formattedUser = await formatUser(user);
            setUser(formattedUser);
            setLoading(false);
            return formattedUser;
          } else {
            setUser(null);
            setLoading(false);
            return null;
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => setUser(null));
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const formattedUser = await formatUser(user);
        setUser(formattedUser);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return {
    loading,
    user,
    signup,
    signin,
    signout,
  };
}

const formatUser = async (user: firebase.User): Promise<IUserState> => {
  const token = await user.getIdToken();
  return {
    uid: user.uid,
    email: user.email,
    token,
  };
};

export const useAuth = () => useContext(AuthContext);
