import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { Form, Button, Col, Row, Alert, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import Header from "../HeaderAlumno";
import LeftNavbar from "../LeftNavbarAlumno";
import styles from "../../styles/Home.module.css";
import { Table } from "react-bootstrap";
const PrincipalAlumno = () => {
  const { id } = useParams();
  const [error, setError] = useState(false);

  const [alumno, setAlumno] = useState();
  const alumnoInfo = () => {
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
        setAlumno(result);
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    alumnoInfo();
  }, []);
  return (
    <Fragment>
      <div className={styles.Container}>
       
        <div className={styles.container}>
        <LeftNavbar props={id}></LeftNavbar>
        <Header></Header>
          <div className={styles.contentcontainer}>
            <Card className="m-2" bg="Light" style={{ width: "50rem" }}>
              <Card.Header>
                <h1>Datos del alumno</h1>
              </Card.Header>

              <Card.Body>
                {alumno == undefined ? null : (
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <td>Apellido:</td>
                        <td>{alumno.apellidoPersona}</td>
                      </tr>
                      <tr>
                        <td>Nombre:</td>
                        <td>{alumno.nombrePersona}</td>
                      </tr>
                      <tr>
                        <td>Codigo Alumno:</td>
                        <td>{alumno.UIPersona}</td>
                      </tr>

                      <tr>
                        <td>Email:</td>
                        <td>{alumno.emailPersona}</td>
                      </tr>
                      <tr>
                        <td>DNI:</td>
                        <td>{alumno.DNIPersona}</td>
                      </tr>
                      <tr>
                        <td>Tipo de usuario:</td>
                        <td>{alumno.tipo}</td>
                      </tr>
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PrincipalAlumno;
