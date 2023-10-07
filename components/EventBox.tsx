'use client';

import React, { useState } from 'react';
import { Box, Stack, Text, HStack, Button } from '@chakra-ui/react';
import formatPrice from '@/utils/formatPrice';
import { useSelector } from 'react-redux';
import Link from 'next/link';

export default function EventBox(props: any) {
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const { tickets } = useSelector((state: any) => state.ticket);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoadingState(true);
    setTimeout(() => {
      setLoadingState(false);
    }, 1000);
  };

  const totalPrice = tickets.reduce((total: number, ticket: any) => {
    return total + ticket.price * ticket.quantity;
  }, 0);

  return (
    <form onSubmit={handleSubmit}>
      <Box
        borderWidth='2px'
        borderRadius='sm'
        borderColor='gray.800'
        w='100%'
        p='2'
      >
        {tickets.length === 0 ? (
          <Box
            borderWidth='2px'
            borderRadius='sm'
            borderColor='gray.800'
            w='100%'
            p='2'
            mb='2'
          >
            <Text
              fontSize='lg'
              textAlign='center'
              w='100%'
            >
              No tickets selected
            </Text>
          </Box>
        ) : (
          tickets.map((ticket: any) => (
            <Stack
              key={ticket.id}
              mb='2'
              borderWidth='2px'
              p='4'
              borderColor='gray.800'
              borderRadius='sm'
              alignItems='flex-start'
              justifyContent='space-between'
              display='flex'
              direction='row'
            >
              <HStack spacing='2'>
                <Text>{ticket.quantity}</Text>
                <Text>X</Text>
                <Text
                  noOfLines={2}
                >
                  {ticket.name}
                </Text>
              </HStack>
              <Text>{formatPrice(ticket.price * ticket.quantity)}</Text>
            </Stack>
          ))
        )}
        {tickets.length > 0 && (
          <HStack
            borderWidth='2px'
            borderColor='gray.800'
            borderRadius='sm'
            p='4'
            justifyContent='space-between'
            mb='2'
          >
            <Text as='b'>Total</Text>
            <Text as='b'>{formatPrice(totalPrice)}</Text>
          </HStack>
        )}
        <Button
          as={Link}
          href={`/cart/${props.uniqueId}`}
          type='submit'
          width='100%'
          size='lg'
          fontSize='md'
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
