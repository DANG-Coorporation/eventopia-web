'use client';

import React, { useEffect } from 'react';
import { SimpleGrid, Stack, Heading } from '@chakra-ui/react';
import Card from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { getEvents } from '@/redux/features/eventSlice';
import { AppDispatch } from '@/redux/store';

export default function CardList() {
  const dispatch: AppDispatch = useDispatch();
  const { events } = useSelector((state: any) => state.event);
  const eventsData = events.data;
  const eventsArray = eventsData ? eventsData.rows : [];

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  return (
    <Stack w='100%' px={{ base: 6, lg: 20 }} mb='6'>
      <Heading as='h2' size='lg' mb='4'>
        Events
      </Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing='6'>
        {eventsArray.map((event: object, index: number) => (
          <Card key={index} {...event} />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
