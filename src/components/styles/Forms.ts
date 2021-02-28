import styled from 'styled-components';

export const Caption = styled.div`
  display: flex;
  margin-top: var(--lengthSm3);
  width: 100%;
  font-size: var(--lengthSm3);
  a {
    color: var(--colorOutline);
    margin-left: var(--lengthSm3);
    font-weight: 600;
  }
`;

export const NumericInput = styled.div`
  display: flex;
  width: var(--lengthLg3);
  label: {
    color: var(--colorText);
  }
  input {
    background-color: none;
    border: none;
  }
  input:focus {
    box-shadow: var(--boxShadowOutline);
  }
`;
