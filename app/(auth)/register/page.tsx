'use client';

import React from 'react';
import { Image, SimpleGrid, Stack, useBreakpointValue } from '@chakra-ui/react';
import RegisterForm from '@/components/RegisterForm';

export default function Register() {
  const isSmallScreen = useBreakpointValue<boolean>({ base: true, lg: false });
  return (
    <SimpleGrid
      columns={{ base: 1, lg: 2 }}
      justifyContent='center'
      alignItems='center'
      h='100vh'
    >
      <Stack alignItems='center' justifyContent='center'>
        <RegisterForm />
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
