'use client';

import React, {useEffect} from 'react';
import { useBreakpointValue, Grid, GridItem } from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import NavbarMobile from '@/components/NavbarMobile';
import CartImage from '@/components/CartImage';
import CartSummary from '@/components/CartSummary';
import { AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import { getEventById } from '@/redux/features/eventSlice';
import {useRouter} from 'next/navigation';
import { getLocalStorage } from '@/utils/localStorage';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '@/utils/firebase';

export default function Cart() {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { event } = useSelector((state: any) => state.event);
  const eventData = event ? event.data : {};
  const [user] = useAuthState(auth);
  const isAuthenticated = getLocalStorage('accessToken');
  const router = useRouter();

  if (!isAuthenticated && !user) {
    router.push('/');
  }

  useEffect(() => {
    dispatch(getEventById(id));
  }, [id]);

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
          h='fit-content'
        >
          <CartImage {...eventData} />
        </GridItem>
        <GridItem
          colSpan={{ base: 12, md: 5 }}
          borderColor='gray.800'
          borderWidth='2px'
          borderRadius='sm'
          h='fit-content'
        >
          <CartSummary {...eventData} />
        </GridItem>
      </Grid>
    </>
  );
}
