
import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Table} from 'react-bootstrap';

import { Link, useParams } from 'react-router-dom';
import ItemEvaluacion from './ItemEvaluacion';
const ModificarEvaluacion = () => {

    const { id } = useParams();
    const URL = process.env.REACT_APP_API_URL + "evaluaciones/profesor/"+id;
    const [evaluaciones, setEvaluaciones] = useState([]);
    useEffect(() => {
        consultarAPIEvaluaciones();
    }, []);
    const consultarAPIEvaluaciones = async () => {
        try {
            const consulta = await fetch(URL);
            const respuesta = await consulta.json();
            setEvaluaciones(respuesta);
     
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Fragment>
            <Row className="m-5">
                <Col ><h3 className=" font-weight-bold">Evaluaciones</h3></Col>
                <Col>
                    <Link to={"/profesor/" + id} className='btn btn-dark mr-2 text-light'>
                        ATRAS
                    </Link></Col>
                <Table striped bordered hover size="sm" className="my-4">
                    <thead>
                        <tr>
                            <th>Materia</th>
                            <th>Nombre Evaluacion</th>

                        </tr>

                    </thead>
                    <tbody key="tbody">
                        {evaluaciones.map((evaluacion) =>
                        <ItemEvaluacion 
                        evaluacion={evaluacion} 
                        key={evaluacion._id} 
                        idProfesor={id}
                        consultarAPI={consultarAPIEvaluaciones}
                        ></ItemEvaluacion>)}

                    </tbody>
                </Table>
            </Row>
        </Fragment>
    );
};

export default ModificarEvaluacion;