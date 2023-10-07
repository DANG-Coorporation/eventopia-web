import React, { useState } from 'react';
import { Box, HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import formatPrice from '@/utils/formatPrice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { addTicket, updateTicket, removeTicket } from '@/redux/features/ticketSlice';

export default function EventTicket(props: any) {
  const dispatch: AppDispatch = useDispatch();
  const { tickets } = useSelector((state: any) => state.ticket);
  const ticket = tickets.find((ticket: any) => ticket.id === props.id);

  const handleQuantity = (quantity: number) => {
    if (ticket) {
      if (quantity === 0) {
        dispatch(removeTicket(ticket.id));
      } else {
        dispatch(updateTicket({ ...ticket, quantity }));
      }
    } else {
      if (quantity > 0) {
        dispatch(addTicket({ ...props, quantity }));
      }
    }
  };

  return (
    <Box
      display='flex'
      borderColor='gray.800'
      borderWidth='2px'
      borderRadius='sm'
      p='4'
      justifyContent='space-between'
      alignItems='flex-start'
    >
      <VStack alignItems='flex-start' gap='4'>
        <Text as='b' fontSize='lg'>{props.name}</Text>
        <Text>{formatPrice(props.price)}</Text>
      </VStack>
      <HStack spacing={{ base: '4', lg: '2' }}>
        <IconButton
          size='sm'
          borderColor='gray.800'
          borderRadius='sm'
          borderWidth='2px'
          bg='green.200'
          _hover={{ bg: 'green.300' }}
          aria-label='Add tickets'
          icon={<AddIcon />}
          onClick={() => 
            handleQuantity(ticket ? ticket.quantity + 1 : 1)
          }
        />
        <Text as='b'>{ticket ? ticket.quantity : 0}</Text>
        <IconButton
          size='sm'
          borderColor='gray.800'
          borderRadius='sm'
          borderWidth='2px'
          bg='red.200'
          _hover={{ bg: 'red.300' }}
          aria-label='Remove tickets'
          icon={<MinusIcon />}
          onClick={() => 
            handleQuantity(ticket ? ticket.quantity - 1 : 0)
          }
          isDisabled={ticket ? ticket.quantity === 0 : true}
        />
      </HStack>
    </Box>
  );
}
