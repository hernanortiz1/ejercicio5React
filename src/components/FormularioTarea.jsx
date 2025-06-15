import { Form, Button } from "react-bootstrap";
import ListaTareas from "./ListaTareas";
import { useState } from "react";

const FormularioTarea = () => {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);

const handleSubmit=(e)=>{
  e.preventDefault();
  console.log("guardar tarea")
}

  return (
    <section>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 d-flex">
          <Form.Control
            type="text"
            placeholder="Ingresa una tarea"
            onChange={(e) => setTarea(e.target.value)}
            value={tarea}
          />
          <Button type="submit" variant="info" className="ms-3">
            Enviar
          </Button>
        </Form.Group>
      </Form>
      <ListaTareas />
    </section>
  );
};

export default FormularioTarea;
