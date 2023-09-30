import OpenStreetMapLoader from "@/components/openStreetMap/OpenStreetMap";
import { closeLocation } from "@/redux/features/create_event/modalSlice";
import { RootState } from "@/redux/store";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Button,
  FormControl,
  FormLabel,
  Select,
  Input,
  VStack,
  Box,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function GetLocationModal() {
  const isOpen = useSelector(
    (state: RootState) => state.modalCreateEvent.isOpenLocation
  );
  const dispatch = useDispatch();
  //   const { isOpen, onOpen, onClose } = useDisclosure();
  const OpenStreetMapLoaderNoSSR = dynamic(
    () => import("@/components/openStreetMap/OpenStreetMap"),
    {
      ssr: false,
    }
  );
  return (
    <>
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={() => {
          dispatch(closeLocation());
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl my={2}>
              <FormLabel>Nama Alamat</FormLabel>
              <Input placeholder='Nama Alamat' type='text' tabIndex={1} />

              <FormLabel>Provinsi</FormLabel>
              <Select placeholder='Pilih Lokasi' tabIndex={2}></Select>
              <FormLabel>Kota/Kabupaten</FormLabel>
              <Select placeholder='Pilih Lokasi' tabIndex={3}></Select>
              <FormLabel>Lokasi</FormLabel>
              <Input placeholder='Masukkan Lokasi' type='text' tabIndex={4} />
            </FormControl>
          </ModalBody>
          <Box height={"300px"}>
            <OpenStreetMapLoaderNoSSR />
          </Box>
          <ModalFooter>
            <Button
              tabIndex={5}
              variant={"strongWhite"}
              colorScheme='blue'
              mr={3}
              onClick={() => {
                dispatch(closeLocation());
              }}
            >
              Batal
            </Button>
            <VStack gap={0}>
              <Button variant='strongBlue' tabIndex={4}>
                Simpan
              </Button>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
