import axios from "axios";
import React, { useEffect, useState } from "react";
import VentasForm from "../../components/VentasForm";
import NavBarDown from "../../components/NavBarDownMobile";
import { Flex, Text, Input, Button, Spacer, Select } from "@chakra-ui/react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DetalleVentas from "../../components/DetalleVentas"

const Index = () => {
  const [ventas, setVentas] = useState([]);
  const [viewAddventas, setViewAddventas] = useState(false);
  const [ventasSelected, setVentasSelected] = useState(null);
  const [viewDetalleVentas, setViewDetalleVentas] = useState(false);

  useEffect(() => {
    getVentas();
  }, []);

  const getVentas = async () => {
    axios.get("http://localhost:3000/api/ventas").then((resp) => {
      setVentas(resp.data);
    });
  };

  const getVenta = async (idventas) => {
    axios.get(`http://localhost:3000/api/ventass/${idventas}`).then((resp) => {
      setVentasSelected(resp.data);
    });
  };


  function page() {

    // ===== CONTINUAR =====
    const postDetalleVentas = () => {
      axios.post() //insertar id con detalles de ventas
    }

    return (
      <Flex w={"100vw"} h="100vh" alignItems={"center"} flexDir={"column"}>

        {
          viewDetalleVentas && (
            <DetalleVentas setViewDetalleVentas={setViewDetalleVentas} postDetalleVentas={postDetalleVentas}/>
          )
        }

        <Flex w={"100%"} flexDir="column">
          <Flex w={"100%"} justifyContent="center">
            <Text
              color="rgb(5, 5, 25)"
              fontSize="19px"
              fontWeight="600"
              maxWidth="90%"
            >
              Tus ventas.
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
          display={viewAddventas || ventasSelected ? "flex" : "none"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Flex
            w={"90vw"}
            h="90vh"
            borderRadius="50px"
            alignItems={"center"}
            justifyContent={"center"}
            mt="-50px"
            zIndex="10"
          >
            <VentasForm
              ventasSelected={ventasSelected}
              setVentasSelected={setVentasSelected}
              getVentas={getVentas}
              setViewAddventas={setViewAddventas}
            />
          </Flex>
        </Flex>
        {ventas.map((ven, index) => (
          //""
          <VentaCard
            fecha={ven.fecha}
            marca={ven.impuesto}
            descripcion={ven.total}
            tipo_pago={ven.tipo_pago}
            key={index}
            getVenta={getVenta}
            setViewDetalleVentas={setViewDetalleVentas}
            ven={ven}
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
              setViewAddventas(!(viewAddventas || ventasSelected));
              setVentasSelected(null);
            }}
          >
            {viewAddventas || ventasSelected ? (
              <CloseIcon style={{ width: "100%", height: "100%" }} />
            ) : (
              <AddIcon style={{ width: "100%", height: "100%" }} />
            )}
          </Button>
        </Flex>
      </Flex>
    );
  }
  return <NavBarDown selected="3">{page()}</NavBarDown>;
};

export default Index;

const VentaCard = (props) => {
  // const [viewDetalleVentas, setViewDetalleVentas] = useState(false);

  return (
    <Flex
      my={"15px"}
      bg={"#FFF"}
      cursor="pointer"
      w="90%"
      // onClick={() => props.getVenta(props.ven.idVenta)}
      borderRadius="25px"
      shadow={"2xl"}
    >


      <Flex padding={"15px"} w="100%">
        <Flex flexDir={"column"} w="100%">
          <Flex flexDir={"column"} w="100%">
            <Flex flexDir={"row"} w="100%">
              <Text color="gray" fontSize="26px" fontWeight="600">
                #{props.ven.idVenta}
              </Text>
              <Spacer />
              <Text color="#626262" fontSize="20px" fontWeight="600">
                {props.fecha && props.fecha.slice(0, 10)}
              </Text>
            </Flex>
            <Flex flexDir={"column"}>
              <Text color="rgb(16, 4, 35)" fontSize="19px" fontWeight="200">
                pagado con {props.tipo_pago}
              </Text>
              <Flex>
                <Text color="rgb(16, 4, 35)" fontSize="21px" fontWeight="600">
                  Total: {props.ven.total}
                </Text>
                <Spacer />
                <Text
                  color="#EFEFEF"
                  fontSize="18px"
                  fontWeight="600"
                  bg={"tercero.500"}
                  p="5px"
                  borderRadius={"10px"}
                  onClick={() => props.postDetalleVentas(true)}
                >
                  Ver detalle
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
