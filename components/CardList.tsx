import React from 'react';
import {
  SimpleGrid,
  Stack,
  Heading,
  useBreakpointValue,
} from '@chakra-ui/react';
import Card from './Card';

export default function CardList() {
  return (
    <Stack w='100%' px={{ base: 6, lg: 24 }}>
      <Heading as='h2' size='lg' my='4'>
        Events
      </Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing='6'>
        <Card />
        <Card />
        <Card />
        <Card />
      </SimpleGrid>
    </Stack>
  );
}
