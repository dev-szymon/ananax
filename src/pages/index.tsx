import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';
import styled from 'styled-components';
import { Github } from '../images';
import Flex from '../components/Flex';

const HomeSection = styled.section`
  padding: 0 1rem;
  pre {
    padding: 1rem;
    background-color: var(--colorWhite);
    border-radius: 0.5rem;
    box-shadow: var(--lightShadow);
    margin-bottom: 1rem;
    overflow-x: auto;
  }
  p {
    margin-bottom: 0.5rem;
  }

  .stack-list {
    padding: 1rem;
    padding-top: 0;
  }
`;

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Ananax</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeSection>
        <h2 style={{ boxShadow: 'none' }}>
          Recipes and ingredients app by{' '}
          <Link href="https://github.com/dev-szymon">@dev-szymon</Link>
        </h2>
        <Flex
          align="center"
          style={{ marginBottom: '1rem', color: 'var(--colorAccent)' }}
        >
          <Link href="https://github.com/dev-szymon/ananax">
            <>
              <div
                style={{ width: '2rem', height: '2rem', marginRight: '1rem' }}
              >
                <Github fill="var(--colorText)" />
              </div>
              github repository
            </>
          </Link>
        </Flex>
        <h3>What's in here?</h3>
        <ul className="stack-list">
          <li>Typescript</li>
          <li>Next.js</li>
          <li>Firebase</li>
          <li>React Query</li>
          <li>Styled Components</li>
          <li>Jest</li>
          <li>React Testing Library</li>
          <br></br>
          <li>... lot's to improve as I'm kind of playing around here</li>
        </ul>
        <h3>
          Login to guest account and take a look{' '}
          <Link href="/login">sign in</Link>
        </h3>
        <pre style={{ display: 'flex', flexDirection: 'column' }}>
          <span>email: takeabreath@gmail.com</span>{' '}
          <span>password: relaxyourshoulders</span>
        </pre>
        <h3>Running locally</h3>
        <pre style={{ display: 'flex', flexDirection: 'column' }}>
          <span>$ git clone https://github.com/dev-szymon/ananax.git </span>
          <span>$ cd ananax </span>
          <span>$ npm install </span>
          <span>$ npm run dev</span>
        </pre>
        <p>
          You need the following environmental variables for firebase and
          cloudinary services
        </p>
        <pre>$ touch .env.local</pre>
        <pre>
          <ul>
            <li>NEXT_PUBLIC_API_KEY</li>
            <li>NEXT_PUBLIC_AUTH_DOMAIN</li>
            <li>NEXT_PUBLIC_PROJECT_ID</li>
            <li>FIREBASE_PRIVATE_KEY</li>
            <li>FIREBASE_CLIENT_EMAIL</li>
            <li>CLOUDINARY_NAME</li>
            <li>CLOUDINARY_API_KEY</li>
            <li>CLOUDINARY_API_SECRET</li>
          </ul>
        </pre>
      </HomeSection>
    </Layout>
  );
}
