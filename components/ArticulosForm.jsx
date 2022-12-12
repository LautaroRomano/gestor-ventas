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

const ArticulosForm = (props) => {
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
    props.getArticles();
  };
  const handleSubmitEdit = async (e) => {
    await axios
      .put(
        `http://localhost:3000/api/articulos/${props.articuloSelected.idArticulo}`,
        {
          nombre: articulo.nombre,
          precio: articulo.precio,
          stock: articulo.stock,
          descripcion: articulo.descripcion,
          marca: articulo.marca,
          imagen: articulo.imagen,
          categoria: articulo.categoria,
        }
      )
      .catch((err) => console.log(err));
    setArticulo({
      nombre: "",
      precio: 0.0,
      stock: 0,
      descripcion: "",
      marca: "",
      imagen: "",
      categoria: "",
    });
    props.setArticuloSelected(null);
    props.getArticles();
  };

  const handleChange = (e) => {
    setArticulo({ ...articulo, [e.target.id]: e.target.value });
  };

  const handleDelete = async () => {
    const res = await axios.delete(
      `http://localhost:3000/api/articulos${props.setArticuloSelected.idArticulo}`
    );
    props.getArticles();
  };

  const limpiar = () => {
    document.getElementById("nombre").value = "";
  };

  useEffect(() => {
    if (props.articuloSelected) setArticulo(props.articuloSelected);
    else
      setArticulo({
        nombre: "",
        precio: 0.0,
        stock: 0,
        descripcion: "",
        marca: "",
        imagen: "",
        categoria: "",
      });
  }, [props.articuloSelected]);

  return (
    <Flex
      bg={"#FFF"}
      borderRadius="5px"
      flexDir="column"
      w={"100%"}
      alignItems="center"
    >
      <Text fontSize={"20px"} m="10px" color="tercero.500">
        {!props.articuloSelected ? "Nuevo Articulo" : "Editar Articulo"}
      </Text>

      <Flex flexDir={"column"} w="90%">
        <Text color="tercero.500">Ingresar Nombre</Text>
        <Input
          type="text"
          name=""
          id="nombre"
          mb={"10px"}
          color="#565656"
          onChange={handleChange}
          value={articulo.nombre}
        />

        <Text color="tercero.500">Ingresar precio</Text>
        <Input
          type="number"
          name=""
          id="precio"
          mb={"10px"}
          color="#565656"
          onChange={handleChange}
          value={articulo.precio}
        />

        <Text color="tercero.500">Ingresar stock</Text>
        <Input
          type="number"
          name=""
          id="stock"
          color="#565656"
          mb={"10px"}
          onChange={handleChange}
          value={articulo.stock}
        />

        <Text color="tercero.500">Ingresar descripcion</Text>
        <Input
          type="text"
          name=""
          id="descripcion"
          color="#565656"
          mb={"10px"}
          onChange={handleChange}
          value={articulo.descripcion}
        />

        <Text color="tercero.500">Ingresar marca</Text>
        <Input
          type="text"
          name=""
          id="marca"
          color="#565656"
          mb={"10px"}
          onChange={handleChange}
          value={articulo.marca}
        />

        <Text color="tercero.500">Ingresar imagen</Text>
        <Input
          type="file"
          name=""
          id="imagen"
          color="#565656"
          mb={"10px"}
          onChange={handleChange}
          value={articulo.imagen}
        />

        <Text color="tercero.500">Seleccionar la categoria</Text>
        <Select
          type="text"
          color="#565656"
          name=""
          id=""
          mb={"10px"}
          value={articulo.categoria}
        />
        <Flex w="100%" justifyContent={"center"} my="25px">
          {!props.articuloSelected ? (
            <Button onClick={handleSubmit} colorScheme="green" w={"150px"}>
              Guardar Articulo
            </Button>
          ) : (
            <>
              <Button
                onClick={handleSubmitEdit}
                colorScheme="blue"
                w={"150px"}
                me="10px"
              >
                Editar Articulo
              </Button>
              <Button
                onClick={handleDelete}
                colorScheme="red"
                w={"150px"}
                ms="10px"
              >
                Borrar Articulo
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ArticulosForm;
