import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ArticulosForm from '../components/ArticulosForm'

const index = () => {
  const [articulo, setArticulo] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/api/articulos')
        .then((resp) => {
            setArticulo(resp.data)
        })
  })

  return (
    <>
      <div>
        <ArticulosForm/>

        {articulo.map((art, index) => (
          <div key={index} className='read'>
            <h3>{art.idArticulo}</h3>
            <h4>{art.nombre}</h4>
          </div>
        ))}
      </div>
    </>
  )
}




export default index