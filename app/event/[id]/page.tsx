'use client';

import React from 'react';
import { Stack, useBreakpointValue } from '@chakra-ui/react';
import EventDetail from '@/components/EventDetail'
import NavbarMobile from '@/components/NavbarMobile';
import Navbar from '@/components/Navbar';

export default function Detail() {
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
      <Stack
        mx={{ base: '6', lg: '24', xl: '36' }}
        mt={{ base: 6, md: 8 }}
        mb={{ base: 6, md: 8 }}
        pb={{ base: '172px', md: 0 }}
      >
        <EventDetail />
      </Stack>
    </>
  );
}
