import styled from 'styled-components';

export const NavigationOutsideStyles = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  bottom: 0;
  left: 0;
  padding-bottom: 3rem;
  width: 100%;
  height: 100vh;
  z-index: 200;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const NavigationStyles = styled.nav`
  background-color: var(--colorLight);
  position: relative;
  border-radius: 1rem 1rem 0 0;
  padding: 1rem;
  margin: 0 auto;
  width: 100%;
  max-width: 640px;
  li {
    button {
      font: var(--typographyBody);
    }
  }
`;
