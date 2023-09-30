import { Box, Button, HStack, Show, Spacer, Text } from "@chakra-ui/react";

export default function FooterCreateEvent() {
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
    </>
  );
}
