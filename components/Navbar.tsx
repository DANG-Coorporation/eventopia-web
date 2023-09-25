'use client';

import React, { useEffect } from 'react';
import {
  Flex,
  HStack,
  Heading,
  Link,
  Text,
  Image,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Button,
  Stack,
  Icon,
} from '@chakra-ui/react';
import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';
import SearchInput from './SearchInput';
import NextLink from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/utils/firebase';

export default function Navbar() {
  const [user] = useAuthState(auth);
  const accessToken =
    typeof window !== 'undefined' && localStorage.getItem('accessToken');

  const handleLogout = () => {
    auth.signOut();
    if (accessToken) {
      localStorage.removeItem('accessToken');
    }
  };

  return (
    <Flex justify='space-between' gap='2' py='4' px='6' shadow='sm'>
      <Heading as='h1' size='lg' mr='6'>
        Eventopia
      </Heading>
      <HStack w='80%'>
        <SearchInput />
        {user || accessToken ? (
          <Stack spacing='6' direction='row'>
            <Button
              as={NextLink}
              href='/create'
              variant='outline'
              borderRadius='sm'
              px='4'
              ml='4'
              borderColor='gray.300'
            >
              <Icon as={AddIcon} mr='2' /> Create Event
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                bg='white'
                _hover={{ bg: 'white' }}
                _active={{ bg: 'white' }}
                p='0'
              >
                <Image
                  src={
                    user ? user.photoURL || undefined : './images/avatar.png'
                  }
                  borderRadius='full'
                  maxWidth='40px'
                />
              </MenuButton>
              <MenuList mt='2' borderColor='gray.300' borderRadius='sm'>
                <MenuItem
                  as={NextLink}
                  href='/login'
                  bg='white'
                  _hover={{ bg: 'white' }}
                >
                  Dashboard
                </MenuItem>
                <MenuItem
                  as={NextLink}
                  href='/login'
                  bg='white'
                  _hover={{ bg: 'white' }}
                >
                  Tickets
                </MenuItem>
                <MenuItem
                  as={NextLink}
                  href='/login'
                  bg='white'
                  _hover={{ bg: 'white' }}
                  onClick={handleLogout}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        ) : (
          <Stack spacing='6' direction='row' ml='4'>
            <Link
              as={NextLink}
              href='/register'
              borderRadius='sm'
              style={{ textDecoration: 'none' }}
            >
              Register
            </Link>
            <Link
              as={NextLink}
              href='/login'
              borderRadius='sm'
              style={{ textDecoration: 'none' }}
            >
              Login
            </Link>
          </Stack>
        )}
      </HStack>
    </Flex>
  );
}
