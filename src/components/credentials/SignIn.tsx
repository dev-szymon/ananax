import { Formik, Form } from 'formik';
import InputField from './TextInput';
import { useRouter } from 'next/router';
import { gql, useMutation } from '@apollo/client';
import { BtnFilledStyles } from '../styles';
import { ME_QUERY } from '../../lib/queries';

interface SignInInterface {
  email: string;
  password: string;
}

export default function SignIn() {
  const initialValues: SignInInterface = {
    email: '',
    password: '',
  };
  const router = useRouter();

  const SIGN_IN = gql`
    mutation logIn($email: String!, $password: String!) {
      logIn(email: $email, password: $password) {
        id
        username
        email
        liked {
          id
        }
        recipesSaved {
          id
        }
      }
    }
  `;

  const [SignInMutation, loading] = useMutation(SIGN_IN);

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          try {
            const res = await SignInMutation({
              variables: values,
              update: (cache, { data }) => {
                cache.writeQuery({
                  query: ME_QUERY,
                  data: {
                    __typename: 'Query',
                    me: data?.logIn,
                  },
                });
                // cache.evict({ fieldName: 'posts:{}' });
              },
            });
            // if (res.data?.logIn.errors) {
            //   return <p>error</p>;
            //   setErrors(toErrorMap(response.data.login.errors));
            // } else
            if (res.data?.logIn.username) {
              if (typeof router.query.next === 'string') {
                router.push(router.query.next);
              } else {
                // worked
                router.push('/');
              }
            }
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
        </Form>
      </Formik>
    </>
  );
}
