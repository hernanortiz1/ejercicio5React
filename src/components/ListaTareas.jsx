import ListGroup from "react-bootstrap/ListGroup";
import ItemTarea from "./ItemTarea"

const ListaTareas = ({ tareaProps, obtenerTareas}) => {
  return (
    <>
      <ListGroup>
      {
        tareaProps.map((item, indice) => (
          <ItemTarea key={item._id} tarea={item} posicion={indice} obtenerTareas={obtenerTareas}/>
        ))
      }
    </ListGroup>
    </>
  );
};

export default ListaTareas;
