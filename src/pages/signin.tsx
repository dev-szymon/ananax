import Layout from '../components/Layout';
import SignIn from '../components/credentials/SignIn';
import Guest from '../components/credentials/Guest';
export default function SignInPage() {
  return (
    <Layout>
      <Guest />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <SignIn />
      </div>
    </Layout>
  );
}
