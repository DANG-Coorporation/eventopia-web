'use client';

import { Stack, useBreakpointValue } from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import NavbarMobile from '@/components/NavbarMobile';
import CardList from '@/components/CardList';

export default function Home() {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  return (
    <Stack>
      {isSmallScreen ? <NavbarMobile /> : <Navbar />}
      <CardList />
    </Stack>
  );
}
