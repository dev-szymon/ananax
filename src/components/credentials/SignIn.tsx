import { Formik, Form } from 'formik';
import InputField from './TextInput';
import Router from 'next/router';
import Link from 'next/link';
import { gql, useMutation } from '@apollo/client';
import { BtnFilledStyles } from '../styles/Buttons';
import { useDispatchUser } from '../../context/context';
import { RadiusShadow } from '../styles/Containers';
import { Caption } from '../styles/Forms';

interface SignInInterface {
  email: string;
  password: string;
}

export default function SignIn() {
  const initialValues: SignInInterface = {
    email: '',
    password: '',
  };

  const SIGN_IN = gql`
    mutation logIn($email: String!, $password: String!) {
      logIn(email: $email, password: $password)
    }
  `;

  const dispatch = useDispatchUser();
  const [SignInMutation, loading] = useMutation(SIGN_IN, {
    onCompleted: (data) => {
      dispatch({ type: 'SIGN_IN', user: data.logIn });
      Router.push('/');
    },
  });

  return (
    <RadiusShadow>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          try {
            SignInMutation({ variables: values });
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <Form autoComplete="off">
          <fieldset aria-busy={loading && true}>
            <InputField type="email" name="email" label="email" />
            <InputField type="password" name="password" label="password" />
            <BtnFilledStyles style={{ marginTop: '1rem' }} type="submit">
              sign in
            </BtnFilledStyles>
          </fieldset>
          <Caption>
            <p>Don't have an account yet?</p>
            <Link href="/signup">Sign up!</Link>
          </Caption>
        </Form>
      </Formik>
    </RadiusShadow>
  );
}
