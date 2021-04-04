import React from 'react';
import router from 'next/router';
import styled from 'styled-components';
import { useMenu } from '../context/menuContext';
import { useAuth } from '../lib/auth';
import { PlainButton } from './styles';
import Link from 'next/link';
import IngredientSelector from './creators/IngredientsSelector';
import { useIngredientsSelector } from '../context/ingredientsSelectorContext';

const NavigationStyles = styled.nav`
  background-color: #fff;
  position: fixed;
  bottom: 0;
  padding-bottom: 5rem;
  padding-top: 1rem;
  left: 0;
  width: 100vw;
  max-height: calc(100vh - var(--lengthLg3));
  z-index: 100;
  display: flex;
  overflow: hidden;
  border-radius: 2rem 2rem 0 0;
  flex-direction: column;
  ul {
    align-self: center;
    list-style: none;
  }
`;

const Navi = () => {
  const { signout } = useAuth();
  const { menu, setMenu } = useMenu();
  const { ingredients, setIngredients } = useIngredientsSelector();

  switch (menu) {
    case 'SEARCH_INGREDIENTS':
      return (
        <IngredientSelector
          ingredients={ingredients}
          setIngredients={setIngredients}
        />
      );
    case 'COOKBOOK':
      return (
        <>
          <p>cookbook</p>
          <div>
            <p>recipes</p>
            <ul>
              <li>created</li>
              <li>saved</li>
              <Link href="/create-recipe">
                <li>+ new recipe</li>
              </Link>
            </ul>
          </div>
          <div>
            <p>ingredients</p>
            <ul>
              <li>created</li>
              <li>saved</li>
              <li>+ new ingredient</li>
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
                setMenu(false);
                router.pathname === '/' ? router.reload() : router.push('/');
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
  return (
    <NavigationStyles>
      <Navi />
    </NavigationStyles>
  );
}
