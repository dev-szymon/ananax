import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { BtnFilledStyles } from '../components/styles';
import { useAuth } from '../lib/useAuth';

export default function Home() {
  useAuth();

  return (
    <Layout>
      <Head>
        <title>Ananax</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/create-ingredient">
        <BtnFilledStyles>new ingredient</BtnFilledStyles>
      </Link>

      <Link href="/create-recipe">
        <BtnFilledStyles>new recipe</BtnFilledStyles>
      </Link>
    </Layout>
  );
}
