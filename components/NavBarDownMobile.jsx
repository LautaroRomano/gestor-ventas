import React from "react";
import { Flex, Text, Input, Button, Spacer, Select } from "@chakra-ui/react";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { useRouter } from "next/router";

const Index = (props) => {
  const router = useRouter();

  return (
    <Flex w={"100vw"} h="100vh" flexDir={"column-reverse"}>
      <Flex w={"100vw"} h="60px" bg={"primero.500"} justifyContent="center">
        <Flex w={"90%"} justifyContent="space-between">
          <Flex
            color={"tercero.500"}
            alignItems="center"
            justifyContent={"center"}
            borderBottom={props.selected == 1 && "5px solid #76323F"}
            onClick={() => router.push("/")}
          >
            <HomeIcon style={{ width: "100%", height: "100%" }} />
          </Flex>
          <Flex
            color={"tercero.500"}
            alignItems="center"
            justifyContent={"center"}
            borderBottom={props.selected == 2 && "5px solid #76323F"}
            onClick={() => router.push("/articulos")}
          >
            <InventoryIcon style={{ width: "85%", height: "85%" }} />
          </Flex>
          <Flex
            color={"tercero.500"}
            alignItems="center"
            justifyContent={"center"}
            borderBottom={props.selected == 3 && "5px solid #76323F"}
            onClick={() => router.push("/ventas")}
          >
            <AddShoppingCartIcon style={{ width: "85%", height: "85%" }} />
          </Flex>
        </Flex>
      </Flex>
      <Flex bg={"#eeeeee"} w="100vw" h={"100vh"} overflow="scroll">
        {props.children && props.children}
      </Flex>
    </Flex>
  );
};

export default Index;
