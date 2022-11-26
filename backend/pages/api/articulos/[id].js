import { connection } from "../../../config/db"

export default async function handler(req, res) {
    const { id } = req.query

    switch (req.method){
        case 'GET':
           return await getArticulo(req, res, id)
        case 'DELETE':
            return await deleteArticulo(req, res, id)
        case 'PUT':
            return await putArticulo(req, res, id)
    }
}

const getArticulo = async (req, res, id) =>{
    const [result] = await connection.query('SELECT * FROM articulos WHERE idArticulo=?', [id])
    return res.status(200).json(result[0])
}

const deleteArticulo = async (req, res, id) =>{
    try{
        const [result] = await connection.query('DELETE FROM articulos WHERE idArticulo=?', [id])
        return res.status(204).json() //204 no espera respuesta, devuelve un json vacio
    }catch(error){
        console.log(error)
    }
}

const putArticulo = async (req, res, id) =>{
    const [result] = await connection.query('UPDATE articulos SET ? WHERE idArticulo=?', [req.body, id])
    return res.status(204).json() //204 no espera respuesta, devuelve un json vacio
}