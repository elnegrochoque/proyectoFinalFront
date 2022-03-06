import React, { Fragment, useState, useEffect } from "react";
import { getCatedras, getCatedra } from "../alumno/apiCatedra";
import { getPersona } from "../administrador/apiNuevaCatedra";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Alert,
  Card,
  Navbar,
  Dropdown,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import Header from "../Header";
import LeftNavbar from "../LeftNavbar";
import styles from "../../styles/Home.module.css";
import depositoLocal from "../depositoLocal";

const CrearEvaluacion = () => {
  const _depositoLocal = depositoLocal.obtenerServicio();
  const idPersona = _depositoLocal.obtenerIdPersona();
  const [error, setError] = useState(false);
  const URL = process.env.REACT_APP_API_URL + "evaluaciones";
  const { id } = useParams();
  const [nombreEvaluacion, setNombreEvaluacion] = useState("");
  const [materiaEvaluacion, setMateriaEvaluacion] = useState("");
  const [fechaInicioEvaluacion, setFechaInicioEvaluacion] = useState("");
  const [horaInicioEvaluacion, setHoraInicioEvaluacion] = useState("");
  const [fechaFinEvaluacion, setFechaFinEvaluacion] = useState("");

  const [horaFinEvaluacion, setHoraFinEvaluacion] = useState("");
  const [mezclarPreguntasEvaluacion, setMezclarPerguntasEvaluacion] =
    useState(false);
  //const [notaEvaluacion, setNotaEvaluacion] = useState("");
  //const [idAlumnoEvaluacion, setIdAlumnoEvaluacion] = useState("");
  const [duracionEvaluacion, setDuracionEvaluacion] = useState("");
  const [duracionEvaluacionMilisegundos, setDuracionEvaluacionMilisegundos] =
    useState(0);

  const [libreNavegacionEvaluacion, setLibreNavegacionEvaluacion] =
    useState(false);
  const [cantidadPreguntasEvaluacion, setCantidadPreguntasEvaluacion] =
    useState(false);
  const IDProfesor = id;
  const [catedras, setCatedras] = useState();
  const [flagUpdate, setFlagUpdate] = useState(false);

  const [dropDownMateria, setDropDownMateria] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      nombreEvaluacion.trim() === "" ||
      materiaEvaluacion.trim() === "" ||
      fechaInicioEvaluacion.trim() === "" ||
      horaInicioEvaluacion.trim() === "" ||
      fechaFinEvaluacion.trim() === "" ||
      horaFinEvaluacion.trim() === "" ||
      cantidadPreguntasEvaluacion.trim() === "" ||
      duracionEvaluacion === 0
    ) {
      setError(true);
      return;
    } else {
      const fechaYHoraInicioEvaluacion = new Date(
        fechaInicioEvaluacion + "T" + horaInicioEvaluacion
      );
      const fechaYHoraFinEvaluacion = new Date(
        fechaFinEvaluacion + "T" + horaFinEvaluacion
      );

      const evaluacion = {
        IDProfesor: IDProfesor,
        nombreEvaluacion: nombreEvaluacion,
        materiaEvaluacion: materiaEvaluacion,
        fechaInicioEvaluacion: fechaInicioEvaluacion,
        horaInicioEvaluacion: horaInicioEvaluacion,
        fechaFinEvaluacion: fechaFinEvaluacion,
        horaFinEvaluacion: horaFinEvaluacion,
        mezclarPreguntasEvaluacion: mezclarPreguntasEvaluacion,
        libreNavegacionEvaluacion: libreNavegacionEvaluacion,
        cantidadPreguntasEvaluacion: cantidadPreguntasEvaluacion,
        fechaYHoraInicioEvaluacion: fechaYHoraInicioEvaluacion,
        fechaYHoraFinEvaluacion: fechaYHoraFinEvaluacion,
        duracionEvaluacionMilisegundos: duracionEvaluacionMilisegundos,
        duracionEvaluacion: duracionEvaluacion,
      };
      try {
        const parametros = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(evaluacion),
        };
        // ejecutar la solicitud o request
        const respuesta = await fetch(URL, parametros);
        const resultado = await respuesta.json();
       
        if ((await respuesta.status) === 201) {
        }
        const ruta = "/profesor/" + id + "/crearevaluacion/" + resultado[0]._id;
        window.location.href = ruta;
      } catch (error) {
        console.log(error);
      }
    }
  };

  const volverAtras = () => {
    window.history.back();
  };
  const onChangeMezclar = (e) => {
    setMezclarPerguntasEvaluacion(e.target.checked);
  };
  const onChangeNavegacionLibre = (e) => {
    setLibreNavegacionEvaluacion(e.target.checked);
  };
  const cambiarDuracionEvaluacion = (e) => {
    e.preventDefault();
    setDuracionEvaluacion(e.target.value);
    let hora = parseInt(e.target.value.slice(0, -3));
    let minutos = parseInt(e.target.value.slice(-2));
    hora = hora * 3600000;
    minutos = minutos * 60000;
    const horaTotal = hora + minutos;
    setDuracionEvaluacionMilisegundos(horaTotal);
  };
  useEffect(async () => {
    const catedrasAux = await getCatedras();
    const catedraProfesor = [];
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
  const elegirMateria = async (e) => {
    e.preventDefault();
    setMateriaEvaluacion(e.target.id);
    const nombreMateria = await getCatedra(e.target.id);
    
    setDropDownMateria(nombreMateria.materiaCatedra);
  };
  return (
    <Fragment>
      <div className={styles.Container}>
        <div className={styles.container}>
          <LeftNavbar props={id}></LeftNavbar>
          <Header></Header>
          <div className={styles.contentcontainer}>
            <Card className="m-2" bg="Light" style={{ width: "50rem" }}>
              <Card.Header>
                <h1>Crear Evaluacion</h1>
              </Card.Header>

              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  {error === true ? (
                    <Alert variant={"danger"}>
                      Todos los campos son obligatorios
                    </Alert>
                  ) : null}
                  <Row as={Col} md="3">
                    <FormGroup className="ml-2">
                      <Form.Label>Nombre Evaluacion</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Parcial 1"
                        onChange={(e) => setNombreEvaluacion(e.target.value)}
                      ></Form.Control>
                    </FormGroup>
                    <FormGroup className=" ml-5 " style={{ marginTop: "32px" }}>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="secondary"
                          id="dropdown-basic"
                        >
                          {dropDownMateria != "" ? dropDownMateria : "Materia"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {catedras
                            ? catedras.map((catedra) => (
                                <Dropdown.Item
                                  id={catedra.id}
                                  onClick={(e) => elegirMateria(e)}
                                >
                                  {catedra.materia}
                                </Dropdown.Item>
                              ))
                            : null}
                        </Dropdown.Menu>
                      </Dropdown>
                    </FormGroup>
                  </Row>

                  <Row className="mx-1">
                    <FormGroup className="mr-4">
                      <Form.Label>Fecha de Inicio de Evaluacion</Form.Label>
                      <Form.Control
                        type="date"
                        onChange={(e) =>
                          setFechaInicioEvaluacion(e.target.value)
                        }
                      ></Form.Control>
                    </FormGroup>
                    <FormGroup>
                      <Form.Label>Hora de Inicio</Form.Label>
                      <Form.Control
                        type="time"
                        onChange={(e) =>
                          setHoraInicioEvaluacion(e.target.value)
                        }
                      ></Form.Control>
                    </FormGroup>
                    <FormGroup className="ml-4">
                      <Form.Label>Duracion de la evaluacion</Form.Label>
                      <Form.Control
                        type="time"
                        onChange={(e) => cambiarDuracionEvaluacion(e)}
                      ></Form.Control>
                    </FormGroup>
                  </Row>
                  <Row className="mx-1">
                    <FormGroup className="mr-5">
                      <Form.Label>Fecha de Fin de Evaluacion</Form.Label>
                      <Form.Control
                        type="date"
                        onChange={(e) => setFechaFinEvaluacion(e.target.value)}
                      ></Form.Control>
                    </FormGroup>
                    <FormGroup>
                      <Form.Label>Hora de Fin</Form.Label>
                      <Form.Control
                        type="time"
                        onChange={(e) => setHoraFinEvaluacion(e.target.value)}
                      ></Form.Control>
                    </FormGroup>
                  </Row>
                  <FormGroup>
                    <Form.Label>
                      Cantidad de Preguntas Visibles (son la cantidad de
                      preguntas que vera el alumno)
                    </Form.Label>
                    <Form.Control
                      className="col-4"
                      type="number"
                      placeholder="10"
                      onChange={(e) =>
                        setCantidadPreguntasEvaluacion(e.target.value)
                      }
                    ></Form.Control>
                  </FormGroup>
                  <FormGroup
                    className="mb-3 mx-1"
                    controlId="formBasicCheckbox"
                  >
                    <Form.Check
                      type="switch"
                      label="Mezclar Preguntas"
                      onChange={(e) => onChangeMezclar(e)}
                    />
                  </FormGroup>
                  <FormGroup
                    className="mb-3 mx-1"
                    controlId="formBasicCheckbox2"
                  >
                    <Form.Check
                      type="switch"
                      label="Navegacion libre (puede retroceder a la pregunta anterior)"
                      onChange={(e) => onChangeNavegacionLibre(e)}
                    />
                  </FormGroup>

                  <div className="text-center ml-3">
                    <Row className="">
                      <Button className="mr-5" variant="dark" type="submit">
                        Crear Evaluacion
                      </Button>
                      <Button variant="dark" onClick={volverAtras}>
                        Atras
                      </Button>
                    </Row>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CrearEvaluacion;
