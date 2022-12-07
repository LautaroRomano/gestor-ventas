import axios from "axios";
import React, { useEffect, useState } from "react";
import ArticulosForm from "../../components/ArticulosForm";
import NavBarDown from "../../components/NavBarDownMobile";
import { Flex, Text, Input, Button, Spacer, Select } from "@chakra-ui/react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

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
      <Flex
        w={"100vw"}
        h="100vh"
        alignItems={"center"}
        justifyContent={"center"}
        flexDir={"column"}
      >
        <Flex
          w={"90vw"}
          borderRadius="50px"
          alignItems={"center"}
          justifyContent={"center"}
          position="fixed"
          display={viewAddArticulo ? "flex" : "none"}
        >
          <ArticulosForm />
        </Flex>

        {articulo.map((art, index) => (
          <div key={index} className="read">
            <h3>{art.idArticulo}</h3>
            <h4>{art.nombre}</h4>
          </div>
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
