import {
  openDateTime,
  openFormat,
  openLocation,
} from "@/redux/features/create_event/modalSlice";
import {
  Box,
  Button,
  Divider,
  Grid,
  HStack,
  Heading,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  BsCalendarRange,
  BsClock,
  BsFillPencilFill,
  BsPinMapFill,
  BsTrash3Fill,
} from "react-icons/bs";
import { useDispatch } from "react-redux";

export default function EventInformation() {
  const dispatch = useDispatch();
  const bannerEvent = "images/event/banner-event.jpg";
  return (
    <>
      <Box
        width={{ base: "94vw", lg: "800px" }}
        minWidth={"380px"}
        border={"2px"}
        p={2}
        position={"relative"}
      >
        <Image width={"100%"} aspectRatio={780 / 390} src={bannerEvent} />
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
    </>
  );
}
