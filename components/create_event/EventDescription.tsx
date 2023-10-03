import { IEvent } from "@/common/interface/createEvent.interface";
import { setEvent } from "@/redux/features/create_event/createEventSlice";
import {
  TicketType,
  openTicket,
  setTicketType,
} from "@/redux/features/create_event/modalSlice";
import {
  Box,
  Checkbox,
  Grid,
  HStack,
  Heading,
  Select,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import RichTextEditor from "../RichTextEditor";
import AddTicket from "./tickets/AddTicket";
import TicketDisplayCreate from "./tickets/TicketDisplayCreate";
import { RootState } from "@/redux/store";

export default function EventDescriptions() {
  const event = useSelector((state: RootState) => state.createEvent);
  const dispatch = useDispatch();

  const getTicketList = () => {
    return event.eventTickets.map((ticket, index) => {
      return (
        <TicketDisplayCreate
          key={index}
          positionIndex={index}
          title={ticket.name}
          description={ticket.description}
          price={ticket.price}
          ticketType={ticket.type}
          ticketStartDateTime={ticket.startDateTime}
          ticketEndDateTime={ticket.endDateTime}
        />
      );
    });
  };

  const handlerEventDescription = (content: string) => {
    const prevEvent = event;
    const newEvent: IEvent = { ...prevEvent, description: content };
    dispatch(setEvent(newEvent));
  };

  const handlerEventTerms = (content: string) => {
    const prevEvent = event;
    const newEvent: IEvent = { ...prevEvent, termAndCondition: content };
    dispatch(setEvent(newEvent));
  };

  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const prevEvent = event;
    const newEvent: IEvent = { ...prevEvent, [name]: checked };
    dispatch(setEvent(newEvent));
  };

  const handleTicketQuantity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const prevEvent = event;
    const newEvent: IEvent = { ...prevEvent, [name]: value };
    dispatch(setEvent(newEvent));
  };

  return (
    <>
      <Box
        my={2}
        border={"2px"}
        w={{
          base: "94vw",
          lg: "800px",
        }}
        minWidth={"380px"}
      >
        <Heading size={"md"} textAlign={"center"} my={4}>
          Event Description
        </Heading>
        <Tabs size='md' variant='strongBorder'>
          <TabList>
            <Spacer />
            <Tab borderLeft={"0px"}>Kategori Tiket</Tab>
            <Spacer />
            <Tab borderRight={"0px"}>Deskripsi Event</Tab>
            <Spacer />
          </TabList>
          <TabPanels>
            <TabPanel>
              {getTicketList()}
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  lg: "repeat(3, 1fr)",
                }}
                gap={1}
                my={2}
              >
                <AddTicket
                  type={TicketType.PAID}
                  handlerAddTicket={() => {
                    dispatch(setTicketType(TicketType.PAID));
                    dispatch(openTicket());
                  }}
                  zIndex={3}
                />
                <AddTicket
                  type={TicketType.MIN_PRICE}
                  handlerAddTicket={() => {
                    dispatch(setTicketType(TicketType.MIN_PRICE));
                    dispatch(openTicket());
                  }}
                  zIndex={2}
                />
                <AddTicket
                  type={TicketType.FREE}
                  handlerAddTicket={() => {
                    dispatch(setTicketType(TicketType.FREE));
                    dispatch(openTicket());
                  }}
                  zIndex={1}
                />
              </Grid>
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  lg: "1fr 2fr",
                }}
                mt={7}
                gap={2}
              >
                <Box width={"100%"} minW={"100px"}>
                  <VStack alignItems={"start"}>
                    <Text fontSize={"lg"} mt={-2} fontWeight={"bold"}>
                      Formulir Data Pemesan
                    </Text>
                    <Checkbox defaultChecked isDisabled>
                      Nama Lengkap
                    </Checkbox>
                    <Checkbox defaultChecked isDisabled>
                      Email
                    </Checkbox>
                    <Checkbox defaultChecked isDisabled>
                      Nomor Handphone
                    </Checkbox>
                    <Checkbox
                      name='isIdentityNumber'
                      onChange={handleChangeCheckbox}
                    >
                      Nomor KTP{" "}
                    </Checkbox>
                    <Checkbox name='isDob' onChange={handleChangeCheckbox}>
                      Tanggal Lahir
                    </Checkbox>
                    <Checkbox name='isGender' onChange={handleChangeCheckbox}>
                      Jenis Kelamin
                    </Checkbox>
                  </VStack>
                </Box>
                <Box width={"100%"} h={"100px"} my={3}>
                  <VStack alignItems={"start"} gap={2}>
                    <Text fontSize={"lg"} mt={-2} fontWeight={"bold"}>
                      Pengaturan Tambahan
                    </Text>
                    <HStack>
                      <VStack alignItems={"start"}>
                        <Text lineHeight={1}>
                          Jumlah maks. tiket per transaksi
                        </Text>
                        <Text fontSize={"sm"} lineHeight={1}>
                          Jumlah maksimal tiket yang dapat dibeli dalam 1
                          transaksi
                        </Text>
                      </VStack>
                      <Spacer />
                      <Select
                        name='maxPerbuy'
                        placeholder='Select option'
                        width={"120px"}
                        defaultValue={"3"}
                        onChange={handleTicketQuantity}
                      >
                        <option value='1'> 1 Tiket</option>
                        <option value='2'> 2 Tiket</option>
                        <option value='3'> 3 Tiket</option>
                        <option value='4'> 4 Tiket</option>
                        <option value='5'> 5 Tiket</option>
                      </Select>
                    </HStack>
                  </VStack>
                </Box>
              </Grid>
            </TabPanel>
            <TabPanel>
              <VStack>
                <Text>Deskripsi Event</Text>
                <RichTextEditor
                  onChange={handlerEventDescription}
                  initialValue={event.description || ""}
                />
                <Text>Syarat dan ketentuan</Text>
                <RichTextEditor
                  onChange={handlerEventTerms}
                  initialValue={event.termAndCondition || ""}
                />
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}
