import React from 'react';
import {
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

export default function SearchInput() {
  return (
    <FormControl>
      <InputGroup
        maxWidth={{ base: 'full', lg: 'xl' }}
        shadow='sm'
        borderRadius='sm'
      >
        <Input
          type='text'
          placeholder='Search your event'
          borderWidth='2px'
          borderColor='gray.800'
          borderRadius='sm'
          focusBorderColor='gray.800'
          size='lg'
          fontSize='sm'
          _focus={{ borderWidth: '1px' }}
          _hover={{ borderColor: 'none' }}
        />
        <InputRightElement h='full' mx='1'>
          <IconButton
            icon={<SearchIcon />}
            aria-label='Search Button'
            size='md'
            borderRadius='sm'
            borderWidth='2px'
            borderColor='gray.800'
            bg='blue.200'
            _hover={{ bg: 'blue.300' }}
          />
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
}
