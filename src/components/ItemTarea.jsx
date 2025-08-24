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

 const confirmarEditado = () => {
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
      <div className="d-flex flex-column flex-md-row text-end">
        <Button
          variant="danger"
          className="mb-1 mb-md-0 me-md-1"
          onClick={confirmarBorrado}
        >
          Borrar
        </Button>
        <Button variant="warning" onClick={confirmarEditado}>Editar</Button>
      </div>
    </ListGroup.Item>
  );
};

export default ItemTarea;
