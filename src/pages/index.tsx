import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useUser } from '../components/credentials/useUser';
import { BtnBorderStyles, BtnFilledStyles } from '../components/styles/Buttons';

export default function Home() {
  const { user, loading } = useUser();

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <Layout>
      <div className="home">
        <Head>
          <title>Ananax</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>Hey there!</h1>
        {!user && (
          <>
            <BtnFilledStyles>
              <Link href="/signup">Sign Up!</Link>
            </BtnFilledStyles>
            <BtnBorderStyles>
              <Link href="/signin">Sign in</Link>
            </BtnBorderStyles>
          </>
        )}
      </div>
    </Layout>
  );
}
