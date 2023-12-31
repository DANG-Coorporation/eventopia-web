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

export default function OrderSummary() {
  return (
    <>
      <Stack
        w='full'
        borderBottomColor='gray.800'
        borderBottomWidth='2px'
        p='4'
      >
        <Heading size='sm'>Order Summary</Heading>
      </Stack>
      <Stack
        w='full'
        borderBottomColor='gray.800'
        borderBottomWidth='2px'
        p='4'
        direction='row'
      >
        <Box
          borderColor='gray.800'
          borderWidth='2px'
          borderRadius='sm'
          p='1'
          w='xs'
          aspectRatio={16 / 9}
        >
          <Image
            src='https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F582789039%2F1733806347483%2F1%2Foriginal.20230825-003650?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=ccbf873fe96ec99f28f899b764d50f6d'
            w='100%'
            h='100%'
            objectFit='cover'
          />
        </Box>
        <Stack>
          <Heading size='sm' noOfLines={2}>
            Free Fire Master League Season 8 League Stage
          </Heading>
          <Text noOfLines={2} mb='-1'>
            2 x Premium Ticket
          </Text>
          <Text>Rp 250.000</Text>
        </Stack>
      </Stack>
      <Stack
        w='full'
        borderBottomColor='gray.800'
        borderBottomWidth='2px'
        p='4'
      >
        <FormControl variant='floating'>
          <InputGroup size='lg'>
            <Input
              placeholder=''
              borderRadius='sm'
              name='promo'
              borderColor='gray.800'
              borderWidth='2px'
              focusBorderColor='gray.800'
              _invalid={{ borderWidth: '2px', borderColor: 'red.500' }}
              _focus={{ borderWidth: '1px' }}
              _hover={{ borderColor: 'none' }}
              fontSize='sm'
            />
            <FormLabel>Promo Code</FormLabel>
            <InputRightElement width='4rem' h='full' mx='1'>
              <Button
                bg='blue.200'
                borderColor='gray.800'
                borderRadius='sm'
                borderWidth='2px'
                _hover={{ bg: 'blue.300' }}
                fontSize='sm'
              >
                Apply
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
      </Stack>
      <Stack
        w='full'
        borderBottomColor='gray.800'
        borderBottomWidth='2px'
        p='4'
      >
        <Heading size='sm'>Payment Details</Heading>
      </Stack>
      <Stack w='full' p='4'>
        <HStack justifyContent='space-between'>
          <Text>Normal Price</Text>
          <Text as='del' color='red.300'>
            Rp 250.000
          </Text>
        </HStack>
        <HStack justifyContent='space-between'>
          <Text>Discount Price</Text>
          <Text>Rp 150.000</Text>
        </HStack>
        <HStack justifyContent='space-between'>
          <Text>PPN 11%</Text>
          <Text color='green.300'>+ Rp 16.500</Text>
        </HStack>
        <HStack justifyContent='space-between'>
          <Text>Total</Text>
          <Text as='b'>Rp 116.500</Text>
        </HStack>
      </Stack>
    </>
  );
}
