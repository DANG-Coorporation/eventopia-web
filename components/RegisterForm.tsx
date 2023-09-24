'use client';

import React, { useState } from 'react';
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
  // useToast,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FcGoogle } from 'react-icons/fc';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import { useDispatch } from 'react-redux';
// import { registerUser } from '../redux/features/registerSlice';
// import { useRouter } from 'next/navigation';
// import { AppDispatch } from '@/redux/store';

export default function RegisterForm() {
  // const dispatch = useDispatch<AppDispatch>();
  // const router = useRouter();
  // const toast = useToast();
  const showPassword = () => setShow(!show);
  const [show, setShow] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<boolean>(false);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };

  const handleSubmit = () => {
    setLoadingState(true);
    setTimeout(() => {
      console.log(formik.values);
      setLoadingState(false);
    }, 1000);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Stack justifyContent='center' px={{ base: 6, md: 24 }}>
      <Heading>Create an account</Heading>
      <Text mb='4'>
        Join our community and start exploring exciting events!
      </Text>
      <Button
        w='100%'
        bg='white'
        borderWidth='1px'
        borderColor='gray.200'
        borderRadius='sm'
        _hover={{ shadow: 'sm' }}
      >
        <Icon as={FcGoogle} mr='2' /> Register with Google
      </Button>
      <Box position='relative' my='4'>
        <Divider borderColor='gray.300' />
        <AbsoluteCenter bg='white' px='4'>
          or
        </AbsoluteCenter>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <FormControl
          mb='4'
          isInvalid={!!(formik.errors.name && formik.touched.name)}
        >
          <FormLabel>Name</FormLabel>
          <Input
            type='text'
            placeholder='Enter your name'
            borderRadius='sm'
            name='name'
            onChange={handleForm}
          />
          <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
        </FormControl>
        <FormControl
          mb='4'
          isInvalid={!!(formik.errors.email && formik.touched.email)}
        >
          <FormLabel>Email</FormLabel>
          <Input
            type='email'
            placeholder='user@mail.com'
            borderRadius='sm'
            name='email'
            onChange={handleForm}
          />
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>
        <FormControl
          mb='6'
          isInvalid={!!(formik.errors.password && formik.touched.password)}
        >
          <FormLabel>Password</FormLabel>
          <InputGroup size='md'>
            <Input
              type={show ? 'text' : 'password'}
              placeholder='Min. 8 characters'
              borderRadius='sm'
              name='password'
              onChange={handleForm}
            />
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
          loadingText='Registering'
          borderRadius='sm'
          mb='2'
        >
          Register
        </Button>
      </form>
      <Text textAlign='center'>
        Already have an account?
        <Link
          as={NextLink}
          href='/login'
          color='orange.500'
          textDecoration='underline'
          ml='2'
          _hover={{ color: 'orange.300' }}
        >
          Login
        </Link>
      </Text>
    </Stack>
  );
}
