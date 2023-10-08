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
import {useSelector} from 'react-redux';
import formatPrice from '@/utils/formatPrice';

export default function OrderSummary(props: any) {
  const { tickets } = useSelector((state: any) => state.ticket);

  const normalPrice = tickets.reduce((total: number, ticket: any) => {
    return total + ticket.price * ticket.quantity;
  }, 0);

  const PPN = normalPrice * 0.11;
  const totalPrice = normalPrice + PPN;

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
            src={props.coverUrl}
            alt={props.name}
            w='100%'
            h='100%'
            objectFit='cover'
          />
        </Box>
        <Stack>
          <Heading size='sm' noOfLines={2}>
            {props.name}
          </Heading>
          {tickets.map((ticket: any) => (
            <Stack key={ticket.id}>
              <Text noOfLines={2} mb='-1'>
                {ticket.quantity} x {ticket.name}
              </Text>
              <Text>{formatPrice(ticket.price)}</Text>
            </Stack>
          ))}
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
          <Text>
            {formatPrice(normalPrice)}
          </Text>
        </HStack>
        {/* <HStack justifyContent='space-between'>
          <Text>Discount Price</Text>
          <Text>Rp 150.000</Text>
        </HStack> */}
        <HStack justifyContent='space-between'>
          <Text>PPN 11%</Text>
          <Text color='green.300'>+ {formatPrice(PPN)}</Text>
        </HStack>
        <HStack justifyContent='space-between'>
          <Text>Total</Text>
          <Text as='b'>{formatPrice(totalPrice)}</Text>
        </HStack>
      </Stack>
    </>
  );
}
