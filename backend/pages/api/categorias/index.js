import { connection } from "../../../config/db"


export default async function handler(req, res) {
    try {
        switch (req.method) {
            case 'GET':
                return await getCategoria(req, res)
            case 'POST':
                return await postCategoria(req, res)
        }
    } catch (error) {
        console.log(error)
    }
}

const getCategoria = async (req, res) => {
    try {
        const [result] = await connection.query('SELECT * FROM categorias');
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }

}

const postCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body
        const [result] = await connection.query('INSERT INTO categorias SET ?', {
            nombre,
            descripcion,
        })
        console.log(result)
        return res.status(200).json({ nombre, descripcion, })
    } catch (error) {
        console.log(error)
    }

}
