'use client'

import React, {useState} from 'react';
import {
  Box,
  Heading,
  Stack,
  Image,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  HStack,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import {AppDispatch} from '@/redux/store';
import formatPrice  from '@/utils/formatPrice';
import moment from 'moment';
import {useRouter} from 'next/navigation';
import { postCart } from '../redux/features/cartSlice';
import { getLocalStorage } from '@/utils/localStorage';
import NextLink from 'next/link';

export default function CartSummary(props: any) {
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const { tickets } = useSelector((state: any) => state.ticket);
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const accessToken = getLocalStorage('accessToken');

  const formatDate = (date: string) => {
    return moment(date).format('LL');
  }

  const formatTime = (time: string) => {
    return moment(time).format('LT');
  }

  const totalPrice = tickets.reduce((total: number, ticket: any) => {
    return total + ticket.price * ticket.quantity;
  }, 0);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoadingState(true);
    dispatch(postCart({ data: { ...props, tickets, totalPrice }, token: accessToken }));
    router.push(`/order/${props.uniqueId}`);
    setTimeout(() => {
      setLoadingState(false);
    }, 1000);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        w='full'
        borderBottomColor='gray.800'
        borderBottomWidth='2px'
        p='4'
      >
        <Heading size='sm'>Event Details</Heading>
      </Stack>
      <Stack
        w='full'
        p='4'
        borderBottomColor='gray.800'
        borderBottomWidth='2px'
      >
        <HStack
          justifyContent='space-between'
          alignItems='flex-start'
          gap='16'
        >
          <Text as='b'>Name</Text>
          <Text
            textAlign='right'
            noOfLines={2}
          >
            {props.name}
          </Text>
        </HStack>
        <HStack justifyContent='space-between'>
          <Text as='b'>Date</Text>
          <Text>{formatDate(props.eventStartDateTime)}</Text>
        </HStack>
        <HStack justifyContent='space-between'>
          <Text as='b'>Time</Text>
          <Text>{formatTime(props.eventStartDateTime)}</Text>
        </HStack>
        <HStack justifyContent='space-between' gap='6'>
          <Text as='b'>Location</Text>
          <Text textAlign='right'>{props.address}</Text>
        </HStack>
      </Stack>
      {tickets.map((ticket: any, index: number) => (
        <>
        <Stack
        w='full'
        borderBottomColor='gray.800'
        borderBottomWidth='2px'
        p='4'
      >
        <Heading size='sm'>Tickets {index + 1}</Heading>
      </Stack>
        
        <Stack
          w='full'
          p='4'
          borderBottomColor='gray.800'
          borderBottomWidth='2px'
          key={ticket.id}
        >
          <HStack justifyContent='space-between'>
            <Text as='b'>Ticket</Text>
            <Text>{ticket.name}</Text>
          </HStack>
          <HStack justifyContent='space-between'>
            <Text as='b'>Price</Text>
            <Text>{ticket.price}</Text>
          </HStack>
          <HStack justifyContent='space-between'>
            <Text as='b'>Quantity</Text>
            <Text>{ticket.quantity}</Text>
          </HStack>
        </Stack>
        </>
      ))}
      <HStack
        justifyContent='space-between'
        w='full'
        p='4'
        borderBottomColor='gray.800'
        borderBottomWidth='2px'
      >
        <Text as='b'>Total</Text>
        <Text as='b'>{formatPrice(totalPrice)}</Text>
      </HStack>
      <Button
        as={NextLink}
        href="https://sandbox.doku.com/how-to-pay/v2/bca-virtual-account/1900800000044306/icsURAGpZGnAoKgYM2rtZsbM_DjCrvTRef1PlOM1Lx4"
        type='submit'
        w='100%'
        bg='yellow.200'
        borderRadius='md'
        size='lg'
        fontSize='md'
        _hover={{ bg: 'yellow.300' }}
        isLoading={loadingState}
        loadingText='Checking out'
      >
        Check Out
      </Button>
    </form>
  );
}
