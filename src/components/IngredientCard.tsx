import React from 'react';
import styled from 'styled-components';
import { Book, Heart, More } from '../images';
import Flex from './Flex';
import { PlainButton } from './styles';
import Image from 'next/image';
import { IIngredientData } from '../lib/firestore';

const IngredientCardStyles = styled.div`
  padding: 1rem 0;
`;
const CardElementTop = styled(Flex)`
  padding: 0.5rem;
`;
const SmallTagElement = styled.div`
  font: var(--typographySmaller);
  color: var(--colorTextLight);
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

const CardElementBottom = styled(Flex)`
  padding: 0.5rem;
`;

const CardElementActions = styled(Flex)`
  padding: 0 0.5rem;
`;

const Count = styled.div`
  font: var(--typographySmaller);
  color: var(--colorTextLight);
  padding-left: 0.2rem;
  padding-right: 0.5rem;
  text-align: center;
`;

export default function IngredientCard(ingredient: any) {
  const {
    authorUsername,
    name,
    images,
    nutrients,
    likesCount,
    cookbookCount,
  } = ingredient.ingredient;

  return (
    <IngredientCardStyles>
      <CardElementTop align="center" justify="space-between">
        <SmallTagElement>{`@${authorUsername}`}</SmallTagElement>
        <PlainButton style={{ width: '2rem' }}>
          <More fill="var(--colorTextLight)" />
        </PlainButton>
      </CardElementTop>

      <CardTitle>{name}</CardTitle>
      <IngredientCardImage>
        <Imagine>
          <div>
            <Image src={images[0]} object-fit="cover" layout="fill"></Image>
          </div>
        </Imagine>
      </IngredientCardImage>

      <CardElementBottom justify="space-between" align="center">
        <SmallTagElement>{`${nutrients.kcal} kcal`}</SmallTagElement>
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
          <Flex>
            <PlainButton style={{ width: '1.2rem', height: '1.2rem' }}>
              <Book fill="var(--colorText)" />
            </PlainButton>
            <Count>{cookbookCount}</Count>
          </Flex>
        </CardElementActions>
      </CardElementBottom>
    </IngredientCardStyles>
  );
}
