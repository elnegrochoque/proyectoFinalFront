import React, { Fragment, useState, useEffect } from "react";
import {
  Row,
  Col,
  Table,
  Container,
  Card,
  Button,
  Image,
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
  const [evalucion, setEvaluacion] = useState();
  const [nota, setNota] = useState();
  const [srcFoto, setSrcFoto] = useState();
  const { idExamen } = useParams();
  console.log(idExamen);
  useEffect(() => {
    obtenerDatos();
  }, []);
  const obtenerDatos = async () => {
    const evaluacionAux = await getResultado(idExamen);
    console.log(evaluacionAux);
    setSrcFoto("http://localhost:4000/files/" + evaluacionAux.Foto);
    setNota(evaluacionAux.NotaEvaluacion);
    const respuestasAux = await getPreguntasEvaluacion(idExamen);
    console.log(respuestasAux);
    const datosPregunta = [];
    for (let i = 0; i < respuestasAux.length; i++) {
      const preguntaAux = await getPregunta(respuestasAux[i].IDPregunta);
      console.log("preguntaAux", preguntaAux);
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
        enunciado: preguntaAux.enunciado,
        opcion1pregunta: preguntaAux.opcion1Pregunta,
        opcion2pregunta: preguntaAux.opcion2Pregunta,
        opcion3pregunta: preguntaAux.opcion3Pregunta,
        opcion4pregunta: preguntaAux.opcion4Pregunta,
        respuestaOpcion1pregunta: respuestasAux[i].opcion1CorrectaRespuesta,
        respuestaOpcion2pregunta: respuestasAux[i].opcion2CorrectaRespuesta,
        respuestaOpcion3pregunta: respuestasAux[i].opcion3CorrectaRespuesta,
        respuestaOpcion4pregunta: respuestasAux[i].opcion4CorrectaRespuesta,
        respuestasDesarrollo: respuestasAux[i].desarrollo
      };
      datosPregunta.push(itemDatosPregunta)
    }
    console.log(datosPregunta)
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
