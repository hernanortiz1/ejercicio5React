import { Form, Button } from "react-bootstrap";
import ListaTareas from "./ListaTareas";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const FormularioTarea = () => {
  const [tarea, setTarea] = useState("");

  const tareasLocalStorage =
    JSON.parse(localStorage.getItem("listaTareas")) || [];
  const [tareas, setTareas] = useState(tareasLocalStorage);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    console.log("desde use effect");

    localStorage.setItem("listaTareas", JSON.stringify(tareas));
  }, [tareas]);

  const agregarTareas = (datos) => {
    setTareas([...tareas, datos.inputTarea]);

    reset();
  };

  const borrarTarea = (nombreTarea) => {
    const indice = tareas.findIndex((item) => item === nombreTarea);

    if (indice !== -1) {
      const nuevasTareas = [...tareas];

      nuevasTareas.splice(indice, 1);
      setTareas(nuevasTareas);
    }
  };

  return (
     <section>
      <Form onSubmit={handleSubmit(agregarTareas)} className="mb-3 shadow p-3 border border-3 border-primary-subtle rounded-3">
        <Form.Group className="mb-2 d-flex">
          <Form.Control
            type="text"
            placeholder="Ingresa una tarea"
            onChange={(e) => setTarea(e.target.value)}
            {...register("inputTarea", {
              required: "La tarea es un dato obligatorio",
              minLength: {
                value: 3,
                message: "La tarea debe tener 3 caracteres como minimo ",
              },
              maxLength: {
                value: 50,
                message: "La tarea debe tener 50 caracteres como máximo",
              },
            })}
          />
          <Button type="submit" variant="primary" className="ms-3">
            Enviar
          </Button>
        </Form.Group>
        <Form.Text className="text-danger">
          {errors.inputTarea?.message}
        </Form.Text>
      </Form>
      <ListaTareas tareaProps={tareas} borrarTareaProps={borrarTarea} />
    </section>
  );
};

export default FormularioTarea;
