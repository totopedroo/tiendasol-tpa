import "./ProductoCard.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
//import { Link } from "react-router-dom";   
// import "../../index.css"

const ProductoCard = ({producto}) => {
  console.log(producto.fotos[0])
  return (
    <>
    <Card style={{ width: '14rem' }} key={producto._id} >
      <Card.Img variant="top" src={producto.fotos[0]} className="imagen-producto" />
      <Card.Body>
        <Card.Title>{producto.titulo}</Card.Title>
        <div>{producto.precio}</div>  
        <Button variant="primary">Ir a producto</Button>
      </Card.Body>
    </Card>
    </>
  )
}

export default ProductoCard;