"use client";

import EventDescriptions from "@/components/create_event/EventDescription";
import EventInformation from "@/components/create_event/EventInformation";
import FooterCreateEvent from "@/components/create_event/Footer";
import GetFormatModal from "@/components/create_event/modal/FormatModal";
import GetLocationModal from "@/components/create_event/modal/LocationModal";
import GetTiecketModal from "@/components/create_event/modal/TicketModal";
import GetTimeModal from "@/components/create_event/modal/TimeModal";
import { Heading, VStack } from "@chakra-ui/react";

export default function CreateEvent() {
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
