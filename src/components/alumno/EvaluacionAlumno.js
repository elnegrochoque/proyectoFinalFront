import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';
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
            console.log(respuesta)
            console.log(respuesta.length)
            setNumeroTotalPreguntasDisponibles(respuesta.length - 1)
        } catch (error) {
            console.log(error);
        }
    }

    const irAComenzarEvaluacion = async () => {
        const urlEvaluacion1 = window.location + "/1"
        console.log(evaluacion[0].cantidadPreguntasEvaluacion)
        const URLRespuestas = process.env.REACT_APP_API_URL + "respuestas";
        const momentoInicioDeEvaluacionAlumno= new Date(Date.now())
        
        for (let index = 0; index < 
            (evaluacion[0].cantidadPreguntasEvaluacion<numeroTotalPreguntasDisponibles?
                evaluacion[0].cantidadPreguntasEvaluacion:
                numeroTotalPreguntasDisponibles)
            ; index++) {
            console.log("hola")
            const respuestaAlumno = {
                IDEvaluacion: idEvaluacion,
                IDAlumno: idAlumno,
                IDPregunta: evaluacion[index + 1]._id,
                numeroPregunta: index + 1,
                opcion1CorrectaRespuesta: false,
                opcion2CorrectaRespuesta: false,
                opcion3CorrectaRespuesta: false,
                opcion4CorrectaRespuesta: false,
                momentoInicioDeEvaluacionAlumno: momentoInicioDeEvaluacionAlumno
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
        const rutaPrimeraPregunta = window.location + "/pregunta/"+(evaluacion[0].cantidadPreguntasEvaluacion<numeroTotalPreguntasDisponibles?
            evaluacion[0].cantidadPreguntasEvaluacion:
            numeroTotalPreguntasDisponibles)+"/1"
        window.location.href = rutaPrimeraPregunta;
    }
    return (
        <Container>
            <div className="text-center mt-5">
                <Button className="mx-3" variant="danger" onClick={irAComenzarEvaluacion}>COMENZAR EVALUACION</Button>
            </div>
        </Container>

    );
};

export default EvaluacionAlumno;