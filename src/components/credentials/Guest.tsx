import React from 'react';
import styled from 'styled-components';
import { GuestButton } from '../styles';

const GuestWrapper = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Guest() {
  const variables = {
    email: 'guest@guest.com',
    password: 'signinasaguest123',
  };

  const SignInGuest = async () => {
    try {
      console.log(variables);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <GuestWrapper>
      <GuestButton onClick={() => SignInGuest()}>Enter as a guest!</GuestButton>
    </GuestWrapper>
  );
}
