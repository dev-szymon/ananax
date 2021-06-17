import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { useMenu } from '../context/menuContext';
import { Close } from '../images';
import { PlainButton } from './styles';

const MainNav = styled.nav`
  background-color: var(--colorLight);
  padding: 4px 0 0 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  section {
    margin: 1rem;
  }
`;

export default function Navi() {
  const { menu, menuHandler } = useMenu();
  return (
    <MainNav>
      <header>
        <PlainButton onClick={() => menuHandler(false)}>
          <Close fill="var(--colorText)" />
        </PlainButton>
      </header>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>Explore</li>
        <section>
          <li>
            <Link href="/cookbook/recipes-created">Recipes Created</Link>
          </li>
          <li>Recipes Saved</li>
          <li>
            <Link href="/create-recipe">New Recipe</Link>
          </li>
        </section>
        <section>
          <li>
            <Link href="/cookbook/ingredients-created">
              Ingredients Created
            </Link>
          </li>
          <li>
            <Link href="/create-recipe">Ingredients Saved</Link>
          </li>
          <li>
            <Link href="/create-ingredient">New Ingredient</Link>
          </li>
        </section>
        <li>Settings</li>
      </ul>
    </MainNav>
  );
}
