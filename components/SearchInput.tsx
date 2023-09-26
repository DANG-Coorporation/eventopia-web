import React from 'react';
import {
  FormControl,
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
          fontSize='sm'
          _focus={{ borderWidth: '1px' }}
          _hover={{ borderColor: 'none' }}
        />
        <InputRightElement>
          <SearchIcon color='gray.800' />
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
}
