import React from 'react';
import { useState, useEffect } from 'react';
import { Image, Container, Form, Button, Col, Row, Alert } from "react-bootstrap";
import isologotipo_unsta from "F:/facultad/proyecto4/front/proyecto4/src/img/isologotipo_unsta.png"
import Swal from 'sweetalert2';
const Inicio = (props) => {
    //console.log(props.personas)
    // creo consts para almacenar el usuario, la contraseña y una bandera para verificar
    const [esUsuario, setEsUsuario] = useState(false);
    const [usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState(false);



    const handleSubmit = async (e) => {
        e.preventDefault();
        //  validar los datos
        if (usuario.trim() === '' || contrasena.trim() === '') {
            // mostrar el cartel de error
            setError(true);
            return;
        } else {
            // quitar cartel de error
            setError(false);
            // verificar si el usuario existe
            for (const i in props.personas) {
                if (props.personas[i].nombre === usuario && props.personas[i].contrasena === contrasena) {
                    console.log("existe");
                    console.log(props.personas[i].tipo)
                    setEsUsuario(true);
                } else {
                    console.log("no existe");
                    Swal.fire(
                        'error',
                        'Usuario o contraseña invalido',
                        'error'
                    )
                }
            }

        }


    }


    return (
        <div>
            <div className="text-center mt-5">
                <Image src={isologotipo_unsta}></Image>
            </div>
            <h1 className="text-center">Sistema de evaluaciones</h1>
            <Container>
                <Form onSubmit={handleSubmit}>
                    {(error === true) ? (<Alert variant={'danger'}>
                        Todos los campos son obligatorios
                    </Alert>) : null}
                    <Row className="justify-content-center">
                        <Col lg="8">
                            <Form.Group controlId="formNombre">
                                <Form.Label >Usuario</Form.Label>
                                <Form.Control type="text" placeholder="Nombre" onChange={(e) => setUsuario(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="forContrasena">
                                <Form.Label >Contraseña</Form.Label>
                                <Form.Control type="password" placeholder="Contraseña" onChange={(e) => setContrasena(e.target.value)} />
                            </Form.Group>
                            <div className="text-center">
                                <Button variant='primary' type='submit' className='w-25'>Ingresar</Button>
                            </div>
                            <div className="text-center my-3">
                                <Button variant='primary' href="/nuevousuario" className='w-25'>Nuevo Usuario</Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Container>

        </div>
    );
};

export default Inicio;