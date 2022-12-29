import { connection } from "../../../config/db"


export default async function handler(req, res) {
    try {
        switch (req.method) {
            case 'GET':
                return await getDetalleVentas(req, res)
            case 'POST':
                return await postDetalleVentas(req, res)
        }
    } catch (error) {
        console.log(error)
    }
}

const getDetalleVentas = async (req, res) => {
    try {
        const [result] = await connection.query(`SELECT detalle_ventas.idDetalleVenta, detalle_ventas.idVenta, ventas.total, detalle_ventas.idArticulo, articulos.nombre, cantidad FROM detalle_ventas 
        INNER JOIN ventas ON detalle_ventas.idVenta = ventas.idVenta
        INNER JOIN articulos ON detalle_ventas.idArticulo = articulos.idArticulo`);
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
}

const postDetalleVentas = async (req, res) => {
    try {
        const { idArticulo, idVenta, cantidad } = req.body
        const [result] = await connection.query('INSERT INTO detalle_ventas SET ?', {
            idArticulo,
            idVenta,
            cantidad
        })
        console.log(result)
        return res.status(200).json({ idArticulo, idVenta, cantidad})
    } catch (error) {
        console.log(error)
    }

}
