import styled from 'styled-components';
import { Greylogo } from '../images/greylogo';

const LoadingLogo = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 150px;
  }
`;

export default function Loader() {
  return (
    <LoadingLogo>
      <Greylogo />
    </LoadingLogo>
  );
}
