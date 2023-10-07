import React from 'react';
import { Box, Image, Heading, Text } from '@chakra-ui/react';
import formatDate from '@/utils/formatDate';
import formatPrice from '@/utils/formatPrice';
import Link from 'next/link';

export default function Card(props: any) {
  const {uniqueId} = props;
  const {tickets} = props;
  const ticketTypes = tickets.map((ticket: any) => ticket.type);
  const tiketPrices = Math.min(...tickets.filter((ticket: any) => ticket.type === 'PAID').map((ticket: any) => ticket.price))

  return (
    <Box
      as={Link}
      href={`/event/${uniqueId}`}
      borderRadius='sm'
      shadow='sm'
      borderWidth='2px'
      borderColor='gray.800'
      p='2'
      cursor='pointer'
      _hover={{ shadow: 'lg' }}
    >
      <Box
        borderWidth='2px'
        borderColor='gray.800'
        borderRadius='sm'
        p='1'
        aspectRatio={16 / 9}
      >
        <Image
          src={props.coverUrl}
          alt={props.name}
          borderRadius='sm'
          w='100%'
          h='100%'
          objectFit='cover'
        />
      </Box>
      <Heading as='h4' size='md' noOfLines={2} p='2'>
        {props.name}
      </Heading>
      <Text mb='2' fontSize='sm' noOfLines={1} px='2'>
        {formatDate(props.eventStartDateTime)}
      </Text>
      <Text mb='1' fontSize='sm' noOfLines={1} px='2'>
        {props.address}
      </Text>
      <Text mb='2' fontSize='sm' noOfLines={1} px='2'>
        {ticketTypes.includes('FREE') ? 'FREE' : `Starting at ${formatPrice(tiketPrices)}`}
      </Text>
    </Box>
  );
}
