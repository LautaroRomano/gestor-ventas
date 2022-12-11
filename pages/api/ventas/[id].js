import { connection } from "../../../config/db"

export default async function handler(req, res) {
    const { id } = req.query

    switch (req.method) {
        case 'GET':
            return await getVenta(req, res, id)
        case 'DELETE':
            return await deleteVenta(req, res, id)
        case 'PUT':
            return await putVenta(req, res, id)
    }
}

const getVenta = async (req, res, id) => {
    try {
        const [result] = await connection.query(`SELECT * FROM ventas WHERE idVenta =${id}`)
        return res.status(200).json(result[0])
    } catch (error) {
        console.log(error)
    }
}

const deleteVenta = async (req, res, id) => {
    try {
        const [result] = await connection.query('DELETE FROM ventas WHERE idVenta=?', [id])
        return res.status(204).json() //204 no espera respuesta, devuelve un json vacio
    } catch (error) {
        console.log(error)
    }
}

const putVenta = async (req, res, id) => {
    try {
        const [result] = await connection.query('UPDATE ventas SET ? WHERE idVenta=?', [req.body, id])
        return res.status(204).json() //204 no espera respuesta, devuelve un json vacio
    } catch (error) {
        console.log(error)
    }
}