import { apiStatus } from "@/common/constants/api_status";
import { IEvent } from "@/common/interface/createEvent.interface";
import { IFormat, ITopic } from "@/common/interface/mastedData.interface";
import { setEvent } from "@/redux/features/create_event/createEventSlice";
import {
  openDateTime,
  openFormat,
  openLocation,
} from "@/redux/features/create_event/modalSlice";
import { postCoverImage } from "@/redux/features/create_event/uploadCoverSlice";
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
  Tooltip,
  VStack,
  useToast,
} from "@chakra-ui/react";
import lodash from "lodash";
import { DateTime } from "luxon";
import { redirect } from "next/navigation";
import React, { useEffect, useRef } from "react";
import {
  BsCalendarRange,
  BsClock,
  BsFillPencilFill,
  BsPinMapFill,
  BsPlusSquareDotted,
  BsTrash3Fill,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

export default function EventInformation() {
  const bannerEvent = "images/event/banner-event.jpg";
  const event = useSelector((state: RootState) => state.createEvent);
  const coverState = useSelector((state: RootState) => state.coverCreateEvent);
  const toast = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const masterData = useSelector((state: RootState) => state.masterData);
  const uploadRef = useRef<HTMLInputElement>(null);
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

  const [cover, setCover] = React.useState<File | null>(null);

  const isLoggedIn = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      return true;
    }
    return false;
    // return true;
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCover(file);
      dispatch(postCoverImage(file))
        .unwrap()
        .then((res) => {
          const prevEvent = event;
          const newEvent: IEvent = { ...prevEvent, coverUrl: res.fileUrl };
          dispatch(setEvent(newEvent));
        })
        .catch((err) => {
          toast({
            title: "Error",
            description: "File tidak dapat diupload",
            status: "error",
            duration: 2000,
            position: "top",
            isClosable: true,
          });
        });
    }
  };

  const handleDeleteCover = () => {
    setCover(null);
    const prevEvent = event;
    const newEvent: IEvent = { ...prevEvent, coverUrl: "" };
    dispatch(setEvent(newEvent));
  };

  const getLocation = () => {
    return event.address ?? "Tentukan Lokasi Event";
  };

  return isLoggedIn() ? (
    <>
      <Box
        width={{ base: "94vw", lg: "800px" }}
        minWidth={"380px"}
        border={"2px"}
        p={2}
        position={"relative"}
      >
        <Box position={"relative"} width={"100%"} aspectRatio={780 / 390}>
          <Input
            name='upload'
            type='file'
            ref={uploadRef}
            accept='.jpg,.jpeg,.png'
            display={"none"}
            onClick={(e) => {
              (e.target as HTMLInputElement).value = "";
            }}
            onChange={handleUpload}
          />
          <Image
            width={"100%"}
            aspectRatio={780 / 390}
            src={event.coverUrl ? event.coverUrl : bannerEvent}
          />
          <Tooltip
            visibility={cover ? "hidden" : "visible"}
            label='Add Cover'
            aria-label='A tooltip'
          >
            <Button
              // isLoading
              isLoading={coverState.apiStatus === apiStatus.LOADING}
              visibility={cover ? "hidden" : "visible"}
              position={"absolute"}
              size={"lg"}
              padding={0}
              bottom={"50%"}
              right={"50%"}
              transform={"translate(50%,50%)"}
              onClick={() => {
                uploadRef.current?.click();
              }}
            >
              <BsPlusSquareDotted size={"40px"} />
            </Button>
          </Tooltip>
          <Tooltip label='Delete Cover' aria-label='A tooltip'>
            <Button
              visibility={cover ? "visible" : "hidden"}
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
              onClick={handleDeleteCover}
            >
              <BsTrash3Fill size={"20px"} />
            </Button>
          </Tooltip>
          <Tooltip label='Edit Cover' aria-label='A tooltip'>
            <Button
              visibility={cover ? "visible" : "hidden"}
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
              onClick={() => {
                uploadRef.current?.click();
              }}
            >
              <BsFillPencilFill size={"20px"} />
            </Button>
          </Tooltip>
        </Box>

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
  ) : (
    redirect("/login")
  );
}
