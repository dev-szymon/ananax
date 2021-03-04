import { gql, useMutation } from '@apollo/client';
import Router from 'next/router';
import { useEffect } from 'react';
import { CURRENT_USER } from '../components/credentials/useUser';

export default function SignOut() {
  const LOG_OUT = gql`
    mutation {
      logOut
    }
  `;

  const [logOut] = useMutation(LOG_OUT, {
    onCompleted: (data) => {
      if (data.logOut) {
        Router.push('/');
      }
    },
  });

  useEffect(() => {
    logOut();
  }, []);

  return <p>logout</p>;
}
