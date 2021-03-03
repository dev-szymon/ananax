import Layout from '../components/Layout';
import SignUp from '../components/credentials/SignUp';
import Guest from '../components/credentials/Guest';

export default function SignUpPage() {
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
        <SignUp />
      </div>
    </Layout>
  );
}
