import styled from 'styled-components';

export const Caption = styled.div`
  display: flex;
  margin-top: var(--lengthSm3);
  width: 100%;
  font-size: var(--lengthSm3);
  a {
    color: var(--colorOutline);
    margin-left: var(--lengthSm3);
    font-weight: 600;
  }
`;

export const Notice = styled.p`
  font-size: var(--lengthSm3);
  color: var(--colorOutline);
  font-weight: 600;
`;

export const DropzoneStyles = styled.div`
  margin: 0 var(--lengthMd1);
  margin-bottom: var(--lengthMd3);
  width: 80%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  max-height: 300px;
  border-radius: var(--lengthSm3);
  padding: var(--lengthMd1);
  background-color: rgba(96, 128, 244, 0.2);
  border: 1px dashed var(--colorOutline);
  box-shadow: var(--boxShadowSmoothOutline);
  outline-color: var(--colorOutline);
`;
