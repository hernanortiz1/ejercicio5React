import "bootstrap/dist/css/bootstrap.min.css";
import FormularioTarea from "./components/FormularioTarea"


function App() {
  return (
    <>
      <main className="container my-4">
        <h1 className="text-center">Lista de tareas</h1>
        <FormularioTarea/>
      </main>
      <footer className="bg-dark text-light text-center py-3">&copy; Todos los derechos reservados</footer>
    </>
  );
}

export default App;
