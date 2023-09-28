import React, { useEffect } from 'react';
import {
  Button,
  Image,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Link,
  VStack,
  Icon,
  HStack,
  IconButton,
  Text,
  Box,
} from '@chakra-ui/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/utils/firebase';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import { AddIcon, HamburgerIcon } from '@chakra-ui/icons';
import { FaRightFromBracket, FaTicket } from 'react-icons/fa6';
import { FaHome } from 'react-icons/fa';
import { MdSpaceDashboard } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { verifyUser } from '@/redux/features/loginSlice';
import { BiDotsVertical } from 'react-icons/bi';

export default function NavbarMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user] = useAuthState(auth);
  const router = useRouter();
  const accessToken =
    typeof window !== 'undefined' && localStorage.getItem('accessToken');
  const localUser =
    typeof window !== 'undefined' &&
    JSON.parse(localStorage.getItem('localUser') || '{}');
  const selectedAvatar =
    typeof window !== 'undefined' && localStorage.getItem('selectedAvatar');

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const verifyAccessToken = async () => {
      if (accessToken) {
        try {
          const response = await dispatch(verifyUser(accessToken));
          localStorage.setItem('localUser', JSON.stringify(response.payload));
        } catch (error) {
          console.log(error);
        }
      }
    };
    verifyAccessToken();
  }, [accessToken, dispatch]);

  const randomAvatars = () => {
    const avatars = [
      './images/avatars/avatar1.png',
      './images/avatars/avatar2.png',
      './images/avatars/avatar3.png',
      './images/avatars/avatar4.png',
      './images/avatars/avatar5.png',
      './images/avatars/avatar6.png',
    ];

    const selectedAvatar = localStorage.getItem('selectedAvatar');

    if (selectedAvatar) {
      return selectedAvatar;
    } else {
      const randomIndex = Math.floor(Math.random() * avatars.length);
      const randomAvatar = avatars[randomIndex];
      localStorage.setItem('selectedAvatar', randomAvatar);

      return randomAvatar;
    }
  };

  const handleLogout = () => {
    auth.signOut();
    if (accessToken) localStorage.removeItem('accessToken');
    if (localUser) localStorage.removeItem('localUser');
    if (selectedAvatar) localStorage.removeItem('selectedAvatar');
    router.push('/login');
  };

  return (
    <>
      {user || accessToken ? (
        <Button
          as={Button}
          bg='white'
          _hover={{ bg: 'white' }}
          p='0'
          onClick={onOpen}
        >
          <Image
            src={user ? user.photoURL || undefined : randomAvatars()}
            borderRadius='sm'
            maxWidth='40px'
          />
          <Icon as={BiDotsVertical} boxSize='6' />
        </Button>
      ) : (
        <IconButton
          aria-label='Menu'
          icon={<HamburgerIcon />}
          variant='outline'
          bg='yellow.200'
          borderRadius='sm'
          borderColor='gray.800'
          borderWidth='2px'
          _hover={{ bg: 'yellow.300' }}
          onClick={onOpen}
        />
      )}
      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            {user || accessToken ? (
              <HStack
                w='100%'
                spacing='2'
                borderRadius='sm'
                borderColor='gray.800'
                borderWidth='2px'
                p='2'
                alignItems='flex-start'
              >
                <Image
                  src={user ? user.photoURL || undefined : randomAvatars()}
                  w='48px'
                  borderRadius='sm'
                />
                <VStack
                  alignItems='flex-start'
                  spacing='0'
                  w='100%'
                  overflow='hidden'
                >
                  <Text fontSize='md' noOfLines={1} w='100%'>
                    {user ? user.displayName || undefined : localUser.name}
                  </Text>
                  <Text fontSize='xs' noOfLines={1} w='100%'>
                    {user ? user.email || undefined : localUser.email}
                  </Text>
                </VStack>
              </HStack>
            ) : (
              <Text>Menu</Text>
            )}
          </DrawerHeader>
          {user || accessToken ? (
            <DrawerBody>
              <Button
                w='100%'
                variant='outline'
                bg='yellow.200'
                borderColor='gray.800'
                borderWidth='2px'
                borderRadius='sm'
                mb='4'
                as={NextLink}
                href='/create'
                size='lg'
                fontSize='md'
                _hover={{ bg: 'yellow.300' }}
              >
                <Icon as={AddIcon} mr='2' /> Create Event
              </Button>
              <VStack spacing='2'>
                <Button
                  as={NextLink}
                  href='/'
                  borderRadius='sm'
                  style={{ textDecoration: 'none' }}
                  w='100%'
                  px='4'
                  alignItems='center'
                  justifyContent='flex-start'
                  bg='white'
                  size='lg'
                  fontSize='md'
                  _hover={{
                    bg: 'blue.200',
                    borderColor: 'gray.800',
                    borderWidth: '2px',
                    shadow: 'sm',
                  }}
                  onClick={onClose}
                >
                  <Icon as={FaHome} mr='4' /> Home
                </Button>
                <Button
                  as={NextLink}
                  href='/dashboard'
                  borderRadius='sm'
                  style={{ textDecoration: 'none' }}
                  w='100%'
                  px='4'
                  alignItems='center'
                  justifyContent='flex-start'
                  bg='white'
                  size='lg'
                  fontSize='md'
                  _hover={{
                    bg: 'blue.200',
                    borderColor: 'gray.800',
                    borderWidth: '2px',
                    shadow: 'sm',
                  }}
                >
                  <Icon as={MdSpaceDashboard} mr='4' /> Dashboard
                </Button>
                <Button
                  as={NextLink}
                  href='/tickets'
                  borderRadius='sm'
                  style={{ textDecoration: 'none' }}
                  w='100%'
                  px='4'
                  alignItems='center'
                  justifyContent='flex-start'
                  bg='white'
                  size='lg'
                  fontSize='md'
                  _hover={{
                    bg: 'blue.200',
                    borderColor: 'gray.800',
                    borderWidth: '2px',
                    shadow: 'sm',
                  }}
                >
                  <Icon as={FaTicket} mr='4' /> Tickets
                </Button>
              </VStack>
            </DrawerBody>
          ) : (
            <DrawerBody>
              <Button
                as={NextLink}
                href='/'
                borderRadius='sm'
                style={{ textDecoration: 'none' }}
                w='100%'
                px='4'
                alignItems='center'
                justifyContent='flex-start'
                bg='blue.200'
                borderColor='gray.800'
                borderWidth='2px'
                size='lg'
                fontSize='md'
                _hover={{
                  bg: 'blue.300',
                  shadow: 'sm',
                }}
                onClick={onClose}
              >
                <Icon as={FaHome} mr='4' /> Home
              </Button>
            </DrawerBody>
          )}
          {user || accessToken ? (
            <DrawerFooter>
              <Button
                w='100%'
                borderColor='gray.800'
                borderWidth='2px'
                borderRadius='sm'
                bg='white'
                size='lg'
                fontSize='md'
                _hover={{
                  bg: 'red.200',
                }}
                onClick={handleLogout}
              >
                <Icon as={FaRightFromBracket} mr='2' /> Logout
              </Button>
            </DrawerFooter>
          ) : (
            <DrawerFooter>
              <HStack w='100%' spacing='4'>
                <Button
                  as={NextLink}
                  href='/register'
                  borderRadius='sm'
                  style={{ textDecoration: 'none' }}
                  w='100%'
                  px='4'
                  bg='white'
                  borderColor='gray.800'
                  borderWidth='2px'
                  size='lg'
                  fontSize='md'
                  _hover={{
                    bg: 'green.200',
                    shadow: 'sm',
                  }}
                >
                  Register
                </Button>
                <Button
                  as={NextLink}
                  href='/login'
                  borderRadius='sm'
                  style={{ textDecoration: 'none' }}
                  w='100%'
                  px='4'
                  bg='yellow.200'
                  borderColor='gray.800'
                  borderWidth='2px'
                  size='lg'
                  fontSize='md'
                  _hover={{
                    bg: 'yellow.300',
                    shadow: 'sm',
                  }}
                >
                  Login
                </Button>
              </HStack>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
