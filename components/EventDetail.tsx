import React from 'react';
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
} from '@chakra-ui/react';
import EventBox from './EventBox';

export default function EventDetail() {
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
          style={{}}
          backgroundImage={`url('https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F572393319%2F175782414437%2F1%2Foriginal.20230810-024049?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C18%2C1200%2C600&s=f7fc1841c512c6e12e141bb47f4edd7f')`}
          backgroundPosition='center'
          backgroundSize='cover'
          backgroundRepeat='no-repeat'
          filter='blur(15px)'
        />
        <Image
          src='https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F572393319%2F175782414437%2F1%2Foriginal.20230810-024049?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C18%2C1200%2C600&s=f7fc1841c512c6e12e141bb47f4edd7f'
          alt='CISO Indonesia Summit &amp; Roundtable 2021'
          borderRadius='sm'
          h='auto'
          objectFit='cover'
        />
      </Box>
      <Heading as='h1' size='2xl' mb='1'>
        CISO Indonesia
      </Heading>
      <Text as='h2' fontSize='xl' mb='1'>
        Pullman Jakarta Indonesia Thamrin CBD
      </Text>
      <Text as='h2' fontSize='xl' mb='4'>
        Friday, October 6
      </Text>
      <HStack
        spacing='6'
        wrap='wrap'
        justifyContent='space-between'
        alignItems='flex-start'
      >
        <Tabs
          isFitted
          variant='unstyled'
          p='2'
          borderWidth='2px'
          borderColor='gray.800'
          borderRadius='sm'
          w={{ base: '100%', lg: '65%' }}
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
                bg: 'blue.200',
                borderWidth: '2px',
                borderColor: 'gray.800',
                borderRadius: 'sm',
                _hover: { bg: 'blue.300' },
              }}
            >
              Tickets
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Text>Description</Text>
            </TabPanel>
            <TabPanel>
              <Text>Tickets</Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Stack
          h='100%'
          w={{ base: '100%', lg: '30%' }}
          display={{ base: 'none', md: 'flex' }}
        >
          <EventBox />
        </Stack>
      </HStack>
    </Stack>
  );
}
