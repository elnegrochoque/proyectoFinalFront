
import React, { Fragment, useState } from 'react';
import {  Row,  Button,  Modal, Form,  FormGroup} from 'react-bootstrap';

import Swal from "sweetalert2";



const ItemPregunta = (props) => {

    console.log(props.cantidadPreguntas)


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)
        ;
    let op1 = props.pregunta.opcion1CorrectaPregunta;
    console.log(op1)

    const eliminarPregunta = () => {
        const URL = process.env.REACT_APP_API_URL + 'preguntas/' + props.pregunta._id;
        Swal.fire({
            title: '¿Está seguro?',
            text: "Se borrara permanentemente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(URL, {
                        method: 'DELETE',
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    if (response.status === 200) {

                        Swal.fire(
                            'Pregunta eliminada',
                            'La pregunta seleccionada fue correctamente elminada',
                            'success'
                        )
                        //actualizar los datos
                        props.consultarPreguntasAPI();
                    }
                    else {
                        Swal.fire(
                            'Error',
                            'Se produjo un error',
                            'error'
                        )
                    }
                } catch (error) {
                    console.log(error);
                    Swal.fire(
                        'Se produjo un eror',
                        'Intentelo en unos minutos',
                        'error'
                    )
                }
            }
        })

    }

    return (
        <Fragment>


            <tr >
                <td>{props.cantidadPreguntas}</td>
                <td>{props.pregunta.enunciadoPregunta}</td>
                <td className="d-flex justify-content-around">
                    <Button variant="danger" onClick={eliminarPregunta}>Borrar</Button>
                    <Button variant="warning" onClick={handleShow}>Editar</Button>

                </td>
            </tr>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Pregunta</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form className="container">
                        <FormGroup className="mr-3 ">
                            <Form.Label>Enunciado</Form.Label>
                            <Form.Control as="textarea" placeholder="Enunciado" defaultValue={props.pregunta.enunciadoPregunta}></Form.Control>
                        </FormGroup>

                        <h5>Marcar la/s correcta/s</h5>
                        <Row >
                            <FormGroup className="mr-3 col-10">
                                <Form.Label>Opcion 1</Form.Label>
                                <Form.Control type="text" placeholder="Opcion 1"
                                    defaultValue={props.pregunta.opcion1Pregunta}
                                ></Form.Control>
                            </FormGroup>
                            <FormGroup className="col-1 d-flex  mt-4"  controlId={props.pregunta._id+1}>
                                <Form.Check type="switch" className=" d-flex align-self-center"
                                    defaultChecked={props.pregunta.opcion1CorrectaPregunta} />
                            </FormGroup>
                        </Row>

                        <Row >
                            <FormGroup className="mr-3 col-10">
                                <Form.Label>Opcion 2</Form.Label>
                                <Form.Control type="text" placeholder="Opcion 2"
                                    defaultValue={props.pregunta.opcion2Pregunta}></Form.Control>
                            </FormGroup>
                            <FormGroup className="col-1 d-flex  mt-4"  controlId={props.pregunta._id+2}>
                                <Form.Check type="switch" className=" d-flex align-self-center"
                                    defaultChecked={props.pregunta.opcion2CorrectaPregunta}
                                />
                            </FormGroup>
                        </Row>
                        <Row >
                            <FormGroup className="mr-3 col-10">
                                <Form.Label>Opcion 3</Form.Label>
                                <Form.Control type="text" placeholder="Opcion 3"
                                    defaultValue={props.pregunta.opcion3Pregunta}></Form.Control>
                            </FormGroup>
                            <FormGroup className="col-1 d-flex  mt-4"  controlId={props.pregunta._id+3}>
                                <Form.Check type="switch" className=" d-flex align-self-center"
                                    defaultChecked={props.pregunta.opcion3CorrectaPregunta} />
                            </FormGroup>
                        </Row>
                        <Row >
                            <FormGroup className="mr-3 col-10">
                                <Form.Label>Opcion 4</Form.Label>
                                <Form.Control type="text" placeholder="Opcion 4"
                                    defaultValue={props.pregunta.opcion4Pregunta}></Form.Control>
                            </FormGroup>
                            <FormGroup className="col-1 d-flex  mt-4" controlId={props.pregunta._id+4}>
                                <Form.Check type="switch" className=" d-flex align-self-center"
                                    defaultChecked={props.pregunta.opcion4CorrectaPregunta} />
                            </FormGroup>
                        </Row>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" >
                        Guardar pregunta
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
};

export default ItemPregunta;