import React from 'react';
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import { useState } from "react";
import { withRouter } from "react-router-dom";
const NuevoUsuario = (props) => {
    const URL = process.env.REACT_APP_API_URL+"personas";
    const [usuarioPersona, setUsuarioPersona] = useState("");
    const [passwordPersona, setPasswordPersona] = useState("");
    const [UIPersona, setUIPersona] = useState("");
    const [DNIPersona, setDNIPersona] = useState("");
    const [emailPersona, setEmailPersona] = useState("");
    const [nombrePersona, setNombrePersona] = useState("");
    const [apellidoPersona, setApellidoPersona] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        // validamos que todos los campos esten llenos
        if (usuarioPersona.trim() === "" ||
            passwordPersona.trim() === "" ||
            UIPersona.trim() === "" ||
            DNIPersona.trim() === "" ||
            emailPersona.trim() === "" ||
            nombrePersona.trim() === "" ||
            apellidoPersona.trim() === ""
        ) {
            alert("complete todos los campos")
        } else {
            const persona = {
                tipo: "alumno",
                usuarioPersona: usuarioPersona,
                passwordPersona: passwordPersona,
                UIPersona: UIPersona,
                DNIPersona: DNIPersona,
                emailPersona: emailPersona,
                nombrePersona: nombrePersona,
                apellidoPersona: apellidoPersona
            };

            try {
                const parametros = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(persona)
                };
                // ejecutar la solicitud o request
                const respuesta = await fetch(URL, parametros);

                if ((await respuesta.status) === 201) {
                    props.consultarAPI();
                    
                    props.history.push('/');
                }
            } catch (error) {
                console.log(error);
            }



        }
    }






    return (
        <Container >
            <h1 className="text-center my-3">Inscripcion Nuevo Usuario</h1>
            <Form onSubmit={handleSubmit}>
                <Row >
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Nombre de Usuario</Form.Label>
                        <Form.Control type="text"
                            placeholder="Ingrese nombre de usuario"
                            onChange={(e) => setUsuarioPersona(e.target.value)} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                            onChange={(e) => setPasswordPersona(e.target.value)} />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} controlId="formGridAddress1">
                        <Form.Label>Codigo de alumno</Form.Label>
                        <Form.Control type="number" placeholder="123456"
                            onChange={(e) => setUIPersona(e.target.value)} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridAddress1">
                        <Form.Label>DNI</Form.Label>
                        <Form.Control type="number" placeholder="12345678"
                            onChange={(e) => setDNIPersona(e.target.value)} />
                    </Form.Group>

                </Row>

                <Form.Group controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="email@email.com"
                        onChange={(e) => setEmailPersona(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formGridEmail">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control placeholder="Perez"
                        onChange={(e) => setApellidoPersona(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formGridEmail">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control placeholder="Juan"
                        onChange={(e) => setNombrePersona(e.target.value)} />
                </Form.Group>


                <div className="text-center">
                    <Button variant="secondary" type="submit">
                        Crear Usuario
                    </Button>

                </div>
            </Form>
        </Container>
    );
};

export default withRouter(NuevoUsuario) ;