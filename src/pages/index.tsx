import React, { ChangeEvent, useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import { HomePageContainer, BaseInputStyles } from '../components/styles';

export default function Home() {
  const [value, setValue] = useState('');

  return (
    <Layout>
      <Head>
        <title>Ananax</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePageContainer>
        <div>
          <h1>What will you cook today?</h1>
          <BaseInputStyles>
            <input
              type="search"
              name="search"
              autoComplete="off"
              placeholder="search recipes..."
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setValue(e.target.value);
              }}
              value={value}
            />
          </BaseInputStyles>
        </div>
      </HomePageContainer>
      <img
        style={{ height: '70vh', margin: '0 auto' }}
        className="landing-image"
        src="https://res.cloudinary.com/dq104qc4m/image/upload/v1616174459/mealprep/pineapple_ghqxhw.png"
      />
    </Layout>
  );
}
