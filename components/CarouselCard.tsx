import React from 'react';
import { Box, Image } from '@chakra-ui/react';

export default function CarouselCard(props: any) {
  return (
    <Box
      bg='white'
      borderWidth='2px'
      borderColor='gray.800'
      borderRadius='sm'
      p='1'
      mx={{ base: 0, sm: 2 }}
      width={{ base: '100%', sm: '95%' }}
      height='100%'
      aspectRatio={3 / 2}
      cursor='pointer'
      shadow='sm'
      _hover={{ shadow: 'lg' }}
    >
      <Image
        src={props.image}
        h='100%'
        w='100%'
        objectFit='cover'
        aspectRatio={3 / 2}
      />
    </Box>
  );
}
