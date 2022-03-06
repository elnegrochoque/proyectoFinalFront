
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
    
    const editarPregunta = async (e) => {
        e.preventDefault();
        //armar el objeto a enviar
        const checkBox1 = (document.getElementById('opcion1CorrectaRespuesta').checked)
        const checkBox2 = (document.getElementById('opcion2CorrectaRespuesta').checked)
        const checkBox3 = (document.getElementById('opcion3CorrectaRespuesta').checked)
        const checkBox4 = (document.getElementById('opcion4CorrectaRespuesta').checked)

        setOpcion1CorrectapreguntaEditada (document.getElementById('opcion1CorrectaRespuesta').checked)
        setOpcion2CorrectapreguntaEditada (document.getElementById('opcion2CorrectaRespuesta').checked)
        setOpcion3CorrectapreguntaEditada (document.getElementById('opcion3CorrectaRespuesta').checked)
        setOpcion4CorrectapreguntaEditada (document.getElementById('opcion4CorrectaRespuesta').checked)

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
                Swal.fire({
                    confirmButtonColor: "#000000",
                    icon: "success",
                    title: "Modificada",
                    text: "La pregunta due modificada",
                  }
                );
                handleClose();

                // redireccionar a la pagina de lista de productos


            } else {
                Swal.fire({
                    confirmButtonColor: "#000000",
                    icon: "error",
                    title: "Error",
                    text: "Se produjo un error",
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
            confirmButtonColor: "#000000",
            cancelButtonColor: "#757575",
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

                        Swal.fire({
                            confirmButtonColor: "#000000",
                            icon: "success",
                            title: "Eliminada",
                            text: "La pregunta fue eliminada",
                          }
                        )
                        //actualizar los datos
                        props.consultarPreguntasAPI();
                    }
                    else {
                        Swal.fire({confirmButtonColor: "#000000",
                        icon: "error",
                        title: "Error",
                        text: "Se produjo un error",
                      }
                        )
                    }
                } catch (error) {
                    console.log(error);
                    Swal.fire({confirmButtonColor: "#000000",
                    icon: "error",
                    title: "Error",
                    text: "Se produjo un error",
                  }
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
                    <Button variant="secondary" onClick={eliminarPregunta}>Borrar</Button>
                    <Button variant="dark" onClick={handleShow}>Editar</Button>

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
                                   
                                    id="opcion4CorrectaRespuesta"/>

                            </FormGroup>
                        </Row>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="secondary" onClick={editarPregunta}>
                        Guardar pregunta
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
};

export default ItemPregunta;