import { Formik, Form } from 'formik';
import InputField from './TextInput';
import { BtnFilledStyles } from '../styles';
import { useAuth } from '../../lib/auth';

interface ISignUp {
  // username: string;
  email: string;
  password: string;
}

export default function SignIn() {
  const initialValues: ISignUp = {
    // username: '',
    email: '',
    password: '',
  };

  const { signup } = useAuth();

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          try {
            const { email, password } = values;
            signup(email, password);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <Form autoComplete="off">
          <fieldset>
            {/* <InputField type="text" name="username" label="username" /> */}
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
