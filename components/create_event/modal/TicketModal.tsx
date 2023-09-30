import { hourList } from "@/common/constants/hourList";
import {
  TicketType,
  closeDateTime,
  closeTicket,
} from "@/redux/features/create_event/modalSlice";
import { RootState } from "@/redux/store";
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
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function convertRupiahToNumeric(input: string): number | null {
  const numericValue = input.replace(/Rp\s|\./g, "");
  const numericAmount = parseFloat(numericValue);
  if (!isNaN(numericAmount)) {
    return numericAmount;
  } else {
    return null;
  }
}
export default function GetTiecketModal() {
  const isOpen = useSelector(
    (state: RootState) => state.modalCreateEvent.isOpenTicket
  );
  const ticketType = useSelector(
    (state: RootState) => state.modalCreateEvent.ticketType
  );
  const dispatch = useDispatch();
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
  const [totalTicket, setTotalTicket] = useState("");
  const [ticketPrice, setTicketPrice] = useState(0);
  const [ticketName, setTicketName] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const [formattedPrice, setFormattedPrice] = useState("Rp 0");

  const refTab = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (ticketType === TicketType.PAID || ticketType === TicketType.MIN_PRICE) {
      if (
        ticketPrice > 20000 &&
        totalTicket !== "" &&
        ticketName !== "" &&
        ticketDescription !== "" &&
        ticketDescription.length >= 5
      ) {
        setIsDisabledNext(false);
      } else {
        setIsDisabledNext(true);
      }
    } else if (ticketType === TicketType.FREE) {
      if (
        totalTicket !== "" &&
        ticketName !== "" &&
        ticketDescription !== "" &&
        ticketDescription.length >= 5
      ) {
        setIsDisabledNext(false);
      } else {
        setIsDisabledNext(true);
      }
    } else {
      setIsDisabledNext(true);
    }
  }, [ticketPrice, totalTicket, ticketName, ticketDescription]);

  const handleTotalTicket = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setTotalTicket("");
      return;
    }
    const value = parseInt(e.target.value);
    if (value > 1000) {
      setTotalTicket(String(1000));
    } else {
      setTotalTicket(String(value));
    }
  };
  const dateNow: string = new Date().toISOString().split("T")[0];

  const formatCurrency = (value: string) => {
    if (value === null) return;
    let numericValue = convertRupiahToNumeric(value)!;
    if (numericValue >= 10000000) {
      setTicketPrice(10000000);
      numericValue = 10000000;
    }
    if (numericValue !== null) {
      setTicketPrice(numericValue);
    }

    // Format the input value for display
    const formatted = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(numericValue);

    setFormattedPrice(formatted);
  };

  return (
    <>
      {" "}
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={() => dispatch(closeTicket())}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box border={"2px solid black"} textAlign={"center"} width={"100%"}>
              <Heading fontSize={"md"} my={4}>
                Tambah Tiket
              </Heading>
              <Tabs size='md' variant='strongBorder'>
                <TabList>
                  <Spacer />
                  <Tab borderLeft={"0px"}>Detail Tiket</Tab>
                  <Spacer />
                  <Tab
                    borderRight={"0px"}
                    ref={refTab}
                    isDisabled={isDisabledNext}
                  >
                    Periode Penjualan
                  </Tab>
                  <Spacer />
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <FormControl>
                      <FormLabel>Nama Tiket</FormLabel>
                      <Input
                        type='text'
                        placeholder='Nama Tiket'
                        value={ticketName}
                        onChange={(e) => setTicketName(e.target.value)}
                      />
                      <FormLabel>Jumlah Tiket</FormLabel>
                      <Input
                        type='number'
                        placeholder='Jumlah Tiket'
                        onChange={handleTotalTicket}
                        value={totalTicket}
                        min={1}
                        max={1000}
                      />
                      {ticketType === TicketType.FREE ? null : (
                        <>
                          <FormLabel>Harga Tiket</FormLabel>
                          <Input
                            type='text'
                            placeholder='Harga Tiket'
                            min={1}
                            value={formattedPrice}
                            onChange={(e) => formatCurrency(e.target.value)}
                            max={1000000}
                          />
                        </>
                      )}

                      <FormLabel>Deskripsi Tiket</FormLabel>
                      <Textarea
                        placeholder='Deskripsi Tiket'
                        resize={"vertical"}
                        style={{
                          scrollbarWidth: "thin",
                        }}
                        onChange={(e) => setTicketDescription(e.target.value)}
                        value={ticketDescription}
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
                      <FormLabel>Tanggal Mulai</FormLabel>
                      <Input
                        type='date'
                        placeholder='dd-mm-yyyy'
                        min={dateNow}
                        onChange={(e) =>
                          setEventDate({
                            ...eventDate,
                            startDate: e.target.value,
                          })
                        }
                      />
                      <FormLabel>jam Mulai</FormLabel>
                      <Select
                        placeholder='Pilih Jam'
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
                      <FormLabel>Tanggal Berakhir</FormLabel>
                      <Input
                        type='date'
                        placeholder='dd-mm-yyyy'
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
                      <FormLabel>Jam Berakhir</FormLabel>
                      <Select
                        placeholder='Pilih Jam'
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
            <Button
              variant={"strongRed"}
              mr={3}
              onClick={() => dispatch(closeTicket())}
            >
              Batal
            </Button>
            <Button variant='strongWhite' isDisabled={isDisabledNext}>
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
