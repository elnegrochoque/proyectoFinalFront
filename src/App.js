import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Inicio from "./components/Inicio";
import InicioEval from './components/alumno/InicioEval';
import Navegacion from './components/common/Navegacion';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Inicio></Inicio>
        </Route>
        <div>
          <Navegacion></Navegacion>
        <Route exact path="/alumno">
          <InicioEval></InicioEval>
        </Route>
        </div>
      </Switch>

    </Router>
  );
}

export default App;
