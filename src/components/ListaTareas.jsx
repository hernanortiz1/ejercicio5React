import ListGroup from "react-bootstrap/ListGroup";
import ItemTarea from "./ItemTarea"

const ListaTareas = ({ tareaProps}) => {
  return (
    <>
      <ListGroup>
      {
        tareaProps.map((item, indice) => (
          <ItemTarea key={item._id}  nombreTarea={item.inputTarea} posicion={indice}/>
        ))
      }
    </ListGroup>
    </>
  );
};

export default ListaTareas;
