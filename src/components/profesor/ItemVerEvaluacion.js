
import React, { Fragment, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Button, Card, Container, Form, Row, InputGroup } from 'react-bootstrap';
const ItemVerEvaluacion = (props) => {

    const [checkBox1,setCheckBox1] = useState()
    const [checkBox2,setCheckBox2] = useState()
    const [checkBox3,setCheckBox3] = useState()
    const [checkBox4,setCheckBox4] = useState()
    useEffect(() => {
        atras()
    }, []);
    const atras = () => {
        console.log(props.preguntas.enunciadoPregunta);
        console.log(props.respuestas);
        for (const i in props.respuestas) {
            console.log(props.respuestas[i].IDPregunta)

            console.log(props.preguntas._id)
            if (props.respuestas[i].IDPregunta===props.preguntas._id) {
                console.log("respuestaCorrespondiente")
                setCheckBox1(props.respuestas[i].opcion1CorrectaRespuesta)
                setCheckBox2(props.respuestas[i].opcion2CorrectaRespuesta)
                setCheckBox3(props.respuestas[i].opcion3CorrectaRespuesta)
                setCheckBox4(props.respuestas[i].opcion4CorrectaRespuesta)
            }
        }

    }
    return (
        <Fragment>
            <Container className="my-5">
                <Card>
                    <Card.Body>
                        <h1 className="text-center">{props.preguntas.enunciadoPregunta}</h1>
                        <Form>
                            <InputGroup className="mb-3" size="lg" >

                                <InputGroup.Checkbox id="opcion1CorrectaRespuesta"
                                    defaultChecked={checkBox1}
                                />
                                <Form.Control className=" mx-4"
                                    plaintext readOnly defaultValue={props.preguntas.opcion1Pregunta}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3" size="lg" >

                                <InputGroup.Checkbox id="opcion1CorrectaRespuesta"
                                    defaultChecked={checkBox2}
                                />
                                <Form.Control className=" mx-4"
                                    plaintext readOnly defaultValue={props.preguntas.opcion2Pregunta}
                                />
                            </InputGroup><InputGroup className="mb-3" size="lg" >

                                <InputGroup.Checkbox id="opcion1CorrectaRespuesta"
                                    defaultChecked={checkBox3}
                                />
                                <Form.Control className=" mx-4"
                                    plaintext readOnly defaultValue={props.preguntas.opcion3Pregunta}
                                />
                            </InputGroup><InputGroup className="mb-3" size="lg" >

                                <InputGroup.Checkbox id="opcion1CorrectaRespuesta"
                                    defaultChecked={checkBox4}
                                />
                                <Form.Control className=" mx-4"
                                    plaintext readOnly defaultValue={props.preguntas.opcion4Pregunta}
                                />
                            </InputGroup>
                        </Form>
                    </Card.Body>
                </Card>

          
            </Container>
        </Fragment>
    );
};

export default ItemVerEvaluacion;