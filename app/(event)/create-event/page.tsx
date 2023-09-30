"use client";

import RichTextEditor from "@/components/RichTextEditor";
import GetFormatModal from "@/components/create_event/modal/GetFormatModal";
import GetLocationModal from "@/components/create_event/modal/GetLocationModal";
import GetTimeModal from "@/components/create_event/modal/GetTimeModal";
import {
  openDateTime,
  openFormat,
  openLocation,
} from "@/redux/features/create_event/modalSlice";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  HStack,
  Heading,
  Image,
  Input,
  Select,
  Show,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  BsCalendarRange,
  BsClock,
  BsFillPencilFill,
  BsPinMapFill,
  BsPlusCircle,
  BsTrash3Fill,
} from "react-icons/bs";
import { useDispatch } from "react-redux";
export default function CreateEvent() {
  // const isSmallScreen = useBreakpointValue<boolean>({ base: true, lg: false });
  const dispatch = useDispatch();

  return (
    <>
      <VStack width={"98vw"} mb={"100px"}>
        <Heading margin={"auto"}>Create Your Party</Heading>
        <Box
          width={{ base: "94vw", lg: "800px" }}
          border={"2px"}
          p={2}
          position={"relative"}
        >
          <Image src='http://nawaytes.cloud:9000/eventopia/images/ad43d9ae-5715-4dc0-8e0e-b67ee790dfe4-asd.jpg' />
          <Button
            position={"absolute"}
            mt={"-40px"}
            right={"0px"}
            mr={"15px"}
            colorScheme={"red"}
            size={"sm"}
            variant={"solid"}
            border={"2px"}
            borderColor={"black"}
            borderRadius={0}
            padding={0}
          >
            <BsTrash3Fill size={"20px"} />
          </Button>
          <Button
            position={"absolute"}
            mt={"-40px"}
            right={"0px"}
            mr={"55px"}
            colorScheme={"green"}
            size={"sm"}
            variant={"solid"}
            border={"2px"}
            borderColor={"black"}
            borderRadius={0}
            padding={0}
          >
            <BsFillPencilFill size={"20px"} />
          </Button>
          <Input
            variant={"noBorder"}
            name='eventName'
            placeholder={"Event Name"}
            fontSize={"2xl"}
            borderRadius={0}
            mt={2}
          />
          <HStack
            mx={4}
            my={2}
            cursor={"pointer"}
            onClick={() => {
              dispatch(openFormat());
            }}
          >
            <Text>Format Event</Text>
            <BsFillPencilFill />
          </HStack>
          <Divider />

          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
            gap={1}
            my={2}
          >
            <Box
              width={"100%"}
              border={"2px"}
              py={2}
              cursor={"pointer"}
              onClick={() => dispatch(openDateTime())}
            >
              <VStack>
                <HStack>
                  {" "}
                  <Heading size={"md"}>Event Time</Heading>
                  <BsFillPencilFill size={"15px"} />
                </HStack>

                <Grid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                  }}
                  gap={1}
                  justifyContent={"space-between"}
                >
                  <Box
                    width={{
                      base: "100%",
                      md: "160px",
                    }}
                  >
                    <VStack width={"full"}>
                      <Text fontWeight={"bold"}>Start Time</Text>
                      <HStack>
                        <BsCalendarRange />
                        <Text> 5 October 2023</Text>
                      </HStack>
                      <HStack>
                        <BsClock />
                        <Text> 10:00</Text>
                      </HStack>
                    </VStack>
                  </Box>
                  <Box
                    width={{
                      base: "100%",
                      md: "160px",
                    }}
                  >
                    <VStack width={"full"}>
                      <Text fontWeight={"bold"}>End Time</Text>
                      <HStack>
                        <BsCalendarRange />
                        <Text> 5 October 2023</Text>
                      </HStack>
                      <HStack>
                        <BsClock />
                        <Text> 10:00</Text>
                      </HStack>
                    </VStack>
                  </Box>
                </Grid>
              </VStack>
            </Box>
            <Box
              width={{ base: "100%" }}
              border={"2px"}
              py={2}
              cursor={"pointer"}
              onClick={() => dispatch(openLocation())}
            >
              <VStack>
                <HStack>
                  <Heading size={"md"}>Location</Heading>
                  <BsFillPencilFill size={"15px"} />
                </HStack>
                <HStack>
                  <BsPinMapFill /> <Text>Offline Location</Text>
                </HStack>
              </VStack>
            </Box>
          </Grid>
        </Box>
        <Box
          my={2}
          border={"2px"}
          minW={"10vh"}
          w={{
            base: "94vw",
            lg: "800px",
          }}
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
                <Box
                  border='2px'
                  p={2}
                  minH={"135px"}
                  position='relative' // Set position to relative for proper positioning of ::before pseudo-element
                  paddingX={"20px"}
                  backgroundColor={"#81D4FA"}
                >
                  <Box
                    position='absolute'
                    width='30px'
                    height='30px'
                    backgroundColor='white'
                    bottom='20px' // Vertically center the circle
                    left='-16.9px' // Move the circle to the left
                    border={"2px"}
                    borderColor='black'
                    borderRadius='50%'
                    borderTop={"2px solid white"}
                    borderRight={"2px solid white"}
                    transform='rotate(225deg)' // Adjust for vertical centering
                  ></Box>
                  <Box
                    position='absolute'
                    width='30px'
                    height='30px'
                    backgroundColor='white'
                    bottom='20px' // Vertically center the circle
                    right='-16.9px' // Move the circle to the left
                    border={"2px"}
                    borderColor='black'
                    borderRadius='50%'
                    borderBottom={"2px solid white"}
                    borderLeft={"2px solid white"}
                    transform='rotate(225deg)' // Adjust for vertical centering
                  ></Box>
                  <VStack justifyContent={"space-between"}>
                    <VStack minH={"90px"} alignItems={"start"} width={"100%"}>
                      <Text fontSize={"lg"} fontWeight={"bold"}>
                        Title
                      </Text>
                      <Text fontSize={"sm"} textAlign={"left"}>
                        Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi
                        Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi
                        Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi
                        Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi
                        Deskripsi Deskripsi Deskripsi Deskripsi
                      </Text>
                      <Spacer />
                      <Text fontSize={"sm"}>Berlaku hingga</Text>
                    </VStack>
                    <Box
                      marginBottom={"-8px"}
                      width='100%'
                      borderTop={"2px dashed black"}
                      bottom={"0px"}
                      height={"35px"}
                    >
                      <HStack justifyContent={"space-between"} padding={"1"}>
                        <Text fontWeight={"bold"}>Rp. 300.000</Text>
                        <Box cursor={"pointer"}>
                          <BsTrash3Fill />
                        </Box>
                      </HStack>
                    </Box>
                  </VStack>
                </Box>
                <Grid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    lg: "repeat(3, 1fr)",
                  }}
                  gap={1}
                  my={2}
                >
                  <Box
                    position={"relative"}
                    height={"80px"}
                    width={"100%"}
                    border={"2px solid black"}
                    zIndex={3}
                    px={4}
                    _before={{
                      height: "16px",
                      width: "16px",
                      backgroundColor: "white",
                      content: '""',
                      position: "absolute",
                      top: "30px",
                      left: "-11.8px",
                      border: "2px",
                      borderColor: "black",
                      borderRadius: "50%",
                      borderTop: "2px solid white",
                      borderRight: "2px solid white",
                      transform: "rotate(225deg)",
                    }}
                    _hover={{
                      backgroundColor: "#1A237E",
                      color: "white",
                    }}
                  >
                    <HStack h={"100%"} w={"100%"}>
                      <Box
                        mx={2}
                        h={"100%"}
                        w={"20px"}
                        borderRight={"2px dashed black"}
                      ></Box>
                      <VStack alignItems={"start"} gap={0} h={"100%"}>
                        <Spacer />
                        <Text fontSize={"sm"}>Buat Tiket</Text>
                        <Text fontSize={"lg"} mt={-2}>
                          Berbayar
                        </Text>
                        <Spacer />
                      </VStack>
                      <Box
                        position={"absolute"}
                        right={"10px"}
                        cursor={"pointer"}
                      >
                        <BsPlusCircle size={"35px"} />
                      </Box>
                    </HStack>
                  </Box>
                  <Box
                    position={"relative"}
                    height={"80px"}
                    width={"100%"}
                    border={"2px solid black"}
                    zIndex={2}
                    px={4}
                    _before={{
                      height: "16px",
                      width: "16px",
                      backgroundColor: "white",
                      content: '""',
                      position: "absolute",
                      top: "30px",
                      left: "-11.8px",
                      border: "2px",
                      borderColor: "black",
                      borderRadius: "50%",
                      borderTop: "2px solid white",
                      borderRight: "2px solid white",
                      transform: "rotate(225deg)",
                    }}
                    _hover={{
                      backgroundColor: "#1A237E",
                      color: "white",
                    }}
                  >
                    <HStack h={"100%"} w={"100%"}>
                      <Box
                        mx={2}
                        h={"100%"}
                        w={"20px"}
                        borderRight={"2px dashed black"}
                      ></Box>
                      <VStack
                        alignItems={"start"}
                        gap={0}
                        h={"100%"}
                        width={{
                          base: "100%",
                          lg: "155px",
                        }}
                      >
                        <Spacer />
                        <Text fontSize={"sm"}>Buat Tiket</Text>
                        <Text fontSize={"lg"} lineHeight={1}>
                          Berbayar Sesukamu
                        </Text>
                        <Spacer />
                      </VStack>
                      <Box
                        position={"absolute"}
                        right={"10px"}
                        cursor={"pointer"}
                      >
                        <BsPlusCircle size={"35px"} />
                      </Box>
                    </HStack>
                  </Box>
                  <Box
                    position={"relative"}
                    height={"80px"}
                    width={"100%"}
                    border={"2px solid black"}
                    zIndex={1}
                    px={4}
                    _before={{
                      height: "16px",
                      width: "16px",
                      backgroundColor: "white",
                      content: '""',
                      position: "absolute",
                      top: "30px",
                      left: "-11.8px",
                      border: "2px",
                      borderColor: "black",
                      borderRadius: "50%",
                      borderTop: "2px solid white",
                      borderRight: "2px solid white",
                      transform: "rotate(225deg)",
                    }}
                    _hover={{
                      backgroundColor: "#1A237E",
                      color: "white",
                    }}
                  >
                    <HStack h={"100%"} w={"100%"}>
                      <Box
                        mx={2}
                        h={"100%"}
                        w={"20px"}
                        borderRight={"2px dashed black"}
                      ></Box>
                      <VStack alignItems={"start"} gap={0} h={"100%"}>
                        <Spacer />
                        <Text fontSize={"sm"}>Buat Tiket</Text>
                        <Text fontSize={"lg"} mt={-2}>
                          Gratis
                        </Text>
                        <Spacer />
                      </VStack>
                      <Box
                        position={"absolute"}
                        right={"10px"}
                        cursor={"pointer"}
                      >
                        <BsPlusCircle size={"35px"} />
                      </Box>
                    </HStack>
                  </Box>
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
      </VStack>
      <Box
        position={"fixed"}
        bottom={"0px"}
        width={"100%"}
        height={"70px"}
        border={"2px"}
        zIndex={100}
        bgColor={"white"}
      >
        <HStack
          ml={{
            base: "0px",
            lg: "calc((100vw - 800px)/2)",
          }}
        >
          <Show above='md'>
            <Text fontSize={"2xl"} fontStyle={"italic"}>
              Yeay!{" "}
            </Text>
            <Text>Tinggal selangkah lagi dan event kamu berhasil dibuat.</Text>
          </Show>

          <Spacer />
          <Button m={2} height={"52px"} variant='strongWhite'>
            Simpan Draft
          </Button>
          <Button variant='strongBlue' m={2} height={"52px"}>
            Buat Event Sekarang
          </Button>
          <Show below='md'>
            <Spacer />
          </Show>
        </HStack>
      </Box>
      <GetTimeModal />
      <GetLocationModal />
      <GetFormatModal />
    </>
  );
}
