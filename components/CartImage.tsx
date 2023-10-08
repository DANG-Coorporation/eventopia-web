import React from 'react';
import { Stack, Heading, Image } from '@chakra-ui/react';

export default function CartImage(props: any) {
  return (
    <>
      <Stack
        w='full'
        p='4'
        direction='row'
        aspectRatio={16 / 9}
      >
        <Image
          src={props.coverUrl}
          alt={props.name}
          w='100%'
          h='100%'
          objectFit='cover'
        />
      </Stack>
    </>
  );
}
