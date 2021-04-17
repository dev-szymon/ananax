import React, { ReactNode, useContext, createContext, useState } from 'react';

export type MenuEnum = 'SEARCH_INGREDIENTS' | 'COOKBOOK' | 'DEFAULT';

interface IMenuContext {
  menu: MenuEnum | false;
  setMenu: (props: MenuEnum | false) => void;
  menuHandler: (target: MenuEnum | false) => void;
}
const MenuContext = createContext<IMenuContext>({
  menu: false,
  setMenu: () => {},
  menuHandler: () => {},
});

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [menu, setMenu] = useState<MenuEnum | false>(false);
  const menuHandler = (target: MenuEnum | false) =>
    setMenu(!menu ? target : menu === target ? false : target);

  return (
    <MenuContext.Provider value={{ menu, setMenu, menuHandler }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
