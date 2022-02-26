
import React, { useState, useEffect, Fragment } from 'react';
import { Button, Container, Card } from 'react-bootstrap';
import Header from "../Header";
import LeftNavbar from "../LeftNavbar";
import styles from "../../styles/Home.module.css";

import { useParams } from 'react-router-dom';
import ItemVerEvaluacion from './ItemVerEvaluacion';
const VerEvaluacion = () => {

    const { idResultado } = useParams();
    const URL = process.env.REACT_APP_API_URL + "respuestas/resultados/" + idResultado;
    const [respuestas, setRespuestas] = useState([]);
    useEffect(() => {
        consultarAPI();
    }, []);
    const [preguntas, setPreguntas] = useState([])
    const consultarAPI = async () => {
        try {
            const consulta = await fetch(URL);
            const respuesta = await consulta.json();
            setRespuestas(respuesta);
            console.log(respuesta)
            let preguntasAux = []
            for (const i in respuesta) {
                const URLPregunta = process.env.REACT_APP_API_URL + "preguntas/respuesta/" + respuesta[i].IDPregunta;
                const consultaPregunta = await fetch(URLPregunta);
                const respuestaPregunta = await consultaPregunta.json();
                preguntasAux.push(respuestaPregunta)
                console.log(respuestaPregunta)
                console.log(preguntasAux)

            }
            setPreguntas(preguntasAux)
        } catch (error) {
            console.log(error);
        }
    }
    const atras = (e) => {
        e.preventDefault();
        window.history.back()
    }
    return (
        <Fragment>
            <div className={styles.Container}> 
                
                <LeftNavbar props={idResultado}></LeftNavbar> 
                <Header></Header> 
                        
                         
                        <div className={styles.contentcontainer}>
                            <div className={styles.contentwrapper}>

                            <Card className="m-2" bg="Light"  style={{ width: '50rem'}} >                     
                                <Card.Header>
                                <h1>Ver Evaluacion</h1>
                                </Card.Header>
                          
                                <Card.Body >
                                        <Container className="text-center mt-5">
                                            <Button onClick={atras} className="text-center">atras</Button>
                                        </Container>

                                        <Container className="m-5">
                                            {preguntas.map((preguntas) =>
                                                <ItemVerEvaluacion
                                                    respuestas={respuestas}
                                                    preguntas={preguntas}
                                                ></ItemVerEvaluacion>)}

                                        </Container >
                                </Card.Body>
                            </Card>
                            </div>
                        </div>
            </div>
        </Fragment>
        
    );
};

export default VerEvaluacion;