import React from 'react';
import router from 'next/router';
import styled from 'styled-components';
import { useMenu } from '../context/menuContext';
import { useAuth } from '../lib/auth';
import { PlainButton } from './styles';
import Link from 'next/link';
import IngredientSelector from './creators/IngredientsSelector';
import { useIngredientsSelector } from '../context/ingredientsSelectorContext';

const NavigationOutsideStyles = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  bottom: 0;
  left: 0;
  padding-bottom: 3rem;
  width: 100%;
  height: 100vh;
  z-index: 200;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const NavigationStyles = styled.nav`
  background-color: var(--colorLight);
  position: relative;
  border-radius: 1rem 1rem 0 0;
  padding: 1rem;
  margin: 0 auto;
  width: 100%;
  max-width: 640px;
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
    <NavigationOutsideStyles>
      <NavigationStyles>
        <Navi />
      </NavigationStyles>
    </NavigationOutsideStyles>
  );
}
