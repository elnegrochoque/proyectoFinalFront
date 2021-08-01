import React, { Fragment, useState } from 'react';
import { Container, Row, Col, Dropdown, Button, Table, Modal, Form, Alert, FormGroup, FormLabel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from "sweetalert2";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';

const CrearEvaluacion = () => {
    const URL = process.env.REACT_APP_API_URL+"evaluaciones";
    const [nomreEvaluacion, setNombreEvaluacion] = useState("");
const {id}=useParams();

    const handleSubmit=async (e)=>{
        e.preventDefault();
        console.log("crear")
        const evaluacion = {
            nombreEvaluacion: nomreEvaluacion,
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
    const volverAtras=()=>{
        const urlAnterior="/profesor/"+id
        window.location.href = urlAnterior;
    }
    return (
        <Fragment>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        
                        <Form.Label>Nombre Evaluacion</Form.Label>
                        <Form.Control type="text" placeholder="Parcial 1" onChange={(e)=>setNombreEvaluacion}></Form.Control>
                    </FormGroup>
                    <div className="text-center">
                    <Button variant="primary" type="submit">
                        Crear Evaluacion
                    </Button>
                    <Button variant="primary" onClick={volverAtras}>
                        Atras
                    </Button>
                </div>
                </Form>
            </Container>
        </Fragment>
    );
};

export default CrearEvaluacion;