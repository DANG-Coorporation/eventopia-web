import { TicketType } from "@/redux/features/create_event/modalSlice";
import { Box, HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import { BsPlusCircle } from "react-icons/bs";

interface IAddTicket {
  type: string;
  handlerAddTicket: () => void;
  zIndex?: number;
}
export default function AddTicket(props: IAddTicket) {
  const getTitle = (): string => {
    switch (props.type) {
      case TicketType.PAID:
        return "Berbayar";
      case TicketType.FREE:
        return "Gratis";
      case TicketType.MIN_PRICE:
        return "Harga Minimum";
      default:
        throw new Error("Invalid Ticket Type");
    }
  };
  return (
    <>
      <Box
        position={"relative"}
        height={"80px"}
        width={"100%"}
        border={"2px solid black"}
        zIndex={props.zIndex ?? 0}
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
              {getTitle()}
            </Text>
            <Spacer />
          </VStack>
          <Box
            position={"absolute"}
            right={"10px"}
            cursor={"pointer"}
            onClick={props.handlerAddTicket}
          >
            <BsPlusCircle size={"35px"} />
          </Box>
        </HStack>
      </Box>
    </>
  );
}
