import axios from "axios";
import React, { useEffect, useState } from "react";
import ArticulosForm from "../../components/ArticulosForm";
import NavBarDown from "../../components/NavBarDownMobile";
import { Flex, Text, Input, Button, Spacer, Select } from "@chakra-ui/react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Index = () => {
  const [articulo, setArticulo] = useState([]);
  const [viewAddArticulo, setViewAddArticulo] = useState(false);
  const [articuloSelected, setArticuloSelected] = useState(null);

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    axios.get("http://localhost:3000/api/articulos").then((resp) => {
      setArticulo(resp.data);
    });
  };

  const getArticle = async (idArticulo) => {
    axios
      .get(`http://localhost:3000/api/articulos/${idArticulo}`)
      .then((resp) => {
        setArticuloSelected(resp.data);
      });
  };

  function page() {
    return (
      <Flex w={"100vw"} h="100vh" alignItems={"center"} flexDir={"column"}>
        <Flex w={"100%"} flexDir="column">
          <Flex w={"100%"} justifyContent="center">
            <Text
              color="rgb(5, 5, 25)"
              fontSize="19px"
              fontWeight="600"
              maxWidth="90%"
            >
              Tu Inventario
            </Text>
          </Flex>
          <Flex w={"100%"} justifyContent="start">
            <Text
              color="rgb(5, 5, 25)"
              fontSize="13px"
              fontWeight="300"
              maxWidth="90%"
              ms={"15px"}
            >
              Haz clic en cada producto para ver mas.
            </Text>
          </Flex>
        </Flex>
        <Flex
          w={"100vw"}
          height="100vh"
          bg={"#0006"}
          position="fixed"
          display={viewAddArticulo || articuloSelected ? "flex" : "none"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Flex
            w={"90vw"}
            borderRadius="50px"
            alignItems={"center"}
            justifyContent={"center"}
            mt="-50px"
            zIndex="10"
          >
            <ArticulosForm
              articuloSelected={articuloSelected}
              setArticuloSelected={setArticuloSelected}
              getArticles={getArticles}
            />
          </Flex>
        </Flex>
        {articulo.map((art, index) => (
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
            getArticle={getArticle}
            art={art}
          />
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
            onClick={() => {
              setViewAddArticulo(!(viewAddArticulo || articuloSelected));
              setArticuloSelected(null);
            }}
          >
            {viewAddArticulo || articuloSelected ? (
              <CloseIcon style={{ width: "100%", height: "100%" }} />
            ) : (
              <AddIcon style={{ width: "100%", height: "100%" }} />
            )}
          </Button>
        </Flex>
      </Flex>
    );
  }
  return <NavBarDown selected="2">{page()}</NavBarDown>;
};

export default Index;

const ProductCard = (props) => {
  return (
    <Flex
      my={"15px"}
      bg={"#FFF"}
      cursor="pointer"
      w={"60%"}
      h={"300px"}
      onClick={() => props.getArticle(props.art.idArticulo)}
    >
      <Flex padding={"15px"}>
        <Flex flexDir={"column"} w={"60%"}>
          <Flex flexDir={"column"}>
            <Flex flexDir={"column"}>
              <Text
                color="rgb(16, 4, 35)"
                fontSize="16px"
                fontWeight="400"
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
            </Flex>
            <Flex flexDir={"column"}>
              <Text
                color="rgb(16, 4, 35)"
                fontSize="14px"
                fontWeight="200"
                maxWidth="90%"
              >
                {props.descripcion}
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
          <Flex my={"15px"}>
            <Text color="rgb(16, 4, 35)" fontSize="17px" fontWeight="600">
              ${props.precio}
            </Text>
          </Flex>
        </Flex>
        <Flex w={"60%"} h={"60%"} justifyContent="end">
          <Flex maxWidth={"100%"} height="auto">
            <img src={props.imagen} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
