import { postEvent } from "@/redux/features/create_event/uploadCoverSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { removeLocalStorage } from "@/utils/localStorage";
import {
  Box,
  Button,
  HStack,
  Show,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

export default function FooterCreateEvent() {
  const event = useSelector((state: RootState) => state.createEvent);
  const toast = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const checkEventData = () => {
    const error: string[] = [];
    if (event.name === "") {
      error.push("Event Name is empty");
    }

    if (event.formatId === 0) {
      error.push("Event Format is empty");
    }

    if (event.topicId === 0) {
      error.push("Event Topic is empty");
    }

    if (event.coverUrl === "") {
      error.push("Event Cover is empty");
    }

    if (event.eventStartDateTime === "") {
      error.push("Event Start Date is empty");
    }

    if (event.eventEndDateTime === "") {
      error.push("Event End Date is empty");
    }

    if (event.address === "") {
      error.push("Event Address is empty");
    }

    if (event.cityId === 0) {
      error.push("Event City is empty");
    }

    if (event.provinceId === 0) {
      error.push("Event Province is empty");
    }

    if (event.latitude === "") {
      error.push("Event Latitude is empty");
    }

    if (event.longitude === "") {
      error.push("Event Longitude is empty");
    }

    if (event.description === "") {
      error.push("Event Description is empty");
    }

    if (event.isTermsAndConditions === true && event.termAndCondition === "") {
      error.push("Event Term and Condition is empty");
    }

    if (event.eventTickets.length === 0) {
      error.push("Event Ticket is empty");
    }

    if (error.length > 0) {
      return {
        status: false,
        error,
      };
    }

    return {
      status: true,
      error,
    };
  };

  const handleSaveDraft = () => {
    try {
      localStorage.setItem("eventDraft", JSON.stringify(event));
      toast({
        title: "Event Saved as Draft.",
        description: "We've saved your event as draft.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = () => {
    const { status, error } = checkEventData();
    if (status) {
      dispatch(postEvent(event))
        .unwrap()
        .then((res) => {
          toast({
            title: "Event Created.",
            description: "We've created your event for you. Redirecting...",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          removeLocalStorage("eventDraft");
          window.location.href = `/event/${res.uniqueId}`;
        })
        .catch((err) => {
          toast({
            title: "Event Failed to Create.",
            description: "We've failed to create your event for you.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        });
    } else {
      toast({
        title: error[0],
        description: "Please complete the form",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <>
      <Box
        position={"fixed"}
        bottom={"0px"}
        width={"100%"}
        minWidth={"380px"}
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
          <Button
            m={2}
            height={"52px"}
            variant='strongWhite'
            onClick={handleSaveDraft}
          >
            Simpan Draft
          </Button>
          <Button
            variant='strongBlue'
            m={2}
            height={"52px"}
            onClick={handleSave}
          >
            Buat Event Sekarang
          </Button>
          <Show below='md'>
            <Spacer />
          </Show>
        </HStack>
      </Box>
    </>
  );
}
