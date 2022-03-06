import React, { Fragment, useState, useEffect } from "react";
import { Button, Row, Col, Table, Container, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import depositoLocal from "../depositoLocal";
import styles from "../../styles/Home.module.css";
import {
  deleteidAlumnoidCatedra,
  getCatedra,
  getCatedras,
  getPersonaConIdCatedra,
} from "../alumno/apiCatedra";
import { getPersona, getPersonaId } from "../administrador/apiNuevaCatedra";
import Header from "../Header";
import LeftNavbar from "../LeftNavbar";
const ProfesorCatedrasInfo = () => {
  const [flagUpdate, setFlagUpdate] = useState(false);
  const [persona, setPersona] = useState();
  const [catedra, setCatedra] = useState();
  const _depositoLocal = depositoLocal.obtenerServicio();
  const idCatedra = _depositoLocal.obtenerIdCatedra();
  const idPersona = _depositoLocal.obtenerIdPersona();
  useEffect(async () => {
    const lista = await getPersonaConIdCatedra(idCatedra);
    const catedraAux = await getCatedra(idCatedra);
    setCatedra(catedraAux);
  
    const alumnos = [];
    for (let i = 0; i < lista.length; i++) {
      const alumno = await getPersonaId(lista[i].idPersona);
      alumnos.push(alumno);
    }
    setPersona(alumnos);
  }, [flagUpdate]);
  const baja = async (e) => {

    e.preventDefault();
    Swal.fire({
      title: "Esta seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#757575",
      confirmButtonText: "Dar de baja",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          confirmButtonColor: "#000000",
          icon: "success",
          title: "Baja",
          text: "Se ha dado de baja",
        });
        deleteidAlumnoidCatedra(idCatedra, e.target.value);
        setFlagUpdate(!flagUpdate);
      }
    });
  };
  return (
    <Fragment>
      <LeftNavbar props={idPersona}></LeftNavbar>
      <Header></Header>

      <div className={styles.Container}>
        <div className={styles.contentcontainer}>
          <div className={styles.contentwrapper}>
            <Card className="m-2" bg="Light" style={{ width: "70rem" }}>
              <Card.Header>
                {catedra ? (
                  <h1>
                    {" "}
                    {catedra.nombreCatedra} - {catedra.materiaCatedra}
                  </h1>
                ) : null}
              </Card.Header>

              <Card.Body>
                <Row className="m-5" style={{ width: "50rem" }}>
                  <Table striped bordered hover size="sm" className="my-4">
                    <thead>
                      <tr>
                        <th>Apellido</th>
                        <th>Nombre</th>
                        <th>UI</th>

                        <th className="text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody key="tbody">
                      {persona == undefined
                        ? null
                        : persona.map((lista) => (
                            <tr key={lista._id}>
                              <td>{lista.apellidoPersona}</td>
                              <td>{lista.nombrePersona}</td>
                              <td>{lista.UIPersona}</td>
                              <td className="text-center">
                                <Button
                                value={lista._id}
                                  className="mx-3"
                                  variant="btn btn-dark"
                                  onClick={(e) => baja(e)}
                                >
                                  Dar de baja
                                </Button>
                              </td>
                            </tr>
                          ))}
                    </tbody>
                  </Table>
                </Row>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfesorCatedrasInfo;
