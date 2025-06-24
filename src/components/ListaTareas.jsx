import ListGroup from "react-bootstrap/ListGroup";
import ItemTarea from "./ItemTarea"

const ListaTareas = () => {
  return (
    <>
      <ListGroup>
      {
        tareaProps.map((item, indice) => (
          <ItemTarea key={indice}  nombreTarea={item} borrarTareaProps={borrarTareaProps} posicion={indice}/>
        ))
      }
    </ListGroup>
    </>
  );
};

export default ListaTareas;
