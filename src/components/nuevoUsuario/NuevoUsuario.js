import React from 'react';
import { Form, Button, Col, Row, Container } from "react-bootstrap";

const nuevoUsuario = () => {
    return (
        <Container >
            <h1 className="text-center my-3">Inscripcion Nuevo Usuario</h1>
            <Form>
                <Row >
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Nombre de Usuario</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese nombre de usuario" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} controlId="formGridAddress1">
                        <Form.Label>UI</Form.Label>
                        <Form.Control placeholder="UI123456" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridAddress1">
                        <Form.Label>DNI</Form.Label>
                        <Form.Control placeholder="12345678" />
                    </Form.Group>

                </Row>

                <Form.Group controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="formGridEmail">
                    <Form.Label>Nombre y Apellido</Form.Label>
                    <Form.Control placeholder="Juan Perez" />
                </Form.Group>


                <div className="text-center">
                    <Button variant="primary" type="submit">
                        Crear Usuario
                    </Button>

                </div>
            </Form>
        </Container>
    );
};

export default nuevoUsuario;