import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import { AspectRatio, Heading, Text } from '@chakra-ui/react';
import Image from 'next/image';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Munch</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AspectRatio ratio={1920 / 1381} w="100%">
        <Image
          src="https://res.cloudinary.com/dq104qc4m/image/upload/v1625085199/nTZOILVZuOg_yr6lig.jpg"
          layout="fill"
        />
      </AspectRatio>
      <Heading as="h1" fontSize="3rem" p="1rem">
        Produkty i przepisy w przeglądarce
      </Heading>
      <Text fontSize="2rem">Również w telefonie</Text>
    </Layout>
  );
}
