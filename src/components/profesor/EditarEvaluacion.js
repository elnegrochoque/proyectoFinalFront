import React, { Fragment, useEffect, useState, useRef } from "react";
import { Container, Row, Col, Dropdown, Button, Table, Modal, Form, Alert, FormGroup, FormLabel, FormCheck } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from "sweetalert2";
import { Link, useParams } from 'react-router-dom';
const EditarEvaluacion = () => {
    const { id } = useParams();
    const URL = process.env.REACT_APP_API_URL + "evaluaciones";
    const [evaluacion, setEvaluacion] = useState({});
    const materiaEvaluacionRef = useRef("");
    const nombreEvaluacionRef = useRef("");
    const fechaInicioEvaluacionRef = useRef("");
    const horaInicioEvaluacionRef = useRef("");
    const fechaFinEvaluacionRef = useRef("");
    const horaFinEvaluacionRef = useRef("");
    const mezclarPreguntasEvaluacionRef = useRef("");
    const libreNavegacionEvaluacionRef = useRef("");
    const cantidadPreguntasEvaluacionRef = useRef("");
    useEffect(() => {

        consultarEvaluacion();

    }, []);

    const consultarEvaluacion = async () => {
        try {
            const respuesta = await fetch(URL + '/' + id);
            if (respuesta.status === 200) {
                const resultado = await respuesta.json();
                setEvaluacion(resultado);
                console.log(resultado);
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    const handleSubmit = () => {
        console.log("hola")
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
                            <Form.Control type="text" placeholder="Materia"
                                defaultValue={evaluacion.materiaEvaluacion}
                                ref={materiaEvaluacionRef}
                            ></Form.Control>
                        </FormGroup>
                        <FormGroup >
                            <Form.Label>Nombre Evaluacion</Form.Label>
                            <Form.Control type="text" placeholder="Parcial 1"
                                defaultValue={evaluacion.nombreEvaluacion}
                                ref={nombreEvaluacionRef}
                            ></Form.Control>
                        </FormGroup>
                    </Row>

                    <Row className="mx-1" >
                        <FormGroup className="mr-4">
                            <Form.Label>Fecha de Inicio de Evaluacion</Form.Label>
                            <Form.Control type="date" defaultValue={evaluacion.fechaInicioEvaluacion}
                                ref={fechaInicioEvaluacionRef}></Form.Control>
                        </FormGroup>
                        <FormGroup >
                            <Form.Label>Hora de Inicio</Form.Label>
                            <Form.Control type="time"
                                defaultValue={evaluacion.horaInicioEvaluacion}
                                ref={horaInicioEvaluacionRef}
                            ></Form.Control>
                        </FormGroup>

                    </Row>
                    <Row className="mx-1">
                        <FormGroup className="mr-5">
                            <Form.Label>Fecha de Fin de Evaluacion</Form.Label>
                            <Form.Control type="date"
                                defaultValue={evaluacion.fechaFinEvaluacion}
                                ref={fechaFinEvaluacionRef}></Form.Control>
                        </FormGroup>
                        <FormGroup >
                            <Form.Label>Hora de Fin</Form.Label>
                            <Form.Control type="time"
                            defaultValue={evaluacion.horaFinEvaluacion}
                            ref={horaFinEvaluacionRef}
                            ></Form.Control>
                        </FormGroup>
                    </Row>
                    <FormGroup>
                        <Form.Label>Cantidad de Preguntas Visibles (son la cantidad de preguntas que vera el alumno)</Form.Label>
                        <Form.Control className="col-4" type="number" placeholder="10"
                        defaultValue={evaluacion.cantidadPreguntasEvaluacion}
                        ref={cantidadPreguntasEvaluacionRef}
                        ></Form.Control>
                    </FormGroup>
                    <FormGroup className="mb-3 mx-1" controlId="formBasicCheckbox">
                        <Form.Check
                            type="switch"
                            label="Mezclar Preguntas"
                            
                        />

                    </FormGroup>
                    <FormGroup className="mb-3 mx-1" controlId="formBasicCheckbox2">
                        <Form.Check
                            type="switch"
                            label="Navegacion libre (puede retroceder a la pregunta anterior)"
                        />
                    </FormGroup>
                    <div className="text-center ml-3">
                        <Row className="">
                            <Button className="mr-5" variant="primary" type="submit">
                                Guardar lo editado
                            </Button>
                            <Button variant="primary">
                                Atras
                            </Button>

                        </Row>
                    </div>
                </Form>
            </Container>
        </Fragment>
    );
};

export default EditarEvaluacion;