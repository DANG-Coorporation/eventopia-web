'use client';

import React, { useState } from 'react';
import { Box, Stack, Text, Button } from '@chakra-ui/react';
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
        <Stack
          mb='2'
          borderWidth='2px'
          p='4'
          borderColor='gray.800'
          borderRadius='sm'
          alignItems='flex-start'
          justifyContent='space-between'
        >
          <Text as='b' noOfLines={1} mb='2'>
            Free Fire Master League Season 8 League Stage Free Fire Master
            League Season 8 League Stage
          </Text>
          <Text>Friday, October 6</Text>
        </Stack>
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
