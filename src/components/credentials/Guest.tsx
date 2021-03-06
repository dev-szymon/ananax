import { gql, useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatchUser } from '../../context/context';
import { GuestButton } from '../styles/Buttons';

const GuestWrapper = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Guest() {
  const SIGN_IN = gql`
    mutation logIn($email: String!, $password: String!) {
      logIn(email: $email, password: $password)
    }
  `;
  const dispatch = useDispatchUser();

  const [SignInMutation] = useMutation(SIGN_IN, {
    onCompleted: (data) => {
      dispatch({ type: 'SET_CURRENT_USER', currentUser: data.logIn });
    },
  });

  const SignInGuest = () => {
    SignInMutation({
      variables: {
        email: 'guest@guest.com',
        password: 'signinasaguest123',
      },
    });
  };
  return (
    <GuestWrapper>
      <GuestButton onClick={() => SignInGuest()}>Enter as a guest!</GuestButton>
    </GuestWrapper>
  );
}
