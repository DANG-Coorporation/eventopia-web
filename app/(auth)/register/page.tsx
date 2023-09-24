'use client';

import React from 'react';
import { SimpleGrid, Image, Stack, useBreakpointValue } from '@chakra-ui/react';
import RegisterForm from '@/components/RegisterForm';

export default function Register() {
  const isSmallScreen = useBreakpointValue<boolean>({ base: true, lg: false });
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing='6' h='100vh'>
      <RegisterForm />
      {isSmallScreen ? null : (
        <Stack
          h='100vh'
          justifyContent='center'
          alignItems='center'
          position='relative'
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
