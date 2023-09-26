'use client';

import React from 'react';
import { Image, SimpleGrid, Stack, useBreakpointValue } from '@chakra-ui/react';
import LoginForm from '@/components/LoginForm';

export default function Login() {
  const isSmallScreen = useBreakpointValue<boolean>({ base: true, lg: false });
  return (
    <SimpleGrid
      columns={{ base: 1, lg: 2 }}
      justifyContent='center'
      alignItems='center'
      h='100vh'
    >
      <Stack alignItems='center' justifyContent='center'>
        <LoginForm />
      </Stack>
      {isSmallScreen ? null : (
        <Stack
          justifyContent='center'
          alignItems='center'
          position='relative'
          w='100%'
          h='100%'
        >
          <Image
            src='/images/auth-img.jpeg'
            alt='authentication image'
            objectFit='cover'
            backgroundSize='cover'
            w='100%'
            h='100%'
            position='absolute'
          />
        </Stack>
      )}
    </SimpleGrid>
  );
}
