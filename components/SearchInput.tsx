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
      <InputGroup maxWidth='lg'>
        <Input
          type='text'
          placeholder='Search your event'
          borderColor='gray.300'
          borderRadius='sm'
        />
        <InputRightElement>
          <SearchIcon color='gray.300' />
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
}
