import React, { useState } from "react";
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

const Categorias = (props) => {
  const [newCategoria, setNewCategoria] = useState({
    nombre: "",
    descripcion: "",
  });

  const handleSubmit = async (e) => {
    await axios.post(`http://localhost:3000/api/categorias`, {
      nombre: newCategoria.nombre,
      descripcion: newCategoria.descripcion,
    });
    props.getCategorias();
  };

  return (
    <Flex
      width={"90vw"}
      height="70vh"
      backgroundColor={"#FFF"}
      position="fixed"
      zIndex={"15"}
      flexDir="column"
      alignItems={"center"}
    >
      <Text color={"primero.500"} my="20px">
        Categorias
      </Text>

      <Flex
        w={"95%"}
        flexDir="column"
        border={"1px solid gray"}
        mb="20px"
        p="15px"
        alignItems={"center"}
      >
        <Input
          color={"#565656"}
          placeholder="Nueva categoria"
          my={"5px"}
          onChange={(e) =>
            setNewCategoria({ ...newCategoria, nombre: e.target.value })
          }
        />
        <Input
          color={"#565656"}
          placeholder="Descripcion"
          my={"5px"}
          onChange={(e) =>
            setNewCategoria({ ...newCategoria, descripcion: e.target.value })
          }
        />
        <Button
          colorScheme={"blue"}
          w={"70%"}
          my={"5px"}
          onClick={handleSubmit}
        >
          Guardar
        </Button>
      </Flex>
      <Spacer />
      <Button
        colorScheme={"red"}
        w={"70%"}
        onClick={() => props.setModalCategorias(false)}
      >
        Cerrar
      </Button>
    </Flex>
  );
};

export default Categorias;
