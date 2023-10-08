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

  const events = [
    {
      id: 1,
      name: 'Open Days Indonesia - Jakarta',
      description:
        'Open Days Indonesia is an exclusive event for Indonesian prospective students.',
      type: 'Paid',
      date: '2023-09-10',
      time: '13:30',
      location: 'Le Meridien Jakarta',
      image:
        'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F572639029%2F121703163141%2F1%2Foriginal.20230810-130341?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=eaac9a819fbdcb319811a98893079353',
      author: 'The University of Sydney',
      price: 100,
      category: 'Education',
    },
    {
      id: 2,
      name: 'elytSié Jakarta : meet all the fashion enthusiasts in Jakarta',
      description:
        'elytSié is a social club for fashion enthusiast. connect with like-minded people from around the world.',
      type: 'Free',
      date: '2023-09-16',
      time: '13:00',
      location: 'Jakarta',
      image:
        'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F567857469%2F1681512162793%2F1%2Foriginal.20230803-124324?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C6912%2C3456&s=63012250b023c3eba51d8452f5d761fc',
      author: 'elytSié Fashion Enthusiast Club',
      price: 0,
      category: 'Fashion',
    },
    {
      id: 3,
      name: 'Open House: Alles Goethe!',
      description:
        'Open House Goethe-Institut Jakarta. Acara ini gratis dan terbuka untuk umum.',
      type: 'Free',
      date: '2023-09-16',
      time: '10:00',
      location: 'Goethe-Institut Jakarta',
      image:
        'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F588063109%2F314838640630%2F1%2Foriginal.20230901-110038?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C9000%2C4500&s=40d757bffa704ded05eaabe8a5d63bdd',
      author: 'Goethe-Institut Indonesien',
      price: 0,
      category: 'Education',
    },
    {
      id: 4,
      name: 'Holding Company & Growth Strategy, Executive Workshop',
      description:
        'Seeking business expansion? Don\'t miss our Executive Workshop "Holding Company & Growth Strategy", tailored for Top-level Professionals.',
      type: 'Paid',
      date: '2023-09-11',
      time: '08:30',
      location: 'CQUniversity, Jakarta',
      image:
        'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F589073369%2F1407595172493%2F1%2Foriginal.20230903-101326?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=11c0023b7b584c1bb9625df5842c9df1',
      author: 'CQUniversity, Indonesia Office',
      price: 30,
      category: 'Business',
    },
    {
      id: 5,
      name: 'Open House IFI 2023 - Thamrin',
      description:
        'Journée Portes Ouvertes (JPO) 2023 ini merupakan acara Open House yang dilaksanakan oleh IFI.',
      type: 'Free',
      date: '2023-09-09',
      time: '09:00',
      location: 'Institut Français Indonesia',
      image:
        'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F588081059%2F202689957937%2F1%2Foriginal.20230901-114048?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=2df58cd601fec6aa8d33c1c65bab9777',
      author: 'Institut Français Indonesia',
      price: 0,
      category: 'Education',
    },
    {
      id: 6,
      name: 'U.S.Graduate Education Fair 2023 (Jakarta)',
      description:
        'Bagi kamu yang ingin mencari informasi mengenai studi di Amerika Serikat , jangan lewatkan kesempatan ini! U.S. Graduate Education Fair 2023',
      type: 'Free',
      date: '2023-10-08',
      time: '12:00',
      location: 'Park Hyatt Jakarta',
      image:
        'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F585194029%2F145365864639%2F1%2Foriginal.20230829-074247?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=cafca39a9711b376f7bca25140b7a83c',
      author: 'EducationUSA Indonesia',
      price: 49,
      category: 'Education',
    },
  ];

  return (
    <Stack px={{ base: 6, lg: 20 }} mt='4' mb='10'>
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
          {events.map((event, index) => (
            <CarouselCard
              key={index}
              cardIndex={index}
              name={event.name}
              image={event.image}
              date={event.date}
            />
          ))}
        </Slider>
      </Stack>
    </Stack>
  );
}
