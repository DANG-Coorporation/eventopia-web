import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import Card from './Card';

export default function CardList() {
  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
      spacing='6'
      px={{ base: 6, lg: 24 }}
    >
      <Card />
      <Card />
      <Card />
      <Card />
    </SimpleGrid>
  );
}
