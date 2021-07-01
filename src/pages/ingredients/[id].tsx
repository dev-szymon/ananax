import { GetStaticProps } from 'next';
import React from 'react';
import Layout from '../../components/Layout';

import Image from 'next/image';
import { getAllIngredients, getSingleIngredient } from '../../lib/db-admin';
import { IIngredientData } from '../../types/ingredients';
import { AspectRatio, Flex, Heading, Text } from '@chakra-ui/react';
import { StarIcon, DownloadIcon } from '@chakra-ui/icons';

interface ISingleIngredientPageProps {
  ingredient: IIngredientData;
}

export default function SingleIngredientPage({
  ingredient,
}: ISingleIngredientPageProps) {
  if (!ingredient) {
    return <Layout>ingredient not found</Layout>;
  }
  const { name, authorUsername, images, likesCount, cookbookCount } =
    ingredient;

  return (
    <Layout>
      <article>
        <Heading as="h4" fontSize="1rem" p="0.5rem 0">
          {name}
        </Heading>
        <AspectRatio ratio={4 / 3}>
          <Image src={images[0]} object-fit="cover" layout="fill"></Image>
        </AspectRatio>
        <Flex justify="space-between" align="center">
          <Text as="span" fontSize="12px">{`@${authorUsername}`}</Text>
          <Flex align="center">
            <Flex p="0 0.5rem" align="center">
              <StarIcon />
              <Text as="span" fontSize="10px" paddingLeft="0.5rem">
                {likesCount}
              </Text>
            </Flex>
            <Flex p="0 0.5rem" align="center">
              <DownloadIcon />
              <Text as="span" fontSize="10px" paddingLeft="0.5rem">
                {cookbookCount}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </article>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const { ingredients } = await getAllIngredients();
  const paths = ingredients.map((ingre) => ({
    params: {
      id: ingre.id.toString(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const ingredient = await getSingleIngredient(params?.id as string);
  return { props: { ingredient }, revalidate: 1 };
};
