import { connection } from "../../../config/db"

export default async function handler(req, res) {
    const { id } = req.query

    switch (req.method) {
        case 'GET':
            return await getDetalleVentas(req, res, id)
        case 'DELETE':
            return await deleteDetalleVentas(req, res, id)
        case 'PUT':
            return await putDetalleVentas(req, res, id)
    }
}

const getDetalleVentas = async (req, res, id) => {
    try {
        const [result] = await connection.query(`SELECT detalle_ventas.idDetalleVenta, detalle_ventas.idVenta, ventas.total, detalle_ventas.idArticulo, articulos.nombre, cantidad FROM detalle_ventas 
        INNER JOIN ventas ON detalle_ventas.idVenta = ventas.idVenta
        INNER JOIN articulos ON detalle_ventas.idArticulo = articulos.idArticulo WHERE detalle_ventas.idDetalleVenta =${id}`)
        return res.status(200).json(result[0])
    } catch (error) {
        console.log(error)
    }
}

const deleteDetalleVentas = async (req, res, id) => {
    try {
        const [result] = await connection.query('DELETE FROM detalle_ventas WHERE idDetalleVenta=?', [id])
        return res.status(204).json() //204 no espera respuesta, devuelve un json vacio
    } catch (error) {
        console.log(error)
    }
}


// NO ANDA :(
const putDetalleVentas = async (req, res, id) => {
    try {
        const [result] = await connection.query('UPDATE detalle_ventas SET ? WHERE idDetalleVenta=?', [req.body, id])
        return res.status(204).json() //204 no espera respuesta, devuelve un json vacio
    } catch (error) {
        console.log(error)
    }
}