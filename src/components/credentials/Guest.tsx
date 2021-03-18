import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { ME_QUERY } from '../../lib/queries';
import { GuestButton } from '../styles';

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
      logIn(email: $email, password: $password) {
        id
        username
        email
        liked {
          id
        }
        recipesSaved {
          id
        }
      }
    }
  `;
  const router = useRouter();

  const [SignInMutation] = useMutation(SIGN_IN);

  const SignInGuest = async () => {
    try {
      const res = await SignInMutation({
        variables: {
          email: 'guest@guest.com',
          password: 'signinasaguest123',
        },
        update: (cache, { data }) => {
          cache.writeQuery({
            query: ME_QUERY,
            data: {
              __typename: 'Query',
              me: data?.logIn,
            },
          });
          // cache.evict({ fieldName: 'posts:{}' });
        },
      });
      // if (res.data?.login.errors) {
      //   setErrors(toErrorMap(response.data.login.errors));
      // } else
      if (res.data?.logIn.username) {
        if (typeof router.query.next === 'string') {
          router.push(router.query.next);
        } else {
          // worked
          router.push('/');
        }
      }
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
