import { hourList } from "@/common/constants/hourList";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

export default function GetTimeModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [eventDate, setEventDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [eventTime, setEventTime] = useState({
    startTime: "",
    endTime: "",
  });
  const [endEventTime, setEndEventTime] = useState(hourList);
  const [isDisabledNext, setIsDisabledNext] = useState(true);
  const refTab = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (eventDate.startDate !== "" && eventDate.endDate !== "") {
      setIsDisabledNext(false);
    } else {
      setIsDisabledNext(true);
    }
  }, [eventDate]);
  useEffect(() => {
    if (eventDate.startDate === eventDate.endDate) {
      if (eventTime.startTime !== "") {
        setEndEventTime(hourList.filter((hour) => hour > eventTime.startTime));
      } else {
        setEndEventTime(hourList);
      }
    } else {
      setEndEventTime(hourList);
    }
  }, [eventTime, eventDate]);
  const dateNow: string = new Date().toISOString().split("T")[0];
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box border={"2px solid black"} textAlign={"center"} width={"100%"}>
              <Heading fontSize={"md"} my={4}>
                Waktu Event
              </Heading>
              <Tabs size='md' variant='strongBorder'>
                <TabList>
                  <Spacer />
                  <Tab borderLeft={"0px"}>Tanggal Event</Tab>
                  <Spacer />
                  <Tab
                    borderRight={"0px"}
                    ref={refTab}
                    isDisabled={isDisabledNext}
                  >
                    Jam Event
                  </Tab>
                  <Spacer />
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <FormControl>
                      <FormLabel>Tanggal Mulai</FormLabel>
                      <Input
                        type='date'
                        min={dateNow}
                        onChange={(e) =>
                          setEventDate({
                            ...eventDate,
                            startDate: e.target.value,
                          })
                        }
                      />
                      <FormLabel>Tanggal Berakhir</FormLabel>
                      <Input
                        type='date'
                        min={
                          eventDate.startDate === ""
                            ? dateNow
                            : eventDate.startDate
                        }
                        onChange={(e) =>
                          setEventDate({
                            ...eventDate,
                            endDate: e.target.value,
                          })
                        }
                      />
                      <Button
                        variant={"strongBlue"}
                        isDisabled={isDisabledNext}
                        my={4}
                        w={"100%"}
                        onClick={() => {
                          refTab.current?.click();
                        }}
                      >
                        Selanjutnya
                      </Button>
                    </FormControl>
                  </TabPanel>
                  <TabPanel>
                    <FormControl>
                      <FormLabel>Jam Mulai</FormLabel>
                      <Select
                        placeholder='Pilih Jam Mulai'
                        onChange={(e) =>
                          setEventTime({
                            ...eventTime,
                            startTime: e.target.value,
                          })
                        }
                      >
                        {hourList.map((hour) => (
                          <option key={hour} value={hour}>
                            {hour}
                          </option>
                        ))}
                      </Select>
                      <FormLabel>Jam Berakhir</FormLabel>
                      <Select
                        placeholder='Pilih Jam Berakhir'
                        value={eventTime.endTime}
                        onChange={(e) =>
                          setEventTime({
                            ...eventTime,
                            endTime: e.target.value,
                          })
                        }
                      >
                        {endEventTime.map((hour) => (
                          <option key={hour} value={hour}>
                            {hour}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button variant={"strongRed"} mr={3} onClick={onClose}>
              Batal
            </Button>
            <Button variant='strongWhite'>Simpan</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
