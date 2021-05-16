import styled from 'styled-components';

// font: [ <font-style> || <font-variant> || <font-weight> ]? <font-size> [ / <line-height (en-US)> ]? <font-family>

export const BaseButton = styled.button`
  border-radius: 0.5rem;
  font: var(--typographyButton);
  letter-spacing: 0.02em;
  -webkit-letter-spacing: 0.02em;
  -moz-letter-spacing: 0.02em;
  -ms-letter-spacing: 0.02em;
  border: none;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  outline: none;
  --webkit-appearance: none;
  :disabled {
    opacity: 0.6;
    pointer-events: none;
    box-shadow: none;
  }
`;

export const PrimaryButton = styled(BaseButton)`
  background-color: var(--colorPrimary);
  color: var(--colorLight);
  box-shadow: 0px 4px 8px 0px var(--colorPrimary25);
  /* rgba(14, 14, 44, 0.1); */
  /* inset 0px -1px 0px rgba(14, 14, 44, 0.2); */
`;

export const SecondaryButton = styled(BaseButton)`
  background-color: var(--colorPrimary25);
  color: var(--colorDark);
  box-shadow: inset 0px -1px 0.5px rgba(14, 14, 44, 0.2);
`;

export const TertiaryButton = styled(BaseButton)`
  background-color: #fff;
  color: var(--colorDark);
  box-shadow: var(--lightShadow);
  border: 1px solid var(--colorPrimary25);
`;

export const PlainButton = styled.button`
  background-color: inherit;
  outline: none;
  cursor: pointer;
  border: none;
`;
