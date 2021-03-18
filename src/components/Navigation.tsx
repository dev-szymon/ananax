import { ReactNode } from 'react';
import styled from 'styled-components';

const NavigationStyles = styled.nav`
  background-color: #ffffff;
  position: fixed;
  top: 0;
  padding-top: var(--lengthLg3);
  left: 0;
  width: 100vw;
  max-width: 100%;
  height: calc(100vh - var(--lengthLg3));
  z-index: 100;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  ul {
    align-self: center;
    list-style: none;
  }
`;

interface NavigationProps {
  children: ReactNode;
}
export default function Navigation({ children }: NavigationProps) {
  return <NavigationStyles>{children}</NavigationStyles>;
}
