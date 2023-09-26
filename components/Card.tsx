import React from 'react';
import { Box, Image, Heading, Text } from '@chakra-ui/react';

export default function Card() {
  return (
    <Box
      borderRadius='sm'
      shadow='sm'
      borderWidth='2px'
      borderColor='gray.800'
      p='2'
      _hover={{ shadow: 'md' }}
    >
      <Box
        borderWidth='2px'
        borderColor='gray.800'
        borderRadius='sm'
        p='1'
        aspectRatio={16 / 9}
      >
        <Image
          src='https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F585194029%2F145365864639%2F1%2Foriginal.20230829-074247?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=cafca39a9711b376f7bca25140b7a83c'
          alt='U.S.Graduate Education Fair 2023 (Jakarta)'
          borderRadius='sm'
          w='100%'
          h='100%'
          objectFit='cover'
        />
      </Box>
      <Heading as='h4' size='md' noOfLines={2} p='2'>
        U.S.Graduate Education Fair 2023 (Jakarta)
      </Heading>
      <Text mb='2' fontSize='sm' noOfLines={1} px='2'>
        Sunday, October 8
      </Text>
      <Text mb='1' fontSize='sm' noOfLines={1} px='2'>
        Park Hyatt Jakarta
      </Text>
      <Text mb='2' fontSize='sm' noOfLines={1} px='2'>
        Free
      </Text>
      <Text as='b' fontSize='sm' noOfLines={1} px='2'>
        Education USA Indonesia
      </Text>
    </Box>
  );
}
