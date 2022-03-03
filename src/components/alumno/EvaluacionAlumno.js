import React, { Fragment, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Header from "../HeaderAlumno";
import LeftNavbar from "../LeftNavbarAlumno";
import styles from "../../styles/Home.module.css";
import {
  Image,
  Card,
  Container,
  Form,
  Button,
  Col,
  Row,
  Alert,
} from "react-bootstrap";
import guardarFoto from "./apiFoto";
const EvaluacionAlumno = () => {
  const { idAlumno } = useParams();
  const { idEvaluacion } = useParams();
  const URL =
    process.env.REACT_APP_API_URL +
    "evaluaciones/alumno/preguntas/" +
    idEvaluacion;
  const [numeroTotalPreguntasDisponibles, setNumeroTotalPreguntasDisponibles] =
    useState(0);
  const [evaluacion, setEvaluacion] = useState([]);

  useEffect(() => {
    consultarAPI1();
  }, []);

  const consultarAPI1 = async () => {
    try {
      const consulta = await fetch(URL);
      const respuesta = await consulta.json();
      setEvaluacion(respuesta);

      setNumeroTotalPreguntasDisponibles(respuesta.length - 1);
    } catch (error) {
      console.log(error);
    }
  };

  const irAComenzarEvaluacion = async () => {
    const URLRespuestas = process.env.REACT_APP_API_URL + "respuestas";
    const URLResultado = process.env.REACT_APP_API_URL + "resultados";
    let respuestaIDRespuesta;
    const momentoInicioDeEvaluacionAlumno = new Date(Date.now());
    const nombreFoto =
      momentoInicioDeEvaluacionAlumno.getMilliseconds().toString() +
      idAlumno +
      ".jpeg";
    console.log(nombreFoto);
    const resultadoAlumno = {
      IDEvaluacion: idEvaluacion,
      IDAlumno: idAlumno,
      FechaEvaluacion: momentoInicioDeEvaluacionAlumno,
      NotaEvaluacion: 0,
      Foto: nombreFoto,
    };
    try {
      const parametros = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resultadoAlumno),
      };
      // ejecutar la solicitud o request
      const consulta = await fetch(URLResultado, parametros);
      let blob1;
      var image = document.getElementById("canvas").toBlob(
        function (blob) {
          blob1 = blob;
          const file = new File([blob], nombreFoto, {
            lastModified: 1534584790000,
          });
          console.log(file)

          guardarFoto(file);
        },
        "image/jpeg",
        0.8
      );
      respuestaIDRespuesta = await consulta.json();
    } catch (error) {
      console.log(error);
    }
    for (
      let index = 0;
      index <
      (evaluacion[0].cantidadPreguntasEvaluacion <
      numeroTotalPreguntasDisponibles
        ? evaluacion[0].cantidadPreguntasEvaluacion
        : numeroTotalPreguntasDisponibles);
      index++
    ) {
      const respuestaAlumno = {
        IDEvaluacion: idEvaluacion,
        IDAlumno: idAlumno,
        IDPregunta: evaluacion[index + 1]._id,
        numeroPregunta: index + 1,
        opcion1CorrectaRespuesta: false,
        opcion2CorrectaRespuesta: false,
        opcion3CorrectaRespuesta: false,
        opcion4CorrectaRespuesta: false,
        momentoInicioDeEvaluacionAlumno: momentoInicioDeEvaluacionAlumno,
        IDResultado: respuestaIDRespuesta,
      };
      try {
        const parametros = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(respuestaAlumno),
        };
        const respuesta = await fetch(URLRespuestas, parametros);
      } catch (error) {
        console.log(error);
      }
    }
    const rutaPrimeraPregunta =
      window.location +
      "/pregunta/" +
      (evaluacion[0].cantidadPreguntasEvaluacion <
      numeroTotalPreguntasDisponibles
        ? evaluacion[0].cantidadPreguntasEvaluacion
        : numeroTotalPreguntasDisponibles) +
      "/1";
    window.location.href = rutaPrimeraPregunta;
  };
  const [playing, setPlaying] = useState(false);
  const [foto, setFoto] = useState();
  const videoRef = useRef(null);
  const fotoRef = useRef(null);
  const [hayFoto, setHayFoto] = useState(false);

  const tomarFoto = (nombre) => {
    const width = 300;
    const height = 228;
    let video = videoRef.current;
    let foto = fotoRef.current;
    foto.width = width;
    foto.height = height;
    let ctx = foto.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
    setHayFoto(true);
    
   
  };

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, width: 1920, height: 1080 })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(err);
      });
  };


  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <Fragment>
      <div className={styles.Container}>
        <div className={styles.container}>
          <LeftNavbar props={idAlumno}></LeftNavbar>
          <Header></Header>
          <div className={styles.contentcontainer}>
            <div className="text-center mt-5">
              <Container style={{ textAlign: "center", marginBottom: "100px" }}>
                <Row>
                  <Col sm="auto">
                    <div>
                      <video width="300" ref={videoRef}></video>
                    </div>
                    <div onClick={tomarFoto}>
                      <Button>Foto</Button>
                    </div>
                  </Col>
                  <Col sm="auto">
                    <div style={{ textAlign: "center" }}>
                      <canvas id="canvas" ref={fotoRef}></canvas>
                    </div>
                  </Col>
                </Row>
              </Container>
              <h3>Asegurese que su DNI sea visible</h3>
              {hayFoto?  <Button
                className="mx-3"
                variant="danger"
                onClick={irAComenzarEvaluacion}
              >
                COMENZAR EVALUACION
              </Button>:null}
            
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EvaluacionAlumno;
