import React, { MutableRefObject } from 'react';
import router from 'next/router';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import { useAuth } from '../lib/auth';

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  btnRef: MutableRefObject<null>;
}

export default function Navigation({
  isOpen,
  onClose,
  btnRef,
}: NavigationProps) {
  const { user, signout } = useAuth();

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      size="full"
    >
      <DrawerOverlay />
      <DrawerContent>
        <Flex justify="flex-end" p="1rem">
          <DrawerCloseButton />
        </Flex>
        <DrawerHeader>{user?.email}</DrawerHeader>

        <DrawerBody>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              type="search"
              placeholder="search..."
              variant="filled"
              focusBorderColor="green.900"
            />
          </InputGroup>
          <Box h="3rem" />
          <List spacing="0.5rem" fontSize="1.25rem">
            <ListItem>
              <NextLink href="/recipes" passHref>
                <Link
                  _hover={{
                    color: 'pink.900',
                    fontWeight: 'bold',
                  }}
                >
                  recipes
                </Link>
              </NextLink>
            </ListItem>
            <ListItem>
              <NextLink href="/ingredients" passHref>
                <Link
                  _hover={{
                    color: 'pink.900',
                    fontWeight: 'bold',
                  }}
                >
                  ingredients
                </Link>
              </NextLink>
            </ListItem>
            <Box h="2rem" />

            {user && (
              <>
                <ListItem>cookbook</ListItem>
                <ListItem>
                  <NextLink href="/cookbook/recipes-created" passHref>
                    <Link _hover={{ color: 'pink.900', fontWeight: 'bold' }}>
                      recipes created
                    </Link>
                  </NextLink>
                </ListItem>
                <ListItem>
                  <NextLink href="/cookbook/ingredients-created" passHref>
                    <Link _hover={{ color: 'pink.900', fontWeight: 'bold' }}>
                      ingredients created
                    </Link>
                  </NextLink>
                </ListItem>

                <Box h="2rem" />

                <ListItem>
                  <NextLink href="/create-recipe" passHref>
                    <Link _hover={{ color: 'pink.900', fontWeight: 'bold' }}>
                      <ListIcon as={AddIcon} />
                      new recipe
                    </Link>
                  </NextLink>
                </ListItem>
                <ListItem>
                  <NextLink href="/create-ingredient" passHref>
                    <Link _hover={{ color: 'pink.900', fontWeight: 'bold' }}>
                      <ListIcon as={AddIcon} />
                      new ingredient
                    </Link>
                  </NextLink>
                </ListItem>
              </>
            )}
          </List>
        </DrawerBody>

        <DrawerFooter>
          {user && (
            <Button
              variant="ghost"
              onClick={() => {
                signout();
                onClose();
                router.pathname === '/' ? router.reload() : router.push('/');
              }}
            >
              logout
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
