'use client';

import React, { useState, useEffect } from 'react';
import {
  Stack,
  Heading,
  FormControl,
  Input,
  FormErrorMessage,
  Button,
  FormLabel,
  Text,
  Link,
  Box,
  Divider,
  AbsoluteCenter,
  IconButton,
  InputGroup,
  InputRightElement,
  Icon,
  useToast,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FcGoogle } from 'react-icons/fc';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/features/registerSlice';
import { useRouter } from 'next/navigation';
import { AppDispatch } from '@/redux/store';
import { IRegister } from '@/types';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/utils/firebase';

export default function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const toast = useToast();
  const showPassword = () => setShow(!show);
  const [show, setShow] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<boolean>(false);

  const googleProvider = new GoogleAuthProvider();
  const handleGoogleRegister = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    formik.setFieldValue(target.name, target.value);
  };

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedAccessToken) {
      router.push('/');
    }
  }, []);

  const handleSubmit = () => {
    setLoadingState(true);
    setTimeout(() => {
      dispatch(registerUser(formik.values))
        .unwrap()
        .then((res) => {
          const user = res;
          localStorage.setItem('user', JSON.stringify(user));
          router.push('/login');
        })
        .catch((err) => {
          toast({
            title: 'An error occurred',
            description: err.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          });
          setLoadingState(false);
        });
    }, 1000);
  };

  const formik = useFormik<IRegister>({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Stack w={{ base: '340px', md: '360px' }}>
      <Heading mt='6'>Create an account</Heading>
      <Text mb='6'>
        Join our community and start exploring exciting events!
      </Text>
      <Button
        w='100%'
        bg='white'
        borderWidth='2px'
        borderColor='gray.800'
        borderRadius='sm'
        _hover={{ bg: 'yellow.200', shadow: 'sm' }}
        onClick={handleGoogleRegister}
        size='lg'
        fontSize='md'
      >
        <Icon as={FcGoogle} mr='2' boxSize={6} /> Register with Google
      </Button>
      <Box position='relative' my='8'>
        <Divider borderColor='gray.800' />
        <AbsoluteCenter
          bg='white'
          px='3'
          borderWidth='1px'
          borderColor='gray.800'
          borderRadius='full'
          fontSize='sm'
        >
          or
        </AbsoluteCenter>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <FormControl
          mb='4'
          isInvalid={!!(formik.errors.name && formik.touched.name)}
          variant='floating'
        >
          <Input
            type='text'
            placeholder=''
            borderRadius='sm'
            name='name'
            onChange={handleForm}
            borderWidth='2px'
            borderColor='gray.800'
            focusBorderColor='gray.800'
            _invalid={{ borderWidth: '2px', borderColor: 'red.500' }}
            _focus={{ borderWidth: '1px' }}
            _hover={{ borderColor: 'none' }}
            size='lg'
            fontSize='sm'
          />
          <FormLabel>Name</FormLabel>
          <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
        </FormControl>
        <FormControl
          mb='4'
          isInvalid={!!(formik.errors.email && formik.touched.email)}
          variant='floating'
        >
          <Input
            type='email'
            placeholder=''
            borderRadius='sm'
            name='email'
            onChange={handleForm}
            borderWidth='2px'
            borderColor='gray.800'
            focusBorderColor='gray.800'
            _invalid={{ borderWidth: '2px', borderColor: 'red.500' }}
            _focus={{ borderWidth: '1px' }}
            _hover={{ borderColor: 'none' }}
            size='lg'
            fontSize='sm'
          />
          <FormLabel>Email</FormLabel>
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>
        <FormControl
          mb='6'
          isInvalid={!!(formik.errors.password && formik.touched.password)}
          variant='floating'
        >
          <InputGroup size='lg'>
            <Input
              type={show ? 'text' : 'password'}
              placeholder=''
              borderRadius='sm'
              name='password'
              onChange={handleForm}
              borderWidth='2px'
              borderColor='gray.800'
              focusBorderColor='gray.800'
              _invalid={{ borderWidth: '2px', borderColor: 'red.500' }}
              _focus={{ borderWidth: '1px' }}
              _hover={{ borderColor: 'none' }}
              fontSize='sm'
            />
            <FormLabel>Password</FormLabel>
            <InputRightElement width='3.5rem'>
              <IconButton
                bg='white'
                h='1.75rem'
                size='sm'
                aria-label={show ? 'Hide password' : 'Show password'}
                icon={show ? <ViewOffIcon /> : <ViewIcon />}
                onClick={showPassword}
                _hover={show ? { bg: 'yellow.200' } : { bg: 'red.200' }}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>
        <Button
          type='submit'
          w='100%'
          isLoading={loadingState}
          loadingText='Registering'
          borderRadius='sm'
          mb='4'
          size='lg'
          fontSize='md'
          borderWidth='2px'
          borderColor='gray.800'
          bg='green.200'
          _hover={{ bg: 'green.300', shadow: 'sm' }}
        >
          Register
        </Button>
      </form>
      <Text textAlign='center'>
        Already have an account?
        <Link
          as={NextLink}
          href='/login'
          color='yellow.500'
          textDecoration='underline'
          ml='2'
          _hover={{ color: 'yellow.400' }}
        >
          Login
        </Link>
      </Text>
    </Stack>
  );
}
