import React, { Fragment, useState } from 'react';
import { Container, Row, Col, Dropdown, Button, Table, Modal, Form, Alert, FormGroup, FormLabel, FormCheck } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from "sweetalert2";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';

const CrearEvaluacion = () => {
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


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("crear")
        const evaluacion = {
            nombreEvaluacion: nombreEvaluacion,
            
        };
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

            if ((await respuesta.status) === 201) {

                console.log("todo bien")

            }
        } catch (error) {
            console.log(error);
        }

    }
    const volverAtras = () => {
        const urlAnterior = "/profesor/" + id
        window.location.href = urlAnterior;
    }
    const onChangeMezclar = (e) => {
        console.log(e.target.checked)
        setMezclarPerguntasEvaluacion(e.target.checked)
    }
    const onChangeNavegacionLibre = (e) => {
        console.log(e.target.checked)
        setLibreNavegacionEvaluacion(e.target.checked)
    }
    return (
        <Fragment>
            <Container>
                <h1>Crear Evaluacion</h1>
                <Form onSubmit={handleSubmit}>
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
                            <Form.Control type="date" placeholder="Parcial 1" onChange={(e) => setFechaInicioEvaluacion(e.target.value)}></Form.Control>
                        </FormGroup>
                        <FormGroup >
                            <Form.Label>Hora de Inicio</Form.Label>
                            <Form.Control type="time" placeholder="Parcial 1" onChange={(e) => setHoraInicioEvaluacion(e.target.value)}></Form.Control>
                        </FormGroup>

                    </Row>
                    <Row className="mx-1">
                        <FormGroup className="mr-5">
                            <Form.Label>Fecha de Fin de Evaluacion</Form.Label>
                            <Form.Control type="date" placeholder="Parcial 1" onChange={(e) => setFechaFinEvaluacion(e.target.value)}></Form.Control>
                        </FormGroup>
                        <FormGroup >
                            <Form.Label>Hora de Fin</Form.Label>
                            <Form.Control type="time" placeholder="Parcial 1" onChange={(e) => setHoraFinEvaluacion(e.target.value)}></Form.Control>
                        </FormGroup>
                    </Row>
                
                    <FormGroup className="mb-3 mx-1" controlId="formBasicCheckbox">
                        <Form.Check
                            type="switch"
                            label="Mezclar Preguntas"
                            onChange={(e) => onChangeMezclar(e)} />
                        
                    </FormGroup>
                    <FormGroup controlId="formBasicCheckbox2">
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