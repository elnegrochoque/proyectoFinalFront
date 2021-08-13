import React, { useState, useEffect } from 'react';

import { Button } from 'react-bootstrap';
const ItemHistorialEvaluacionRealizada = (props) => {

    const URL = process.env.REACT_APP_API_URL + "personas/" + props.resultado.IDAlumno;
    const [persona, setPersona] = useState();
    useEffect(() => {
        consultarAPI();
    }, []);

    const consultarAPI = async () => {
        try {
            const consulta = await fetch(URL);
            const respuesta = await consulta.json();
            setPersona(respuesta);
            console.log(respuesta)
        } catch (error) {
            console.log(error);
        }
    }

    const verEvaluacion = (e) => {
        e.preventDefault();
        const rutaEvaluacion = window.location.href + "/" + props.resultado._id
        console.log(rutaEvaluacion)
        window.location.href = rutaEvaluacion;
    }

    return (
        <tr >
            <td>{persona === undefined ? props.resultado._id : (persona.nombrePersona + " " + persona.apellidoPersona)}</td>
            <td>{props.resultado.NotaEvaluacion}</td>


            <td className="text-center">

                <Button className="mx-3" variant="danger" onClick={verEvaluacion} >VER</Button>

            </td>
        </tr>
    );
};

export default ItemHistorialEvaluacionRealizada;