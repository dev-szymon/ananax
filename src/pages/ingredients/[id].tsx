import { GetStaticProps } from 'next';
import React from 'react';
import Layout from '../../components/Layout';
import {
  CardElementActions,
  CardElementBottom,
  Count,
  FourThreeImg,
  PlainButton,
  SmallTagElement,
} from '../../components/styles';
import Image from 'next/image';
import { getAllIngredients, getSingleIngredient } from '../../lib/db-admin';
import { IIngredientData } from '../../types/ingredients';
import Flex from '../../components/Flex';
import { Heart, Book } from '../../images';

interface ISingleIngredientPageProps {
  ingredient: IIngredientData;
}

export default function SingleIngredientPage({
  ingredient,
}: ISingleIngredientPageProps) {
  if (!ingredient) {
    return <Layout>ingredient not found</Layout>;
  }
  const {
    name,
    authorUsername,
    images,
    likesCount,
    cookbookCount,
  } = ingredient;

  return (
    <Layout>
      <article>
        <h1
          style={{
            font: 'var(--typographyHeader2)',
            padding: '0 0.25rem',
            margin: '0',
          }}
        >
          {name}
        </h1>
        <FourThreeImg>
          <Image src={images[0]} object-fit="cover" layout="fill"></Image>
        </FourThreeImg>
        <CardElementBottom justify="space-between" align="center">
          <SmallTagElement>{`@${authorUsername}`}</SmallTagElement>
          <CardElementActions justify="center" align="center">
            <Flex align="center">
              <PlainButton
                style={{
                  width: '1.2rem',
                  height: '1.2rem',
                }}
              >
                <Heart isActive={false} />
              </PlainButton>
              <Count>{likesCount}</Count>
            </Flex>
            <Flex align="center">
              <PlainButton style={{ width: '1.2rem', height: '1.2rem' }}>
                <Book fill="var(--colorTextLight)" />
              </PlainButton>
              <Count>{cookbookCount}</Count>
            </Flex>
          </CardElementActions>
        </CardElementBottom>
      </article>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const ingredients = await getAllIngredients();
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
