'use client';

import React, { useState } from 'react';
import {
  Box,
  HStack,
  VStack,
  Text,
  Icon,
  IconButton,
  Button,
} from '@chakra-ui/react';
import { FaDollarSign } from 'react-icons/fa6';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

export default function EventBar() {
  const [quantity, setQuantity] = useState<number>(1);
  const [loadingState, setLoadingState] = useState<boolean>(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoadingState(true);
    setTimeout(() => {
      setLoadingState(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        bg='white'
        w='100%'
        py='2'
        px='6'
        position='fixed'
        bottom='0'
        z-index='100'
      >
        <HStack
          mb='2'
          borderWidth='2px'
          p='4'
          borderColor='gray.800'
          borderRadius='sm'
          alignItems='flex-start'
          justifyContent='space-between'
        >
          <VStack alignItems='left'>
            <Text as='b' noOfLines={1} mb='2'>
              Premium Ticket
            </Text>
            <HStack spacing='1' mb='2'>
              <Text>Rp. 50.000,-</Text>
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
        <Button
          type='submit'
          width='100%'
          borderColor='gray.800'
          borderWidth='2px'
          borderRadius='sm'
          bg='yellow.200'
          _hover={{ bg: 'yellow.300' }}
          isLoading={loadingState}
          loadingText='Getting your ticket'
        >
          Get Ticket
        </Button>
      </Box>
    </form>
  );
}
