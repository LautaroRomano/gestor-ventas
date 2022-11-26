import { connection } from "../../../config/db"


export default async function handler(req, res) {
    try {
        switch (req.method) {
            case 'GET':
                return await obtenerArticulo(req, res)
            case 'POST':
                return await guardarArticulo(req, res)
        }
    } catch (error) {
        console.log(error)
    }
}

const obtenerArticulo = async (req, res) => {
    const [result] = await connection.query('SELECT * FROM articulos');
    return res.status(200).json(result)
}

const guardarArticulo = async (req, res) => {
    const { nombre, precio, stock, descripcion, marca, imagen } = req.body
    const [result] = await connection.query('INSERT INTO articulos SET ?', {
        nombre,
        precio,
        stock,
        descripcion,
        marca,
        imagen
    })
    console.log(result)
    return res.status(200).json({ nombre, precio, stock, descripcion, marca, imagen })

}
