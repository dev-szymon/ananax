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

export const BottomBar = styled.nav`
  height: var(--lengthLg3);
  width: 100%;
  position: fixed;
  background-color: white;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  .innerBottomBar {
    width: 100%;
    height: 100%;
    padding: var(--lengthSm1) var(--lengthMd2);
    max-width: 640px;
    border-top: 0.5px solid var(--colorDisabled);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
