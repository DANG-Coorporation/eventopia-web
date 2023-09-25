import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import NavbarMenu from '@/components/NavbarMenu';

export default function NavbarMobile() {
  return (
    <Flex alignItems='center' justify='space-between' py='4' px='6' shadow='sm'>
      <Heading as='h1' size='lg'>
        Eventopia
      </Heading>
      <NavbarMenu />
    </Flex>
  );
}
