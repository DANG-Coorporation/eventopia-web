import { setEvent } from "@/redux/features/create_event/createEventSlice";
import {
  openDateTime,
  openFormat,
  openLocation,
} from "@/redux/features/create_event/modalSlice";
import { AppDispatch, RootState } from "@/redux/store";
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
import React, { useEffect } from "react";
import {
  BsCalendarRange,
  BsClock,
  BsFillPencilFill,
  BsPinMapFill,
  BsTrash3Fill,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import lodash from "lodash";
import { IFormat, ITopic } from "@/common/interface/mastedData.interface";
import { DateTime } from "luxon";

export default function EventInformation() {
  const bannerEvent = "images/event/banner-event.jpg";
  const event = useSelector((state: RootState) => state.createEvent);
  const dispatch = useDispatch<AppDispatch>();
  const masterData = useSelector((state: RootState) => state.masterData);
  const handlerEventName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const prevEvent = event;
    const newEvent = { ...prevEvent, name: name };
    dispatch(setEvent(newEvent));
  };
  const getFormatTopic = () => {
    if (event.formatId === 0 || event.topicId === 0) {
      return "Pilih Format dan Topik";
    } else {
      const format = lodash.find(masterData.formats, {
        id: event.formatId,
      }) as IFormat;
      const topic = lodash.find(masterData.topics, {
        id: event.topicId,
      }) as ITopic;
      return `${format.name} - ${topic.name}`;
    }
  };
  useEffect(() => {}, [dispatch]);
  const getEventTime = () => {
    if (event.eventStartDateTime === "" || event.eventEndDateTime === "") {
      return {
        isDateTime: false,
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
      };
    } else {
      const startDateObj = DateTime.fromSQL(event.eventStartDateTime);
      const endDateObj = DateTime.fromSQL(event.eventEndDateTime);
      const startDate = startDateObj.setLocale("id").toFormat("dd MMMM yyyy");
      const endDate = endDateObj.setLocale("id").toFormat("dd MMMM yyyy");
      const startTime = startDateObj.toFormat("HH:mm");
      const endTime = endDateObj.toFormat("HH:mm");
      return {
        isDateTime: true,
        startDate: startDate,
        endDate: endDate,
        startTime: startTime,
        endTime: endTime,
      };
    }
  };

  const getLocation = () => {
    return event.address ?? "Tentukan Lokasi Event";
  };
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
          value={event.name}
          onChange={handlerEventName}
        />
        <HStack
          mx={4}
          my={2}
          cursor={"pointer"}
          onClick={() => {
            dispatch(openFormat());
          }}
        >
          <Text>{getFormatTopic()}</Text>
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
              {getEventTime().isDateTime ? (
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
                        <Text> {getEventTime().startDate}</Text>
                      </HStack>
                      <HStack>
                        <BsClock />
                        <Text> {getEventTime().startTime}</Text>
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
                        <Text> {getEventTime().endDate}</Text>
                      </HStack>
                      <HStack>
                        <BsClock />
                        <Text> {getEventTime().endTime}</Text>
                      </HStack>
                    </VStack>
                  </Box>
                </Grid>
              ) : (
                <Text>Tentukan Waktu Event</Text>
              )}
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
                <BsPinMapFill />{" "}
                <Text
                  whiteSpace='nowrap'
                  overflow='hidden'
                  textOverflow='ellipsis'
                  maxWidth='200px'
                >
                  {getLocation()}
                </Text>
              </HStack>
            </VStack>
          </Box>
        </Grid>
      </Box>
    </>
  );
}
