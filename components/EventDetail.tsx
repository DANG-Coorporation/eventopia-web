import React, { useEffect, useState } from 'react';
import {
  Stack,
  Box,
  Image,
  Heading,
  Text,
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  HStack,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import EventBox from './EventBox';
import { AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import { getEventById } from '@/redux/features/eventSlice';
import formatDate from '@/utils/formatDate';
import EventTicket from './EventTicket';

export default function EventDetail() {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { event } = useSelector((state: any) => state.event);
  const eventData = event ? event.data : {};

  useEffect(() => {
    dispatch(getEventById(id));
  }, [id]);

  return (
    <Stack>
      <Box
        w='100%'
        maxH='470px'
        overflow='hidden'
        justifyContent='center'
        alignItems='center'
        display='flex'
        position='relative'
        p='1'
        borderWidth='2px'
        borderColor='gray.800'
        borderRadius='sm'
        mb={{ base: 2, sm: 4 }}
      >
        <Box
          position='absolute'
          top='0'
          left='0'
          right='0'
          bottom='0'
          zIndex='-1'
          backgroundImage={`url(${eventData ? eventData.coverUrl : ''})`}
          backgroundPosition='center'
          backgroundSize='cover'
          backgroundRepeat='no-repeat'
          filter='blur(15px)'
        />
        <Image
          src={eventData ? eventData.coverUrl : ''}
          alt={eventData ? eventData.name : ''}
          borderRadius='sm'
          h='auto'
          objectFit='cover'
        />
      </Box>
      <Heading
        as='h1'
        size='2xl'
        mb='1'
      >
        {eventData ? eventData.name : ''}
      </Heading>
      <Text
        as='h2'
        fontSize='xl'
        mb='1'
      >
        {eventData ? eventData.address : ''}
      </Text>
      <Text
        as='h2'
        fontSize='xl'
        mb='4'
      >
        {formatDate(eventData ? eventData.eventStartDateTime : '')}
      </Text>
      <Grid
        templateColumns='repeat(12, 1fr)'
        gap={{ base: 6, lg: 16 }}
        h='fit-content'
      >
        <GridItem colSpan={{ base: 12, lg: 8 }}>
          <Tabs
            isFitted
            variant='unstyled'
            p='2'
            borderWidth='2px'
            borderColor='gray.800'
            borderRadius='sm'
            w='100%'
          >
            <TabList>
              <Tab
                _selected={{
                  bg: 'blue.200',
                  borderWidth: '2px',
                  borderColor: 'gray.800',
                  borderRadius: 'sm',
                  _hover: { bg: 'blue.300' },
                }}
              >
                Description
              </Tab>
              <Tab
                _selected={{
                  bg: 'green.200',
                  borderWidth: '2px',
                  borderColor: 'gray.800',
                  borderRadius: 'sm',
                  _hover: { bg: 'green.300' },
                }}
              >
                Tickets
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Text>{eventData ? eventData.description : ''}</Text>
              </TabPanel>
              <TabPanel>
                <Stack
                  w='100%'
                  gap='4'
                >
                  {eventData
                    ? eventData.tickets?.map((ticket: any) => (
                        <EventTicket
                          key={ticket.id}
                          {...ticket}
                        />
                      ))
                    : ''}
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
        <GridItem colSpan={{ base: 12, lg: 4 }}>
          <Stack
            h='fit-content'
            w='100%'
          >
            <EventBox {...eventData} />
          </Stack>
        </GridItem>
      </Grid>
    </Stack>
  );
}
