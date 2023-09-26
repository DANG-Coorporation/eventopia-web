import React from 'react';
import {
  Button,
  Image,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Link,
  VStack,
  Icon,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/utils/firebase';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import SearchInput from './SearchInput';
import { AddIcon, ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import { FaRightFromBracket } from 'react-icons/fa6';

export default function NavbarMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user] = useAuthState(auth);
  const accessToken = typeof window !== 'undefined' && localStorage.getItem('accessToken');
  const router = useRouter();

  const handleLogout = () => {
    auth.signOut();
    if (accessToken) {
      localStorage.removeItem('accessToken');
    }
    router.push('/login');
  };

  return (
    <>
      {user || accessToken ? (
        <Button
          as={Button}
          rightIcon={<ChevronDownIcon />}
          bg='white'
          _hover={{ bg: 'white' }}
          p='0'
          onClick={onOpen}
        >
          <Image
            src={user ? user.photoURL || undefined : './images/avatar.png'}
            borderRadius='full'
            maxWidth='40px'
          />
        </Button>
      ) : (
        <IconButton
          aria-label='Menu'
          icon={<HamburgerIcon />}
          variant='outline'
          onClick={onOpen}
        />
      )}
      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          {user || accessToken ? (
            <DrawerBody>
              <Button
                w='100%'
                colorScheme='orange'
                borderRadius='sm'
                mb='4'
                as={NextLink}
                href='/create'
              >
                <Icon as={AddIcon} mr='2' /> Create Event
              </Button>
              <SearchInput />
              <VStack mt='2' spacing='2'>
                <Link
                  as={NextLink}
                  href='/dashboard'
                  borderRadius='sm'
                  style={{ textDecoration: 'none' }}
                  w='100%'
                  py='2'
                >
                  Dashboard
                </Link>
                <Link
                  as={NextLink}
                  href='/tickets'
                  borderRadius='sm'
                  style={{ textDecoration: 'none' }}
                  w='100%'
                  py='2'
                >
                  Tickets
                </Link>
              </VStack>
            </DrawerBody>
          ) : (
            <DrawerBody>
              <SearchInput />
            </DrawerBody>
          )}
          {user || accessToken ? (
            <DrawerFooter>
              <Button
                variant='outline'
                w='100%'
                borderColor='gray.300'
                borderRadius='sm'
                onClick={handleLogout}
              >
                <Icon as={FaRightFromBracket} mr='2' /> Logout
              </Button>
            </DrawerFooter>
          ) : (
            <DrawerFooter>
              <HStack w='100%' spacing='4'>
                <Button
                  variant='outline'
                  w='100%'
                  borderColor='gray.300'
                  borderRadius='sm'
                  as={NextLink}
                  href='/register'
                >
                  Register
                </Button>
                <Button
                  variant='outline'
                  w='100%'
                  borderColor='gray.300'
                  borderRadius='sm'
                  as={NextLink}
                  href='/login'
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
