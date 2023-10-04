'use client';

import React, { useState } from 'react';
import {
  useBreakpointValue,
  Grid,
  GridItem,
  Heading,
  Box,
  HStack,
  VStack,
  Stack,
  Image,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import NavbarMobile from '@/components/NavbarMobile';
import OrderForm from '@/components/OrderForm';
import OrderSummary from '@/components/OrderSummary';

export default function Order() {
  const isSmallScreen = useBreakpointValue(
    {
      base: true,
      md: false,
    },
    {
      fallback: 'md',
    }
  );

  return (
    <>
      {isSmallScreen ? <NavbarMobile /> : <Navbar />}
      <Grid
        w='full'
        h='100vh'
        gap='4'
        px='4'
        py='6'
        templateColumns='repeat(12, 1fr)'
      >
        <GridItem
          colSpan={{ base: 12, md: 7 }}
          borderColor='gray.800'
          borderWidth='2px'
          borderRadius='sm'
          h='fit-content'
        >
          <OrderForm />
        </GridItem>
        <GridItem
          colSpan={{ base: 12, md: 5 }}
          borderColor='gray.800'
          borderWidth='2px'
          borderRadius='sm'
          h='fit-content'
        >
          <OrderSummary />
        </GridItem>
      </Grid>
    </>
  );
}
