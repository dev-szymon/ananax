import React from 'react';
import Image from 'next/image';
import { IRecipeData } from '../types/recipes';
import { Flex, Text, AspectRatio, Heading, IconButton } from '@chakra-ui/react';
import { ChevronDownIcon, DownloadIcon, StarIcon } from '@chakra-ui/icons';
import { IIngredientData } from '../types/ingredients';

interface ICardProps {
  node: IRecipeData | IIngredientData;
}

export default function RecipeCard({ node }: ICardProps) {
  const { authorUsername, name, images, likesCount, cookbookCount } = node;
  const totalKcal = node.totalKcal || 0;
  return (
    <Flex direction="column" p="0.5rem" marginBottom="1.5rem">
      <Flex justify="space-between">
        <Text as="span" fontSize="12px">{`@${authorUsername}`}</Text>
        <IconButton
          borderRadius="0.2rem"
          aria-label="details"
          icon={<ChevronDownIcon />}
          size="xs"
        />
      </Flex>
      <Heading as="h4" fontSize="1rem" p="0.5rem 0">
        {name}
      </Heading>
      <AspectRatio ratio={4 / 3} borderRadius="0.3rem" overflow="hidden">
        <Image src={images[0]} object-fit="cover" layout="fill"></Image>
      </AspectRatio>
      <Flex justify="space-between" p="0.5rem 0">
        <Text as="span" fontSize="10px">{`${totalKcal} kcal`}</Text>
        <Flex align="center">
          <Flex p="0 0.5rem" align="center">
            <IconButton
              borderRadius="0.2rem"
              aria-label="Save to cookbook"
              icon={<StarIcon />}
              size="xs"
            />
            <Text as="span" fontSize="10px" paddingLeft="0.5rem">
              {likesCount}
            </Text>
          </Flex>
          <Flex p="0 0.5rem" align="center">
            <IconButton
              borderRadius="0.2rem"
              aria-label="Save to cookbook"
              icon={<DownloadIcon />}
              size="xs"
            />
            <Text as="span" fontSize="10px" paddingLeft="0.5rem">
              {cookbookCount}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
