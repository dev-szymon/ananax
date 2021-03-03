import styled from 'styled-components';

export const TextInputStyles = styled.div`
  border-radius: var(--lengthSm2);
  border: 1px solid var(--colorText);
  margin: var(--lengthSm2) 0;
  width: 100%;
  position: relative;
  label {
    position: absolute;
    top: 0;
    left: var(--lengthSm2);
    font-size: var(--lengthSm3);
  }
  input {
    border-radius: var(--lengthSm2);
    padding: var(--lengthSm3);
    padding-top: var(--lengthMd1);
    border: none;
    width: 100%;
    height: 100%;
    outline: none;
  }

  input:focus {
    box-shadow: var(--boxShadowOutline);
  }
`;

export const TitleInputStyles = styled(TextInputStyles)`
  border: none;
  input {
    font-size: var(--lengthMd3);
    font-weight: 600;
    padding-top: var(--lengthSm3);
  }
`;

export const NumericInputStyles = styled.div`
  position: relative;
  width: 150px;
  margin: var(--lengthSm3);
  border-radius: var(--lengthSm3);
  height: var(--lengThLg1);
  label {
    height: 100%;
    display: flex;
    font-size: var(--lengthSm3);
    align-items: center;
    position: absolute;
    left: var(--lengthSm3);
    color: var(--colorText);
  }
  input {
    background-color: none;
    border: none;
    text-align: right;
    color: var(--colorText);
    border-radius: var(--lengthSm3);
    padding: var(--lengthSm3);
    padding-left: var(--lengthLg2);
    font-size: var(--lengthMd1);
    font-weight: 600;
    width: 100%;
    height: 100%;
    outline: none;
  }
  input:focus {
    box-shadow: var(--boxShadowOutline);
  }
`;
