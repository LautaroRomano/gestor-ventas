import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ArticulosForm = () => {

    const [articulo, setArticulo] = useState({
        nombre: "",
        precio: 0.00,
        stock: 0,
        descripcion: "",
        marca: "",
        imagen: ""
    })

    const handleSubmit = async (e) =>{
        const resp = await axios.post('http://localhost:3000/api/articulos', 
        articulo)
        console.log(resp)
    }

    const handleChange = e => {
        // console.log(e.target.id, e.target.value)
        setArticulo({...articulo, [e.target.id]: e.target.value})
    }

    const handleDelete = async (id) =>{
        const res = await axios.delete(`http://localhost:3000/api/articulos${id}`)
        console.log(res)
    }

    const limpiar = () =>{
        document.getElementById('nombre').value = ''
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Ingresar Nombre</label>
                    <input type="text" name="" id="nombre" onChange={handleChange}/>

                    <label htmlFor="name">Ingresar precio</label>
                    <input type="text" name="" id="precio" onChange={handleChange}/>

                    <label htmlFor="name">Ingresar stock</label>
                    <input type="text" name="" id="stock" onChange={handleChange}/>

                    <label htmlFor="name">Ingresar descripcion</label>
                    <input type="text" name="" id="descripcion" onChange={handleChange}/>

                    <label htmlFor="name">Ingresar marca</label>
                    <input type="text" name="" id="marca" onChange={handleChange}/>

                    <label htmlFor="name">Ingresar imagen</label>
                    <input type="text" name="" id="imagen" onChange={handleChange}/>

                    <label htmlFor="name">Seleccionar la categoria</label>
                    <input type="text" name="" id="" />

                    <button>Guardar Articulo</button>
                </form>
                    <button>Eliminar Articulo</button>
                    <button onClick={limpiar}>Limpiar</button>
            </div>
        </>
    )
}

export default ArticulosForm