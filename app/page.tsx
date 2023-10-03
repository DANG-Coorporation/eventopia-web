'use client';

import { Stack, useBreakpointValue } from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import NavbarMobile from '@/components/NavbarMobile';
import SearchInput from '@/components/SearchInput';
import Carousel from '@/components/Carousel';
import CategoryList from '@/components/CategoryList';
import CardList from '@/components/CardList';

export default function Home() {
  const isSmallScreen = useBreakpointValue({
    base: true,
    md: false,
  },
  {
    fallback: 'md'
  });
  
  return (
    <Stack>
      {isSmallScreen ? <NavbarMobile /> : <Navbar />}
      {isSmallScreen ? (
        <Stack w='100%' px='6'>
          <SearchInput />
        </Stack>
      ) : null}
      <Carousel />
      <CategoryList />
      <CardList />
    </Stack>
  );
}
