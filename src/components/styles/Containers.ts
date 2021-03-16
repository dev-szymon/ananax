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

interface SkeletonRowProps {
  width: string;
  height: string;
}

export const SkeletonRowStyles = styled.div`
  width: ${(props: SkeletonRowProps) => props.width};
  height: ${(props: SkeletonRowProps) => props.height};
  background-color: var(--colorDisabled);
  border-radius: var(--lengthSm3);
  margin-bottom: var(--lengthSm3);
`;

export const SkeletonContainerStyles = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const BottomBar = styled.nav`
  height: var(--lengthLg3);
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: var(--lengthSm1) var(--lengthSm2);
  border-top: 0.5px solid var(--colorDisabled);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
