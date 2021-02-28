import Layout from '../components/Layout';
import SignIn from '../components/credentials/SignIn';

import { CenterContent } from '../components/styles/Containers';

export default function SignInPage() {
  return (
    <Layout>
      <CenterContent style={{ minHeight: '80vh' }}>
        <SignIn />
      </CenterContent>
    </Layout>
  );
}
