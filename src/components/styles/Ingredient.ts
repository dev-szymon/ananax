import styled from 'styled-components';

export const IngredientSearchResultStyles = styled.div`
  padding: 4px 0.25rem 4px 0.25rem;
  width: 100%;
  position: relative;
  border-bottom: 0.5px solid var(--colorDim);
  > h5 {
    font: var(--typographyBody);
  }
  .nutrient-label {
    font: var(--typographySmaller);
    color: var(--colorTextLight);
  }
  .nutrient-value {
    font: var(--typographySmallBold);
  }
`;

export const IngredientSearchResultDataContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

export const SingleIngredient = styled.div`
  padding: var(--lengthMd1);
  h2 {
    font-size: var(--lengthMd3);
    font-weight: 600;
    padding: var(--lengthSm3);
  }
`;

export const IngredientImage = styled.img`
  width: 100%;
  height: 100%;
`;
