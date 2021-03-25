import { Formik, Form } from 'formik';
import InputField from './TextInput';
import { BtnFilledStyles } from '../styles';

interface ISignUp {
  username: string;
  email: string;
  password: string;
}

export default function SignIn() {
  const initialValues: ISignUp = {
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
            console.log(values);
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
