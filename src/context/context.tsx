import React, {
  useReducer,
  createContext,
  useContext,
  ReactNode,
  Dispatch,
} from 'react';

interface Action {
  type: string;
  user: string;
}
interface UserStateContext {
  user: string | null;
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

  return (
    <UserDispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={state}>
        {children}
      </UserStateContext.Provider>
    </UserDispatchContext.Provider>
  );
};

export const useUser = () => useContext(UserStateContext);
export const useDispatchUser = () => useContext(UserDispatchContext);
