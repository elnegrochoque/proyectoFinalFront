import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const PreguntaAlumno = () => {
    const { numeroPregunta } = useParams()
    const { idAlumno } = useParams()
    const { idEvaluacion } = useParams()
    const URL = process.env.REACT_APP_API_URL + "respuestas/" + idAlumno + "/" + idEvaluacion + "/" + numeroPregunta;
    const [respuestaEvaluacion, setRespuestaEvaluacion] = useState([]);
    const [preguntaEvaluacion, setPreguntaEvaluacion] = useState([]);
    useEffect(() => {
        consultarAPI1();
    }, []);
    const consultarAPI1 = async () => {
        try {
            const consulta = await fetch(URL);
            const respuesta = await consulta.json();
            setRespuestaEvaluacion(respuesta);
            console.log(respuesta)
            console.log(respuesta[0].IDPregunta)
            const idPregunta = respuesta[0].IDPregunta;
            const URLPregunta = process.env.REACT_APP_API_URL + "preguntas/respuesta/" + idPregunta;
            const consulta2 = await fetch(URLPregunta);
            const respuesta2 = await consulta2.json();
            setRespuestaEvaluacion(respuesta2);
            console.log(respuesta2)
        } catch (error) {
            console.log(error);
        }
        // const URLPregunta = process.env.REACT_APP_API_URL + "preguntas/respuesta/" + respuestaEvaluacion[0].IDPregunta;
        // try {
        //     const consulta = await fetch(URLPregunta);
        //     const respuesta = await consulta.json();
        //     setRespuestaEvaluacion(respuesta);

        // } catch (error) {
        //     console.log(error);
        // }

    }




    return (
        <div>
            <h1>Pregunta {numeroPregunta}</h1>
            <h2>Enunciado</h2>
            <h3>{respuestaEvaluacion.enunciadoPregunta}</h3>
            <h3>Opcion 1</h3>
            <p>{respuestaEvaluacion.opcion1Pregunta}</p>
            <h3>Opcion 2</h3>

            <p>{respuestaEvaluacion.opcion2Pregunta}</p>
            <h3>Opcion 3</h3>

            <p>{respuestaEvaluacion.opcion3Pregunta}</p>
            <h3>Opcion 4</h3>
            <p>{respuestaEvaluacion.opcion4Pregunta}</p>
            
        </div>
    );
};

export default PreguntaAlumno;