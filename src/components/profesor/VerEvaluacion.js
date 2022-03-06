import React, { useState, useEffect, Fragment } from "react";
import { Button, Container, Card, Image, Row } from "react-bootstrap";
import Header from "../Header";
import LeftNavbar from "../LeftNavbar";
import styles from "../../styles/Home.module.css";
import { getResultado } from "./apiObtenerResultado";
import { useParams } from "react-router-dom";
import ItemVerEvaluacion from "./ItemVerEvaluacion";
import Swal from "sweetalert2";
import { putCambiarNota } from "./apiCambiarNota";
const VerEvaluacion = () => {
  const { idResultado } = useParams();
  const URL =
    process.env.REACT_APP_API_URL + "respuestas/resultados/" + idResultado;
  const [respuestas, setRespuestas] = useState([]);
  const [foto, setFoto] = useState();
  const [preguntas, setPreguntas] = useState([]);
  const [nota, setNota] = useState();
  const [flagNota, setFlagNota] = useState(false);
  useEffect(() => {
    consultarAPI();
    consultarResultado();
  }, [flagNota]);
  const consultarResultado = async () => {
    const consultarResultadoAux = await getResultado(idResultado);
    setNota(consultarResultadoAux.NotaEvaluacion);
  };
  const consultarAPI = async () => {
    try {
      const consulta = await fetch(URL);
      const respuesta = await consulta.json();
      setRespuestas(respuesta);
      const URLaux =
        process.env.REACT_APP_API_URL +
        "resultados/" +
        respuesta[0].IDResultado;
      const consultaResultados = await fetch(URLaux);
      const respuestaResultados = await consultaResultados.json();
      setFoto("http://localhost:4000/files/" + respuestaResultados.Foto);

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

      setPreguntas(preguntasAux);
    } catch (error) {
      console.log(error);
    }
  };
  const cambiarNota = async (e) => {
    e.preventDefault();


    const { value: ipAddress } = await Swal.fire({
      title: "Nueva Nota",
      input: "number",
      inputLabel: "",
      inputValue: nota,
      showCancelButton: true,
      confirmButtonColor: "#000000",
      inputValidator: async (value) => {
        if (!value) {
          return "Necesita poner un numero";
        } else {
          const cambiarNotaAlumno = await putCambiarNota(idResultado, value);
          setNota(nota);
        }
      },
    });

    if (ipAddress) {
      Swal.fire({  confirmButtonColor: "#000000",title: "Nota actualizada"});
    }
    setFlagNota(!flagNota)
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
                  <div>
                    <h3>
                      Nota: {nota}{" "}
                      <Button onClick={(e) => cambiarNota(e)} variant="secondary">
                        Cambiar nota
                      </Button>
                    </h3>
                  </div>
                </Container>
                <Container className="text-center mt-2">
                  <Image src={foto} alt="no hay foto"></Image>
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
