import { useState } from "react";
import { ListGroup, Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { borrarTareaPorID, leerTareas } from "../helpers/queries.js";

const ItemTarea = ({
  nombreTarea,
  borrarTareaProps,
  posicion,
  
}) => {
  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => {
    setTareaEditada(nombreTarea);
    setShow(true);
  };

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
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuesta = await borrarTareaPorID(tarea._id);
        if (respuesta.status === 200) {
          Swal.fire({
            title: "Eliminada",
            text: `La tarea  ${nombreTarea} fue borrada correctamente`,
            icon: "success",
            timer: 1200,
            showConfirmButton: false,
          });
          //actualizar tabla
          const respuestaTareas = await leerTareas();
          const tareasActualizadas = await respuestaTareas.json();
          setListaProductos(tareasActualizadas);
        }
      } else {
        Swal.fire({
          title: "ocurrio un error",
          text: `La tarea ${nombreTarea} NO fue eliminada`,
          icon: "success",
        });
      }
    });
  };

  const guardarCambios = () => {
  
    handleClose();
  };

  return (
    <>
      <ListGroup.Item className="d-flex justify-content-between">
        {posicion + 1}- {nombreTarea}{" "}
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
              <Form.Label>Modificar tarea: {nombreTarea}</Form.Label>
              <Form.Control
                type="text"
        
                
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
