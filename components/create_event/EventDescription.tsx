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
import { BsPlusCircle, BsTrash3Fill } from "react-icons/bs";
import RichTextEditor from "../RichTextEditor";
import { useDispatch, useSelector } from "react-redux";
import TicketDisplayCreate from "./tickets/TicketDisplayCreate";
import AddTicket from "./tickets/AddTicket";
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
                    <Checkbox>Nomor KTP </Checkbox>
                    <Checkbox>Tanggal Lahir</Checkbox>
                    <Checkbox>Jenis Kelamin</Checkbox>
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
                        placeholder='Select option'
                        width={"120px"}
                        defaultValue={"3"}
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
                <RichTextEditor />
                <Text>Syarat dan ketentuan</Text>
                <RichTextEditor />
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}
