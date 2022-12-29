import axios from "axios";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Flex, Input, Button, Select, Text, Spacer } from "@chakra-ui/react";
import Categorias from "./Categorias";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const VentasForm = (props) => {
  const [articulos, setArticulos] = useState([]);
  const [detalleVenta, setDetalleVenta] = useState([]);

  const handleSubmit = async (e) => {
    let total = 0;

    detalleVenta.forEach((det) => {
      total += det.art.precio + det.cantidad;
    });

    await axios.post("http://localhost:3000/api/ventas", {
      impuesto: 0,
      total,
      tipo_pago: "efectivo",
      detalles: detalleVenta,
    });
    setDetalleVenta([]);
    getArticulos();
    props.getVentas();
    props.setViewAddventas(false);
  };

  const handleSetDetalleVenta = (producto, cantidad, art) => {
    let detalleVentaAux = detalleVenta;
    let b = false;
    detalleVentaAux = detalleVentaAux.map((det) => {
      if (det.producto === producto) {
        b = true;
        return {
          producto: producto,
          cantidad: cantidad,
          art: art,
        };
      } else {
        return det;
      }
    });
    if (!b)
      detalleVentaAux.push({
        producto: producto,
        cantidad: cantidad,
        art: art,
      });
    setDetalleVenta(detalleVentaAux);
  };

  useEffect(() => {
    getArticulos();
  }, []);
  const getArticulos = () => {
    axios.get(`http://localhost:3000/api/articulos`).then(({ data: data }) => {
      setArticulos(data);
    });
  };

  return (
    <Flex
      bg={"#FFF"}
      borderRadius="5px"
      flexDir="column"
      w={"100%"}
      alignItems="center"
      minH={"75vh"}
      maxH={"75vh"}
    >
      <Text fontSize={"20px"} m="10px" color="tercero.500">
        {"Nueva venta"}
      </Text>

      <Flex
        flexDir={"row"}
        w="90%"
        textAlign={"center"}
        justifyContent="center"
      >
        <Text color="tercero.500">Buscar</Text>
        <Input
          type="text"
          name=""
          id="nombre"
          mb={"10px"}
          color="#565656"
          onChange={() => {}}
          //value={articulo.nombre}
        />
      </Flex>
      <Flex
        flexDir={"column"}
        w="90%"
        h={"100%"}
        overflowY={"scroll"}
        maxH={"50%"}
      >
        <Flex flexDir="column">
          {articulos.map((art, index) => (
            //""
            <ProductCard
              nombre={art.nombre}
              marca={art.marca}
              descripcion={art.descripcion}
              precio={art.precio}
              imagen={
                art.imagen ||
                "https://http2.mlstatic.com/D_NQ_NP_803855-MLA46308276931_062021-W.jpg"
              }
              stock={art.stock}
              key={index}
              art={art}
              setDetalleVenta={handleSetDetalleVenta}
            />
          ))}
        </Flex>
      </Flex>
      <Spacer />

      <Flex w="100%" justifyContent={"center"} my="25px">
        {!props.articuloSelected ? (
          <Button onClick={handleSubmit} colorScheme="red" w={"150px"}>
            Guardar Venta
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
  );
};

export default VentasForm;

const ProductCard = (props) => {
  const [openSelectCount, setOpenSelectCount] = useState(false);
  const [articulo, setArticulo] = useState({
    producto: props.art.idArticulo,
    cantidad: 0,
  });

  const hadleChangeCantidad = (cantidad) => {
    const newArt = {
      ...articulo,
      cantidad: cantidad,
    };
    setArticulo(newArt);
    props.setDetalleVenta(newArt.producto, cantidad, props.art);
  };

  const handleOpenSelectCount = () => {
    setOpenSelectCount(true);
    setTimeout(() => {
      setOpenSelectCount(false);
    }, 3000);
  };
  return (
    <Flex
      my={"15px"}
      bg={"#FFF"}
      cursor="pointer"
      maxH={"100px"}
      borderTop="1px solid gray"
    >
      <Flex padding={"15px"} justifyContent="center" alignItems="center">
        <Flex w={"30%"} justifyContent="start">
          <Flex maxWidth={"100%"} height="auto">
            <img src={props.imagen} />
          </Flex>
        </Flex>

        <Flex flexDir={"column"} w={"70%"}>
          <Flex flexDir={"column"}>
            <Flex flexDir={"column"}>
              <Text
                color="#626262"
                fontSize="20px"
                fontWeight="600"
                maxWidth="90%"
              >
                {props.nombre}
              </Text>
              <Text
                color="rgb(16, 4, 35)"
                fontSize="16px"
                fontWeight="400"
                maxWidth="90%"
              >
                Marca: {props.marca}
              </Text>
              <Text
                color="rgb(16, 4, 35)"
                fontSize="14px"
                fontWeight="200"
                maxWidth="90%"
              >
                En stock: {props.stock}
              </Text>
            </Flex>
          </Flex>
          <Flex>
            <Text color="rgb(16, 4, 35)" fontSize="17px" fontWeight="600">
              ${props.precio}
            </Text>
          </Flex>
        </Flex>
        <Flex right="15vw" display={"flow"}>
          {openSelectCount ? (
            <Flex
              color={"#121212"}
              w="120px"
              h={"35px"}
              borderRadius={"20px"}
              border="1px solid black"
              alignItems={"center"}
              justifyContent="center"
              bg={"#FFF"}
            >
              <Flex
                alignItems={"center"}
                justifyContent="space-between"
                w={"70%"}
              >
                <Flex
                  alignItems={"center"}
                  justifyContent="space-between"
                  h={"100%"}
                  onClick={() => {
                    hadleChangeCantidad(0);
                  }}
                >
                  <DeleteOutlineOutlinedIcon />
                </Flex>

                <Flex
                  fontSize={"2xl"}
                  onClick={() => {
                    hadleChangeCantidad(articulo.cantidad - 1);
                  }}
                >
                  -
                </Flex>

                <Flex>{articulo.cantidad}</Flex>
                <Flex
                  fontSize={"2xl"}
                  onClick={() => {
                    hadleChangeCantidad(articulo.cantidad + 1);
                  }}
                >
                  +
                </Flex>
              </Flex>
            </Flex>
          ) : (
            <Flex
              color={"#121212"}
              w="25px"
              h={"25px"}
              borderRadius={"50%"}
              border="1px solid black"
              alignItems={"center"}
              justifyContent="center"
              onClick={() => handleOpenSelectCount()}
              bg={articulo.cantidad === 0 ? "#FFF" : "#EEEEEE"}
            >
              {articulo.cantidad === 0 ? "+" : articulo.cantidad}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
