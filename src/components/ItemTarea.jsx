import { ListGroup, Button } from "react-bootstrap";
import Swal from "sweetalert2";

const ItemTarea = ({ nombreTarea, borrarTareaProps, posicion }) => {
  const confirmarBorrado = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `La tarea ${nombreTarea} se eliminará`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        borrarTareaProps(nombreTarea);

        Swal.fire({
          title: "Eliminada",
          text: `La tarea  ${nombreTarea} fue borrada correctamente`,
          icon: "success",
          timer: 1200,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <ListGroup.Item className="d-flex justify-content-between">
      {posicion + 1}-{nombreTarea}{" "}
      <Button variant="danger" onClick={confirmarBorrado}>
        Borrar
      </Button>
    </ListGroup.Item>
  );
};

export default ItemTarea;
