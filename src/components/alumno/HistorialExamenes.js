import React, { Fragment, useState, useEffect } from "react";
import { Row, Col, Table, Container, Card, Button} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Header from "../HeaderAlumno";
import LeftNavbar from "../LeftNavbarAlumno";
import styles from "../../styles/Home.module.css";
import depositoLocal from "../depositoLocal";
import { getEvaluacion, getEvaluacionesAlumno } from "./apiEvaluacion";
import { getCatedra } from "./apiCatedra";
import VerExamen from "./VerExamen";

const HistorialExamenes = () => {
  const _depositoLocal = depositoLocal.obtenerServicio();
  const idPersona = _depositoLocal.obtenerIdPersona();
  const [evaluaciones, setEvaluaciones] = useState();

  useEffect(() => {
    obtenerDatosTabla();
  }, []);
  const obtenerDatosTabla = async () => {
    const datosTabla = [];
    const evaluacionesAux = await getEvaluacionesAlumno(idPersona);

    for (let i = 0; i < evaluacionesAux.length; i++) {
      const nombreEvaluacion = await getEvaluacion(
        evaluacionesAux[i].IDEvaluacion
      );
      const nombreMateriaAux = await getCatedra(
        nombreEvaluacion.materiaEvaluacion
      );

      const itemDatoTabla = {
        nombreMateria: nombreMateriaAux.materiaCatedra,
        nombreEvaluacion:  nombreEvaluacion.nombreEvaluacion,
        nota:evaluacionesAux[i].NotaEvaluacion,
        id:evaluacionesAux[i]._id      };
      datosTabla.push(itemDatoTabla)
    }
    console.log(datosTabla)
    setEvaluaciones(datosTabla)
  };
  const verEvaluacion =(e)=>{
    e.preventDefault();
    console.log(e.target.id)
    window.location.href="/alumnohistorial/"+e.target.id
  }
  return (
    <Fragment>
      <div className={styles.Container}>
        <div className={styles.container}>
          <LeftNavbar props={idPersona}></LeftNavbar>
          <Header></Header>
          <div className={styles.contentcontainer}>
            <Card className="m-2" bg="Light" style={{ width: "70rem" }}>
              <Card.Header>
                <h1> Historial Evaluaciones</h1>
              </Card.Header>

              <Card.Body>
                <Row className="m-5" style={{ width: "50rem" }}>
                  <Col>
                    <h3 className=" font-weight-bold">Evaluaciones</h3>
                  </Col>

                  <Table striped bordered hover size="sm" className="my-4">
                    <thead>
                      <tr>
                        <th>Materia</th>
                        <th>Nombre Evaluacion</th>
                        <th>Nota</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody key="tbody">
                    {evaluaciones == undefined
                      ? null
                      : evaluaciones.map((catedra) => (
                          <tr key={catedra.id}>
                            <td>{catedra.nombreMateria}</td>
                            <td>{catedra.nombreEvaluacion}</td>
                            <td>
                             {catedra.nota}
                            </td>
                            <td className="text-center">
                              <Button
                                className="mx-3 "
                                variant="btn btn-dark"
                                id={catedra.id}
                                onClick={(e)=>verEvaluacion(e)}
                              >VER
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

export default HistorialExamenes;
