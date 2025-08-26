import { Form, Button } from "react-bootstrap";
import ListaTareas from "./ListaTareas";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { leerTareas, editarTarea, crearTarea } from "../helpers/queries.js";
import Swal from "sweetalert2";

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


  const onSubmit = async (tarea) => {
    console.log("Tarea a enviar:", tarea);
    try {
      const respuesta = await crearTarea(tarea);
     

      if (respuesta && (respuesta.status === 201 || respuesta.status === 200)) {
        Swal.fire({
          title: "Tarea creada",
          text: `La tarea "${tarea.inputTarea}" fue creada correctamente`,
          icon: "success",
        });
        reset();
        obetenerTareas(); 
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
            <Button type="button" variant="success" onClick={obetenerTareas}>
              Buscar
            </Button>
          </div>
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
