
import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Table, Button, Container } from 'react-bootstrap';

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
            let preguntasAux=[]
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
        <div>
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

        </div>
    );
};

export default VerEvaluacion;