
import React, { Fragment, useState } from 'react';
import { Container, Row, Col, Dropdown, Button, Table, Modal, Form, Alert, FormGroup, FormLabel, FormCheck } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from "sweetalert2";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
const EvaluacionNuevaProfesor = () => {

    const { id } = useParams();

    return (
        <Fragment>
            <Row className="m-5">
                <Col ><h3 className=" font-weight-bold">Preguntas</h3></Col>
                <Col>
                    <Link to={"/"} className='btn btn-dark mr-2 text-light'>
                        Nueva Pregunta
                    </Link></Col>
                <Table striped bordered hover size="sm" className="my-4">
                    <thead>
                        <tr>
                            <th>Apellido</th>
                            <th>Nombre</th>
                            <th>UI</th>
                            <th>Tipo de usuario</th>
                        </tr>

                    </thead>
                    {/* <tbody key="tbody">
                        {props.personas.map((persona) => <ItemPersona persona={persona} key={persona._id} consultarAPI={props.consultarAPI} idAdmin={id}></ItemPersona>)}

                    </tbody> */}
                </Table>
            </Row>
        </Fragment>
    );
};

export default EvaluacionNuevaProfesor;