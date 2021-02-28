import { ReactNode } from 'react';
import styled from 'styled-components';

const HeaderStyles = styled.header`
  height: var(--lengthLg3);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .header-inner {
    padding: 0 var(--lengthMd1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 640px;
  }
`;

export default function Header({ children }: { children?: ReactNode }) {
  return <HeaderStyles>{children}</HeaderStyles>;
}
