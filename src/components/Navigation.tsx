import React, { useRef } from 'react';
import router from 'next/router';
import { useMenu } from '../context/menuContext';
import { useAuth } from '../lib/auth';
import Navi2 from './Nav';
import { NavigationStyles, PlainButton } from './styles';
import IngredientSelector from './creators/RecipeCreator/IngredientsSelector';
import { useClick } from '../lib/customHooks';

const Navi = () => {
  const { signout, user } = useAuth();
  const { menu, setMenu } = useMenu();

  switch (menu) {
    case 'SEARCH_INGREDIENTS':
      return <IngredientSelector />;
    case 'NAVIGATION':
      return <Navi2 />;
    default:
      return (
        <ul>
          <li>
            <PlainButton
              onClick={() => {
                signout();
                setMenu(false);
                router.pathname === '/' ? router.reload() : router.push('/');
              }}
            >
              logout
            </PlainButton>
          </li>
        </ul>
      );
  }
};

export default function Navigation() {
  const { setMenu } = useMenu();

  const ref = useRef(null);

  useClick(ref, () => setMenu(false));
  return (
    <NavigationStyles ref={ref}>
      <Navi />
    </NavigationStyles>
  );
}
