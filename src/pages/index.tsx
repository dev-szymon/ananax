import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import { AspectRatio, Heading } from '@chakra-ui/react';
import Image from 'next/image';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Munch</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AspectRatio ratio={12 / 5} w="100%">
        <Image
          src="https://res.cloudinary.com/dq104qc4m/image/upload/v1625085199/nTZOILVZuOg_yr6lig.jpg"
          layout="fill"
          objectFit="cover"
          objectPosition="100% 100%"
        />
      </AspectRatio>
      <Heading as="h1" fontSize="3rem" p="1rem">
        Recipes and ingredients app.
      </Heading>
    </Layout>
  );
}
