import { Form, Button } from "react-bootstrap";
import ListaTareas from "./ListaTareas";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { leerTareas } from "../helpers/queries.js";

const FormularioTarea = () => {
  const [listaTareas, setListaTareas] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const obetenerTareas = async () => {
    const respuesta = await leerTareas();
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      setListaTareas(datos);
    } else {
      console.info("Error al buscar un tarea");
    }
  };

  useEffect(() => {
    obetenerTareas();
  }, []);

  return (
    <section>
      <Form className="mb-3 shadow p-3 border border-3 border-primary-subtle rounded-3">
        <Form.Group className="mb-2 d-flex">
          <Form.Control
            type="text"
            placeholder="Ingresa una tarea"
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
      <ListaTareas tareaProps={listaTareas} />
    </section>
  );
};

export default FormularioTarea;
