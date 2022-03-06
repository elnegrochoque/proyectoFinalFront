import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Inicio from "./components/Inicio";
import InicioEval from "./components/alumno/InicioEval";
import Navegacion from "./components/common/Navegacion";
import Admin from "./components/administrador/Admin";
import { useState, useEffect } from "react";
import NuevoUsuario from "./components/nuevoUsuario/NuevoUsuario";
import NuevoUsuarioAdmin from "./components/administrador/NuevoUsuarioAdmin";
import EditarPersona from "./components/administrador/EditarPersona";
import PrincipalProfesor from "./components/profesor/PrincipalProfesor";
import CrearEvaluacion from "./components/profesor/CrearEvaluacion";
import EvaluacionNuevaProfesor from "./components/profesor/EvaluacionNuevaProfesor";
import ModificarEvaluacion from "./components/profesor/ModificarEvaluacion";
import EditarEvaluacion from "./components/profesor/EditarEvaluacion";
import EvaluacionAlumno from "./components/alumno/EvaluacionAlumno";
import PreguntaAlumno from "./components/alumno/PreguntaAlumno";
import FinEvaluacion from "./components/alumno/FinEvaluacion";
import Historial from "./components/profesor/Historial";
import HistorialEvaluacionesRealizadas from "./components/profesor/HistorialEvaluacionesRealizadas";
import VerEvaluacion from "./components/profesor/VerEvaluacion";
import PrincipalAlumno from "./components/alumno/PrincipalAlumno";
import NuevaCatedra from "./components/administrador/NuevaCatedra.js";
import InscripcionCatedra from "./components/alumno/InscripcionCatedra";
import Catedras from "./components/profesor/Catedras";
import ProfesorCatedrasInfo from "./components/profesor/ProfesorCatedrasInfo";
import Aulas from "./components/administrador/Aulas";
import depositoLocal from "./components/depositoLocal"
import { putEntrar } from "./components/apiSesion";
import HistorialExamenes from "./components/alumno/HistorialExamenes";
import VerExamen from "./components/alumno/VerExamen";
function App() {
  const _depositoLocal = depositoLocal.obtenerServicio();
          
  const idPersona = _depositoLocal.obtenerIdPersona();
  if (idPersona==null||idPersona=="null"||idPersona=="undefined"||idPersona==undefined) {
    
  }else{
    putEntrar(idPersona)
  }
  const URL = process.env.REACT_APP_API_URL + "personas";
  const [personas, setPersonas] = useState([]);
  useEffect(() => {
    consultarAPI();
  }, []);

  const consultarAPI = async () => {
    try {
      const consulta = await fetch(URL);
      const respuesta = await consulta.json();
      setPersonas(respuesta);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Inicio personas={personas} consultarAPI={consultarAPI}></Inicio>
        </Route>
        <Route exact path="/nuevoUsuario">
          <NuevoUsuario
            personas={personas}
            consultarAPI={consultarAPI}
          ></NuevoUsuario>
        </Route>
        <Route exact path="/alumno/:id">
          <InicioEval></InicioEval>
        </Route>
        <Route exact path="/alumno/:idAlumno/evaluacion/:idEvaluacion">
          <EvaluacionAlumno></EvaluacionAlumno>
        </Route>
        <Route
          exact
          path="/alumno/:idAlumno/evaluacion/:idEvaluacion/pregunta/:totalPreguntas/:numeroPregunta"
        >
          
          <PreguntaAlumno></PreguntaAlumno>
        </Route>
        <Route
          exact
          path="/alumno/:idAlumno/evaluacion/:idEvaluacion/pregunta/:totalPreguntas/:numeroPregunta/finevaluacion"
        >
          
          <FinEvaluacion></FinEvaluacion>
        </Route>
        <Route exact path="/profesor/:id">
          <PrincipalProfesor
            personas={personas}
            consultarAPI={consultarAPI}
          ></PrincipalProfesor>
        </Route>
        <Route exact path="/profesor/:id/crearevaluacion">
          <CrearEvaluacion></CrearEvaluacion>
        </Route>
        <Route exact path="/profesor/:id/crearevaluacion/:id">
          
          <EvaluacionNuevaProfesor></EvaluacionNuevaProfesor>
        </Route>
        <Route exact path="/profesor/:id/modificarevaluaciones">
          <ModificarEvaluacion></ModificarEvaluacion>
        </Route>
        <Route exact path="/profesor/:id/modificarevaluaciones/editar/:id">
          
          <EditarEvaluacion></EditarEvaluacion>
        </Route>
        <Route exact path="/profesor/:idProfesor/historial">
          <Historial></Historial>
        </Route>
        <Route exact path="/profesor/:idProfesor/historial/:idEvaluacion">
          
          <HistorialEvaluacionesRealizadas></HistorialEvaluacionesRealizadas>
        </Route>
        <Route
          exact
          path="/profesor/:idProfesor/historial/:idEvaluacion/:idResultado"
        >
          
          <VerEvaluacion></VerEvaluacion>
        </Route>
        <Route exact path="/administrador/:id">
          
          <Admin personas={personas} consultarAPI={consultarAPI}></Admin>
        </Route>
        <Route exact path="/administrador/:id/editar/:id">
         
          <EditarPersona
            personas={personas}
            consultarAPI={consultarAPI}
          ></EditarPersona>
        </Route>
        <Route exact path="/administrador/:id/nuevousuarioadmin">
         
          <NuevoUsuarioAdmin
            personas={personas}
            consultarAPI={consultarAPI}
          ></NuevoUsuarioAdmin>
        </Route>
        <Route exact path="/alumnoprincipal/:id">
          <PrincipalAlumno></PrincipalAlumno>
        </Route>

        <Route exact path="/admin/crearaula">
          <NuevaCatedra></NuevaCatedra>
        </Route>
        <Route exact path="/admin/aula">
    <Aulas></Aulas>
        </Route>
        <Route exact path="/alumnoinscripcion">
          <InscripcionCatedra></InscripcionCatedra>
        </Route>
        <Route exact path="/profecatedra">
          <Catedras></Catedras>
        </Route>
        <Route exact path="/profecatedra/ver">
          <ProfesorCatedrasInfo></ProfesorCatedrasInfo>
        </Route>
        <Route exact path="/alumnohistorial">
          <HistorialExamenes></HistorialExamenes>
        </Route>
        <Route exact path="/alumnohistorial/:idExamen">
          <VerExamen></VerExamen>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
