import { Formik, Form } from 'formik';
import InputField from './TextInput';
import { BtnFilledStyles } from '../styles';

interface ISignIn {
  email: string;
  password: string;
}

export default function SignIn() {
  const initialValues: ISignIn = {
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
          {/* set aria busy depending on mutation state */}
          <fieldset aria-busy={false}>
            <InputField type="email" name="email" label="email" />
            <InputField type="password" name="password" label="password" />
            <BtnFilledStyles style={{ marginTop: '1rem' }} type="submit">
              sign in
            </BtnFilledStyles>
          </fieldset>
        </Form>
      </Formik>
    </>
  );
}
