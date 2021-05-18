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
import IngredientSelector from './creators/RecipeCreator/IngredientsSelector';
import { useClick } from '../lib/customHooks';
import Flex from './Flex';

const Navi = () => {
  const { signout, user } = useAuth();
  const { menu, setMenu } = useMenu();

  switch (menu) {
    case 'SEARCH_INGREDIENTS':
      return <IngredientSelector />;
    case 'COOKBOOK':
      return (
        <>
          <Flex
            justify="center"
            style={{
              borderBottom: '0.5px solid var(--colorDim)',
              marginBottom: '0.5rem',
            }}
          >
            <span
              style={{
                font: 'var(--typographySmallBold)',
              }}
            >
              cookbook
            </span>
          </Flex>

          <div
            style={{
              borderBottom: '0.5px solid var(--colorDim)',
              marginBottom: '0.5rem',
            }}
          >
            <span>recipes</span>
            <ul>
              <Link href="/cookbook/recipes-created">
                <li>created</li>
              </Link>
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
            <Link href="/ingredients">
              <span>ingredients</span>
            </Link>
            <ul>
              <Link href="/cookbook/ingredients-created">
                <li>created</li>
              </Link>
              <li>saved</li>
              <li>
                <PlainButton
                  onClick={() => {
                    router.push('/create-ingredient');
                    setMenu(false);
                  }}
                >
                  + new ingredient
                </PlainButton>
              </li>
            </ul>
          </div>
        </>
      );
    case 'DEFAULT':
      return (
        <div>
          <span style={{ font: 'var(--typographySmall)' }}>
            {user && user.uid}
          </span>
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
        </div>
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
    <NavigationOutsideStyles>
      <NavigationStyles ref={ref}>
        <Navi />
      </NavigationStyles>
    </NavigationOutsideStyles>
  );
}
