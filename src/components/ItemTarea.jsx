import { useState } from "react";
import { ListGroup, Button, Modal, Form } from "react-bootstrap";
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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
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
          <Button variant="warning" onClick={handleShow}>
            Editar
          </Button>
        </div>
      </ListGroup.Item>
      {/* MODAL */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Titulo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Ingrese nombre de tarea</Form.Label>
              <Form.Control type="text" placeholder="Ej: Tarea 1" autoFocus />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      {/*FIN MODAL */}
    </>
  );
};

export default ItemTarea;
