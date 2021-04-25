import React from 'react';
import { Book, Heart, More } from '../images';
import Flex from './Flex';
import {
  CardElementActions,
  CardElementBottom,
  CardElementTop,
  CardTitle,
  Count,
  Imagine,
  IngredientCardImage,
  IngredientCardStyles,
  PlainButton,
  SmallTagElement,
} from './styles';
import Image from 'next/image';
import { IIngredientData } from '../types/ingredients';

interface IIngredientCardProps {
  ingredient: IIngredientData;
}

export default function IngredientCard({ ingredient }: IIngredientCardProps) {
  const {
    authorUsername,
    name,
    images,
    nutrients,
    likesCount,
    cookbookCount,
  } = ingredient;

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
        <SmallTagElement>{`${nutrients.kcal.value} kcal`}</SmallTagElement>
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
