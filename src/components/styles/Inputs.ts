import styled from 'styled-components';

export const BaseInputStyles = styled.div`
  width: 100%;
  margin-bottom: 0.5rem;
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
    background-color: var(--colorWhite);
    box-shadow: none;
    width: 100%;
    height: 100%;
    outline: none;
    margin: 0;
  }

  input:focus {
    -webkit-appearance: none;
    -webkit-box-shadow: 0px 0px 0px 4px var(--colorPrimary25);
    box-shadow: 0px 0px 0px 4px var(--colorPrimary25);
    background-color: var(--colorLight);
    border: 1px solid var(--colorPrimary);
  }
  .error-msg {
    color: var(--colorError);
    padding-left: 0.5rem;
    font: var(--typographySmall);
  }
`;

export const TitleInputStyles = styled(BaseInputStyles)`
  input {
    font-weight: 600;
  }

  .error-msg {
    color: var(--colorError);
  }
`;

export const TextareaStyles = styled(BaseInputStyles)`
  textarea {
    -webkit-appearance: none;
    font: var(--typographyBody);
    border-radius: 0.5rem;
    border: 1px solid var(--colorDim);
    padding: 0.75rem 1rem;
    background-color: var(--colorWhite);
    width: 100%;
    height: 100%;
    outline: none;
    resize: none;
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
  background-color: var(--colorWhite);
  border: 1px dashed var(--colorPrimary);
  outline-color: var(--colorPrimary25);
  overflow: hidden;
  img {
    min-width: 100%;
    max-height: 100%;
  }
  a {
    font: var(--typographySmall);
    color: var(--colorPrimary);
  }
`;

export const CreatorFieldset = styled.fieldset`
  padding: 1rem;
  input {
    margin-bottom: 0.25rem;
  }
`;
