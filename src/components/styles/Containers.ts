import styled from 'styled-components';

export const BorderBottom = styled.div`
  width: 100%;
  border-bottom: 1px solid var(--colorGray);
  padding: var(--lengthLg1) 0;
`;

export const BottomBar = styled.nav`
  height: 3rem;
  width: 100%;
  position: fixed;
  background-color: white;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 300;
  .innerBottomBar {
    width: 100%;
    height: 100%;
    padding: 0.5rem 1rem;
    max-width: 640px;
    border-top: 0.5px solid var(--colorDim);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const SingleRow = styled.div`
  display: flex;
  padding: var(--lengthSm1) var(--lengthSm3);
  justify-content: space-between;
  align-items: center;
`;

export const Main = styled.main`
  padding-bottom: 3rem;
  min-height: calc(100vh - 3rem);
  max-width: 640px;
  margin: 0 auto;
`;

export const HomePageContainer = styled.div`
  padding: var(--lengthMd1);
  display: flex;
  justify-content: center;
  overflow: hidden;
  h1 {
    font-size: var(--lengthMd3);
    font-weight: 600;
    padding: var(--lengthSm3);
    margin-bottom: var(--lengthMd1);
  }
`;
