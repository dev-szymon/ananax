import styled from 'styled-components';
import Flex from '../Flex';

export const CardStyles = styled.div`
  padding: 1rem 0;
`;
export const CardElementTop = styled(Flex)`
  padding: 0.25rem;
`;
export const SmallTagElement = styled.div`
  font: var(--typographySmaller);
  color: var(--colorTextLight);
`;

export const CardTitle = styled.h3`
  margin: 0;
  font: var(--typographyHeader3);
  font-size: 1rem;
  padding: 0.5rem;
  padding-top: 0;
`;

export const CardElementMiddle = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;

export const FourThreeImg = styled.div`
  position: relative;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  height: 0;
  padding-top: 75%;
`;

export const CardElementBottom = styled(Flex)`
  padding: 0.5rem;
`;

export const CardElementActions = styled(Flex)`
  padding: 0 0.5rem;
`;

export const Count = styled.div`
  font: var(--typographySmaller);
  color: var(--colorTextLight);
  padding-left: 0.2rem;
  padding-right: 0.5rem;
  text-align: center;
`;
