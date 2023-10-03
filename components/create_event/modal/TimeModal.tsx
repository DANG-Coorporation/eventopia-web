import { hourList } from "@/common/constants/hourList";
import { IEvent } from "@/common/interface/createEvent.interface";
import { setEvent } from "@/redux/features/create_event/createEventSlice";
import {
  closeDateTime,
  openDateTime,
} from "@/redux/features/create_event/modalSlice";
import { AppDispatch, RootState } from "@/redux/store";
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
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { DateTime } from "luxon";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
export default function GetTimeModal() {
  const isOpen = useSelector(
    (state: RootState) => state.modalCreateEvent.isOpenDateTime
  );
  const event = useSelector((state: RootState) => state.createEvent);
  const dispatch = useDispatch<AppDispatch>();
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
  const [isDisableSave, setIsDisableSave] = useState(true);

  const FormatSchema = Yup.object().shape({
    startDate: Yup.string().required("Start Date is required"),
    endDate: Yup.string().required("End Date is required"),
    startTime: Yup.string().required("Start Time is required"),
    endTime: Yup.string().required("End Time is required"),
  });
  const handleSave = () => {
    const prevEvent = event;
    const newEvent: IEvent = {
      ...prevEvent,
      eventStartDateTime: `${eventDate.startDate} ${eventTime.startTime}`,
      eventEndDateTime: `${eventDate.endDate} ${eventTime.endTime}`,
    };

    dispatch(setEvent(newEvent));
    dispatch(closeDateTime());
  };
  const formik = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
    },
    validationSchema: FormatSchema,
    onSubmit: handleSave,
  });

  useEffect(() => {
    setIsDisableSave(!formik.isValid);
  }, [formik.isValid]);

  useEffect(() => {
    formik.resetForm();
    if (event.eventStartDateTime !== "" && event.eventEndDateTime !== "") {
      const startDateObj = DateTime.fromSQL(event.eventStartDateTime);
      const endDateObj = DateTime.fromSQL(event.eventEndDateTime);
      const startDate = startDateObj.toFormat("yyyy-MM-dd");
      const startTime = startDateObj.toFormat("HH:mm");
      const endDate = endDateObj.toFormat("yyyy-MM-dd");
      const endTime = endDateObj.toFormat("HH:mm");
      setEventDate({
        startDate: startDate,
        endDate: endDate,
      });
      setEventTime({
        startTime: startTime,
        endTime: endTime,
      });
      formik.setFieldValue("startDate", startDate);
      formik.setFieldValue("endDate", endDate);
      formik.setFieldValue("startTime", startTime);
      formik.setFieldValue("endTime", endTime);
    } else {
      setIsDisableSave(true);
    }
  }, [isOpen]);
  const isNotNull = () => {
    if (event.eventStartDateTime !== "" && event.eventEndDateTime !== "") {
      return true;
    }
    return false;
  };
  return (
    <>
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={() => dispatch(closeDateTime())}
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
                          defaultValue={isNotNull() ? eventDate.startDate : ""}
                          min={dateNow}
                          onChange={(e) => {
                            setEventDate({
                              ...eventDate,
                              startDate: e.target.value,
                            });
                            formik.setFieldValue("startDate", e.target.value);
                          }}
                        />
                        <FormLabel>Tanggal Berakhir</FormLabel>
                        <Input
                          type='date'
                          defaultValue={isNotNull() ? eventDate.endDate : ""}
                          min={
                            eventDate.startDate === ""
                              ? dateNow
                              : eventDate.startDate
                          }
                          onChange={(e) => {
                            setEventDate({
                              ...eventDate,
                              endDate: e.target.value,
                            });
                            formik.setFieldValue("endDate", e.target.value);
                          }}
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
                          defaultValue={isNotNull() ? eventTime.startTime : ""}
                          onChange={(e) => {
                            setEventTime({
                              ...eventTime,
                              startTime: e.target.value,
                            });
                            formik.setFieldValue("startTime", e.target.value);
                          }}
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
                          defaultValue={isNotNull() ? eventTime.endTime : ""}
                          value={eventTime.endTime}
                          onChange={(e) => {
                            setEventTime({
                              ...eventTime,
                              endTime: e.target.value,
                            });
                            formik.setFieldValue("endTime", e.target.value);
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
                onClick={() => dispatch(closeDateTime())}
              >
                Batal
              </Button>
              <Button
                type='submit'
                variant='strongWhite'
                isDisabled={isDisableSave}
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
