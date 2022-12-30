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
    const [detalle, setDetalle] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/detalles_ventas')
        .then((resp) =>{
            setDetalle(resp.data)
       })
    })
    
//"   
return(
    <Flex
     w={"60%"}
     h={"80%"}
     backgroundColor={"#fff"} 
    >
        <Flex color={"#000"}>
            {
                detalle.map(det => (
                    <option>{det.idVenta}</option>
                ))
            }
        </Flex>
    </Flex>
)
};

export default DetalleVentas;

