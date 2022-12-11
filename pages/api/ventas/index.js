import { connection } from "../../../config/db"


export default async function handler(req, res) {
    try {
        switch (req.method) {
            case 'GET':
                return await getVentas(req, res)
            case 'POST':
                return await postVentas(req, res)
        }
    } catch (error) {
        console.log(error)
    }
}

const getVentas = async (req, res) => {
    try {
        const [result] = await connection.query('SELECT * FROM ventas');
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
}

const postVentas = async (req, res) => {
    try {
        const { fecha, impuesto, total, tipo_pago } = req.body
        const [result] = await connection.query('INSERT INTO ventas SET ?', {
            fecha,
            impuesto,
            total,
            tipo_pago
        })
        console.log(result)
        return res.status(200).json({ fecha, impuesto, total, tipo_pago })
    } catch (error) {
        console.log(error)
    }
}
