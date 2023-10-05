'use client';

import React, { useState } from 'react';
import {
  Stack,
  Heading,
  Text,
  IconButton,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

export default function CartForm() {
  const [quantity, setQuantity] = useState<number>(0);

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
      <HStack
        borderWidth='2px'
        m='4'
        p='4'
        borderColor='gray.800'
        borderRadius='sm'
        alignItems='flex-start'
        justifyContent='space-between'
      >
        <VStack alignItems='left' spacing='4'>
          <Text as='b' noOfLines={2} mb='2'>
            Bronze Ticket
          </Text>
          <HStack spacing='1'>
            <Text>Rp</Text>
            <Text>50.000</Text>
          </HStack>
        </VStack>
        <HStack spacing={{ base: '4', lg: '2' }}>
          <IconButton
            size='sm'
            aria-label='Add tickets'
            borderWidth='2px'
            borderColor='gray.800'
            borderRadius='sm'
            bg='green.200'
            _hover={{ bg: 'green.300' }}
            icon={<AddIcon />}
            value={quantity}
            onClick={() => setQuantity(quantity + 1)}
          />
          <Text as='b'>{quantity}</Text>
          <IconButton
            size='sm'
            aria-label='Remove tickets'
            borderWidth='2px'
            borderColor='gray.800'
            borderRadius='sm'
            bg='red.200'
            _hover={{ bg: 'red.300' }}
            icon={<MinusIcon />}
            value={quantity}
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          />
        </HStack>
      </HStack>
    </>
  );
}
