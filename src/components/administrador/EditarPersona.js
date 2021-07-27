import React, { Fragment, useEffect, useState, useRef } from "react";
import { useParams, withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { Container, Form, Button, Alert, Row, Col, DropdownButton, FormGroup } from "react-bootstrap";
const EditarPersona = (props) => {

    const { id } = useParams();
    const URL = process.env.REACT_APP_API_URL;
    const [persona, setPersona] = useState({});
    const usuarioPersonaRef = useRef("");
    const passwordPersonaRef = useRef("");
    const UIPersonaRef = useRef("");
    const DNIPersonaRef = useRef("");
    const emailPersonaRef = useRef("");
    const nombrePersonaRef = useRef("");
    const apellidoPersonaRef = useRef("");
    const tipoPersonaRef = useRef("")
    const [tipoPersona, setTipoPersona]=useState("");
    let auxiliarTipoPersona=persona.tipo
    useEffect(() => {
        
        setTipoPersona(persona.tipo)
        consultarNoticia();
       
    }, []);

    const consultarNoticia = async () => {
        try {
            const respuesta = await fetch(URL + '/' + id);
            if (respuesta.status === 200) {
                const resultado = await respuesta.json();
                setPersona(resultado);
                auxiliarTipoPersona=persona.tipo
                console.log(auxiliarTipoPersona);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const cambiarTipoUsuario = (e) => {
        console.log(e.target.name);
        persona.tipo=e.target.name;
        setTipoPersona(e.target.name)
        auxiliarTipoPersona=e.target.name;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setTipoPersona(persona.tipo)
        console.log(tipoPersona)
        //armar el objeto a enviar
        const personaEditado = {
            nombrePersona: nombrePersonaRef.current.value,
            tipo: auxiliarTipoPersona,
            usuarioPersona: usuarioPersonaRef.current.value,
            passwordPersona: passwordPersonaRef.current.value,
            UIPersona: UIPersonaRef.current.value,
            DNIPersona: DNIPersonaRef.current.value,
            emailPersona: emailPersonaRef.current.value,
            apellidoPersona: apellidoPersonaRef.current.value,
            

        }
        try {
            const respuesta = await fetch(URL + "/" + id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(personaEditado)
            });

            if (respuesta.status === 200) {
                Swal.fire(
                    'Producto editado',
                    'Los datos del producto fueron modificados',
                    'success'
                );
               
                // redireccionar a la pagina de lista de productos
                props.consultarAPI();
                const urlAnterior="/administrador/"+id
                props.history.push(urlAnterior);

            } else {

            }
        } catch (error) {
            console.log(error);
        }

        // si algo falla mostrar alert de error
        // si esta todo bien, enviar la peticion PUT a la api
    };


    return (
        <Container >
            <h1 className="text-center my-3">Editar Usuario</h1>
            <Form onSubmit={handleSubmit}>
                <Row >
                    <Form.Group as={Col}>
                        <Form.Label>Nombre de Usuario</Form.Label>
                        <Form.Control type="text"
                            defaultValue={persona.usuarioPersona}
                            ref={usuarioPersonaRef}
                        />
                    </Form.Group>
                    <Form.Group as={Col} >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                            defaultValue={persona.passwordPersona}
                            ref={passwordPersonaRef}
                        />
                    </Form.Group>

                </Row>
                <Row>
                    <Form.Group as={Col} >
                        <Form.Label>UI</Form.Label>
                        <Form.Control type="number" placeholder="UI123456"
                            defaultValue={persona.UIPersona}
                            ref={UIPersonaRef}
                        />
                    </Form.Group>
                    <Form.Group as={Col} >
                        <Form.Label>DNI</Form.Label>
                        <Form.Control type="number" placeholder="12345678"
                            defaultValue={persona.DNIPersona}
                            ref={DNIPersonaRef}
                        />
                    </Form.Group>

                </Row>
                <Form.Group >
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="email@email.com"
                        defaultValue={persona.emailPersona}
                        ref={emailPersonaRef} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control placeholder="Perez"
                        defaultValue={persona.apellidoPersona}
                        ref={apellidoPersonaRef}
                    />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control placeholder="Juan"
                        defaultValue={persona.nombrePersona}
                        ref={nombrePersonaRef} />
                </Form.Group>
                <DropdownButton variant="dark" title={persona.tipo} value={persona.tipo}  ref={tipoPersonaRef}size="lg">
                    <DropdownItem value="administrador" name="administrador" onClick={(e) => cambiarTipoUsuario(e)}>
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
                        Editar Usuario
                    </Button>

                </div>
            </Form>


        </Container>
    );
};

export default withRouter(EditarPersona) ;