import React from 'react';
import { Box, Heading, Image, Text } from '@chakra-ui/react';
import moment from 'moment';

export default function CarouselCard(props: any) {
  const formattedDate = moment(props.date).format('ll');

  const categoryColors = [
    'red.200',
    'orange.200',
    'yellow.200',
    'green.200',
    'teal.200',
    'blue.200',
    'cyan.200',
    'purple.200',
    'pink.200',
  ];
  const colorIndex = props.cardIndex % categoryColors.length;

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
      position='relative'
      overflow='hidden'
    >
      <Image
        src={props.image}
        h='100%'
        w='100%'
        objectFit='cover'
        aspectRatio={3 / 2}
      />
      <Box
        position='absolute'
        bottom='0'
        left='0'
        width='100%'
        height='100%'
        zIndex='1'
      >
        <Box
          bgGradient='linear(to-t, gray.800, transparent)'
          height='100%'
          p='3'
          display='flex'
          flexDirection='column'
          justifyContent='flex-end'
        >
          <Box
            borderWidth='2px'
            borderColor='gray.800'
            borderRadius='sm'
            bg={categoryColors[colorIndex]}
            p='1'
            w='fit-content'
            mb='2'
          >
            <Text fontSize='sm'>{props.category}</Text>
          </Box>
          <Heading as='h3' color='white' noOfLines={2} size='md' mb='1'>
            {props.name}
          </Heading>
          <Text color='white' noOfLines={1} fontSize='sm'>
            {formattedDate}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
