import { useState } from "react";
import { ListGroup, Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  borrarTareaPorID,
  editarTarea,
  leerTareas,
} from "../helpers/queries.js";

const ItemTarea = ({ tarea, posicion, obtenerTareas }) => {
  const [show, setShow] = useState(false);
  const { inputTarea, _id } = tarea;
const [tareaEditada, setTareaEditada] = useState(inputTarea);

  const handleClose = () => setShow(false);
  const handleShow = () => {
   setTareaEditada(inputTarea);
    setShow(true);
  };

  const confirmarBorrado = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `La tarea ${inputTarea} se eliminará`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuesta = await borrarTareaPorID(_id);
        if (respuesta.status === 200) {
          Swal.fire({
            title: "Eliminada",
            text: `La tarea  ${inputTarea} fue borrada correctamente`,
            icon: "success",
            timer: 1200,
            showConfirmButton: false,
          });
          //actualizar tabla
          obtenerTareas();
        }
      } else {
        Swal.fire({
          title: "ocurrio un error",
          text: `La tarea ${inputTarea} NO fue eliminada`,
          icon: "success",
        });
      }
    });
  };

  const editarProductos = async () => {
    const respuesta = await editarTarea(inputTarea, _id);
    if (respuesta.status === 200) {
      Swal.fire({
        title: "Tarea editada",
        text: `La tarea ${inputTarea} fue editada correctamente`,
        icon: "success",
      });
    }
  };

  const guardarCambios = () => {
    editarProductos();
    handleClose();
  };

  return (
    <>
      <ListGroup.Item className="d-flex justify-content-between">
        {posicion + 1}- {inputTarea}{" "}
        <div className="d-flex flex-column flex-md-row text-end">
          <Button
            variant="danger"
            className="mb-1 mb-md-0 me-md-1"
            onClick={confirmarBorrado}
          >
            Borrar
          </Button>
          <Button variant="warning" onClick={handleShow}>
            Editar
          </Button>
        </div>
      </ListGroup.Item>
      {/* MODAL */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Modificar tarea: {inputTarea}</Form.Label>
              <Form.Control type="text" autoFocus />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={guardarCambios}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      {/*FIN MODAL */}
    </>
  );
};

export default ItemTarea;
