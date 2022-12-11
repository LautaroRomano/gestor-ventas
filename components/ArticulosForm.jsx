import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  Flex,
  Input,
  Button,
  Spacer,
  Select,
  Text,
  Form,
} from "@chakra-ui/react";

const ArticulosForm = () => {
  const [articulo, setArticulo] = useState({
    nombre: "",
    precio: 0.0,
    stock: 0,
    descripcion: "",
    marca: "",
    imagen: "",
    categoria: "",
  });

  const handleSubmit = async (e) => {
    const resp = await axios.post(
      "http://localhost:3000/api/articulos",
      articulo
    );
    setArticulo({
      nombre: "",
      precio: 0.0,
      stock: 0,
      descripcion: "",
      marca: "",
      imagen: "",
      categoria: "",
    });
  };

  const handleChange = (e) => {
    // console.log(e.target.id, e.target.value)
    setArticulo({ ...articulo, [e.target.id]: e.target.value });
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(`http://localhost:3000/api/articulos${id}`);
    console.log(res);
  };

  const limpiar = () => {
    document.getElementById("nombre").value = "";
  };

  return (
    <Flex bg={"cuarto.500"} flexDir="column" w={"100%"} alignItems="center">
      <Text fontSize={"20px"} m="10px">
        Nuevo Articulo
      </Text>

      <Flex flexDir={"column"} w="90%">
        <Text color="tercero.500">Ingresar Nombre</Text>
        <Input
          type="text"
          name=""
          id="nombre"
          mb={"10px"}
          onChange={handleChange}
          value={articulo.nombre}
        />

        <Text color="tercero.500">Ingresar precio</Text>
        <Input
          type="number"
          name=""
          id="precio"
          mb={"10px"}
          onChange={handleChange}
          value={articulo.precio}
        />

        <Text color="tercero.500">Ingresar stock</Text>
        <Input
          type="number"
          name=""
          id="stock"
          mb={"10px"}
          onChange={handleChange}
          value={articulo.stock}
        />

        <Text color="tercero.500">Ingresar descripcion</Text>
        <Input
          type="text"
          name=""
          id="descripcion"
          mb={"10px"}
          onChange={handleChange}
          value={articulo.descripcion}
        />

        <Text color="tercero.500">Ingresar marca</Text>
        <Input
          type="text"
          name=""
          id="marca"
          mb={"10px"}
          onChange={handleChange}
          value={articulo.marca}
        />

        <Text color="tercero.500">Ingresar imagen</Text>
        <Input
          type="file"
          name=""
          id="imagen"
          mb={"10px"}
          onChange={handleChange}
          value={articulo.imagen}
        />

        <Text color="tercero.500">Seleccionar la categoria</Text>
        <Select
          type="text"
          name=""
          id=""
          mb={"10px"}
          value={articulo.categoria}
        />

        <Button onClick={handleSubmit} colorScheme="blue" w={"150px"}>
          Guardar Articulo
        </Button>
      </Flex>
    </Flex>
  );
};

export default ArticulosForm;
