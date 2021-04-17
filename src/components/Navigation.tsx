import React, { useRef } from 'react';
import router from 'next/router';
import { useMenu } from '../context/menuContext';
import { useAuth } from '../lib/auth';
import {
  NavigationOutsideStyles,
  NavigationStyles,
  PlainButton,
} from './styles';
import Link from 'next/link';
import IngredientSelector from './creators/IngredientsSelector';
import { useClick } from '../lib/customHooks';

const Navi = () => {
  const { signout } = useAuth();
  const { menu, setMenu } = useMenu();

  switch (menu) {
    case 'SEARCH_INGREDIENTS':
      return <IngredientSelector />;
    case 'COOKBOOK':
      return (
        <>
          <p>cookbook</p>
          <div>
            <p>recipes</p>
            <ul>
              <li>created</li>
              <li>saved</li>
              <li>
                <PlainButton
                  onClick={() => {
                    router.push('/create-recipe');
                    setMenu(false);
                  }}
                >
                  + new recipe
                </PlainButton>
              </li>
            </ul>
          </div>
          <div>
            <p>ingredients</p>
            <ul>
              <Link href="/cookbook/ingredients/ingredients-created">
                <li>created</li>
              </Link>
              <li>saved</li>
              <Link href="/create-ingredient">
                <li>+ new ingredient</li>
              </Link>
            </ul>
          </div>
        </>
      );
    case 'DEFAULT':
      return (
        <ul>
          <li>
            <PlainButton
              onClick={() => {
                signout();
                router.pathname === '/' ? router.reload() : router.push('/');
                setMenu(false);
              }}
            >
              logout
            </PlainButton>
          </li>
        </ul>
      );
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
    <NavigationOutsideStyles ref={ref}>
      <NavigationStyles>
        <Navi />
      </NavigationStyles>
    </NavigationOutsideStyles>
  );
}
