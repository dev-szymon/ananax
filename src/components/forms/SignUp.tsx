import { Formik, Form } from 'formik';
import InputField from './TextInput';
import { PrimaryButton } from '../styles';
import { useAuth } from '../../lib/auth';
import { useRouter } from 'next/router';

interface ISignUp {
  username: string;
  email: string;
  password: string;
}

export default function SignIn() {
  const router = useRouter();
  const initialValues: ISignUp = {
    username: '',
    email: '',
    password: '',
  };

  const { user, signup } = useAuth();

  if (user) {
    router.push('/');
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          try {
            const { email, password, username } = values;
            signup(email, password, username);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <Form>
          <fieldset>
            <InputField
              placeholder="username"
              type="text"
              name="username"
              label="username"
            />
            <InputField
              placeholder="register@account.com"
              type="email"
              name="email"
              label="email"
            />
            <InputField type="password" name="password" label="password" />
            <PrimaryButton style={{ marginTop: '1rem' }} type="submit">
              sign up
            </PrimaryButton>
          </fieldset>
        </Form>
      </Formik>
    </>
  );
}
