import React from 'react';
import { Formik, Form } from 'formik';
import InputField from '../forms/TextInput';
import { useAuth } from '../../lib/auth';
import { Button } from '@chakra-ui/react';
import { signInYupSchema } from './validation';

interface ISignInValues {
  email: string;
  password: string;
}

export default function SignIn() {
  const { signin } = useAuth();

  const initialValues: ISignInValues = {
    email: '',
    password: '',
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={signInYupSchema}
        onSubmit={async (values) => {
          try {
            const { email, password } = values;
            signin(email, password);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ isValid, touched }) => {
          return (
            <Form>
              {/* set aria busy depending on mutation state */}
              <fieldset aria-busy={false}>
                <InputField
                  type="email"
                  name="email"
                  label="email"
                  placeholder="your@email.com"
                  variant="filled"
                />
                <InputField
                  type="password"
                  name="password"
                  label="password"
                  placeholder="8 characters +"
                  variant="filled"
                />
                <Button
                  colorScheme="green"
                  type="submit"
                  marginTop="1rem"
                  w="100%"
                  textAlign="center"
                  disabled={!isValid || (!touched.email && !touched.password)}
                >
                  sign in
                </Button>
              </fieldset>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
