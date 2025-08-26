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
  const [tareaEditada, setTareaEditada] = useState(tarea.inputTarea);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setTareaEditada(tarea.inputTarea);
    setShow(true);
  };

  const confirmarBorrado = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `La tarea ${tarea.inputTarea} se eliminará`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuesta = await borrarTareaPorID(tarea._id);
        if (respuesta.status === 200) {
          Swal.fire({
            title: "Eliminada",
            text: `La tarea  ${tarea.inputTarea} fue borrada correctamente`,
            icon: "success",
            timer: 1200,
            showConfirmButton: false,
          });
          //actualizar tabla
          obtenerTareas();
        }
      }
    });
  };

  const editarProductos = async () => {
    const tareaParaEditar = { inputTarea: tareaEditada };
    const respuesta = await editarTarea(tareaParaEditar, tarea._id);
    if (respuesta.status === 200) {
      Swal.fire({
        title: "Tarea editada",
        text: `La tarea "${tareaEditada}" fue editada correctamente`,
        icon: "success",
      });
      obtenerTareas();
    }
  };

  const guardarCambios = () => {
    if (tareaEditada.trim().length < 3) {
      Swal.fire({
        title: "Error",
        text: "La tarea debe tener al menos 3 caracteres",
        icon: "warning",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    editarProductos();
    handleClose();
  };

  return (
    <>
      <ListGroup.Item className="d-flex justify-content-between">
        {posicion + 1}- {tarea.inputTarea}{" "}
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
              <Form.Label>Modificar tarea: {tarea.inputTarea}</Form.Label>
              <Form.Control
                type="text"
                value={tareaEditada}
                onChange={(e) => setTareaEditada(e.target.value)}
                autoFocus
              />
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
