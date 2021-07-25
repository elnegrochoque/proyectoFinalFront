import React from 'react';
import { Form, Button, Col, Row, Container, DropdownButton } from "react-bootstrap";
import { useState } from "react";
import { withRouter, useParams } from "react-router-dom";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
const NuevoUsuarioAdmin = (props) => {
    const { id } = useParams();
    const URL = process.env.REACT_APP_API_URL;
    const [usuarioPersona, setUsuarioPersona] = useState("");
    const [passwordPersona, setPasswordPersona] = useState("");
    const [UIPersona, setUIPersona] = useState("");
    const [DNIPersona, setDNIPersona] = useState("");
    const [emailPersona, setEmailPersona] = useState("");
    const [nombrePersona, setNombrePersona] = useState("");
    const [apellidoPersona, setApellidoPersona] = useState("");
    const [tipoPersona, setTipoPersona] = useState("profesor");
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(props.personas);
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
                tipo: tipoPersona,
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


                    props.history.push('/admin');
                }
            } catch (error) {
                console.log(error);
            }



        }
    }
    const cambiarTipoUsuario = (e) => {
        console.log(e.target)
   
        setTipoPersona(e.target.name)
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
                        <Form.Label>UI</Form.Label>
                        <Form.Control type="number" placeholder="UI123456"
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

                <DropdownButton id="dropdown-basic-button" variant="dark" title={tipoPersona} size="lg">

                    <DropdownItem  value="administrador" name="administrador" onClick={(e) => cambiarTipoUsuario(e)}>
                        administrador
                    </DropdownItem>
                    <DropdownItem value="profesor" name="profesor" onClick={(e) => cambiarTipoUsuario(e)}>
                        profesor
                    </DropdownItem>
                    <DropdownItem value="alumno" name="alumno" onClick={(e) => cambiarTipoUsuario(e)}>
                        alumno
                    </DropdownItem>


                </DropdownButton>
                <div className="text-center">
                    <Button variant="primary" type="submit">
                        Crear Usuario
                    </Button>

                </div>
            </Form>
        </Container>
    );
};

export default withRouter(NuevoUsuarioAdmin);