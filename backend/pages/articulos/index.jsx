import axios from "axios";
import React, { useEffect, useState } from "react";
import ArticulosForm from "../../components/ArticulosForm";
import NavBarDown from "../../components/NavBarDownMobile";
import { Flex, Text, Input, Button, Spacer, Select } from "@chakra-ui/react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const index = () => {
  const [articulo, setArticulo] = useState([]);
  const [viewAddArticulo, setViewAddArticulo] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/api/articulos").then((resp) => {
      setArticulo(resp.data);
    });
  }, []);

  function page() {
    return (
      <Flex w={"100vw"} h="100vh" alignItems={"center"} flexDir={"column"}>
        <Flex
          w={"90vw"}
          borderRadius="50px"
          alignItems={"center"}
          justifyContent={"center"}
          position="fixed"
          display={viewAddArticulo ? "flex" : "none"}
          mt="100px"
          zIndex="10"
        >
          <ArticulosForm />
        </Flex>

        {articulo.map((art, index) => (
          <Flex
            key={index}
            bg="primero.500"
            w="90vw"
            mt="25px"
            height="200px"
            alignItems="center"
          >
            <img
              src="https://http2.mlstatic.com/D_NQ_NP_803855-MLA46308276931_062021-W.jpg"
              style={{ maxHeight: "90%" }}
            />
            <Flex h="95%" flexDir="column" ms="10px">
              <Text fontSize="20px" color="tercero.500">
                {art.nombre.toUpperCase()}
              </Text>
              <Text fontSize="20px" color="tercero.500">
                {"marca: " + art.marca}
              </Text>
              <Text fontSize="20px" color="white">
                {art.descripcion}
              </Text>
              <Text fontSize="20px" color="segundo.500">
                {"$" + art.precio}
              </Text>
              <Text fontSize="20px" color="segundo.500">
                {"En stock: " + art.stock}
              </Text>
              <Flex w={"100%"} justifyContent="space-between">
                <Button
                  colorScheme="blue"
                  w={"45px"}
                  h="45px"
                  borderRadius="50%"
                >
                  <EditIcon style={{ width: "100%", height: "100%" }} />
                </Button>
                <Button
                  colorScheme="red"
                  w={"45px"}
                  h="45px"
                  borderRadius="50%"
                >
                  <DeleteIcon style={{ width: "100%", height: "100%" }} />
                </Button>
              </Flex>
            </Flex>
          </Flex>
        ))}
        <Flex
          w={"100vw"}
          position="fixed"
          justifyContent={"center"}
          style={{ top: "85vh" }}
        >
          <Button
            colorScheme="blue"
            w={"60px"}
            h="60px"
            borderRadius="50%"
            onClick={() => setViewAddArticulo(!viewAddArticulo)}
          >
            {viewAddArticulo ? (
              <CloseIcon style={{ width: "100%", height: "100%" }} />
            ) : (
              <AddIcon style={{ width: "100%", height: "100%" }} />
            )}
          </Button>
        </Flex>
      </Flex>
    );
  }
  return <NavBarDown>{page()}</NavBarDown>;
};

export default index;
