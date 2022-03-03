

import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Table,Button } from 'react-bootstrap';
import {  useParams } from 'react-router-dom';
import Header from "../Header";
import LeftNavbar from "../LeftNavbar";
import styles from "../../styles/Home.module.css";


import ItemHistorialEvaluacionRealizada from './ItemHistorialEvaluacionRealizada';
const HistorialEvaluacionesRealizadas = () => {
    const { idProfesor } = useParams();
    const { idEvaluacion } = useParams();
    const URL = process.env.REACT_APP_API_URL + "resultados/evaluacion/" + idEvaluacion;
    const [resultadosEvaluacion, setResultadosEvaluacion] = useState([]);
    useEffect(() => {
        consultarResultados();
    }, []);

    const consultarResultados = async () => {
        try {
            const consulta = await fetch(URL);
            const respuesta = await consulta.json();
            setResultadosEvaluacion(respuesta);
            console.log(respuesta)

        } catch (error) {
            console.log(error);
        }
    }
    const atras=(e)=>{
        e.preventDefault()
        window.history.back ()
    }
    return (
        <Fragment>
                <div className={styles.Container}> 
                    <div className={styles.container}>
                        <LeftNavbar props={idProfesor}></LeftNavbar>
                        <Header></Header>
                    <div className={styles.contentcontainer}>
                        <Row className="m-5">
                            <Col ><h3 className=" font-weight-bold">Evaluaciones</h3></Col>
                            <Col><Button onClick={atras}>Atras</Button>
                            </Col>
                            <Table striped bordered hover size="sm" className="my-4">
                                <thead>
                                    <tr>
                                        <th>Nombre Alumno</th>
                                        <th>Nota</th>
                                    </tr>

                                </thead>
                                <tbody key="tbody">
                                    {resultadosEvaluacion.map((resultado) =>
                                        <ItemHistorialEvaluacionRealizada
                                            resultado={resultado}
                                            key={resultado._id}
                                        ></ItemHistorialEvaluacionRealizada>)}

                                </tbody>
                            </Table>
                        </Row>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default HistorialEvaluacionesRealizadas;