import React, { Fragment, useState, useEffect } from "react";
import {
  Row,
  Col,
  Table,
  Container,
  Card,
  Button,
  Image,
  Form,
  InputGroup,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import Header from "../HeaderAlumno";
import LeftNavbar from "../LeftNavbarAlumno";
import styles from "../../styles/Home.module.css";
import depositoLocal from "../depositoLocal";
import {
  getEvaluacion,
  getEvaluacionesAlumno,
  getPregunta,
  getPreguntasEvaluacion,
} from "./apiEvaluacion";
import { getCatedra } from "./apiCatedra";
import { getResultado } from "../profesor/apiObtenerResultado";
const VerExamen = () => {
  const _depositoLocal = depositoLocal.obtenerServicio();
  const idPersona = _depositoLocal.obtenerIdPersona();
  const [evaluacion, setEvaluacion] = useState();
  const [nota, setNota] = useState();
  const [srcFoto, setSrcFoto] = useState();
  const { idExamen } = useParams();
  useEffect(() => {
    obtenerDatos();
  }, []);
  const obtenerDatos = async () => {
    const evaluacionAux = await getResultado(idExamen);
   
    setSrcFoto("http://localhost:4000/files/" + evaluacionAux.Foto);
    setNota(evaluacionAux.NotaEvaluacion);
    const respuestasAux = await getPreguntasEvaluacion(idExamen);

    const datosPregunta = [];
    for (let i = 0; i < respuestasAux.length; i++) {
      const preguntaAux = await getPregunta(respuestasAux[i].IDPregunta);
     
      let desarrollo = false;
      if (
        preguntaAux.opcion1CorrectaPregunta == false &&
        preguntaAux.opcion2CorrectaPregunta == false &&
        preguntaAux.opcion3CorrectaPregunta == false &&
        preguntaAux.opcion4CorrectaPregunta == false
      ) {
        desarrollo = true;
      }
      const itemDatosPregunta = {
        desarrollo: desarrollo,
        enunciado: preguntaAux.enunciadoPregunta,
        opcion1pregunta: preguntaAux.opcion1Pregunta,
        opcion2pregunta: preguntaAux.opcion2Pregunta,
        opcion3pregunta: preguntaAux.opcion3Pregunta,
        opcion4pregunta: preguntaAux.opcion4Pregunta,
        respuestaOpcion1pregunta: respuestasAux[i].opcion1CorrectaRespuesta,
        respuestaOpcion2pregunta: respuestasAux[i].opcion2CorrectaRespuesta,
        respuestaOpcion3pregunta: respuestasAux[i].opcion3CorrectaRespuesta,
        respuestaOpcion4pregunta: respuestasAux[i].opcion4CorrectaRespuesta,
        respuestasDesarrollo: respuestasAux[i].desarrollo,
      };
      datosPregunta.push(itemDatosPregunta);
    }
    setEvaluacion(datosPregunta);
  };
  return (
    <Fragment>
      <div className={styles.Container}>
        <div className={styles.container}>
          <LeftNavbar props={idPersona}></LeftNavbar>
          <Header></Header>
          <div className={styles.contentcontainer}>
            <Card className="m-2" bg="Light" style={{ width: "50rem" }}>
              <Card.Header>
                <h1>Ver Evaluacion</h1>
              </Card.Header>

              <Card.Body>
                <Container className="text-center ">
                  <div>
                    <h3>Nota: {nota}</h3>
                  </div>
                </Container>
                <Container className="text-center mt-2">
                  <Image src={srcFoto} alt="no hay foto"></Image>
                </Container>
                <Container className="m-5">
                  <Fragment>
                    <Container className="my-5">
                      {evaluacion == undefined
                        ? null
                        : evaluacion.map((pregunta) => (
                            <Card className="m-5" border="dark">
                              <Card.Header
                                className="text-center"
                                style={{ fontSize: "40px" }}
                              >
                                {pregunta.enunciado}
                              </Card.Header>
                              <Card.Body>
                                <Form>
                                  {pregunta.desarrollo ? (
                                    <Card>
                                      <Card.Body border="secondary">
                                        {pregunta.respuestasDesarrollo}
                                      </Card.Body>
                                    </Card>
                                  ) : null}
                                  {pregunta.opcion1pregunta == "" ? null : (
                                    <InputGroup className="mb-3" size="lg">
                                      <InputGroup.Checkbox
                                        id="opcion1CorrectaRespuesta"
                                        defaultChecked={
                                          pregunta.respuestaOpcion1pregunta
                                        }
                                      />
                                      <Form.Control
                                        className=" mx-4"
                                        plaintext
                                        readOnly
                                        defaultValue={pregunta.opcion1pregunta}
                                      />
                                    </InputGroup>
                                  )}{pregunta.opcion2pregunta == "" ? null : (
                                    <InputGroup className="mb-3" size="lg">
                                      <InputGroup.Checkbox
                                        id="opcion2CorrectaRespuesta"
                                        defaultChecked={
                                          pregunta.respuestaOpcion2pregunta
                                        }
                                      />
                                      <Form.Control
                                        className=" mx-4"
                                        plaintext
                                        readOnly
                                        defaultValue={pregunta.opcion2pregunta}
                                      />
                                    </InputGroup>
                                  )}{pregunta.opcion3pregunta == "" ? null : (
                                    <InputGroup className="mb-3" size="lg">
                                      <InputGroup.Checkbox
                                        id="opcion3CorrectaRespuesta"
                                        defaultChecked={
                                          pregunta.respuestaOpcion3pregunta
                                        }
                                      />
                                      <Form.Control
                                        className=" mx-4"
                                        plaintext
                                        readOnly
                                        defaultValue={pregunta.opcion3pregunta}
                                      />
                                    </InputGroup>
                                  )}
                                  {pregunta.opcion4pregunta == "" ? null : (
                                    <InputGroup className="mb-3" size="lg">
                                      <InputGroup.Checkbox
                                        id="opcion4CorrectaRespuesta"
                                        defaultChecked={
                                          pregunta.respuestaOpcion4pregunta
                                        }
                                      />
                                      <Form.Control
                                        className=" mx-4"
                                        plaintext
                                        readOnly
                                        defaultValue={pregunta.opcion4pregunta}
                                      />
                                    </InputGroup>
                                  )}
                                </Form>{" "}
                              </Card.Body>{" "}
                            </Card>
                          ))}
                    </Container>
                  </Fragment>
                  {/* {preguntas.map((preguntas) => (
                    <ItemVerEvaluacion
                      respuestas={respuestas}
                      preguntas={preguntas}
                    ></ItemVerEvaluacion>
                  ))} */}
                </Container>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default VerExamen;
