import { Formik, Form } from 'formik';
import InputField from '../forms/TextInput';
import { useAuth } from '../../lib/auth';
import { Button } from '@chakra-ui/react';

interface ISignUpValues {
  username: string;
  email: string;
  password: string;
}

export default function SignIn() {
  const { signup } = useAuth();

  const initialValues: ISignUpValues = {
    username: '',
    email: '',
    password: '',
  };

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
            <InputField
              type="password"
              name="password"
              label="password"
              placeholder="8 characters +"
            />
            <Button
              colorScheme="green"
              type="submit"
              w="100%"
              marginTop="1rem"
              textAlign="center"
            >
              sign up
            </Button>
          </fieldset>
        </Form>
      </Formik>
    </>
  );
}
