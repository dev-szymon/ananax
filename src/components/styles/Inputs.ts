import styled from 'styled-components';

export const BaseInputStyles = styled.div`
  width: 100%;
  label {
    font: var(--typographySmaller);
    margin-bottom: 0.25rem;
  }
  input {
    -webkit-appearance: none;
    border-radius: 0.5rem;
    font: var(--typographyBody);
    border: 1px solid var(--colorDim);
    padding: 0.75rem 1rem;
    background-color: var(--colorDim);
    box-shadow: none;
    width: 100%;
    height: 100%;
    outline: none;
  }

  input:focus {
    -webkit-appearance: none;
    -webkit-box-shadow: 0px 0px 0px 4px var(--colorPrimary25);
    box-shadow: 0px 0px 0px 4px var(--colorPrimary25);
    background-color: var(--colorLight);
    border: 1px solid var(--colorPrimary);
  }
`;

export const TitleInputStyles = styled(BaseInputStyles)`
  input {
    font-weight: 600;
  }
`;

export const TextareaStyles = styled(BaseInputStyles)`
  textarea {
    font: var(--typographyBody);
    border-radius: 0.5rem;
    border: 1px solid var(--colorDim);
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
    box-shadow: 0px 0px 0px 4px var(--colorPrimary25);
    background-color: var(--colorLight);
    border: 1px solid var(--colorPrimary);
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

export const CreatorFieldset = styled.fieldset`
  padding: 1rem;
  input {
    margin-bottom: 1rem;
  }
`;
