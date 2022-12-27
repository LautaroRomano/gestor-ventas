import axios from "axios";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Flex, Input, Button, Select, Text } from "@chakra-ui/react";
import Categorias from "./Categorias";

const VentasForm = (props) => {
  const [articulo, setArticulo] = useState({
    nombre: "",
    precio: 0.0,
    stock: 0,
    descripcion: "",
    marca: "",
    imagen: "",
    idCategoria: "",
  });

  const [categorias, setCategorias] = useState([]);
  const [modalCategorias, setModalCategorias] = useState(false);

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
      idCategoria: "",
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
          idCategoria: articulo.idCategoria,
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
      idCategoria: "",
    });
    props.setArticuloSelected(null);
    props.getArticles();
  };

  const handleChange = (e) => {
    setArticulo({ ...articulo, [e.target.id]: e.target.value });
  };

  const imagenAA = async (e) => {
    const CLOUDINARY_URL =
      "https://api.cloudinary.com/v1_1/dy3mqebvq/image/upload";
    const CLOUDINARY_ID = "mgbcyt0d";
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_ID);

    if (file) {
      const res = await axios.post(CLOUDINARY_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setArticulo({ ...articulo, imagen: res.data.url });
    }
  };

  const handleSelectCategoria = (e) => {
    console.log(e.target.value);
    setArticulo({ ...articulo, idCategoria: e.target.value });
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
        idCategoria: "",
      });
  }, [props.articuloSelected]);
  useEffect(() => {
    getCategorias();
  }, []);
  const getCategorias = () => {
    axios.get(`http://localhost:3000/api/categorias`).then(({ data: data }) => {
      setCategorias(data);
    });
  };

  return (
    <Flex
      bg={"#FFF"}
      borderRadius="5px"
      flexDir="column"
      w={"100%"}
      alignItems="center"
    >
      <Flex w={"100%"} height='100%'>
        {modalCategorias && (
          <Categorias setModalCategorias={setModalCategorias} getCategorias={getCategorias}/>
        )}
      </Flex>

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
          accept="image/x-png,image/jpeg,image/jpg"
          color="#565656"
          mb={"10px"}
          onChange={imagenAA}
          // value={articulo.imagen}
        />

        <Text color="tercero.500">Seleccionar la Categoria</Text>
        <Flex>
          <Select
            placeholder="Seleccionar categoria"
            w={"100%"}
            type="text"
            color="#565656"
            name=""
            id=""
            mb={"10px"}
            value={articulo.idCategoria}
            onChange={handleSelectCategoria}
          >
            {categorias.length > 0 &&
              categorias.map((cat) => (
                <option key={cat.idCategoria} value={cat.idCategoria}>
                  {cat.nombre}
                </option>
              ))}
          </Select>
          <Button
            colorScheme="blue"
            borderRadius="10px"
            padding={"15px"}
            onClick={() => setModalCategorias(true)}
          >
            Categorias
          </Button>
        </Flex>
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

export default VentasForm;
