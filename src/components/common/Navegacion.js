import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Image, Container, Form, Button, Col, Row } from "react-bootstrap";
import isologotipo_unsta from "F:/facultad/proyecto4/front/proyecto4/src/img/isologotipo_unsta.png"
const Navegacion = () => {
    return (

        <Navbar bg="secondary" className="justify-content-between align-items-center" >
            <Navbar.Brand href="#home">
                <img
                    src={isologotipo_unsta}
                    width="60"
                    height="60"
                    className="d-inline-block "
                    alt="React Bootstrap logo"
                />inicio
            </Navbar.Brand>

            <Row>
                <Col className="align-self-center"><p className="text-center">Nombre de usuario</p></Col>

                <div className="align-self-center"><Button className="mx-2 ">Cerrar sesion</Button>
                </div>
            </Row>


        </Navbar>
    );
};

export default Navegacion;