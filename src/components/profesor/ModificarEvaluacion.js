
import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Table, Card } from 'react-bootstrap';
import Header from "../Header";
import LeftNavbar from "../LeftNavbar";
import styles from "../../styles/Home.module.css";

import { Link, useParams } from 'react-router-dom';
import ItemEvaluacion from './ItemEvaluacion';
import depositoLocal from '../depositoLocal';
const ModificarEvaluacion = () => {

    const _depositoLocal = depositoLocal.obtenerServicio();
    const id = _depositoLocal.obtenerIdPersona();
  
    const URL = process.env.REACT_APP_API_URL + "evaluaciones/profesor/" + id;
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

        <div className={styles.Container}> 
                
                
            <div className={styles.container}>
            <LeftNavbar props={id}></LeftNavbar> 
                <Header></Header> 
            <div className={styles.contentcontainer}>
                <Card className="m-2" bg="Light"  style={{ width: '70rem'}} >                     
                    <Card.Header>
                        <h1>Evaluaciones</h1>
                    </Card.Header>
                            
                    <Card.Body >                
                            <Row className="m-5" style={{ width: '50rem'}}>
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
                                        <th>Codigo</th>
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
                    </Card.Body>
                </Card>

                            
            </div>
            </div>
        </div>                


            
        </Fragment>
    );
};

export default ModificarEvaluacion;