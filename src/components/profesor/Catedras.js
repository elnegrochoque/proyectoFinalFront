import React, { Fragment, useState, useEffect } from "react";
import { Button, Row, Col, Table, Container, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import depositoLocal from "../depositoLocal";
import styles from "../../styles/Home.module.css";
import {getCatedras} from "../alumno/apiCatedra"
import {getPersona} from "../administrador/apiNuevaCatedra"
import Header from "../Header";
import LeftNavbar from "../LeftNavbar";
const Catedras = () => {
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
      if (persona[0]._id == idPersona) {
        const itemCatedra = {
          catedra: catedrasAux[i].nombreCatedra,
          materia: catedrasAux[i].materiaCatedra,
          id: catedrasAux[i]._id,
        };
        catedraProfesor.push(itemCatedra);
      }
    }
    setCatedras(catedraProfesor);
  }, [flagUpdate]);

  const ver=(e)=>{
e.preventDefault();
console.log(e.target.id)
_depositoLocal.setearIdCatedra(e.target.id);
window.location.href="/profecatedra/ver"
  }

  return (
    <Fragment>
      <LeftNavbar props={idPersona}></LeftNavbar>
      <Header></Header>

      <div className={styles.Container}>
        <div className={styles.contentcontainer}>
          <div className={styles.contentwrapper}>
            <Card className="m-2" bg="Light" style={{ width: "70rem" }}>
              <Card.Header>
                <h1> Catedras</h1>
              </Card.Header>

              <Card.Body>
                <Row className="m-5" style={{ width: "50rem" }}>
                  <Table striped bordered hover size="sm" className="my-4">
                    <thead>
                      <tr>
                        <th>Catedra</th>
                        <th>Materia</th>
                       
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
                             
                           
                                <td className="text-center">
                                  <Button
                                    className="mx-3"
                                    variant="dark"
                                    id={catedra.id}
                                    onClick={(e) => ver(e)}
                                  >
                                    Ver
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

export default Catedras;
