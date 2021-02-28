import Layout from '../components/Layout';
import SignUp from '../components/credentials/SignUp';
import { CenterContent } from '../components/styles/Containers';

export default function SignUpPage() {
  return (
    <Layout>
      <CenterContent style={{ minHeight: '80vh' }}>
        <SignUp />
      </CenterContent>
    </Layout>
  );
}
