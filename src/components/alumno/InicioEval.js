import React, { Fragment } from 'react';
import { useState } from 'react';
import { Image, Container, Form, Button, Col, Row, Alert } from "react-bootstrap";
import isologotipo_unsta from "F:/facultad/proyecto4/front/proyecto4/src/img/isologotipo_unsta.png"
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
const InicioEval = () => {
    const {id}=useParams();
    const [codigoEvaluacion, setCodigoEvaluacion] = useState("");
    const [evaluacionAlumno, setEvaluacionAlumno] = useState([])
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        consultarPreguntasEvaluacionAPI();
    }
    const consultarPreguntasEvaluacionAPI = async () => {
        const URL = process.env.REACT_APP_API_URL + 'evaluaciones/alumno/' + codigoEvaluacion;
        try {
            const consulta = await fetch(URL);
            const respuesta = await consulta.json();
            setEvaluacionAlumno(respuesta);

            if (respuesta===false) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Evaluacion no disponible ',

                })
            }
            if (respuesta===true){
                console.log("si se puede hacer")
                const ruta="/alumno/"+id+"/evaluacion/"+codigoEvaluacion;
                window.location.href = ruta;
            }
            if (consulta.status === 404) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Evaluacion no disponible o no existente',

                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Evaluacion no disponible o no existente',

            })
            console.log(error);
        }
    }
    return (
        <Fragment >
            <Form onSubmit={handleSubmit} className="my-5">
                {(error === true) ? (<Alert variant={'danger'}>
                    Todos los campos son obligatorios
                </Alert>) : null}
                <Row className="justify-content-center">
                    <Col lg="8">
                        <Form.Group controlId="formNombre">
                            <Form.Label >Codigo</Form.Label>
                            <Form.Control type="text" placeholder="Insertar codigo aqui" onChange={(e) => setCodigoEvaluacion(e.target.value)} />
                        </Form.Group>
                        <div className="text-center">
                            <Button variant='primary' type='submit' className='w-25'>Ingresar a la evaluacion</Button>
                        </div>

                    </Col>
                </Row>
            </Form>
        </Fragment>
    );
};

export default InicioEval;