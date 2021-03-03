import React, {
  useReducer,
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  useEffect,
} from 'react';
import { useUser } from '../components/credentials/useUser';

interface Action {
  type: string;
  user?: { id: string; email: string; username: string };
}
interface UserStateContext {
  user: { id: string; email: string; username: string } | null;
}

const UserStateContext: React.Context<UserStateContext> = createContext({
  user: null,
});
const UserDispatchContext = createContext((action: Action): void => {});

const reducer = (state: UserStateContext, action: Action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return { user: action.user };
    case 'LOG_OUT':
      return { user: null };
    default:
      throw new Error(`unknown action ${action.type}`);
  }
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch]: [
    UserStateContext,
    Dispatch<Action>
  ] = useReducer(reducer, { user: null });

  useEffect(() => {
    const { user } = useUser();
    console.log(user);
  });

  return (
    <UserDispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={state}>
        {children}
      </UserStateContext.Provider>
    </UserDispatchContext.Provider>
  );
};

export const useUserContext = () => useContext(UserStateContext);
export const useDispatchUser = () => useContext(UserDispatchContext);
