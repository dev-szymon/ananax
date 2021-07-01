import React, { ReactNode, useRef } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  Button,
  useDisclosure,
  Flex,
  Box,
  Link,
  Heading,
  IconButton,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Navigation from './Navigation';
import { useAuth } from '../lib/auth';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user } = useAuth();
  const router = useRouter();
  const btnRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isLoginPage =
    router.pathname === '/login' || router.pathname === '/register';

  return (
    <>
      <Flex
        as="header"
        borderBottomWidth="1px"
        p="1rem"
        justify="space-between"
        align="center"
      >
        <NextLink href="/" passHref>
          <Link>
            <Heading as="h1" fontFamily="Rock Salt" fontSize="1rem">
              Munch
            </Heading>
          </Link>
        </NextLink>
        <Box>
          {!user && !isLoginPage && (
            <NextLink href="/login" passHref>
              <Link fontWeight="bold" color="pink.900" marginRight="0.5rem">
                sign in
              </Link>
            </NextLink>
          )}
          <IconButton
            aria-label="Menu"
            borderRadius="0.5rem"
            icon={<HamburgerIcon />}
            ref={btnRef}
            variant="ghost"
            onClick={onOpen}
            p={0}
          />
        </Box>
      </Flex>
      <Navigation
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        btnRef={btnRef}
      />

      <Box as="main">{children}</Box>
    </>
  );
}
