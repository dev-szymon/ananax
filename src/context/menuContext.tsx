import React, { ReactNode, useContext, createContext, useState } from 'react';

interface IMenuContext {
  menu: string | false;
  setMenu: (props: string | false) => void;
  menuHandler: (target: string) => void;
}
const MenuContext = createContext<IMenuContext>({
  menu: false,
  setMenu: () => {},
  menuHandler: () => {},
});

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [menu, setMenu] = useState<string | false>(false);
  const menuHandler = (target: string) =>
    setMenu(!menu ? target : menu === target ? false : target);

  return (
    <MenuContext.Provider value={{ menu, setMenu, menuHandler }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
