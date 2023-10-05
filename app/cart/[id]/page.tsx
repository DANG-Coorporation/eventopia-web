'use client';

import React from 'react';
import { useBreakpointValue, Grid, GridItem } from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import NavbarMobile from '@/components/NavbarMobile';
import CartForm from '@/components/CartForm';
import CartSummary from '@/components/CartSummary';

export default function Cart() {
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
      <Grid w='full' gap='4' px='6' py='6' templateColumns='repeat(12, 1fr)'>
        <GridItem
          colSpan={{ base: 12, md: 7 }}
          borderColor='gray.800'
          borderWidth='2px'
          borderRadius='sm'
          h='100%'
        >
          <CartForm />
        </GridItem>
        <GridItem
          colSpan={{ base: 12, md: 5 }}
          borderColor='gray.800'
          borderWidth='2px'
          borderRadius='sm'
          h='fit-content'
        >
          <CartSummary />
        </GridItem>
      </Grid>
    </>
  );
}
