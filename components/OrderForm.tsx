import React, { useState } from 'react';
import {
  Stack,
  Heading,
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  Button,
  Box,
  Image,
  Text,
} from '@chakra-ui/react';
import { getLocalStorage } from '@/utils/localStorage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/utils/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '@/redux/features/orderSlice';
import { AppDispatch } from '@/redux/store';
import NextLink from 'next/link';

export default function OrderForm() {
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<number>();
  const [identityNumber, setIdentityNumber] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [user] = useAuthState(auth);
  const localUser = JSON.parse(getLocalStorage('localUser') || '{}');
  const dispatch: AppDispatch = useDispatch();
  const { tickets } = useSelector((state: any) => state.ticket);
  const { order } = useSelector((state: any) => state.order);
  const ticketId = tickets.map((ticket: any) => ticket.id);

  const person = {
    name: name,
    email: email,
    phoneNumber: phoneNumber,
    identityNumber: identityNumber,
    gender: gender,
    dob: dob,
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoadingState(true);
    dispatch(createOrder({ person, ticketId }));
    setTimeout(() => {
      setLoadingState(false);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        w='full'
        borderBottomColor='gray.800'
        borderBottomWidth='2px'
        p='4'
        direction='row'
      >
        <Heading size='sm'>Billing Information</Heading>
      </Stack>
      <Stack
        w='full'
        borderBottomColor='gray.800'
        borderBottomWidth='2px'
        p='4'
      >
        <FormControl variant='floating'>
          <Input
            type='text'
            placeholder=''
            borderRadius='sm'
            name='name'
            borderColor='gray.800'
            borderWidth='2px'
            focusBorderColor='gray.800'
            _invalid={{ borderWidth: '2px', borderColor: 'red.500' }}
            _focus={{ borderWidth: '1px' }}
            _hover={{ borderColor: 'none' }}
            size='lg'
            fontSize='sm'
            value={user?.displayName || localUser?.name}
            isDisabled={true}
          />
          <FormLabel>Name</FormLabel>
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
        <FormControl variant='floating'>
          <Input
            type='email'
            placeholder=''
            borderRadius='sm'
            name='email'
            borderColor='gray.800'
            borderWidth='2px'
            focusBorderColor='gray.800'
            _invalid={{ borderWidth: '2px', borderColor: 'red.500' }}
            _focus={{ borderWidth: '1px' }}
            _hover={{ borderColor: 'none' }}
            size='lg'
            fontSize='sm'
            value={user?.email || localUser?.email}
            isDisabled={true}
          />
          <FormLabel>Email</FormLabel>
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
      </Stack>
      <Stack
        w='full'
        borderBottomColor='gray.800'
        borderBottomWidth='2px'
        p='4'
        direction='row'
      >
        <Heading size='sm'>Ticket Information</Heading>
      </Stack>
      <Stack
        w='full'
        borderBottomColor='gray.800'
        borderBottomWidth='2px'
        p='4'
      >
        <FormControl variant='floating'>
          <Input
            type='text'
            placeholder=''
            borderRadius='sm'
            name='name'
            borderColor='gray.800'
            borderWidth='2px'
            focusBorderColor='gray.800'
            _invalid={{ borderWidth: '2px', borderColor: 'red.500' }}
            _focus={{ borderWidth: '1px' }}
            _hover={{ borderColor: 'none' }}
            size='lg'
            fontSize='sm'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormLabel>Name</FormLabel>
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
        <FormControl variant='floating'>
          <Input
            type='email'
            placeholder=''
            borderRadius='sm'
            name='email'
            borderColor='gray.800'
            borderWidth='2px'
            focusBorderColor='gray.800'
            _invalid={{ borderWidth: '2px', borderColor: 'red.500' }}
            _focus={{ borderWidth: '1px' }}
            _hover={{ borderColor: 'none' }}
            size='lg'
            fontSize='sm'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormLabel>Email</FormLabel>
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
        <FormControl variant='floating'>
          <Input
            type='number'
            placeholder=''
            borderRadius='sm'
            name='phone number'
            borderColor='gray.800'
            borderWidth='2px'
            focusBorderColor='gray.800'
            _invalid={{ borderWidth: '2px', borderColor: 'red.500' }}
            _focus={{ borderWidth: '1px' }}
            _hover={{ borderColor: 'none' }}
            size='lg'
            fontSize='sm'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(parseInt(e.target.value))}
          />
          <FormLabel>Phone Number</FormLabel>
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
      </Stack>
      <Stack
        w='full'
        borderBottomColor='gray.800'
        borderBottomWidth='2px'
        p='4'
        direction='row'
      >
        <Heading size='sm'>Pay With</Heading>
      </Stack>
      <Stack
        w='full'
        borderBottomColor='gray.800'
        borderBottomWidth='2px'
        p='4'
      >
        <Box
          borderColor='gray.800'
          borderWidth='2px'
          borderRadius='sm'
          cursor='pointer'
          py='1'
          px='4'
          display='flex'
          alignItems='center'
          justifyContent='space-between'
        >
          <Text as='b'>BCA Virtual Account</Text>
          <Image
            src='https://sandbox.doku.com/integration/simulator/devex/simulator/images/bank/bca.png'
            alt='BCA Virtual Account'
            w='100px'
          />
        </Box>
      </Stack>
      <Button
        type='submit'
        as={NextLink}
        href="https://sandbox.doku.com/how-to-pay/v2/bca-virtual-account/1900800000044306/icsURAGpZGnAoKgYM2rtZsbM_DjCrvTRef1PlOM1Lx4"
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
