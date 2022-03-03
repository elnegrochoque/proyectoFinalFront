import React, { Fragment } from "react";
import { useState } from "react";
import { Form, Button, Col, Row, Alert, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import Header from "../HeaderAlumno";
import LeftNavbar from "../LeftNavbarAlumno";
import styles from "../../styles/Home.module.css";
const InicioEval = () => {
  const { id } = useParams();
  const [codigoEvaluacion, setCodigoEvaluacion] = useState("");
  const [evaluacionAlumno, setEvaluacionAlumno] = useState([]);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    consultarPreguntasEvaluacionAPI();
  };
  const consultarPreguntasEvaluacionAPI = async () => {
    const URL =
      process.env.REACT_APP_API_URL + "evaluaciones/alumno/" + codigoEvaluacion;
    try {
      const consulta = await fetch(URL);
      const respuesta = await consulta.json();
      setEvaluacionAlumno(respuesta);

      if (respuesta === false) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Evaluacion no disponible ",
        });
      }
      if (respuesta === true) {
        console.log("si se puede hacer");
        const ruta = "/alumno/" + id + "/evaluacion/" + codigoEvaluacion;
        window.location.href = ruta;
      }
      if (consulta.status === 404) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Evaluacion no disponible o no existente",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Evaluacion no disponible o no existente",
      });
      console.log(error);
    }
  };
  return (
    <Fragment>
      <div className={styles.Container}>       

        <div className={styles.container}>
        <LeftNavbar props={id}></LeftNavbar>
        <Header></Header>
          <div className={styles.contentcontainer}>
            <Card className="m-2" bg="Light" style={{ width: "50rem" }}>
              <Card.Header>
                <h1>Ingrese a su Evaluacion</h1>
              </Card.Header>

              <Card.Body>
                <Form onSubmit={handleSubmit} className="my-5">
                  {error === true ? (
                    <Alert variant={"danger"}>
                      Todos los campos son obligatorios
                    </Alert>
                  ) : null}
                  <Row className="justify-content-center">
                    <Col lg="8">
                      <Form.Group controlId="formNombre">
                        <Form.Label>Codigo</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Insertar codigo aqui"
                          onChange={(e) => setCodigoEvaluacion(e.target.value)}
                        />
                      </Form.Group>
                      <div className="text-center">
                        <Button
                          variant="primary"
                          type="submit"
                          className="w-25"
                        >
                          Ingresar a la evaluacion
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default InicioEval;
