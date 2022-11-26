import { connection } from "../../../config/db"


export default async function handler(req, res) {
    try {
        switch (req.method) {
            case 'GET':
                return await obtenerCategoria(req, res)
            case 'POST':
                return await guardarCategoria(req, res)
        }
    } catch (error) {
        console.log(error)
    }
}

const obtenerCategoria = async (req, res) => {
    const [result] = await connection.query('SELECT * FROM categorias');
    return res.status(200).json(result)
}

const guardarCategoria = async (req, res) => {
    const { nombre, descripcion } = req.body
    const [result] = await connection.query('INSERT INTO categorias SET ?', {
        nombre,
        descripcion,
    })
    console.log(result)
    return res.status(200).json({ nombre, descripcion, })

}
