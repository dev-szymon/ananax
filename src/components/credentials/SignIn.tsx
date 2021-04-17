import React from 'react';
import { Formik, Form } from 'formik';
import InputField from './TextInput';
import { PrimaryButton } from '../styles';
import { useAuth } from '../../lib/auth';
import { useRouter } from 'next/router';

interface ISignIn {
  email: string;
  password: string;
}

export default function SignIn() {
  const router = useRouter();
  const initialValues: ISignIn = {
    email: '',
    password: '',
  };

  const { user, signin } = useAuth();

  if (user) {
    router.push('/');
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          try {
            const { email, password } = values;
            signin(email, password);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <Form>
          {/* set aria busy depending on mutation state */}
          <fieldset aria-busy={false}>
            <InputField
              type="email"
              name="email"
              label="email"
              placeholder="your@email.com"
            />
            <InputField type="password" name="password" label="password" />
            <PrimaryButton style={{ marginTop: '1rem' }} type="submit">
              sign in
            </PrimaryButton>
          </fieldset>
        </Form>
      </Formik>
    </>
  );
}
