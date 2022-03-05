import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Button,
  Form,
  Card,
  InputGroup,
  FloatingLabel,
} from "react-bootstrap";
import Header from "../HeaderAlumno";
import LeftNavbar from "../LeftNavbarAlumno";
import styles from "../../styles/Home.module.css";
const PreguntaAlumno = () => {
  const { numeroPregunta } = useParams();
  const { idAlumno } = useParams();
  const { idEvaluacion } = useParams();
  const { totalPreguntas } = useParams();
  const URL =
    process.env.REACT_APP_API_URL +
    "respuestas/" +
    idAlumno +
    "/" +
    idEvaluacion +
    "/" +
    numeroPregunta;
  const [respuestaEvaluacion, setRespuestaEvaluacion] = useState([]);
  const [preguntaEvaluacion, setPreguntaEvaluacion] = useState([]);
  const [libreNavegacion, setLibrenavegacion] = useState();
  const [numeroTotalPreguntas, setNumeroTotalPreguntas] = useState(0);
  const [respuesta1CorrectaRespuesta, setRespuesta1CorrectaRespuesta] =
    useState();
  const [respuesta2CorrectaRespuesta, setRespuesta2CorrectaRespuesta] =
    useState();
  const [respuesta3CorrectaRespuesta, setRespuesta3CorrectaRespuesta] =
    useState();
  const [respuesta4CorrectaRespuesta, setRespuesta4CorrectaRespuesta] =
    useState();
  const [momentoFinEvaluacion, setMomentoFinEvaluacion] = useState(new Date(0));
  const [resultadoEvaluacion, setResultadoEvaluacion] = useState([]);
  const [respuestaDesarrollo, setRespuestaDesarrollo] = useState();
  const ahora = new Date();
  useEffect(() => {
    consultarAPI1();
  }, []);
  const consultarAPI1 = async () => {
    try {
      const consulta = await fetch(URL);
      const respuesta = await consulta.json();
      console.log("respuesta", respuesta);
      setRespuestaEvaluacion(respuesta);
      setRespuesta1CorrectaRespuesta(respuesta[0].opcion1CorrectaRespuesta);
      setRespuesta2CorrectaRespuesta(respuesta[0].opcion2CorrectaRespuesta);
      setRespuesta3CorrectaRespuesta(respuesta[0].opcion3CorrectaRespuesta);
      setRespuesta4CorrectaRespuesta(respuesta[0].opcion4CorrectaRespuesta);
      setRespuestaDesarrollo(respuesta[0].desarrollo);
      const URLResultado =
        process.env.REACT_APP_API_URL +
        "resultados/" +
        respuesta[0].IDResultado;
      const consultaResultado = await fetch(URLResultado);
      const respuestaResultado = await consultaResultado.json();
      setResultadoEvaluacion(respuestaResultado);

      const momentoComienzoEvaluacion = new Date(
        respuesta[0].momentoInicioDeEvaluacionAlumno
      );
      const idPregunta = respuesta[respuesta.length - 1].IDPregunta;
      const URLPregunta =
        process.env.REACT_APP_API_URL + "preguntas/respuesta/" + idPregunta;
      const consulta2 = await fetch(URLPregunta);
      const respuesta2 = await consulta2.json();
      setPreguntaEvaluacion(respuesta2);

      const URLEvaluacion =
        process.env.REACT_APP_API_URL + "evaluaciones/" + idEvaluacion;
      const consultaEvaluacion = await fetch(URLEvaluacion);
      const respuestaEvaluacion = await consultaEvaluacion.json();
      setLibrenavegacion(respuestaEvaluacion.libreNavegacionEvaluacion);

      const momentoFinEvaluacionAux =
        momentoComienzoEvaluacion.getTime() +
        respuestaEvaluacion.duracionEvaluacionMilisegundos;
      const momentoFinEvaluacionAux2 = new Date(momentoFinEvaluacionAux);
      setMomentoFinEvaluacion(momentoFinEvaluacionAux2);
      setNumeroTotalPreguntas(
        parseInt(respuestaEvaluacion.cantidadPreguntasEvaluacion)
      );
      const momentoFinEvaluacionAux3 =
        momentoFinEvaluacionAux2.getTime() - ahora.getTime();

      setTimeout(() => {
        console.log("hola");
        const ruta = window.location.href + "/finevaluacion";

        window.location.href = ruta;
      }, momentoFinEvaluacionAux3);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const checkBox1 = document.getElementById(
      "opcion1CorrectaRespuesta"
    ).checked;
    const checkBox2 = document.getElementById(
      "opcion2CorrectaRespuesta"
    ).checked;
    const checkBox3 = document.getElementById(
      "opcion3CorrectaRespuesta"
    ).checked;
    const checkBox4 = document.getElementById(
      "opcion4CorrectaRespuesta"
    ).checked;

    const respuestaEditada = {
      opcion1CorrectaRespuesta: checkBox1,
      opcion2CorrectaRespuesta: checkBox2,
      opcion3CorrectaRespuesta: checkBox3,
      opcion4CorrectaRespuesta: checkBox4,
      desarrollo: respuestaDesarrollo,
    };
    console.log(respuestaEditada);
    try {
      const URLRespuesta =
        process.env.REACT_APP_API_URL +
        "respuestas/" +
        respuestaEvaluacion[0]._id;
      const respuesta = await fetch(URLRespuesta, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(respuestaEditada),
      });
    } catch (error) {
      console.log(error);
    }
    const URLRespuestasResultado =
      process.env.REACT_APP_API_URL +
      "respuestas/resultados/" +
      resultadoEvaluacion._id;
    const consultaAux = await fetch(URLRespuestasResultado);
    const respuestaAux = await consultaAux.json();

    const cantidadRespuestasYPreguntas = respuestaAux.length;
    let cantidadRespuestasCorrectas = 0;
    for (const i in respuestaAux) {
      if (respuestaAux[i]) {
        console.log(respuestaAux[i].IDPregunta);
        const URLRespuestasResultado =
          process.env.REACT_APP_API_URL +
          "preguntas/respuesta/" +
          respuestaAux[i].IDPregunta;
        const consultaAux1 = await fetch(URLRespuestasResultado);
        const respuestaAux2 = await consultaAux1.json();
        console.log(respuestaAux2);
        if (
          respuestaAux[i].opcion1CorrectaRespuesta ===
            respuestaAux2.opcion1CorrectaPregunta &&
          respuestaAux[i].opcion2CorrectaRespuesta ===
            respuestaAux2.opcion2CorrectaPregunta &&
          respuestaAux[i].opcion3CorrectaRespuesta ===
            respuestaAux2.opcion3CorrectaPregunta &&
          respuestaAux[i].opcion4CorrectaRespuesta ===
            respuestaAux2.opcion4CorrectaPregunta
        ) {
          cantidadRespuestasCorrectas = cantidadRespuestasCorrectas + 1;
        }
        if (
          false === respuestaAux2.opcion1CorrectaPregunta &&
          false === respuestaAux2.opcion2CorrectaPregunta &&
          false === respuestaAux2.opcion3CorrectaPregunta &&
          false === respuestaAux2.opcion4CorrectaPregunta
        ) {cantidadRespuestasCorrectas = cantidadRespuestasCorrectas - 1;
        }
      }
    }
    const notaProvisoria =
      (cantidadRespuestasCorrectas * 100) / respuestaAux.length;

    const URLCambiarNota =
      process.env.REACT_APP_API_URL + "resultados/" + resultadoEvaluacion._id;
    const notaEditada = {
      NotaEvaluacion: notaProvisoria.toFixed(2),
    };
    const cambiarNota = await fetch(URLCambiarNota, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(notaEditada),
    });
    const numeroProximaPregunta = parseInt(numeroPregunta) + 1;
    const numeroActualPregunta = parseInt(numeroPregunta);
    if (
      numeroActualPregunta == numeroTotalPreguntas ||
      numeroActualPregunta == totalPreguntas
    ) {
      const ruta = window.location.href + "/finevaluacion";

      window.location.href = ruta;
    } else {
      const ruta =
        window.location.href.slice(0, numeroPregunta.length * -1) +
        numeroProximaPregunta;
      window.location.href = ruta;
    }
  };
  const actualizarNota = async () => {
    try {
      console.log(resultadoEvaluacion._id);
      const URLRespuestasResultado =
        process.env.REACT_APP_API_URL +
        "respuestas/resultados/" +
        resultadoEvaluacion._id;
      const consultaAux = await fetch(URLRespuestasResultado);
      const respuestaAux = await consultaAux.json();

      console.log(respuestaAux);
      console.log(respuestaAux.length);
      const cantidadRespuestasYPreguntas = respuestaAux.length;
      let cantidadRespuestasCorrectas = 0;
      for (const i in respuestaAux) {
        if (respuestaAux[i]) {
          console.log(respuestaAux[i].IDPregunta);
          const URLRespuestasResultado =
            process.env.REACT_APP_API_URL +
            "preguntas/respuesta/" +
            respuestaAux[i].IDPregunta;
          const consultaAux1 = await fetch(URLRespuestasResultado);
          const respuestaAux2 = await consultaAux1.json();
          console.log(respuestaAux2);
          if (
            respuestaAux[i].opcion1CorrectaRespuesta ===
              respuestaAux2.opcion1CorrectaPregunta &&
            respuestaAux[i].opcion2CorrectaRespuesta ===
              respuestaAux2.opcion2CorrectaPregunta &&
            respuestaAux[i].opcion3CorrectaRespuesta ===
              respuestaAux2.opcion3CorrectaPregunta &&
            respuestaAux[i].opcion4CorrectaRespuesta ===
              respuestaAux2.opcion4CorrectaPregunta
          ) {
            cantidadRespuestasCorrectas = cantidadRespuestasCorrectas + 1;
          }
        }
      }
      const notaProvisoria =
        (cantidadRespuestasCorrectas * 100) / respuestaAux.length;

      const URLCambiarNota =
        process.env.REACT_APP_API_URL + "resultados/" + resultadoEvaluacion._id;
      const notaEditada = {
        NotaEvaluacion: notaProvisoria,
      };
      const cambiarNota = await fetch(URLCambiarNota, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notaEditada),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const preguntaAnterior = async (e) => {
    e.preventDefault();

    const checkBox1 = document.getElementById(
      "opcion1CorrectaRespuesta"
    ).checked;
    const checkBox2 = document.getElementById(
      "opcion2CorrectaRespuesta"
    ).checked;
    const checkBox3 = document.getElementById(
      "opcion3CorrectaRespuesta"
    ).checked;
    const checkBox4 = document.getElementById(
      "opcion4CorrectaRespuesta"
    ).checked;

    const respuestaEditada = {
      opcion1CorrectaRespuesta: checkBox1,
      opcion2CorrectaRespuesta: checkBox2,
      opcion3CorrectaRespuesta: checkBox3,
      opcion4CorrectaRespuesta: checkBox4,
      desarrollo: respuestaDesarrollo,
    };

    try {
      const URLRespuesta =
        process.env.REACT_APP_API_URL +
        "respuestas/" +
        respuestaEvaluacion[0]._id;
      const respuesta = await fetch(URLRespuesta, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(respuestaEditada),
      });
      const URLRespuestasResultado =
        process.env.REACT_APP_API_URL +
        "respuestas/resultados/" +
        resultadoEvaluacion._id;
      const consultaAux = await fetch(URLRespuestasResultado);
      const respuestaAux = await consultaAux.json();

      const cantidadRespuestasYPreguntas = respuestaAux.length;
      let cantidadRespuestasCorrectas = 0;
      for (const i in respuestaAux) {
        if (respuestaAux[i]) {
          console.log(respuestaAux[i].IDPregunta);
          const URLRespuestasResultado =
            process.env.REACT_APP_API_URL +
            "preguntas/respuesta/" +
            respuestaAux[i].IDPregunta;
          const consultaAux1 = await fetch(URLRespuestasResultado);
          const respuestaAux2 = await consultaAux1.json();
          console.log(respuestaAux2);
          if (
            respuestaAux[i].opcion1CorrectaRespuesta ===
              respuestaAux2.opcion1CorrectaPregunta &&
            respuestaAux[i].opcion2CorrectaRespuesta ===
              respuestaAux2.opcion2CorrectaPregunta &&
            respuestaAux[i].opcion3CorrectaRespuesta ===
              respuestaAux2.opcion3CorrectaPregunta &&
            respuestaAux[i].opcion4CorrectaRespuesta ===
              respuestaAux2.opcion4CorrectaPregunta
          ) {
            cantidadRespuestasCorrectas = cantidadRespuestasCorrectas + 1;
          }
        }
      }
      const notaProvisoria =
        (cantidadRespuestasCorrectas * 100) / respuestaAux.length;

      const URLCambiarNota =
        process.env.REACT_APP_API_URL + "resultados/" + resultadoEvaluacion._id;
      const notaEditada = {
        NotaEvaluacion: notaProvisoria,
      };
      const cambiarNota = await fetch(URLCambiarNota, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notaEditada),
      });
    } catch (error) {
      console.log(error);
    }
    actualizarNota();
    window.history.back();
  };
  const cambiarTextArea = (e) => {
    e.preventDefault();
    setRespuestaDesarrollo(e.target.value);
  };
  return (
    <Fragment>
      <div className={styles.Container}>
        <div className={styles.container}>
          <LeftNavbar props={idAlumno}></LeftNavbar>
          <Header></Header>
          <div className={styles.contentcontainer}>
            <Card className="m-5" bg="Light">
              <Card.Body>
                <Container>
                  <h1 className="text-center">Pregunta {numeroPregunta}</h1>
                  <h2 className="text-center">
                    {preguntaEvaluacion.enunciadoPregunta}
                  </h2>
                  {preguntaEvaluacion.opcion1Pregunta === "" &&
                  preguntaEvaluacion.opcion2Pregunta === "" &&
                  preguntaEvaluacion.opcion3Pregunta === "" &&
                  preguntaEvaluacion.opcion4Pregunta === "" ? (
                    <Form.Control
                      as="textarea"
                      style={{ height: "100px" }}
                      onChange={(e) => cambiarTextArea(e)}
                      defaultValue={respuestaDesarrollo}
                    />
                  ) : (
                    <h4>Seleccione opcion</h4>
                  )}

                  <Form>
                    {preguntaEvaluacion.opcion1Pregunta === "" ? (
                      <div hidden>
                        <InputGroup className="mb-3" size="lg">
                          <InputGroup.Checkbox
                            id="opcion1CorrectaRespuesta"
                            defaultChecked={respuesta1CorrectaRespuesta}
                          />
                          <Form.Control
                            className=" mx-4"
                            plaintext
                            readOnly
                            defaultValue={preguntaEvaluacion.opcion1Pregunta}
                          />
                        </InputGroup>
                      </div>
                    ) : (
                      <InputGroup className="mb-3" size="lg">
                        <InputGroup.Checkbox
                          id="opcion1CorrectaRespuesta"
                          defaultChecked={respuesta1CorrectaRespuesta}
                        />
                        <Form.Control
                          className=" mx-4"
                          plaintext
                          readOnly
                          defaultValue={preguntaEvaluacion.opcion1Pregunta}
                        />
                      </InputGroup>
                    )}
                    {preguntaEvaluacion.opcion2Pregunta === "" ? (
                      <div hidden>
                        <InputGroup className="mb-3" size="lg">
                          <InputGroup.Checkbox
                            id="opcion2CorrectaRespuesta"
                            defaultChecked={respuesta2CorrectaRespuesta}
                          />
                          <Form.Control
                            className=" mx-4"
                            plaintext
                            readOnly
                            defaultValue={preguntaEvaluacion.opcion2Pregunta}
                          />
                        </InputGroup>
                      </div>
                    ) : (
                      <InputGroup className="mb-3" size="lg">
                        <InputGroup.Checkbox
                          id="opcion2CorrectaRespuesta"
                          defaultChecked={respuesta2CorrectaRespuesta}
                        />
                        <Form.Control
                          className=" mx-4"
                          plaintext
                          readOnly
                          defaultValue={preguntaEvaluacion.opcion2Pregunta}
                        />
                      </InputGroup>
                    )}
                    {preguntaEvaluacion.opcion3Pregunta === "" ? (
                      <div hidden>
                        <InputGroup className="mb-3" size="lg" type="hidden">
                          <InputGroup.Checkbox
                            id="opcion3CorrectaRespuesta"
                            defaultChecked={respuesta3CorrectaRespuesta}
                          />
                          <Form.Control
                            className=" mx-4"
                            plaintext
                            readOnly
                            defaultValue={preguntaEvaluacion.opcion3Pregunta}
                          />
                        </InputGroup>
                      </div>
                    ) : (
                      <InputGroup className="mb-3" size="lg">
                        <InputGroup.Checkbox
                          id="opcion3CorrectaRespuesta"
                          defaultChecked={respuesta3CorrectaRespuesta}
                        />
                        <Form.Control
                          className=" mx-4"
                          plaintext
                          readOnly
                          defaultValue={preguntaEvaluacion.opcion3Pregunta}
                        />
                      </InputGroup>
                    )}
                    {preguntaEvaluacion.opcion4Pregunta === "" ? (
                      <div hidden>
                        <InputGroup type="hidden" className="mb-3" size="lg">
                          <InputGroup.Checkbox
                            id="opcion4CorrectaRespuesta"
                            defaultChecked={respuesta4CorrectaRespuesta}
                          />
                          <Form.Control
                            className=" mx-4"
                            plaintext
                            readOnly
                            defaultValue={preguntaEvaluacion.opcion4Pregunta}
                          />
                        </InputGroup>
                      </div>
                    ) : (
                      <InputGroup className="mb-3" size="lg">
                        <InputGroup.Checkbox
                          id="opcion4CorrectaRespuesta"
                          defaultChecked={respuesta4CorrectaRespuesta}
                        />
                        <Form.Control
                          className=" mx-4"
                          plaintext
                          readOnly
                          defaultValue={preguntaEvaluacion.opcion4Pregunta}
                        />
                      </InputGroup>
                    )}
                  </Form>
                </Container>
              </Card.Body>
            </Card>
            <Container className="text-center my-5">
              {libreNavegacion === true && numeroPregunta != 1 ? (
                <Button onClick={preguntaAnterior} className="mr-5">
                  Atras
                </Button>
              ) : null}
              <Button variant="primary" onClick={handleSubmit}>
                siguiente
              </Button>
            </Container>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PreguntaAlumno;
