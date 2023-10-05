import React from 'react';
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

export default function CartSummary() {
  return (
    <>
      <Stack
        w='full'
        borderBottomColor='gray.800'
        borderBottomWidth='2px'
        p='4'
        aspectRatio={16 / 9}
      >
        <Image
          src='https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F582789039%2F1733806347483%2F1%2Foriginal.20230825-003650?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=ccbf873fe96ec99f28f899b764d50f6d'
          w='100%'
          h='100%'
          objectFit='cover'
        />
      </Stack>
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
        <HStack justifyContent='space-between' alignItems='flex-start' gap='16'>
          <Text as='b'>Name</Text>
          <Text textAlign='right' noOfLines={2}>
            Free Fire Master League Season 8 League Stage
          </Text>
        </HStack>
        <HStack justifyContent='space-between'>
          <Text as='b'>Date</Text>
          <Text>Rp 150.000</Text>
        </HStack>
        <HStack justifyContent='space-between'>
          <Text as='b'>Time</Text>
          <Text>09:30 AM</Text>
        </HStack>
        <HStack justifyContent='space-between'>
          <Text as='b'>Location</Text>
          <Text>Jakarta</Text>
        </HStack>
        <HStack justifyContent='space-between'>
          <Text as='b'>Ticket</Text>
          <Text>Premium</Text>
        </HStack>
        <HStack justifyContent='space-between'>
          <Text as='b'>Price</Text>
          <Text>Rp 250.000</Text>
        </HStack>
        <HStack justifyContent='space-between'>
          <Text as='b'>Quantity</Text>
          <Text>2</Text>
        </HStack>
        <HStack justifyContent='space-between'>
          <Text as='b'>Total</Text>
          <Text as='b'>Rp 500.000</Text>
        </HStack>
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
