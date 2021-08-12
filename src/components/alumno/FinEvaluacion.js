import React from 'react';

import { Container, Row, Col, Button, Form, FormGroup, Alert, Card } from 'react-bootstrap';
const FinEvaluacion = () => {
    const aInicio = (e) => {
        e.preventDefault()
        const ruta = "/"
        window.location.href = ruta;
    }
    return (
        <div className="text-center m-5">
            <h1>Fin evaluacion</h1>
            <Button size="lg" className="my-5" onClick={aInicio}> <h2>Salir</h2></Button>

        </div>
    );
};

export default FinEvaluacion;