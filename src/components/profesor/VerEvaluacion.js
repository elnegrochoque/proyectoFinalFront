import React, { useState, useEffect, Fragment } from "react";
import { Button, Container, Card, Image } from "react-bootstrap";
import Header from "../Header";
import LeftNavbar from "../LeftNavbar";
import styles from "../../styles/Home.module.css";

import { useParams } from "react-router-dom";
import ItemVerEvaluacion from "./ItemVerEvaluacion";
const VerEvaluacion = () => {
  const { idResultado } = useParams();
  const URL =
    process.env.REACT_APP_API_URL + "respuestas/resultados/" + idResultado;
  const [respuestas, setRespuestas] = useState([]);
  const [foto, setFoto] = useState();
  useEffect(() => {
    consultarAPI();
  }, []);
  const [preguntas, setPreguntas] = useState([]);
  const consultarAPI = async () => {
    try {
      const consulta = await fetch(URL);
      const respuesta = await consulta.json();
      setRespuestas(respuesta);
      const URLaux =
        process.env.REACT_APP_API_URL +
        "resultados/" +
        respuesta[0].IDResultado;
      console.log(URLaux);
      const consultaResultados = await fetch(URLaux);
      const respuestaResultados = await consultaResultados.json();
      console.log("respuestas/resultados", await respuestaResultados);
      setFoto("http://localhost:4000/files/" + respuestaResultados.Foto);
      console.log(foto);
      let preguntasAux = [];
      for (const i in respuesta) {
        const URLPregunta =
          process.env.REACT_APP_API_URL +
          "preguntas/respuesta/" +
          respuesta[i].IDPregunta;
        const consultaPregunta = await fetch(URLPregunta);
        const respuestaPregunta = await consultaPregunta.json();

        preguntasAux.push(respuestaPregunta);
      }
      console.log(preguntasAux);

      setPreguntas(preguntasAux);
    } catch (error) {
      console.log(error);
    }
  };
  const atras = (e) => {
    e.preventDefault();
    window.history.back();
  };
  return (
    <Fragment>
      <div className={styles.Container}>      

        <div className={styles.container}>
        <LeftNavbar props={idResultado}></LeftNavbar>
        <Header></Header>
          <div className={styles.contentcontainer}>
            <Card className="m-2" bg="Light" style={{ width: "50rem" }}>
              <Card.Header>
                <h1>Ver Evaluacion</h1>
              </Card.Header>

              <Card.Body>
                <Container className="text-center ">
                  <Button onClick={atras} className="text-center">
                    atras
                  </Button>
               
                </Container>
                <Container className="text-center mt-2">
                <Image  src={foto} alt="no hay foto"></Image>
                  
                </Container>
                <Container className="m-5">
                  {preguntas.map((preguntas) => (
                    <ItemVerEvaluacion
                      respuestas={respuestas}
                      preguntas={preguntas}
                    ></ItemVerEvaluacion>
                  ))}
                </Container>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default VerEvaluacion;
