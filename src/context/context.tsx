import React, {
  useReducer,
  createContext,
  useContext,
  ReactNode,
  Dispatch,
} from 'react';

interface Action {
  type: 'SET_CURRENT_USER';
  currentUser: string | null;
}
interface UserStateContext {
  currentUser: string | null;
}

const UserStateContext: React.Context<UserStateContext> = createContext({
  currentUser: null,
});
const UserDispatchContext = createContext((action: Action): void => {});

const reducer = (state: UserStateContext, action: Action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.currentUser };
    default:
      throw new Error(`unknown action ${action.type}`);
  }
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch]: [
    UserStateContext,
    Dispatch<Action>
  ] = useReducer(reducer, { currentUser: null });

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
