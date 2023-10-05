import React from 'react';
import { Stack, Heading } from '@chakra-ui/react';
import CartTicket from '@/components/CartTicket';

export default function CartForm() {
  return (
    <>
      <Stack
        w='full'
        borderBottomColor='gray.800'
        borderBottomWidth='2px'
        p='4'
        direction='row'
      >
        <Heading size='sm'>Tickets</Heading>
      </Stack>
      <CartTicket />
      <CartTicket />
      <CartTicket />
    </>
  );
}
