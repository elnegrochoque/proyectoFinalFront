import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Card } from 'react-bootstrap';
import Header from "../HeaderAlumno";
import LeftNavbar from "../LeftNavbarAlumno";
import styles from "../../styles/Home.module.css";

const EvaluacionAlumno = () => {
    const { idAlumno } = useParams()
    const { idEvaluacion } = useParams()
    const URL = process.env.REACT_APP_API_URL + "evaluaciones/alumno/preguntas/" + idEvaluacion;
    const [numeroTotalPreguntasDisponibles, setNumeroTotalPreguntasDisponibles] = useState(0)
    const [evaluacion, setEvaluacion] = useState([]);

    useEffect(() => {
        consultarAPI1();
    }, []);

    const consultarAPI1 = async () => {
        try {
            const consulta = await fetch(URL);
            const respuesta = await consulta.json();
            setEvaluacion(respuesta);

            setNumeroTotalPreguntasDisponibles(respuesta.length - 1)
        } catch (error) {
            console.log(error);
        }
    }

    const irAComenzarEvaluacion = async () => {
     
        const URLRespuestas = process.env.REACT_APP_API_URL + "respuestas";
        const URLResultado = process.env.REACT_APP_API_URL + "resultados";
        let respuestaIDRespuesta;
        const momentoInicioDeEvaluacionAlumno = new Date(Date.now())
        const resultadoAlumno = {
            IDEvaluacion: idEvaluacion,
            IDAlumno: idAlumno,
            FechaEvaluacion: momentoInicioDeEvaluacionAlumno,
            NotaEvaluacion: 0
        }
        try {
            const parametros = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(resultadoAlumno)
            };
            // ejecutar la solicitud o request
            const consulta = await fetch(URLResultado, parametros);

            respuestaIDRespuesta = await consulta.json();

        } catch (error) {
            console.log(error);
        }
        for (let index = 0; index <
            (evaluacion[0].cantidadPreguntasEvaluacion < numeroTotalPreguntasDisponibles ?
                evaluacion[0].cantidadPreguntasEvaluacion :
                numeroTotalPreguntasDisponibles)
            ; index++) {
            const respuestaAlumno = {
                IDEvaluacion: idEvaluacion,
                IDAlumno: idAlumno,
                IDPregunta: evaluacion[index + 1]._id,
                numeroPregunta: index + 1,
                opcion1CorrectaRespuesta: false,
                opcion2CorrectaRespuesta: false,
                opcion3CorrectaRespuesta: false,
                opcion4CorrectaRespuesta: false,
                momentoInicioDeEvaluacionAlumno: momentoInicioDeEvaluacionAlumno,
                IDResultado: respuestaIDRespuesta
            };
            try {
                const parametros = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(respuestaAlumno)
                };
                // ejecutar la solicitud o request
                const respuesta = await fetch(URLRespuestas, parametros);
            } catch (error) {
                console.log(error);
            }
        }
        const rutaPrimeraPregunta = window.location + "/pregunta/" + (evaluacion[0].cantidadPreguntasEvaluacion < numeroTotalPreguntasDisponibles ?
            evaluacion[0].cantidadPreguntasEvaluacion :
            numeroTotalPreguntasDisponibles) + "/1"
            window.location.href = rutaPrimeraPregunta;
    }
    return (
        <Fragment>

        <div className={styles.Container}> 
            <LeftNavbar props={idAlumno}></LeftNavbar>
            <Header></Header>      
                                        
                <div className={styles.contentcontainer}>
                    <div className={styles.contentwrapper}>

                        <Card className="m-2" bg="Light"  style={{ width: '50rem'}} >                     
                                <Card.Header>
                                    <h1>Comenzar Evaluacion</h1>
                                </Card.Header>
                            
                                <Card.Body >                            
                                    <div className="text-center mt-5">
                                        <Button className="mx-3" variant="danger" onClick={irAComenzarEvaluacion}>COMENZAR EVALUACION</Button>
                                    </div>                            
                                </Card.Body>
                        </Card>
                    </div>
                </div>    
        </div>
        </Fragment>
    );
};

export default EvaluacionAlumno;