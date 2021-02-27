import { Formik, Form } from 'formik';
import InputField from './InputFeld';
import Router from 'next/router';
import { gql, useMutation } from '@apollo/client';
import SubmitButton from './buttons/SubmitButton';
import { useDispatchUser } from '../../context/context';

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
      <Form>
        <InputField type="text" name="username" label="username" />
        <InputField type="email" name="email" label="email" />
        <InputField type="password" name="password" label="password" />
        <SubmitButton text="sign up" />
      </Form>
    </Formik>
  );
}
