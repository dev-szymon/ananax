import React from 'react';
import { Book, Heart, More } from '../images';
import Flex from './Flex';
import {
  CardElementActions,
  CardElementBottom,
  CardElementTop,
  CardTitle,
  Count,
  FourThreeImg,
  CardElementMiddle,
  CardStyles,
  PlainButton,
  SmallTagElement,
} from './styles';
import Image from 'next/image';
import { IRecipeData } from '../types/recipes';

interface IRecipeCardProps {
  recipe: IRecipeData;
}

export default function IngredientCard({ recipe }: IRecipeCardProps) {
  const { authorUsername, name, images, totalKcal, likesCount, cookbookCount } =
    recipe;
  console.log(recipe);

  return (
    <CardStyles>
      <CardElementTop align="center" justify="space-between">
        <SmallTagElement>{`@${authorUsername}`}</SmallTagElement>
        <PlainButton style={{ width: '2rem' }}>
          <More fill="var(--colorTextLight)" />
        </PlainButton>
      </CardElementTop>

      <CardTitle>{name}</CardTitle>
      <CardElementMiddle>
        <FourThreeImg>
          <Image src={images[0]} object-fit="cover" layout="fill"></Image>
        </FourThreeImg>
      </CardElementMiddle>

      <CardElementBottom justify="space-between" align="center">
        <SmallTagElement>{`${totalKcal} kcal`}</SmallTagElement>
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
    </CardStyles>
  );
}
