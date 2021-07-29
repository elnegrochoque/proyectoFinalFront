import React from 'react';
import { Container, Row, Col, Dropdown, Button, Table, Modal, Form, Alert } from 'react-bootstrap';
import { useParams, withRouter } from 'react-router-dom';
const PrincipalProfesor = () => {
    const { id } = useParams();
    const crearEvaluacion = (props)=>{
        console.log("hola")
        console.log(id)
        const ruta="/profesor/"+id+"/crearevaluacion";
        window.location.href = ruta;
    }
    return (
        <Container className="text-center" >
            <Col className="mt-5"><Button size="lg" onClick={(e)=>crearEvaluacion(e)}>Crear Evaluacion</Button></Col>
            <Col className="mt-5"><Button size="lg">Modificar Evaluacion</Button></Col>
            <Col className="mt-5"><Button size="lg">Historial de Evaluaciones</Button></Col>
        
        </Container>

    );
};

export default withRouter(PrincipalProfesor) ;