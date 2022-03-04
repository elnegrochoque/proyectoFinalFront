
import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col,  Button, Table, Modal, Form, FormGroup } from 'react-bootstrap';
import Header from "../Header";
import LeftNavbar from "../LeftNavbar";
import styles from "../../styles/Home.module.css";

import {  useParams } from 'react-router-dom';
import ItemPregunta from './ItemPregunta';
const EvaluacionNuevaProfesor = () => {

    const URL = process.env.REACT_APP_API_URL + "preguntas";
    const { id } = useParams();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [enunciadoPregunta, setEnunciadoPregunta] = useState("");
    const [opcion1Pregunta, setOpcion1pregunta] = useState("");
    const [opcion2Pregunta, setOpcion2Pregunta] = useState("");
    const [opcion3Pregunta, setOpcion3Pregunta] = useState("");
    const [opcion4Pregunta, setOpcion4Pregunta] = useState("");
    const [opcion1CorrectaPregunta, setOpcion1Correctapregunta] = useState(false);
    const [opcion2CorrectaPregunta, setOpcion2CorrectaPregunta] = useState(false);
    const [opcion3CorrectaPregunta, setOpcion3CorrectaPregunta] = useState(false);
    const [opcion4CorrectaPregunta, setOpcion4CorrectaPregunta] = useState(false);
    const [listaPreguntas, setListaPreguntas] = useState([])
    const guardarPreguntaNueva = async (e) => {
        e.preventDefault();
        console.log("crear")
        const evaluacion = {
            IDEvaluacion: id,
            enunciadoPregunta: enunciadoPregunta,
            opcion1Pregunta: opcion1Pregunta,
            opcion2Pregunta: opcion2Pregunta,
            opcion3Pregunta: opcion3Pregunta,
            opcion4Pregunta: opcion4Pregunta,
            opcion1CorrectaPregunta: opcion1CorrectaPregunta,
            opcion2CorrectaPregunta: opcion2CorrectaPregunta,
            opcion3CorrectaPregunta: opcion3CorrectaPregunta,
            opcion4CorrectaPregunta: opcion4CorrectaPregunta
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
                setShow(false);
            }
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        consultarPreguntasAPI();
    }, [show]);
    const consultarPreguntasAPI = async () => {
        try {
            const consulta = await fetch(URL + "/" + id);
            const respuesta = await consulta.json();
            setListaPreguntas(respuesta);
 

        } catch (error) {
            console.log(error);
        }
    }
    const salirAtras = () => {
        window.history.go(-2)
    }
    const preguntaAnterior = (e) => {

        e.preventDefault()
        window.history.back();
    }

    return (
        <Fragment>
        <div className={styles.Container}> 
            <div className={styles.container}>
                <LeftNavbar props={id}></LeftNavbar>
                <Header></Header>
            <div className={styles.contentcontainer}>
                <Row className="m-5">
                    <Col ><h3 className=" font-weight-bold">Preguntas</h3></Col>
                    <Col >
                        <Button variant='dark' onClick={handleShow}>Nueva Pregunta</Button>
                    </Col>
                    <Col>
                        <Button variant='dark' onClick={salirAtras}>Salir</Button>
                    </Col>
                    <Button variant='dark' onClick={preguntaAnterior} className="mr-5">Atras</Button>
                    <Table striped bordered hover size="sm" className="my-4">
                        <thead>
                            <tr>
                                <th ></th>
                                <th className="col-10">Enunciado</th>

                            </tr>

                        </thead>
                        <tbody key="tbody">
                            {listaPreguntas.map((pregunta) =>
                                <ItemPregunta
                                    cantidadPreguntas={listaPreguntas.indexOf(pregunta) + 1}
                                    pregunta={pregunta}
                                    key={pregunta._id}
                                    idProfesor={id}
                                    consultarPreguntasAPI={consultarPreguntasAPI}
                                ></ItemPregunta>)}

                        </tbody>
                    </Table>
                </Row>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Nueva Pregunta</Modal.Title>

                    </Modal.Header>
                    <Modal.Body>

                        <Form className="container">
                            <FormGroup className="mr-3 ">
                                <Form.Label>Enunciado</Form.Label>
                                <Form.Control as="textarea" placeholder="Enunciado" onChange={(e) => setEnunciadoPregunta(e.target.value)}></Form.Control>
                            </FormGroup>

                            <h5>Marcar la/s correcta/s</h5>
                            <Row >
                                <FormGroup className="mr-3 col-10">
                                    <Form.Label>Opcion 1</Form.Label>
                                    <Form.Control type="text" placeholder="Opcion 1" onChange={(e) => setOpcion1pregunta(e.target.value)}></Form.Control>
                                </FormGroup>
                                <FormGroup className="col-1 d-flex  mt-4" controlId="formBasicCheckbox1">
                                    <Form.Check type="switch" className=" d-flex align-self-center"
                                        onClick={(e) => setOpcion1Correctapregunta(e.target.checked)} />
                                </FormGroup>
                            </Row>

                            <Row >
                                <FormGroup className="mr-3 col-10">
                                    <Form.Label>Opcion 2</Form.Label>
                                    <Form.Control type="text" placeholder="Opcion 2" onChange={(e) => setOpcion2Pregunta(e.target.value)}></Form.Control>
                                </FormGroup>
                                <FormGroup className="col-1 d-flex  mt-4" controlId="formBasicCheckbox2">
                                    <Form.Check type="switch" className=" d-flex align-self-center"
                                        onClick={(e) => setOpcion2CorrectaPregunta(e.target.checked)}
                                    />
                                </FormGroup>
                            </Row>
                            <Row >
                                <FormGroup className="mr-3 col-10">
                                    <Form.Label>Opcion 3</Form.Label>
                                    <Form.Control type="text" placeholder="Opcion 3" onChange={(e) => setOpcion3Pregunta(e.target.value)}></Form.Control>
                                </FormGroup>
                                <FormGroup className="col-1 d-flex  mt-4" controlId="formBasicCheckbox3">
                                    <Form.Check type="switch" className=" d-flex align-self-center"
                                        onClick={(e) => setOpcion3CorrectaPregunta(e.target.checked)} />

                                </FormGroup>
                            </Row>
                            <Row >
                                <FormGroup className="mr-3 col-10">
                                    <Form.Label>Opcion 4</Form.Label>
                                    <Form.Control type="text" placeholder="Opcion 4" onChange={(e) => setOpcion4Pregunta(e.target.value)}></Form.Control>
                                </FormGroup>
                                <FormGroup className="col-1 d-flex  mt-4" controlId="formBasicCheckbox4">
                                    <Form.Check type="switch" className=" d-flex align-self-center"
                                        onClick={(e) => setOpcion4CorrectaPregunta(e.target.checked)} />
                                </FormGroup>
                            </Row>
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button  variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button variant="dark" onClick={guardarPreguntaNueva}>
                            Guardar pregunta
                        </Button>
                    </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
        
        </Fragment>
    );
};

export default EvaluacionNuevaProfesor;