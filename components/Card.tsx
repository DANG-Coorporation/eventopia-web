import React from 'react';
import { Box, Image, Heading, Text } from '@chakra-ui/react';
import moment from 'moment';

export default function Card(props: any) {
  const formattedDate = moment(props.date).format('ll');

  return (
    <Box
      borderRadius='sm'
      shadow='sm'
      borderWidth='2px'
      borderColor='gray.800'
      p='2'
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
          src={props.image}
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
        {formattedDate}
      </Text>
      <Text mb='1' fontSize='sm' noOfLines={1} px='2'>
        {props.location}
      </Text>
      <Text mb='2' fontSize='sm' noOfLines={1} px='2'>
        {props.price}
      </Text>
      <Text as='b' fontSize='sm' noOfLines={1} px='2'>
        {props.author}
      </Text>
    </Box>
  );
}
