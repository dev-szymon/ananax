import { ReactNode } from 'react';
import styled from 'styled-components';

const HeaderStyles = styled.header`
  height: var(--lengthLg3);
  width: 100%;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
  .header-inner {
    padding: 0 var(--lengthMd1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 640px;
    h2 {
      cursor: pointer;
      display: flex;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background-color: white;
      justify-content: center;
      align-items: center;
    }
  }
`;

export default function Header({ children }: { children?: ReactNode }) {
  return <HeaderStyles>{children}</HeaderStyles>;
}
