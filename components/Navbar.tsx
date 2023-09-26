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
import { FaRightFromBracket, FaTicket } from 'react-icons/fa6';
import { MdSpaceDashboard } from 'react-icons/md';

export default function Navbar() {
  const [user] = useAuthState(auth);
  const accessToken =
    typeof window !== 'undefined' && localStorage.getItem('accessToken');
  const localUser =
    typeof window !== 'undefined' &&
    JSON.parse(localStorage.getItem('localUser') || '{}');

  const handleLogout = () => {
    auth.signOut();
    if (accessToken) {
      localStorage.removeItem('accessToken');
    }
    if (localUser) {
      localStorage.removeItem('localUser');
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
          <Stack spacing='4' direction='row'>
            <Button
              as={NextLink}
              href='/create'
              variant='outline'
              bg='yellow.200'
              borderWidth='2px'
              borderColor='gray.800'
              borderRadius='lg'
              px='3'
              ml='4'
              _hover={{ bg: 'yellow.300' }}
              shadow='sm'
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
              <MenuList
                mt='2'
                borderRadius='lg'
                borderColor='gray.800'
                borderWidth='2px'
              >
                <MenuItem bg='white'>
                  <Button
                    as={NextLink}
                    href='/dashboard'
                    borderRadius='md'
                    style={{ textDecoration: 'none' }}
                    w='100%'
                    px='4'
                    alignItems='center'
                    justifyContent='flex-start'
                    bg='white'
                    _hover={{
                      bg: 'blue.200',
                      borderColor: 'gray.800',
                      borderWidth: '2px',
                      shadow: 'sm',
                    }}
                  >
                    <Icon as={MdSpaceDashboard} mr='4' /> Dashboard
                  </Button>
                </MenuItem>
                <MenuItem bg='white'>
                  <Button
                    as={NextLink}
                    href='/tickets'
                    borderRadius='md'
                    style={{ textDecoration: 'none' }}
                    w='100%'
                    px='4'
                    alignItems='center'
                    justifyContent='flex-start'
                    bg='white'
                    _hover={{
                      bg: 'blue.200',
                      borderColor: 'gray.800',
                      borderWidth: '2px',
                      shadow: 'sm',
                    }}
                  >
                    <Icon as={FaTicket} mr='4' /> Tickets
                  </Button>
                </MenuItem>
                <MenuItem bg='white'>
                  <Button
                    w='100%'
                    borderRadius='md'
                    alignItems='center'
                    justifyContent='flex-start'
                    px='4'
                    bg='white'
                    fontSize='sm'
                    _hover={{
                      bg: 'red.200',
                      borderColor: 'gray.800',
                      borderWidth: '2px',
                    }}
                    onClick={handleLogout}
                  >
                    <Icon as={FaRightFromBracket} mr='4' /> Logout
                  </Button>
                </MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        ) : (
          <Stack spacing='4' direction='row' ml='4'>
            <Button
              as={NextLink}
              href='/register'
              borderRadius='lg'
              style={{ textDecoration: 'none' }}
              w='100%'
              px='4'
              bg='white'
              borderColor='gray.800'
              borderWidth='2px'
              fontSize='sm'
              _hover={{
                bg: 'green.200',
                shadow: 'sm',
              }}
            >
              Register
            </Button>
            <Button
              as={NextLink}
              href='/login'
              borderRadius='lg'
              style={{ textDecoration: 'none' }}
              w='100%'
              px='4'
              bg='yellow.200'
              borderColor='gray.800'
              borderWidth='2px'
              fontSize='sm'
              _hover={{
                bg: 'yellow.300',
                shadow: 'sm',
              }}
            >
              Login
            </Button>
          </Stack>
        )}
      </HStack>
    </Flex>
  );
}
