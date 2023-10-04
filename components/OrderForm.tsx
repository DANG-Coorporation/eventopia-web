import React from 'react';
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

export default function OrderForm() {
  return (
    <>
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
        <Heading size='sm'>Ticket 1 &bull; Premium Ticket</Heading>
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
        w='100%'
        bg='yellow.200'
        borderRadius='md'
        size='lg'
        fontSize='md'
        _hover={{ bg: 'yellow.300' }}
        loadingText='Checking out'
      >
        Check Out
      </Button>
    </>
  );
}
