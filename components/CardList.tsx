import React from 'react';
import { SimpleGrid, Stack, Heading } from '@chakra-ui/react';
import Card from './Card';

export default function CardList(props: any) {
  return (
    <Stack w='100%' px={{ base: 6, lg: 20 }} mb='6'>
      <Heading as='h2' size='lg' mb='4'>
        Events
      </Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing='6'>
        <Card
          name='Free Fire Master League Season 8 League Stage'
          date='2023-09-15'
          time='15:00'
          location='Studio Sepat 72'
          image='https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F582789039%2F1733806347483%2F1%2Foriginal.20230825-003650?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=ccbf873fe96ec99f28f899b764d50f6d'
          price='Free'
          author='Free Fire Esports ID'
        />
        <Card
          name='CISO Indonesia'
          date='2023-11-29'
          time='08:20'
          location='Pullman Jakarta Indonesia Thamrin CBD'
          image='https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F572393319%2F175782414437%2F1%2Foriginal.20230810-024049?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C18%2C1200%2C600&s=f7fc1841c512c6e12e141bb47f4edd7f'
          price='Free'
          author='Corinium Intelligence'
        />
        <Card
          name='Indonesia PE-VC Summit 2024'
          date='2024-01-25'
          time='08:30'
          location='The Langham, Jakarta'
          image='https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F406757249%2F518959283747%2F1%2Foriginal.20221208-085007?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=eac87790e698e63ea9d1b0aa137a2a1f'
          price='Free'
          author='DealStreetAsia'
        />
        <Card
          name='Begin Edu Fair Jakarta (Indonesia)'
          date='2023-11-18'
          time='13:00'
          location='AYANA Midplaza Jakarta'
          image='https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F543006069%2F143238831910%2F1%2Foriginal.20230626-143225?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C1536%2C768&s=1d7bd63cadf03dea1bf1de4d8625494f'
          price='Free'
          author='Begin Group'
        />
      </SimpleGrid>
    </Stack>
  );
}
