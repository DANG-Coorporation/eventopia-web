import { TicketType } from "@/redux/features/create_event/modalSlice";
import { Box, HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { BsTrash3Fill } from "react-icons/bs";
interface ITicketDisplayCreate {
  ticketType: string;
  title: string;
  description: string;
  price: number;
  ticketStartDateTime: string;
  ticketEndDateTime: string;
}

export default function TicketDisplayCreate(props: ITicketDisplayCreate) {
  const convertPrice = () => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(props.price);
  };
  const getStartDateTime = (): string => {
    return DateTime.fromSQL(props.ticketStartDateTime)
      .setLocale("id")
      .toFormat("dd MMMM yyyy");
  };
  return (
    <>
      <Box
        border='2px'
        p={2}
        my={2}
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
              {props.title}
            </Text>
            <Text fontSize={"sm"} textAlign={"left"}>
              {props.description}
            </Text>
            <Spacer />
            <Text fontSize={"sm"}>Dibuka pada {getStartDateTime()}</Text>
          </VStack>
          <Box
            marginBottom={"-8px"}
            width='100%'
            borderTop={"2px dashed black"}
            bottom={"0px"}
            height={"35px"}
          >
            <HStack justifyContent={"space-between"} padding={"1"}>
              <Text fontWeight={"bold"}>
                {props.ticketType === TicketType.FREE
                  ? "Gratis"
                  : convertPrice()}
              </Text>
              <Box cursor={"pointer"}>
                <BsTrash3Fill />
              </Box>
            </HStack>
          </Box>
        </VStack>
      </Box>
    </>
  );
}
