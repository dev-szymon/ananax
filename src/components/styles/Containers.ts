import styled from 'styled-components';

export const RadiusShadow = styled.div`
  width: 350px;
  border-radius: var(--lengthMd1);
  padding: var(--lengthLg1) var(--lengthMd1);
  display: flex;
  flex-direction: column;
  box-shadow: var(--boxShadow);
`;

export const BorderBottom = styled.div`
  width: 100%;
  border-bottom: 1px solid var(--colorGray);
  padding: var(--lengthLg1) 0;
`;
