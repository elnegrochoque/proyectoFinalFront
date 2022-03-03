import React from "react";
import { useParams, withRouter } from "react-router-dom";
import Header from "../Header";
import LeftNavbar from "../LeftNavbar";
import { useState, useEffect } from "react";
import {
  Form,
  Button,
  Col,
  Row,
  Alert,
  Card,
  Container,
} from "react-bootstrap";
import styles from "../../styles/Home.module.css";
import { Table } from "react-bootstrap";
const PrincipalProfesor = () => {
  const [profesor, setProfesor] = useState();
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
  const profesorInfo = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "http://localhost:4000/api/sistemadeevaluaciones/personas/" + id,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setProfesor(result);
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    profesorInfo();
  }, []);
  return (
    <div className={styles.container}>   
      
       

        <div className={styles.container}>
        <LeftNavbar props={id}></LeftNavbar>
        <Header></Header>
        
          <div className={styles.contentcontainer}>
            <Card className="m-2" style={{ width: "50rem" }} bg="Light" >
              <Card.Header >
                <h1>Datos del profesor</h1>
              </Card.Header>

              <Card.Body className="card-body">
                {profesor == undefined ? null : (
                  <Table striped bordered hover>
                    <tbody>
                    <tr>
                        <td>Apellido:</td>
                        <td>{profesor.apellidoPersona}</td>
                      </tr>
                      <tr>
                        <td>Nombre:</td>
                        <td>{profesor.nombrePersona}</td>
                      </tr>
                      <tr>
                        <td>Codigo Profesor:</td>
                        <td>{profesor.UIPersona}</td>
                      </tr>

                      <tr>
                        <td>Email:</td>
                        <td>{profesor.emailPersona}</td>
                      </tr>
                      <tr>
                        <td>DNI:</td>
                        <td>{profesor.DNIPersona}</td>
                      </tr>
                      <tr>
                        <td>Tipo de usuario:</td>
                        <td>{profesor.tipo}</td>
                      </tr>
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          </div>
        </div>
      
    </div>
  );
};

export default withRouter(PrincipalProfesor);
