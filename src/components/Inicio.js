import React from 'react';

import { Image, Container, Form, Button, Col, Row } from "react-bootstrap";
import isologotipo_unsta from "F:/facultad/proyecto4/front/proyecto4/src/img/isologotipo_unsta.png"
const inicio = () => {
    return (
        <div>
            <div className="text-center mt-5">
                <Image src={isologotipo_unsta}></Image>
            </div>

            <h1 className="text-center">Sistema de evaluaciones</h1>
            <Container>
                <Form>
                    <Row className="justify-content-center">
                        <Col lg="8">
                            <Form.Group controlId="formNombre">
                                <Form.Label >Usuario</Form.Label>
                                <Form.Control type="text" placeholder="Nombre" />
                            </Form.Group>
                            <Form.Group controlId="forContrasena">
                                <Form.Label >Contraseña</Form.Label>
                                <Form.Control type="text" placeholder="Contraseña" />
                            </Form.Group>
                            <div className="text-center">
                                <Button variant='primary' type='submit' className='w-25'>Ingresar</Button>
                            </div>
                            
                        </Col>
                    </Row>


                </Form>
            </Container>

        </div>
    );
};

export default inicio;