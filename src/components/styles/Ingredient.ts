import styled from 'styled-components';

export const SingleIngredient = styled.div`
  padding: var(--lengthMd1);
  h2 {
    font-size: var(--lengthMd3);
    font-weight: 600;
    padding: var(--lengthSm3);
  }
`;

export const NutrientStyles = styled.div`
  position: relative;
  width: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: var(--lengthSm3);
  border-radius: var(--lengthSm3);
  height: var(--lengThLg1);
  .label {
    display: flex;
    font-size: var(--lengthSm3);
    align-items: center;
    color: var(--colorText);
  }
  .value {
    background-color: none;
    border: none;
    max-height: 100%;
    line-height: 1.15;
    text-align: right;
    padding: var(--lengthSm3);
    color: var(--colorText);
    font-size: var(--lengthMd1);
    font-weight: 600;
    width: 40%;
    outline: none;
  }
`;

export const IngredientImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const IngredientSearchResult = styled.div`
  font-size: 1rem;
  border-bottom: 0.5px solid var(--colorDisabled);
  padding-top: var(--lengthSm3);
  padding-bottom: var(--lengthSm2);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SelectedIngredientStyles = styled.div`
  background-color: var(--colorOutline);
  border-radius: var(--lengthSm2);
  margin-bottom: var(--lengthSm2);
  color: white;
  font-size: var(--lengthSm3);
  padding: var(--lengthSm1) var(--lengthSm3);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
