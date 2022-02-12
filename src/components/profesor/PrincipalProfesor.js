import React from 'react';
import { Container,  Col, Button, } from 'react-bootstrap';
import { useParams, withRouter } from 'react-router-dom';
const PrincipalProfesor = () => {
    const { id } = useParams();
    const crearEvaluacion = ()=>{
        const ruta="/profesor/"+id+"/crearevaluacion";
        window.location.href = ruta;
    }
    const modificarEvaluacion = ()=>{
        const ruta="/profesor/"+id+"/modificarevaluaciones";
        window.location.href = ruta;
    }
    const historialEvaluacion = ()=>{
        const ruta="/profesor/"+id+"/historial";
        window.location.href = ruta;
    }
   
    return (
        <Container className="text-center" >
            <Col className="mt-5"><Button size="lg" onClick={(e)=>crearEvaluacion(e)}>Crear Evaluacion</Button></Col>
            <Col className="mt-5"><Button size="lg" onClick={modificarEvaluacion}>Modificar Evaluacion</Button></Col>
            <Col className="mt-5"><Button size="lg" onClick={historialEvaluacion}>Historial de Evaluaciones</Button></Col>
        
        </Container>

    );
};

export default withRouter(PrincipalProfesor) ;