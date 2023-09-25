'use client';

import { Heading, VStack, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/utils/firebase';

export default function Home() {
  const [user] = useAuthState(auth);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <VStack w='100%' h='100vh' justifyContent='center' alignItems='center'>
      <Heading mb='6'>Homepage</Heading>
      <Link
        as={NextLink}
        href='/register'
        color='orange.500'
        textDecoration='underline'
        _hover={{ color: 'orange.200' }}
      >
        Register
      </Link>
      <Link
        as={NextLink}
        href='/login'
        color='orange.500'
        textDecoration='underline'
        _hover={{ color: 'orange.200' }}
      >
        Login
      </Link>
      {user ? (
        <>
          <Text>Current User: {user.email}</Text>
          <Link
            as={NextLink}
            href='/'
            color='orange.500'
            textDecoration='underline'
            _hover={{ color: 'orange.200' }}
            onClick={handleLogout}
          >
            Logout
          </Link>
        </>
      ) : null}
    </VStack>
  );
}
