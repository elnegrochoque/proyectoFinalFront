import React from "react";
import Header from "../HeaderAdministrador";
import LeftNavbar from "../LeftNavbarAdministrador";
import styles from "../../styles/Home.module.css";
import {
  Card,
  Table,
  Form,
  Button,
  Col,
  Row,
  Container,
  DropdownButton,
} from "react-bootstrap";
import { useState } from "react";
import { withRouter, useParams } from "react-router-dom";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import Swal from "sweetalert2";
import crearAula from "./apiNuevaCatedra";
import { getPersona } from "./apiNuevaCatedra";
import depositoLocal from "../depositoLocal";
const NuevaCatedra = () => {
  const [nombreCatedra, setNombreCatedra] = useState();
  const [materiaCatedra, setMateriaCatedra] = useState();
  const [profesorCatedra, setProfesorCatedra] = useState();
  const [profesor, setProfesor] = useState(0);
  const [verificado, setVerificado] = useState(false);
  const _depositoLocal = depositoLocal.obtenerServicio();

  const idPersona = _depositoLocal.obtenerIdPersona();
  const crearAulaHandle = async (e) => {
    e.preventDefault();
    if (materiaCatedra == "" || nombreCatedra == "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Completar todos los datos",
      });
    } else {
      const nuevaAula = crearAula(
        nombreCatedra,
        materiaCatedra,
        profesorCatedra
      );
      Swal.fire({
        icon: "success",
        title: "Aula creada",
      });
    }
  };
  const verificarProfesor = async (e) => {
    e.preventDefault();
    const dataProfesor = await getPersona(profesorCatedra);

    if (
      dataProfesor == "no existe" ||
      dataProfesor.mensaje == "error al obtener la Persona" ||
      dataProfesor[0].tipo != "profesor"
    ) {
      setVerificado(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Profesor no existe",
      });
    } else {
      setProfesor(dataProfesor);
      setVerificado(true);
    }
  };
  return (
    <div className={styles.Container}>
      <LeftNavbar props={idPersona}></LeftNavbar>
      <Header></Header>
      <div className={styles.contentcontainer}>
        <div className={styles.contentwrapper}>
          <Card className="m-2" bg="Light" style={{ width: "70rem" }}>
            <Card.Header>
              <h1> Crear Aula</h1>
            </Card.Header>

            <Card.Body>
             
              <Form>
                <Row>
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Nombre de la catedra</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Fisica"
                      onChange={(e) => setNombreCatedra(e.target.value)}
                    />
                  </Form.Group>
                </Row>
                <Form.Group controlId="formGridEmail">
                  <Form.Label>Materia</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Fisica 2"
                    onChange={(e) => setMateriaCatedra(e.target.value)}
                  />
                </Form.Group>
                <Row>
                  <Form.Group as={Col} controlId="formGridAddress1">
                    <Form.Label>Codigo de profesor</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="123456"
                      onChange={(e) => setProfesorCatedra(e.target.value)}
                    />
                  </Form.Group>
                  <div as={Col} className="d-flex align-self-center pt-3">
                    <Button variant="primary" onClick={verificarProfesor}>
                      Verificar Profesor
                    </Button>
                  </div>
                </Row>

                {verificado ? (
                  <div>
                    {" "}
                    <Row>
                      <Card
                        className="m-2"
                        bg="Light"
                        style={{ width: "70rem" }}
                      >
                        <Card.Body>
                          <Table striped bordered hover>
                            <tbody>
                              <tr>
                                <td>Apellido:</td>
                                <td>{profesor[0].apellidoPersona}</td>
                              </tr>
                              <tr>
                                <td>Nombre:</td>
                                <td>{profesor[0].nombrePersona}</td>
                              </tr>
                              <tr>
                                <td>Codigo Profesor:</td>
                                <td>{profesor[0].UIPersona}</td>
                              </tr>

                              <tr>
                                <td>Email:</td>
                                <td>{profesor[0].emailPersona}</td>
                              </tr>
                              <tr>
                                <td>DNI:</td>
                                <td>{profesor[0].DNIPersona}</td>
                              </tr>
                              <tr>
                                <td>Tipo de usuario:</td>
                                <td>{profesor[0].tipo}</td>
                              </tr>
                            </tbody>
                          </Table>
                        </Card.Body>
                      </Card>{" "}
                    </Row>
                    <div className="text-center">
                      <Button
                        variant="primary"
                        onClick={(e) => crearAulaHandle(e)}
                      >
                        Crear aula
                      </Button>
                    </div>
                  </div>
                ) : null}
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NuevaCatedra;
