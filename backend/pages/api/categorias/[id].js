import { connection } from "../../../config/db"

export default async function handler(req, res) {
    const { id } = req.query

    switch (req.method){
        case 'GET':
           return await getCategoria(req, res, id)
        case 'DELETE':
            return await deleteCategoria(req, res, id)
        case 'PUT':
            return await putCategoria(req, res, id)
    }
}

const getCategoria = async (req, res, id) =>{
    const [result] = await connection.query('SELECT * FROM categorias WHERE idCategoria=?', [id])
    return res.status(200).json(result[0])
}

const deleteCategoria = async (req, res, id) =>{
    try{
        const [result] = await connection.query('DELETE FROM categorias WHERE idCategoria=?', [id])
        return res.status(204).json() //204 no espera respuesta, devuelve un json vacio
    }catch(error){
        console.log(error)
    }
}

const putCategoria = async (req, res, id) =>{
    const [result] = await connection.query('UPDATE categorias SET ? WHERE idCategoria=?', [req.body, id])
    return res.status(204).json() //204 no espera respuesta, devuelve un json vacio
}