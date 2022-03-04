import React, { Fragment, useState, useEffect } from "react";
import Header from "../HeaderAdministrador";
import LeftNavbar from "../LeftNavbarAdministrador";
import styles from "../../styles/Home.module.css";
import { Button, Row, Col, Table, Container, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import Swal from "sweetalert2";
import {
  deleteidAlumnoidCatedra,
  getCatedras,
  getInscripto,
  postAlumnoCatedra,
} from "../alumno/apiCatedra";
import { getPersona } from "../administrador/apiNuevaCatedra";
import depositoLocal from "../depositoLocal";
const Aulas = () => {
  const [catedras, setCatedras] = useState();
  const [flagUpdate, setFlagUpdate] = useState(false);
  const _depositoLocal = depositoLocal.obtenerServicio();
  const evaluaciones = [{}];

  const idPersona = _depositoLocal.obtenerIdPersona();

  useEffect(async () => {
    const catedrasAux = await getCatedras();
    const catedraProfesor = [];
    console.log(catedrasAux);
    for (let i = 0; i < catedrasAux.length; i++) {
      const persona = await getPersona(catedrasAux[i].idProfesor);
      const inscripto = await getInscripto(idPersona, catedrasAux[i]._id);

      const itemCatedra = {
        catedra: catedrasAux[i].nombreCatedra,
        materia: catedrasAux[i].materiaCatedra,
        id: catedrasAux[i]._id,
        nombreProfesor: persona[0].nombrePersona,
        apellidoProfesor: persona[0].apellidoPersona,
        inscripto: inscripto.existe,
      };
      catedraProfesor.push(itemCatedra);
    }
    setCatedras(catedraProfesor);
    console.log(catedraProfesor);
  }, [flagUpdate]);
  const nuevaAula = async (e) => {
    e.preventDefault();
    window.location.href="/admin/crearaula"
  };
  const baja = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Esta seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Dar de baja",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Dado de baja", "Se a dado de baja con exito", "success");
        deleteidAlumnoidCatedra(e.target.id, idPersona);
        setFlagUpdate(!flagUpdate);
      }
    });
  };
  return (
    <div className={styles.Container}>
      <LeftNavbar props={idPersona}></LeftNavbar>
      <Header></Header>
      <div className={styles.contentcontainer}>
        <div className={styles.contentwrapper}>
          <Card className="m-2" bg="Light" style={{ width: "70rem" }}>
            <Card.Header>
              <h1> Catedras</h1>
            </Card.Header>

            <Card.Body>
             
              <Row className="m-5" style={{ width: "50rem" }}>
              <Button
              
                variant="secondary"
                onClick={(e) => nuevaAula(e)}
              >
               Crear Aula
              </Button>
                <Table striped bordered hover size="sm" className="my-4">
                  <thead>
                    <tr>
                      <th>Catedra</th>
                      <th>Materia</th>
                      <th>Profesor</th>
                      <th className="text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody key="tbody">
                    {catedras == undefined
                      ? null
                      : catedras.map((catedra) => (
                          <tr key={catedra.id}>
                            <td>{catedra.catedra}</td>
                            <td>{catedra.materia}</td>
                            <td>
                              {catedra.apellidoProfesor +
                                " " +
                                catedra.nombreProfesor}
                            </td>
                            <td className="text-center">
                              <Button
                                className="mx-3 "
                                variant="btn btn-dark"
                                id={catedra.id}
                                onClick={(e) => baja(e)}
                              >
                                Eliminar Aula
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
  );
};

export default Aulas;
