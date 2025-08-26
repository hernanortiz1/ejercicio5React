import { Form, Button, Modal, ListGroup } from "react-bootstrap";
import ListaTareas from "./ListaTareas";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { leerTareas, editarTarea, crearTarea } from "../helpers/queries.js";
import Swal from "sweetalert2";

const FormularioTarea = () => {
  const [listaTareas, setListaTareas] = useState([]);

  const [ventanaBusqueda, setVentanaBusqueda] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [resultadosBusqueda, setResultadosBusqueda] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const obtenerTareas = async () => {
    const respuesta = await leerTareas();
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      setListaTareas(datos);
    } else {
      console.info("Error al buscar un tarea");
    }
  };

  useEffect(() => {
    obtenerTareas();
  }, []);

  const handleShowBusqueda = () => {
    setBusqueda("");
    setResultadosBusqueda([]);
    setVentanaBusqueda(true);
  };

  const handleCloseBusqueda = () => setVentanaBusqueda(false);

  const buscarTareas = () => {
    const filtradas = listaTareas.filter((ingresoTarea) =>
      ingresoTarea.inputTarea.toLowerCase().includes(busqueda.toLowerCase())
    );
    setResultadosBusqueda(filtradas);
  };

  const onSubmit = async (tarea) => {
    try {
      const respuesta = await crearTarea(tarea);

      if (respuesta.status === 201 ) {
        Swal.fire({
          title: "Tarea creada",
          text: `La tarea "${tarea.inputTarea}" fue creada correctamente`,
          icon: "success",
        });
        reset();
        obtenerTareas();
      } else {
        Swal.fire({
          title: "Error",
          text: "No se pudo guardar la tarea",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error en onSubmit:", error);
    }
  };

  return (
    <section>
      <Form
        className="mb-3 shadow p-3 border border-3 border-primary-subtle rounded-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Form.Group className="mb-2 d-flex">
          <Form.Control
            type="text"
            placeholder="Ingresa una tarea"
            {...register("inputTarea", {
              required: "La tarea es un dato obligatorio",
              minLength: {
                value: 3,
                message: "La tarea debe tener 3 caracteres como mínimo",
              },
              maxLength: {
                value: 50,
                message: "La tarea debe tener 50 caracteres como máximo",
              },
            })}
          />
          <div className="d-md-flex text-end">
            <Button type="submit" variant="primary" className="mb-1 mx-md-2">
              Guardar
            </Button>
            <Button
              type="button"
              variant="success"
              onClick={handleShowBusqueda}
            >
              Buscar
            </Button>
          </div>
        </Form.Group>
        <Form.Text className="text-danger">
          {errors.inputTarea?.message}
        </Form.Text>
      </Form>
      <ListaTareas tareaProps={listaTareas} obtenerTareas={obtenerTareas} />

      <Modal show={ventanaBusqueda} onHide={handleCloseBusqueda}>
        <Modal.Header closeButton>
          <Modal.Title>Buscar Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Ingrese tarea a buscar"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            autoFocus
          />
          <ListGroup className="mt-3">
            {resultadosBusqueda.length > 0 ? (
              resultadosBusqueda.map((term, fila) => (
                <ListGroup.Item key={term._id}>
                  {fila + 1} - {term.inputTarea}
                </ListGroup.Item>
              ))
            ) : (
              <div className="text-muted mt-2">No se encontraron tareas</div>
            )}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseBusqueda}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={buscarTareas}>
            Buscar
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default FormularioTarea;
