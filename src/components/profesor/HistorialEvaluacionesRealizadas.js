

import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Table,Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';


import ItemHistorialEvaluacionRealizada from './ItemHistorialEvaluacionRealizada';
const HistorialEvaluacionesRealizadas = () => {
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
        </Fragment>
    );
};

export default HistorialEvaluacionesRealizadas;