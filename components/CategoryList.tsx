import React from 'react';
import {
  Stack,
  Box,
  HStack,
  Heading,
  Button,
  SimpleGrid,
} from '@chakra-ui/react';
import Category from './Category';

export default function CategoryList(props: any) {
  const topics = [
    'Music',
    'Games',
    'Education',
    'Health',
    'Hobbies',
    'Business',
    'Food & Drink',
    'Sports',
  ];

  const images = [
    'https://cdn.evbstatic.com/s3-build/fe/build/images/75d81eed66f040a590ed5744b3367d8c-music.webp',
    'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F582789039%2F1733806347483%2F1%2Foriginal.20230825-003650?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=ccbf873fe96ec99f28f899b764d50f6d',
    'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F580231849%2F314838640630%2F1%2Foriginal.20230822-043546?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=3b8980c2153bd87daec9d9e8354652d7',
    'https://cdn.evbstatic.com/s3-build/fe/build/images/057be4b35300d10afd030c17076bb791-health.webp',
    'https://cdn.evbstatic.com/s3-build/fe/build/images/6bf245c68f7dd9ee5260ec2081a59e77-hobbies.webp',
    'https://cdn.evbstatic.com/s3-build/fe/build/images/df2d32c3a611a2df52a2a43e14f7bc80-business.webp',
    'https://cdn.evbstatic.com/s3-build/fe/build/images/870dbf22443fa23480745089a0ac8de7-food.webp',
    'https://cdn.evbstatic.com/s3-build/fe/build/images/8b3d2f1bd74b357b29291d28a9930474-sports.webp',
  ];

  return (
    <Stack mb='6' px={{ base: 6, lg: 20 }}>
      <HStack w='100%' justifyContent='space-between'>
        <Heading as='h2' size='lg' mb='4'>
          Categories
        </Heading>
        <Button
          borderColor='gray.800'
          borderWidth='2px'
          borderRadius='sm'
          bg='green.200'
          _hover={{ bg: 'green.300' }}
        >
          See All
        </Button>
      </HStack>
      <SimpleGrid columns={{ base: 4, lg: 8 }} spacing='4' mt='2'>
        {topics.map((topic, index) => (
          <Category
            key={index}
            cardIndex={index}
            topic={topic}
            image={images[index]}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
