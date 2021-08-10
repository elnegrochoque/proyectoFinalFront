import React, { Fragment, useState } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Alert } from 'react-bootstrap';

import { useParams } from 'react-router-dom';

const CrearEvaluacion = () => {
    const [error, setError] = useState(false);
    const URL = process.env.REACT_APP_API_URL + "evaluaciones";
    const { id } = useParams();
    const [nombreEvaluacion, setNombreEvaluacion] = useState("");
    const [materiaEvaluacion, setMateriaEvaluacion] = useState("");
    const [fechaInicioEvaluacion, setFechaInicioEvaluacion] = useState("");
    const [horaInicioEvaluacion, setHoraInicioEvaluacion] = useState("");
    const [fechaFinEvaluacion, setFechaFinEvaluacion] = useState("");

    const [horaFinEvaluacion, setHoraFinEvaluacion] = useState("");
    const [mezclarPreguntasEvaluacion, setMezclarPerguntasEvaluacion] = useState(false);
    //const [notaEvaluacion, setNotaEvaluacion] = useState("");
    //const [idAlumnoEvaluacion, setIdAlumnoEvaluacion] = useState("");
    const [libreNavegacionEvaluacion, setLibreNavegacionEvaluacion] = useState(false);
    const [cantidadPreguntasEvaluacion, setCantidadPreguntasEvaluacion] = useState(false);
    const IDProfesor = id;
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (nombreEvaluacion.trim() === ''
            || materiaEvaluacion.trim() === ''
            || fechaInicioEvaluacion.trim() === ''
            || horaInicioEvaluacion.trim() === ''
            || fechaFinEvaluacion.trim() === ''
            || horaFinEvaluacion.trim() === ''
            || cantidadPreguntasEvaluacion.trim() === '') {
            setError(true);
            return;
        } else {
            const fechaYHoraInicioEvaluacion = new Date(fechaInicioEvaluacion + "T" + horaInicioEvaluacion);
            const fechaYHoraFinEvaluacion = new Date(fechaFinEvaluacion + "T" + horaFinEvaluacion);

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
                fechaYHoraFinEvaluacion: fechaYHoraFinEvaluacion
            };
            console.log(evaluacion);
            try {
                const parametros = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(evaluacion)
                };
                // ejecutar la solicitud o request
                const respuesta = await fetch(URL, parametros);
                const resultado = await respuesta.json();
                console.log(resultado[0]._id)

                if ((await respuesta.status) === 201) {


                }
                const ruta = "/profesor/" + id + "/crearevaluacion/" + resultado[0]._id;
                window.location.href = ruta;
            } catch (error) {
                console.log(error);
            }

        }
    }

    const volverAtras = () => {
        window.history.back()
    }
    const onChangeMezclar = (e) => {

        setMezclarPerguntasEvaluacion(e.target.checked)
    }
    const onChangeNavegacionLibre = (e) => {

        setLibreNavegacionEvaluacion(e.target.checked)
    }
    return (
        <Fragment>
            <Container>
                <h1>Crear Evaluacion</h1>
                <Form onSubmit={handleSubmit}>
                    {(error === true) ? (<Alert variant={'danger'}>
                        Todos los campos son obligatorios
                    </Alert>) : null}
                    <Row as={Col}
                        md="3">
                        <FormGroup className="mr-3 ">
                            <Form.Label>Materia</Form.Label>
                            <Form.Control type="text" placeholder="Materia" onChange={(e) => setMateriaEvaluacion(e.target.value)}></Form.Control>
                        </FormGroup>
                        <FormGroup >
                            <Form.Label>Nombre Evaluacion</Form.Label>
                            <Form.Control type="text" placeholder="Parcial 1" onChange={(e) => setNombreEvaluacion(e.target.value)}></Form.Control>
                        </FormGroup>
                    </Row>

                    <Row className="mx-1" >
                        <FormGroup className="mr-4">
                            <Form.Label>Fecha de Inicio de Evaluacion</Form.Label>
                            <Form.Control type="date" onChange={(e) => setFechaInicioEvaluacion(e.target.value)}></Form.Control>
                        </FormGroup>
                        <FormGroup >
                            <Form.Label>Hora de Inicio</Form.Label>
                            <Form.Control type="time" onChange={(e) => setHoraInicioEvaluacion(e.target.value)}></Form.Control>
                        </FormGroup>

                    </Row>
                    <Row className="mx-1">
                        <FormGroup className="mr-5">
                            <Form.Label>Fecha de Fin de Evaluacion</Form.Label>
                            <Form.Control type="date" onChange={(e) => setFechaFinEvaluacion(e.target.value)}></Form.Control>
                        </FormGroup>
                        <FormGroup >
                            <Form.Label>Hora de Fin</Form.Label>
                            <Form.Control type="time" onChange={(e) => setHoraFinEvaluacion(e.target.value)}></Form.Control>
                        </FormGroup>
                    </Row>
                    <FormGroup>
                        <Form.Label>Cantidad de Preguntas Visibles (son la cantidad de preguntas que vera el alumno)</Form.Label>
                        <Form.Control className="col-4" type="number" placeholder="10" onChange={(e) => setCantidadPreguntasEvaluacion(e.target.value)}></Form.Control>
                    </FormGroup>
                    <FormGroup className="mb-3 mx-1" controlId="formBasicCheckbox">
                        <Form.Check
                            type="switch"
                            label="Mezclar Preguntas"
                            onChange={(e) => onChangeMezclar(e)} />

                    </FormGroup>
                    <FormGroup className="mb-3 mx-1" controlId="formBasicCheckbox2">
                        <Form.Check
                            type="switch"
                            label="Navegacion libre (puede retroceder a la pregunta anterior)"
                            onChange={(e) => onChangeNavegacionLibre(e)} />
                    </FormGroup>
                    <div className="text-center ml-3">
                        <Row className="">
                            <Button className="mr-5" variant="primary" type="submit">
                                Crear Evaluacion
                            </Button>
                            <Button variant="primary" onClick={volverAtras}>
                                Atras
                            </Button>

                        </Row>
                    </div>
                </Form>
            </Container>
        </Fragment>
    );
};

export default CrearEvaluacion;