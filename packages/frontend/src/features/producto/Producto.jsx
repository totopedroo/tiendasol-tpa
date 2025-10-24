import { getProductoById } from "../../service/productosService";
import {Spinner} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import "./Producto.css";

const Home = () => {
  const [producto, setProductos] = useState([]);

  const cargarProductos = async () => {
    const productosCargados = await getProductos();
    console.log(productosCargados)
    setProductos(productosCargados.data)
  } 
  useEffect(() => { cargarProductos()}, []);
  return (
    <>  
    <h1>HOME</h1>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et assumenda a corrupti. Aspernatur qui, error earum inventore quod, tempora nihil corporis et eius quis nesciunt, consequatur in. Dolores, commodi. Veniam?</p>
      {productos.length === 0 ? 
      (<div className="spinner">
        <Spinner animation="border" variant="primary" />
      </div>) :
      (<div className="list">
        {productos.map((producto) => (
              <ProductoCard producto={producto} key={producto._id}/> 
        ))}
      </div>)
      }          
    </>
  );
};

export default Home;
