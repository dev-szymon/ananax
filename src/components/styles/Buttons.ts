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
  :disabled {
    opacity: 0.6;
    pointer-events: none;
    box-shadow: none;
  }
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

export const GuestButton = styled(BtnFilledStyles)`
  background-color: var(--colorOutline);
  box-shadow: var(--boxShadowSmoothOutline);
`;

export const PlainButton = styled.button`
  background-color: inherit;
  outline: none;
  cursor: pointer;
  border: none;
`;
