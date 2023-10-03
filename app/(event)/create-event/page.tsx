"use client";

import EventDescriptions from "@/components/create_event/EventDescription";
import EventInformation from "@/components/create_event/EventInformation";
import FooterCreateEvent from "@/components/create_event/Footer";
import GetFormatModal from "@/components/create_event/modal/FormatModal";
import GetLocationModal from "@/components/create_event/modal/LocationModal";
import GetTiecketModal from "@/components/create_event/modal/TicketModal";
import GetTimeModal from "@/components/create_event/modal/TimeModal";
import { setEvent } from "@/redux/features/create_event/createEventSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Heading, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CreateEvent() {
  const dispatch = useDispatch<AppDispatch>();
  // const event = useSelector((state: RootState) => state.createEvent);

  // useEffect(() => {
  //   console.log("debug-event", event);
  // }, [event]);
  useEffect(() => {
    const draft = localStorage.getItem("eventDraft");
    if (draft) {
      const eventDraft = JSON.parse(draft);

      dispatch(setEvent(eventDraft));
    }
  }, []);
  return (
    <>
      <VStack width={"98vw"} minWidth={"380px"} mb={"100px"}>
        <Heading margin={"auto"}>Create Your Event</Heading>
        <EventInformation />
        <EventDescriptions />
      </VStack>
      <FooterCreateEvent />
      <GetTimeModal />
      <GetLocationModal />
      <GetFormatModal />
      <GetTiecketModal />
    </>
  );
}
