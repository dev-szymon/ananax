import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { More } from '../images';
import { getUser } from '../lib/firestore';
import Flex from './Flex';
import { PlainButton } from './styles';
import Image from 'next/image';

const IngredientCardStyles = styled.div`
  padding: 1rem 0;
`;
const AuthorTag = styled.div`
  font: var(--typographySmaller);
`;

const CardElementTop = styled(Flex)`
  padding: 0.5rem;
`;

const CardTitle = styled.h3`
  margin: 0;
  font: var(--typographyHeader3);
  font-size: 1rem;
  padding: 0.5rem;
  padding-top: 0;
`;

const IngredientCardImage = styled.div`
  padding: 0 0.5rem;
  display: flex;
  position: relative;
  width: 100%;
`;

const Imagine = styled.div`
  width: 30%;
  div {
    position: relative;
    overflow: hidden;
    height: 0;
    padding-top: 75%;
  }
`;

export default function IngredientCard(ingredient: any) {
  const { author, name, images } = ingredient.ingredient;

  const { isLoading, data }: { isLoading: boolean; data: any } = useQuery(
    `user${author}`,
    async () => await getUser(author)
  );

  return (
    <IngredientCardStyles>
      <CardElementTop align="center" justify="space-between">
        <AuthorTag>{`@${data ? data.username : '...'}`}</AuthorTag>
        <PlainButton style={{ width: '2rem' }}>
          <More fill="var(--colorText)" />
        </PlainButton>
      </CardElementTop>

      <CardTitle>{name}</CardTitle>
      <IngredientCardImage>
        <Imagine>
          <div>
            <Image src={images[0]} layout="fill"></Image>
          </div>
        </Imagine>
      </IngredientCardImage>
    </IngredientCardStyles>
  );
}
