import { hourList } from "@/common/constants/hourList";
import { addTicketEvent } from "@/redux/features/create_event/createEventSlice";
import {
  TicketType,
  closeTicket
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
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

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
  const event = useSelector((state: RootState) => state.createEvent);
  const ticketType = useSelector(
    (state: RootState) => state.modalCreateEvent.ticketType
  );
  // console.log("debug-ticket", ticketType);
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
        ticketPrice >= 20000 &&
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
      formik.setFieldValue("quantity", 0);
      setTotalTicket("");
      return;
    }
    const value = parseInt(e.target.value);
    if (value > 1000) {
      formik.setFieldValue("quantity", 1000);
      setTotalTicket(String(1000));
    } else {
      formik.setFieldValue("quantity", value);
      setTotalTicket(String(value));
    }
  };
  const dateNow: string = new Date().toISOString().split("T")[0];

  const formatCurrency = (value: string) => {
    if (value === null) return;
    let numericValue = convertRupiahToNumeric(value)!;
    if (numericValue >= 10000000) {
      formik.setFieldValue("price", 10000000);
      setTicketPrice(10000000);
      numericValue = 10000000;
    }
    if (numericValue !== null) {
      formik.setFieldValue("price", numericValue);
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

  const handleSave = () => {
    const newTicket = {
      name: ticketName,
      description: ticketDescription,
      type: ticketType,
      price: ticketPrice,
      quantity: parseInt(totalTicket),
      startDateTime: `${eventDate.startDate} ${eventTime.startTime}:00`,
      endDateTime: `${eventDate.endDate} ${eventTime.endTime}:00`,
    };
    dispatch(addTicketEvent(newTicket));
    dispatch(closeTicket());
  };

  const minPrice = ticketType === TicketType.FREE ? 0 : 20000;

  const ticketSchema = Yup.object().shape({
    name: Yup.string().required("Nama Tiket tidak boleh kosong"),
    description: Yup.string().required("Deskripsi Tiket tidak boleh kosong"),
    price: Yup.number()
      .typeError("Harga Tiket tidak boleh kosong")
      .required("Harga Tiket tidak boleh kosong")
      .min(minPrice, "Harga Tiket minimal Rp 20.000")
      .max(10000000, "Harga Tiket maksimal Rp 10.000.000"),
    type: Yup.string().required("Tipe Tiket tidak boleh kosong"),
    quantity: Yup.number()
      .typeError("Jumlah Tiket tidak boleh kosong")
      .required("Jumlah Tiket tidak boleh kosong")
      .min(1, "Jumlah Tiket minimal 1")
      .max(1000, "Jumlah Tiket maksimal 1000"),
    dateStart: Yup.string()
      .typeError("Tanggal Mulai tidak boleh kosong")
      .required("Tanggal Mulai tidak boleh kosong"),
    dateEnd: Yup.string()
      .typeError("Tanggal Berakhir tidak boleh kosong")
      .required("Tanggal Berakhir tidak boleh kosong"),
    timeStart: Yup.string()
      .typeError("Jam Mulai tidak boleh kosong")
      .required("Jam Mulai tidak boleh kosong"),
    timeEnd: Yup.string()
      .typeError("Jam Berakhir tidak boleh kosong")
      .required("Jam Berakhir tidak boleh kosong"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      dateStart: "",
      dateEnd: "",
      timeStart: "",
      timeEnd: "",
    },
    validationSchema: ticketSchema,
    onSubmit: handleSave,
  });

  useEffect(() => {
    formik.resetForm();
    setTicketName("");
    setTicketDescription("");
    setTicketPrice(0);
    setTotalTicket("");
    setFormattedPrice("Rp 0");
    setEventDate({
      startDate: "",
      endDate: "",
    });
    setEventTime({
      startTime: "",
      endTime: "",
    });
    formik.setFieldValue("type", ticketType);
  }, [isOpen]);

  useEffect(() => {
    if (eventDate.startDate === "") {
      setEndEventTime(hourList);
      return;
    }

    if (eventDate.startDate === eventDate.endDate) {
      const time = hourList.filter(
        (hour) => parseInt(hour) > parseInt(eventTime.startTime)
      );
      setEndEventTime(time);
      return;
    }

    if (eventDate.startDate > eventDate.endDate) {
      setEndEventTime(hourList);
      setEventDate({
        ...eventDate,
        endDate: eventDate.startDate,
      });
      formik.setFieldValue("dateEnd", eventDate.startDate);
    }
  }, [eventDate, eventTime]);

  useEffect(() => {
    console.log("debug-formik", formik.errors, formik.values);
  }, [formik.errors, formik.values]);

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const name = e.target.name;
    formik.setFieldValue(name, value);
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
          <form onSubmit={formik.handleSubmit}>
            <ModalHeader> </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box
                border={"2px solid black"}
                textAlign={"center"}
                width={"100%"}
              >
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
                          name={"name"}
                          type='text'
                          placeholder='Nama Tiket'
                          value={ticketName}
                          onChange={(e) => {
                            setTicketName(e.target.value);
                            handleChangeInput(e);
                          }}
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
                          name={"description"}
                          placeholder='Deskripsi Tiket'
                          resize={"vertical"}
                          style={{
                            scrollbarWidth: "thin",
                          }}
                          onChange={(e) => {
                            setTicketDescription(e.target.value);
                            handleChangeInput(e);
                          }}
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
                          value={eventDate.startDate}
                          onChange={(e) => {
                            setEventDate({
                              ...eventDate,
                              startDate: e.target.value,
                            });
                            formik.setFieldValue("dateStart", e.target.value);
                          }}
                        />
                        <FormLabel>jam Mulai</FormLabel>
                        <Select
                          placeholder='Pilih Jam'
                          onChange={(e) => {
                            setEventTime({
                              ...eventTime,
                              startTime: e.target.value,
                            });
                            formik.setFieldValue("timeStart", e.target.value);
                          }}
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
                          value={formik.values.dateEnd}
                          onChange={(e) => {
                            setEventDate({
                              ...eventDate,
                              endDate: e.target.value,
                            });
                            formik.setFieldValue("dateEnd", e.target.value);
                          }}
                        />
                        <FormLabel>Jam Berakhir</FormLabel>
                        <Select
                          placeholder='Pilih Jam'
                          value={eventTime.endTime}
                          onChange={(e) => {
                            setEventTime({
                              ...eventTime,
                              endTime: e.target.value,
                            });
                            formik.setFieldValue("timeEnd", e.target.value);
                          }}
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
              <Button
                type='submit'
                variant='strongWhite'
                isDisabled={isDisabledNext}
              >
                Simpan
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
