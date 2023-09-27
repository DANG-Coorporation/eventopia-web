'use client';

import React, { useState } from 'react';
import { Stack, Box, IconButton } from '@chakra-ui/react';
import Slider from 'react-slick';
import { ISlider } from '@/types';
import CarouselCard from '@/components/CarouselCard';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

export default function Carousel(props: any) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <IconButton
        aria-label='Next'
        icon={<BiRightArrowAlt />}
        onClick={onClick}
        size='md'
        borderRadius='sm'
        borderColor='gray.800'
        borderWidth='2px'
        bg='yellow.200'
        _hover={{ bg: 'yellow.300' }}
        position='absolute'
        right='-55px'
        top='50%'
        transform='translateY(-50%)'
      />
    );
  };

  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <IconButton
        aria-label='Previous'
        icon={<BiLeftArrowAlt />}
        onClick={onClick}
        size='md'
        borderRadius='sm'
        borderColor='gray.800'
        borderWidth='2px'
        bg='yellow.200'
        _hover={{ bg: 'yellow.300' }}
        position='absolute'
        left='-55px'
        top='50%'
        transform='translateY(-50%)'
      />
    );
  };

  const settings: ISlider = {
    className: 'center',
    centerMode: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    speed: 500,
    dots: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    focusOnSelect: true,
    currentSlide: currentSlide,
    customPaging: (i: number) => (
      <Box h='20px' display='flex' justifyContent='center' alignItems='center'>
        <Box
          position='absolute'
          mt='20px'
          borderColor='gray.800'
          borderWidth='2px'
          h='15px'
          w='15px'
          bg={i === currentSlide ? 'red.200' : 'green.200'}
        />
      </Box>
    ),
    beforeChange: (current: number, next: number) => {
      setCurrentSlide(next);
    },
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: false,
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Stack px={{ base: 6, lg: 20 }} mt='4' mb='8'>
      <Stack w='100%'>
        <link
          rel='stylesheet'
          type='text/css'
          href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
        />
        <link
          rel='stylesheet'
          type='text/css'
          href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
        />
        <Slider {...settings}>
          <CarouselCard image='https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F572639029%2F121703163141%2F1%2Foriginal.20230810-130341?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=eaac9a819fbdcb319811a98893079353' />
          <CarouselCard image='https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F567857469%2F1681512162793%2F1%2Foriginal.20230803-124324?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C6912%2C3456&s=63012250b023c3eba51d8452f5d761fc' />
          <CarouselCard image='https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F588063109%2F314838640630%2F1%2Foriginal.20230901-110038?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C9000%2C4500&s=40d757bffa704ded05eaabe8a5d63bdd' />
          <CarouselCard image='https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F589073369%2F1407595172493%2F1%2Foriginal.20230903-101326?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=11c0023b7b584c1bb9625df5842c9df1' />
          <CarouselCard image='https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F588081059%2F202689957937%2F1%2Foriginal.20230901-114048?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=2df58cd601fec6aa8d33c1c65bab9777' />
          <CarouselCard image='https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F585194029%2F145365864639%2F1%2Foriginal.20230829-074247?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=cafca39a9711b376f7bca25140b7a83c' />
        </Slider>
      </Stack>
    </Stack>
  );
}
