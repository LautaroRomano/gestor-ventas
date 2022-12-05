import { connection } from "../../../config/db"


export default async function handler(req, res) {
    try {
        switch (req.method) {
            case 'GET':
                return await getArticulo(req, res)
            case 'POST':
                return await postArticulo(req, res)
        }
    } catch (error) {
        console.log(error)
    }
}

const getArticulo = async (req, res) => {
    try {
        const [result] = await connection.query(`SELECT articulos.idArticulo, articulos.nombre ,articulos.precio, articulos.stock, articulos.descripcion, 
        articulos.marca, categorias.idCategoria, categorias.nombre AS nombre_categoria 
        FROM articulos INNER JOIN 
        categorias ON articulos.idCategoria = categorias.idCategoria`);
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
}

const postArticulo = async (req, res) => {
    try {
        const { nombre, precio, stock, descripcion, marca, imagen, idCategoria } = req.body
        const [result] = await connection.query('INSERT INTO articulos SET ?', {
            nombre,
            precio,
            stock,
            descripcion,
            marca,
            imagen,
            idCategoria
        })
        console.log(result)
        return res.status(200).json({ nombre, precio, stock, descripcion, marca, imagen, idCategoria })
    } catch (error) {
        console.log(error)
    }

}
