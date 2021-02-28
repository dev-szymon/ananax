import { Formik, Form } from 'formik';
import InputField from './TextInput';
import Router from 'next/router';
import Link from 'next/link';
import { gql, useMutation } from '@apollo/client';
import { BtnFilledStyles } from '../styles/Buttons';
import { useDispatchUser } from '../../context/context';
import { RadiusShadow } from '../styles/Containers';
import { Caption } from '../styles/Forms';

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
      newUser(username: $username, email: $email, password: $password)
    }
  `;
  const dispatch = useDispatchUser();

  const [SignUpMutation] = useMutation(SIGN_UP, {
    onCompleted: (data) => {
      dispatch({ type: 'SIGN_IN', user: data.newUser });
      Router.push('/');
    },
  });

  return (
    <RadiusShadow>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          try {
            SignUpMutation({ variables: values });
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
          <Caption>
            <p>Already have an account?</p>
            <Link href="/signin">sign in!</Link>
          </Caption>
        </Form>
      </Formik>
    </RadiusShadow>
  );
}
