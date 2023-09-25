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
import { loginUser } from '../redux/features/loginSlice';
import { useRouter } from 'next/navigation';
import { AppDispatch } from '@/redux/store';
import { ILogin } from '@/types';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/utils/firebase';

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const toast = useToast();
  const showPassword = () => setShow(!show);
  const [show, setShow] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<boolean>(false);

  const googleProvider = new GoogleAuthProvider();
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  const LoginSchema = Yup.object().shape({
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
      dispatch(loginUser(formik.values))
        .unwrap()
        .then((res) => {
          const accessToken = res.accessToken;
          localStorage.setItem('accessToken', accessToken);
          router.push('/');
        })
        .catch(() => {
          toast({
            title: 'Error',
            description: 'Invalid email or password.',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          });
          setLoadingState(false);
        });
    }, 1000);
  };

  const formik = useFormik<ILogin>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Stack w={{ base: '340px', md: '360px' }}>
      <Heading mt='6'>Welcome Back</Heading>
      <Text mb='6'>Login to your account to continue using Eventopia.</Text>
      <Button
        w='100%'
        bg='white'
        borderWidth='1px'
        borderColor='gray.300'
        borderRadius='sm'
        _hover={{ shadow: 'sm' }}
        onClick={handleGoogleLogin}
        size='lg'
        fontSize='md'
      >
        <Icon as={FcGoogle} mr='2' boxSize={6} /> Login with Google
      </Button>
      <Box position='relative' my='8'>
        <Divider borderColor='gray.300' />
        <AbsoluteCenter
          bg='white'
          px='4'
          borderWidth='1px'
          borderColor='gray.300'
          borderRadius='full'
          fontSize='sm'
        >
          or
        </AbsoluteCenter>
      </Box>
      <form onSubmit={formik.handleSubmit}>
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
            borderColor='gray.300'
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
              borderColor='gray.300'
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
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>
        <Button
          type='submit'
          colorScheme='orange'
          w='100%'
          isLoading={loadingState}
          loadingText='Logging in'
          borderRadius='sm'
          mb='4'
          size='lg'
          fontSize='md'
        >
          Login
        </Button>
      </form>
      <Text textAlign='center'>
        Don't have an account?
        <Link
          as={NextLink}
          href='/register'
          color='orange.500'
          textDecoration='underline'
          ml='2'
          _hover={{ color: 'orange.300' }}
        >
          Register
        </Link>
      </Text>
    </Stack>
  );
}
