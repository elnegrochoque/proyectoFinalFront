
import React, { Fragment, useState, useRef, useEffect } from 'react';
import { Row, Button, Modal, Form, FormGroup } from 'react-bootstrap';

import Swal from "sweetalert2";



const ItemPregunta = (props) => {


    const enunciadoPreguntaRef = useRef("");
    const opcion1PreguntaRef = useRef("");
    const opcion2PreguntaRef = useRef("");
    const opcion3PreguntaRef = useRef("");
    const opcion4PreguntaRef = useRef("");
    const [opcion1CorrectaPreguntaEditada, setOpcion1CorrectapreguntaEditada] = useState(props.pregunta.opcion1CorrectaPregunta);
    const [opcion2CorrectaPreguntaEditada, setOpcion2CorrectapreguntaEditada] = useState(props.pregunta.opcion2CorrectaPregunta);
    const [opcion3CorrectaPreguntaEditada, setOpcion3CorrectapreguntaEditada] = useState(props.pregunta.opcion3CorrectaPregunta);
    const [opcion4CorrectaPreguntaEditada, setOpcion4CorrectapreguntaEditada] = useState(props.pregunta.opcion4CorrectaPregunta);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleShow = () => {
        setShow(true)
    };
    const cambiarEstado1Checkbox = () => {
        if (opcion1CorrectaPreguntaEditada) {
            setOpcion1CorrectapreguntaEditada(false)
        } else { setOpcion1CorrectapreguntaEditada(true) }
    }
    const cambiarEstado2Checkbox = () => {
        if (opcion2CorrectaPreguntaEditada) {
            setOpcion2CorrectapreguntaEditada(false)
        } else { setOpcion2CorrectapreguntaEditada(true) }
    }
    const cambiarEstado3Checkbox = () => {
        if (opcion3CorrectaPreguntaEditada) {
            setOpcion3CorrectapreguntaEditada(false)
        } else { setOpcion3CorrectapreguntaEditada(true) }
    }
    const cambiarEstado4Checkbox = () => {
        if (opcion4CorrectaPreguntaEditada) {
            setOpcion4CorrectapreguntaEditada(false)
        } else { setOpcion4CorrectapreguntaEditada(true) }
    }
    const editarPregunta = async (e) => {
        e.preventDefault();
        //armar el objeto a enviar
        const checkBox1 = (document.getElementById('opcion1CorrectaRespuesta').checked)
        const checkBox2 = (document.getElementById('opcion2CorrectaRespuesta').checked)
        const checkBox3 = (document.getElementById('opcion3CorrectaRespuesta').checked)
        const checkBox4 = (document.getElementById('opcion4CorrectaRespuesta').checked)

        const respuestaEditada = {
            opcion1CorrectaRespuesta: checkBox1,
            opcion2CorrectaRespuesta: checkBox2,
            opcion3CorrectaRespuesta: checkBox3,
            opcion4CorrectaRespuesta: checkBox4
        }
        const preguntaEditada = {
            IDEvaluacion: props.pregunta.IDEvaluacion,
            enunciadoPregunta: enunciadoPreguntaRef.current.value,
            opcion1Pregunta: opcion1PreguntaRef.current.value,
            opcion2Pregunta: opcion2PreguntaRef.current.value,
            opcion3Pregunta: opcion3PreguntaRef.current.value,
            opcion4Pregunta: opcion4PreguntaRef.current.value,
            opcion1CorrectaPregunta: checkBox1,
            opcion2CorrectaPregunta: checkBox2,
            opcion3CorrectaPregunta: checkBox3,
            opcion4CorrectaPregunta: checkBox4
            //cantidadPreguntasEvaluacion: cantidadPreguntasEvaluacionRef.current.value
        }
        try {
            const URL = process.env.REACT_APP_API_URL + 'preguntas/' + props.pregunta._id;
            const respuesta = await fetch(URL, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(preguntaEditada)
            });

            if (respuesta.status === 200 || respuesta.status === 201) {
                Swal.fire(
                    'Producto editado',
                    'Los datos del producto fueron modificados',
                    'success'
                );
                handleClose();

                // redireccionar a la pagina de lista de productos


            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                })
            }
        } catch (error) {
            console.log(error);
        }

        // si algo falla mostrar alert de error
        // si esta todo bien, enviar la peticion PUT a la api
    };

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
    useEffect(() => {

    props.consultarPreguntasAPI();
    ;
    }, [show]);
    
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
                            <Form.Control
                                as="textarea"
                                placeholder="Enunciado"
                                defaultValue={props.pregunta.enunciadoPregunta}
                                ref={enunciadoPreguntaRef}>
                            </Form.Control>
                        </FormGroup>

                        <h5>Marcar la/s correcta/s</h5>
                        <Row >
                            <FormGroup className="mr-3 col-10">
                                <Form.Label>Opcion 1</Form.Label>
                                <Form.Control type="text" placeholder="Opcion 1"
                                    defaultValue={props.pregunta.opcion1Pregunta}
                                    ref={opcion1PreguntaRef}
                                ></Form.Control>
                            </FormGroup>
                            <FormGroup className="col-1 d-flex  mt-4" controlId={props.pregunta._id + 1}>
                                <Form.Check type="switch" className=" d-flex align-self-center"
                                    defaultChecked={props.pregunta.opcion1CorrectaPregunta}
                                    onChange={cambiarEstado1Checkbox}
                                    id="opcion1CorrectaRespuesta"
                                />
                            </FormGroup>
                        </Row>

                        <Row >
                            <FormGroup className="mr-3 col-10">
                                <Form.Label>Opcion 2</Form.Label>
                                <Form.Control type="text" placeholder="Opcion 2"
                                    defaultValue={props.pregunta.opcion2Pregunta}
                                    ref={opcion2PreguntaRef}>

                                </Form.Control>
                            </FormGroup>
                            <FormGroup className="col-1 d-flex  mt-4" controlId={props.pregunta._id + 2}>
                                <Form.Check type="switch" className=" d-flex align-self-center"
                                    defaultChecked={props.pregunta.opcion2CorrectaPregunta}
                                    onChange={cambiarEstado2Checkbox}
                                    id="opcion2CorrectaRespuesta"
                                />
                            </FormGroup>
                        </Row>
                        <Row >
                            <FormGroup className="mr-3 col-10">
                                <Form.Label>Opcion 3</Form.Label>
                                <Form.Control type="text" placeholder="Opcion 3"
                                    defaultValue={props.pregunta.opcion3Pregunta}
                                    ref={opcion3PreguntaRef}>
                                </Form.Control>
                            </FormGroup>
                            <FormGroup className="col-1 d-flex  mt-4" controlId={props.pregunta._id + 3}>
                                <Form.Check type="switch" className=" d-flex align-self-center"
                                    defaultChecked={props.pregunta.opcion3CorrectaPregunta}
                                    onChange={cambiarEstado3Checkbox}
                                    id="opcion3CorrectaRespuesta" />
                            </FormGroup>
                        </Row>
                        <Row >
                            <FormGroup className="mr-3 col-10">
                                <Form.Label>Opcion 4</Form.Label>
                                <Form.Control type="text" placeholder="Opcion 4"
                                    defaultValue={props.pregunta.opcion4Pregunta}
                                    ref={opcion4PreguntaRef}>
                                </Form.Control>
                            </FormGroup>
                            <FormGroup className="col-1 d-flex  mt-4" controlId={props.pregunta._id + 4}>
                                <Form.Check type="switch" className=" d-flex align-self-center"
                                    defaultChecked={props.pregunta.opcion4CorrectaPregunta}
                                    onChange={cambiarEstado4Checkbox}
                                    id="opcion4CorrectaRespuesta"/>

                            </FormGroup>
                        </Row>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={editarPregunta}>
                        Guardar pregunta
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
};

export default ItemPregunta;