import styled from 'styled-components';

export const BaseInputStyles = styled.div`
  margin-bottom: 1rem;
  label {
    font: var(--typographySmall);
  }
  input {
    border-radius: 0.5rem;
    box-shadow: inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1);
    border: 1px solid var(--colorDim);
    margin: 0.5rem 0;
    padding: 0.75rem 1rem;
    background-color: var(--colorDim);
    width: 100%;
    height: 100%;
    outline: none;
  }

  input:focus {
    box-shadow: var(--boxShadowOutline);
    background-color: var(--colorLight);
    border: 1px solid var(--colorAccent);
  }
`;

export const TitleInputStyles = styled(BaseInputStyles)`
  input {
    font-weight: 600;
  }
`;

export const TextareaStyles = styled(BaseInputStyles)`
  textarea {
    border-radius: 0.5rem;
    box-shadow: inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1);
    border: 1px solid var(--colorDim);
    margin: 0.5rem 0;
    padding: 0.75rem 1rem;
    background-color: var(--colorDim);
    width: 100%;
    height: 100%;
    outline: none;
    resize: none;
    height: 150px;
    min-height: 150px;
  }
  textarea:focus {
    box-shadow: var(--boxShadowOutline);
    background-color: var(--colorLight);
    border: 1px solid var(--colorAccent);
  }
`;

export const DropzoneStyles = styled.div`
  margin-bottom: 1rem;
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  max-height: 300px;
  border-radius: 0.5rem;
  padding: var(--lengthMd1);
  background-color: var(--colorDim);
  border: 1px dashed var(--colorAccent);
  box-shadow: 0 2px 8px 0px var(--colorAccent25);
  outline-color: var(--colorAccent);
  overflow: hidden;
  img {
    min-width: 100%;
    max-height: 100%;
  }
`;
