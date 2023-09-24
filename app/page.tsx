import { Heading, VStack, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Home() {
  return (
    <VStack w='100%' h='100vh' justifyContent='center' alignItems='center'>
      <Heading mb='6'>Homepage</Heading>
      <Link
        as={NextLink}
        href='/register'
        color='orange.500'
        textDecoration='underline'
        _hover={{ color: 'orange.200' }}
      >
        Register
      </Link>
    </VStack>
  );
}
