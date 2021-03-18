import { Formik, Form } from 'formik';
import InputField from './TextInput';
import Router from 'next/router';
import { gql, useMutation } from '@apollo/client';
import { BtnFilledStyles } from '../styles';
import { ME_QUERY } from '../../lib/queries';

interface SignUpInterface {
  username: string;
  email: string;
  password: string;
}

export default function SignIn() {
  const initialValues: SignUpInterface = {
    username: '',
    email: '',
    password: '',
  };

  const SIGN_UP = gql`
    mutation newUser($username: String!, $email: String!, $password: String!) {
      newUser(username: $username, email: $email, password: $password) {
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

  const [SignUpMutation] = useMutation(SIGN_UP, {
    onCompleted: (data) => {
      Router.push('/');
    },
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          try {
            SignUpMutation({
              variables: values,
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
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <Form autoComplete="off">
          <fieldset>
            <InputField type="text" name="username" label="username" />
            <InputField type="email" name="email" label="email" />
            <InputField type="password" name="password" label="password" />
            <BtnFilledStyles style={{ marginTop: '1rem' }} type="submit">
              sign up
            </BtnFilledStyles>
          </fieldset>
        </Form>
      </Formik>
    </>
  );
}
