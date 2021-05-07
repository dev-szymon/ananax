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
import { IIngredientData } from '../types/ingredients';
import Link from 'next/link';

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
    id,
  } = ingredient;

  return (
    <CardStyles>
      <CardElementTop align="center" justify="space-between">
        <SmallTagElement>{`@${authorUsername}`}</SmallTagElement>
        <PlainButton style={{ width: '2rem' }}>
          <More fill="var(--colorTextLight)" />
        </PlainButton>
      </CardElementTop>
      <Link href={`/ingredients/${id}`}>
        <CardTitle>{name}</CardTitle>
      </Link>
      <CardElementMiddle>
        <Link href={`/ingredients/${id}`}>
          <div
            style={{ width: '30%', position: 'relative', padding: '0 0.25rem' }}
          >
            <FourThreeImg>
              <Image src={images[0]} object-fit="cover" layout="fill"></Image>
            </FourThreeImg>
          </div>
        </Link>
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 0.025rem',
          }}
        >
          nutrients
        </div>
      </CardElementMiddle>

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
