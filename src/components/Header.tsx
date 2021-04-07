import { ReactNode } from 'react';
import styled from 'styled-components';

const HeaderStyles = styled.header`
  height: 3rem;
  background-color: var(--colorLight);
  width: 100%;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  .header-inner {
    padding: 0 var(--lengthMd1);
    border-bottom: 1px solid var(--colorLight);
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    width: 100%;
    max-width: 640px;
    h2 {
      cursor: pointer;
      display: flex;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      justify-content: center;
      align-items: center;
      margin: 0;
    }
  }
  ::after {
    content: '';
    width: 100vw;
    height: 2px;
    background-color: var(--colorPrimary);
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
  }
`;

export default function Header({ children }: { children?: ReactNode }) {
  return <HeaderStyles>{children}</HeaderStyles>;
}
