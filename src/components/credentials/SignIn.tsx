import { Formik, Form } from 'formik';
import InputField from './InputFeld';
import Router from 'next/router';
import { gql, useMutation } from '@apollo/client';
import SubmitButton from './buttons/SubmitButton';
import { useDispatchUser } from '../../context/context';
import { useUser } from './useUser';

interface SignInInterface {
  email: string;
  password: string;
}

export default function SignIn() {
  const { user, loading } = useUser();

  if (user) {
    Router.push('/');
  }

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
  const [SignInMutation] = useMutation(SIGN_IN, {
    onCompleted: (data) => {
      dispatch({ type: 'SIGN_IN', user: data.logIn });
      Router.push('/');
    },
  });

  return (
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
      <Form>
        <InputField type="email" name="email" label="email" />
        <InputField type="password" name="password" label="password" />
        <SubmitButton text="sign in" />
      </Form>
    </Formik>
  );
}
