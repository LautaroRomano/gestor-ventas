import React from "react";
import { Flex, Text, Input, Button, Spacer, Select } from "@chakra-ui/react";
import HomeIcon from "@mui/icons-material/Home";

import { useRouter } from "next/router";

const index = (props) => {
  const router = useRouter();

  return (
    <Flex w={"100vw"} h="100vh" flexDir={"column-reverse"}>
      <Flex w={"100vw"} h="60px" bg={"primero.500"} justifyContent="center">
        <Flex w={"90%"} justifyContent="space-between">
          <Flex color={"tercero.500"} onClick={() => router.push("/")}>
            <HomeIcon style={{ width: "100%", height: "100%" }} />
          </Flex>
          <Flex color={"tercero.500"} onClick={() => router.push("/articulos")}>
            <HomeIcon style={{ width: "100%", height: "100%" }} />
          </Flex>
          <Flex color={"tercero.500"} onClick={() => router.push("/ventas")}>
            <HomeIcon style={{ width: "100%", height: "100%" }} />
          </Flex>
        </Flex>
      </Flex>
      <Flex bg={"#eeeeee"} w="100vw" h={"100vh"} overflow='scroll'>
        {props.children && props.children}
      </Flex>
    </Flex>
  );
};

export default index;
