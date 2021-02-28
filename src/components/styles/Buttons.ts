import styled from 'styled-components';

export const BtnFilledStyles = styled.button`
  background-color: var(--colorAccent);
  color: var(--colorPrimary);
  border-radius: var(--lengthSm2);
  border: none;
  font-size: var(--lengthMd1);
  font-weight: 600;
  padding: var(--lengthSm2) var(--lengthMd2);
  cursor: pointer;
  box-shadow: var(--boxShadowAccent);
`;

export const BtnBorderStyles = styled.button`
  background-color: unset;
  color: var(--colorText);
  border: 1px solid var(--colorText);
  font-weight: 600;
  border-radius: var(--lengthSm2);
  padding: var(--lengthSm1) var(--lengthMd3);
  cursor: pointer;
`;

export const ActionMenu = styled.button`
  background-color: var(--colorAccent);
  width: var(--lengthLg2);
  position: fixed;
  right: var(--lengthMd1);
  bottom: var(--lengthMd1);
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 50%;
  height: var(--lengthLg2);
  color: var(--colorPrimary);
  outline: none;
  cursor: pointer;
  box-shadow: var(--boxShadow);
  @media (min-width: 640px) {
    right: calc((100vw - 640px) / 2);
  }
  :focus {
    box-shadow: var(--boxShadowOutline);
  }
`;
