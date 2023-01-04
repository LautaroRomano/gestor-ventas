import React, { useEffect, useState } from "react";
import {
  Flex,
  Input,
  Button,
  Spacer,
  Select,
  Text,
  Form,
  SelectField,
} from "@chakra-ui/react";
import axios from "axios";

const DetalleVentas = (props) => {
  //"
  return (
    <Flex
      w={"90vw"}
      h={"80vh"}
      mt="55px"
      position="fixed"
      zIndex={20}
      backgroundColor={"#fff"}
    >
      <Flex color={"#000"}>
        <Button onClick={() => props.setViewDetalleVentas(false)}>
          Cerrar
        </Button>
        {props.detalle.map((det, i) => (
          <Flex key={i} flexDir='column'>
            <Text>{det.cantidad}</Text>
            <Text>{det.nombre}</Text>
            <Text>{det.total}</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default DetalleVentas;
