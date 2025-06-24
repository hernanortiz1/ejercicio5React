import { ListGroup, Button } from "react-bootstrap";
import Swal from "sweetalert2";

const ItemTarea = () => {
  return (
    <ListGroup.Item className="d-flex justify-content-between">
      Tarea 1 <Button variant="danger">Borrar</Button>
    </ListGroup.Item>
  );
};

export default ItemTarea;
