import { useState } from "react"
import FormPersona from "./pages/personas/FormPersona";
import ListaPersonas from "./pages/personas/ListaPersonas";
import FormMovie from "./pages/movies/FormMovie";
import ListaMovies from "./pages/movies/ListaMovies";

const App = () => {
  const [nombre, setNombre] = useState('');
  return (
    <div>
      <h1>Hello world</h1>
      <div>
        <input onChange={(e) => {
          setNombre(e.target.value);
        }} type="text" placeholder="Ingrese su nombre..." />
      </div>
      <div>Mi nombre es: {nombre}</div>
    </div>
  )
}

export default App
