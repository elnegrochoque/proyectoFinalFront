import React from "react";
import { Container, Col, Button } from "react-bootstrap";
import { useParams, withRouter } from "react-router-dom";
import Header from "../Header";
import LeftNavbar from "../LeftNavbar";
const PrincipalProfesor = () => {
  const { id } = useParams();
  const crearEvaluacion = () => {
    const ruta = "/profesor/" + id + "/crearevaluacion";
    window.location.href = ruta;
  };
  const modificarEvaluacion = () => {
    const ruta = "/profesor/" + id + "/modificarevaluaciones";
    window.location.href = ruta;
  };
  const historialEvaluacion = () => {
    const ruta = "/profesor/" + id + "/historial";
    window.location.href = ruta;
  };

  return (
    <div>
      <LeftNavbar props={id}></LeftNavbar>
      <Container className="text-center">
        <Header></Header>

        {/* <Container className="text-center">
        <Col className="mt-5">
          <Button size="lg" onClick={(e) => crearEvaluacion(e)}>
            Crear Evaluacion
          </Button>
        </Col>
        <Col className="mt-5">
          <Button size="lg" onClick={modificarEvaluacion}>
            Modificar Evaluacion
          </Button>
        </Col>
        <Col className="mt-5">
          <Button size="lg" onClick={historialEvaluacion}>
            Historial de Evaluaciones
          </Button>
        </Col>
      </Container> */}
      </Container>
    </div>
  );
};

export default withRouter(PrincipalProfesor);
