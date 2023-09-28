import React from 'react';
import { Box, VStack, Image, Text } from '@chakra-ui/react';

export default function Category(props: any) {
  return (
    <VStack cursor='pointer'>
      <Box
        borderColor='gray.800'
        borderWidth='2px'
        borderRadius='sm'
        p='1'
        shadow='sm'
        _hover={{ shadow: 'lg' }}
        aspectRatio={1 / 1}
      >
        <Image
          src={props.image}
          alt={props.topic}
          aspectRatio={1 / 1}
          w='100%'
          h='100%'
          objectFit='cover'
        />
      </Box>
      <Text textAlign='center'>{props.topic}</Text>
    </VStack>
  );
}
