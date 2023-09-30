import { closeFormat } from "@/redux/features/create_event/modalSlice";
import { RootState } from "@/redux/store";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import { BsPlusLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
export default function GetFormatModal() {
  const isOpen = useSelector(
    (state: RootState) => state.modalCreateEvent.isOpenFormat
  );
  const dispatch = useDispatch();

  return (
    <>
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={() => {
          dispatch(closeFormat());
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Format</FormLabel>
              <Select placeholder='Pilih Format' tabIndex={1}></Select>
              <FormLabel>Topik</FormLabel>
              <Select placeholder='Pilih Topik' tabIndex={2}></Select>
              <FormLabel>Tags</FormLabel>
              <InputGroup>
                <InputRightElement cursor={"pointer"}>
                  <BsPlusLg />
                </InputRightElement>
                <Input placeholder='Tags' type='text' tabIndex={3} />
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variant='strongWhite'
              mr={3}
              onClick={() => {
                dispatch(closeFormat());
              }}
            >
              Batal
            </Button>
            <Button variant='strongBlue'>Simpan</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
