import React from 'react';
import { Navbar } from 'react-bootstrap';

import {  Button, Row } from "react-bootstrap";
import isologotipo_unsta from "F:/facultad/proyecto4/front/proyecto4/src/img/isologotipo_unsta.png"
const Navegacion = () => {

    
    return (

        <Navbar bg="light" className="justify-content-between align-items-center" >
            <Navbar.Brand href="/">
                <img
                    src={isologotipo_unsta}
                    width="60"
                    height="60"
                    className="d-inline-block mr-3 "
                    alt="React Bootstrap logo"
                />INICIO
            </Navbar.Brand>

            <Row>
                
                <div className="align-self-center"><Button href="/" className="mx-2 ">Cerrar sesion</Button>
                </div>
            </Row>


        </Navbar>
    );
};

export default Navegacion;